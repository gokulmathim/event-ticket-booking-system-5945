const TheatreModel = require('../models/theatre');

/**
 * Controller for theatre endpoints.
 */
class TheatreController {
  // PUBLIC_INTERFACE
  /**
   * Get list of all theatres.
   */
  async listTheatres(req, res) {
    try {
      const theatres = await TheatreModel.listTheatres();
      res.status(200).json(theatres);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Add a new theatre.
   */
  async addTheatre(req, res) {
    try {
      const { name, location } = req.body;
      if (!name || !location) {
        return res.status(400).json({ message: 'Missing required fields: name, location' });
      }
      const theatre = await TheatreModel.addTheatre({ name, location });
      res.status(201).json(theatre);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new TheatreController();
