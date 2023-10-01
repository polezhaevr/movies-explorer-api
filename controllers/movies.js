const { Error } = require('mongoose');
const Movie = require('../models/movies');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

// создаёт фильм с переданными в теле country, director, duration, year, description
// image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies
module.exports.craeteMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании фильма.'));
        return;
      }
      next(err);
    });
};

// удаляет сохранённый фильм по id DELETE /movies/_id
module.exports.getDeleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .orFail(new NotFound('Фильи с указанным `_id` не найдена.'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new Forbidden('Отсутствуют права для удаления фильма с указанным `_id`.'));
        return;
      }
      Movie.deleteOne(movie)
        .then(res.send(movie))
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest('Передан несуществующий `_id` фильма.'));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: { _id: req.user._id } })
    .populate('owner')
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch(next);
};
