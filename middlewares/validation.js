const { celebrate, Joi } = require('celebrate');
const { REG_URL, REG_ID } = require('../utils/constants');

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REG_URL),
    trailer: Joi.string().required().regex(REG_URL),
    thumbnail: Joi.string().required().regex(REG_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateGetDeleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().regex(REG_ID),
  }),
});
