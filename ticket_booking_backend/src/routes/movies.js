const express = require('express');
const movieController = require('../controllers/movie');

const router = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: List all movies
 *   post:
 *     summary: Add a new movie
 */
router.get('/', movieController.listMovies);
router.post('/', movieController.addMovie);

module.exports = router;
