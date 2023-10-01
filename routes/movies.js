const router = require('express').Router();
const { craeteMovie, getDeleteMovieById, getMovies } = require('../controllers/movies');
const { validateCreateMovie, validateGetDeleteMovieById } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, craeteMovie);
router.delete('/movies/:movieId', validateGetDeleteMovieById, getDeleteMovieById);

module.exports = router;
