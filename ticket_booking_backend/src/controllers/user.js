const UserModel = require('../models/user');

/**
 * Controller for user-related endpoints.
 */
class UserController {
  // PUBLIC_INTERFACE
  async orderHistory(req, res) {
    try {
      const userId = req.user.id;
      const orders = await UserModel.getOrders(userId);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async profile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
