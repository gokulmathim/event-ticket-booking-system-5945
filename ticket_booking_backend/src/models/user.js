const db = require('../config/db');

/**
 * Handles user data operations.
 */
class UserModel {
  // PUBLIC_INTERFACE
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
  
  // PUBLIC_INTERFACE
  static async create({ email, passwordHash, name }) {
    const [result] = await db.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, passwordHash, name]
    );
    return { id: result.insertId, email, name };
  }

  // PUBLIC_INTERFACE
  static async findById(userId) {
    const [rows] = await db.query('SELECT id, email, name FROM users WHERE id = ?', [userId]);
    return rows[0];
  }

  // PUBLIC_INTERFACE
  static async getOrders(userId) {
    const [rows] = await db.query(
      `SELECT o.id as order_id, o.created_at, e.name as event_name, t.seat_number
      FROM orders o
      JOIN tickets t ON o.ticket_id = t.id
      JOIN events e ON t.event_id = e.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId]
    );
    return rows;
  }
}

module.exports = UserModel;
