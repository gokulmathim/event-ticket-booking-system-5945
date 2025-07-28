const db = require('../config/db');

/**
 * Handles event and ticket data operations.
 */
class EventModel {
  // PUBLIC_INTERFACE
  static async listEvents() {
    const [rows] = await db.query('SELECT * FROM events ORDER BY date ASC');
    return rows;
  }

  // PUBLIC_INTERFACE
  static async getEvent(eventId) {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [eventId]);
    return rows[0];
  }

  // PUBLIC_INTERFACE
  static async getTicketsForEvent(eventId) {
    const [rows] = await db.query(
      `SELECT * FROM tickets
      WHERE event_id = ?`,
      [eventId]
    );
    return rows;
  }

  // PUBLIC_INTERFACE
  static async getAvailableTickets(eventId) {
    const [rows] = await db.query(
      `SELECT * FROM tickets
      WHERE event_id = ? AND status = 'available'`,
      [eventId]
    );
    return rows;
  }

  // PUBLIC_INTERFACE
  static async getTicketById(ticketId) {
    const [rows] = await db.query(
      'SELECT * FROM tickets WHERE id = ?',
      [ticketId]
    );
    return rows[0];
  }

  // PUBLIC_INTERFACE
  static async reserveTicket(ticketId) {
    // Set status to reserved if currently available
    const [result] = await db.query(
      `UPDATE tickets SET status = 'reserved'
       WHERE id = ? AND status = 'available'`,
      [ticketId]
    );
    return result.affectedRows > 0;
  }

  // PUBLIC_INTERFACE
  static async bookTicket(ticketId) {
    // Set status to booked if currently reserved
    const [result] = await db.query(
      `UPDATE tickets SET status = 'booked'
      WHERE id = ? AND status = 'reserved'`,
      [ticketId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = EventModel;
