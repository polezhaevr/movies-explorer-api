const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const User = require('../models/users');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const { SECRET_KEY } = require('../utils/constants');

// возвращает информацию о пользователе (email и имя)
// GET /users/me
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest('Переданы некорректные данные при поиске пользователя.'));
        return;
      }
      next(err);
    });
};

// обновляет информацию о пользователе (email и имя)
// PATCH /users/me
module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

// создаёт пользователя с переданными в теле email, password и name
// POST /signup
module.exports.craeteUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  const createUser = (hash) => User.create({
    name,
    email,
    password: hash,
  });

  bcrypt
    .hash(password, 10)
    .then((hash) => createUser(hash))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
        return;
      }
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегистрирован.'));
        return;
      }
      next(err);
    });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
// POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
