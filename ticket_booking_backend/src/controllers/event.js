const EventModel = require('../models/event');

/**
 * Controller for event and ticket browsing.
 */
class EventController {
  // PUBLIC_INTERFACE
  async listEvents(req, res) {
    try {
      const events = await EventModel.listEvents();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  // PUBLIC_INTERFACE
  async eventDetails(req, res) {
    try {
      const eventId = req.params.id;
      const event = await EventModel.getEvent(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      const tickets = await EventModel.getTicketsForEvent(eventId);
      res.status(200).json({ ...event, tickets });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  // PUBLIC_INTERFACE
  async ticketsForEvent(req, res) {
    try {
      const eventId = req.params.id;
      const tickets = await EventModel.getTicketsForEvent(eventId);
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new EventController();
