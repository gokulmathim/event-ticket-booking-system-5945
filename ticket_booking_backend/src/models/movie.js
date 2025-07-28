const db = require('../config/db');

/**
 * Handles movie data operations.
 */
class MovieModel {
  // PUBLIC_INTERFACE
  /**
   * Get all movies.
   * @returns {Promise<Array>}
   */
  static async listMovies() {
    const [rows] = await db.query('SELECT * FROM movies ORDER BY release_date DESC');
    return rows;
  }

  // PUBLIC_INTERFACE
  /**
   * Add a new movie.
   * @param {Object} movieData
   * @returns {Promise<Object>}
   */
  static async addMovie(movieData) {
    const { title, description, release_date, duration } = movieData;
    const [result] = await db.query(
      'INSERT INTO movies (title, description, release_date, duration) VALUES (?, ?, ?, ?)',
      [title, description, release_date, duration]
    );
    return { id: result.insertId, ...movieData };
  }
}

module.exports = MovieModel;
