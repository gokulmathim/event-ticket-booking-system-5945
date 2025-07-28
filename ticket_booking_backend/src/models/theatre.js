const db = require('../config/db');

/**
 * Handles theatre data operations.
 */
class TheatreModel {
  // PUBLIC_INTERFACE
  /**
   * Get all theatres.
   * @returns {Promise<Array>}
   */
  static async listTheatres() {
    const [rows] = await db.query('SELECT * FROM theatres ORDER BY name ASC');
    return rows;
  }

  // PUBLIC_INTERFACE
  /**
   * Add a new theatre.
   * @param {Object} theatreData
   * @returns {Promise<Object>}
   */
  static async addTheatre(theatreData) {
    const { name, location } = theatreData;
    const [result] = await db.query(
      'INSERT INTO theatres (name, location) VALUES (?, ?)',
      [name, location]
    );
    return { id: result.insertId, ...theatreData };
  }
}

module.exports = TheatreModel;
