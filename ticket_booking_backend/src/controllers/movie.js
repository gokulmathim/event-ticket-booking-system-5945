const MovieModel = require('../models/movie');

/**
 * Controller for movie endpoints.
 */
class MovieController {
  // PUBLIC_INTERFACE
  /**
   * Get list of all movies.
   */
  async listMovies(req, res) {
    try {
      const movies = await MovieModel.listMovies();
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Add a new movie.
   */
  async addMovie(req, res) {
    try {
      const { title, description, release_date, duration } = req.body;
      if (!title || !release_date || !duration) {
        return res.status(400).json({ message: 'Missing required fields: title, release_date, duration' });
      }
      const movie = await MovieModel.addMovie({ title, description, release_date, duration });
      res.status(201).json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new MovieController();
