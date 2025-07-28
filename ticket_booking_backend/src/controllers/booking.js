const EventModel = require('../models/event');
const db = require('../config/db');

/**
 * Controller for booking and reservation endpoints.
 */
class BookingController {
  // PUBLIC_INTERFACE
  async reserveTicket(req, res) {
    try {
      const { ticketId } = req.body;
      if (!ticketId) return res.status(400).json({ message: 'ticketId required' });

      const ticket = await EventModel.getTicketById(ticketId);
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

      const reserved = await EventModel.reserveTicket(ticketId);
      if (!reserved) return res.status(409).json({ message: 'Ticket not available for reservation' });

      res.status(200).json({ message: 'Ticket reserved. Complete booking to finalize purchase.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async bookTicket(req, res) {
    try {
      const { ticketId } = req.body;
      const userId = req.user.id;

      const ticket = await EventModel.getTicketById(ticketId);
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
      if (ticket.status !== 'reserved') {
        return res.status(409).json({ message: 'Ticket must be reserved before booking' });
      }

      // Begin transaction
      const conn = await db.getConnection();
      try {
        await conn.beginTransaction();

        const booked = await conn.query(
          'UPDATE tickets SET status = \'booked\' WHERE id = ? AND status=\'reserved\'', [ticketId]
        );
        if (!booked[0].affectedRows) {
          await conn.rollback();
          conn.release();
          return res.status(409).json({ message: 'Ticket already booked/unavailable.' });
        }

        const [orderRes] = await conn.query(
          'INSERT INTO orders (user_id, ticket_id, created_at) VALUES (?, ?, NOW())',
          [userId, ticketId]
        );

        await conn.commit();
        conn.release();
        res.status(201).json({ message: 'Ticket successfully booked.', orderId: orderRes.insertId });
      } catch (e) {
        await conn.rollback();
        conn.release();
        throw e;
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new BookingController();
