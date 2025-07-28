const AuthService = require('../services/auth');

/**
 * Controller for authentication endpoints.
 */
class AuthController {
  // PUBLIC_INTERFACE
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await AuthService.register({ email, password, name });
      const token = AuthService.generateToken(user);
      // Remove password from response for security
      const { password: _, ...safeUser } = user;
      res.status(201).json({ user: safeUser, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.authenticate({ email, password });
      const token = AuthService.generateToken(user);
      // Remove password from response for security
      const { password: _, ...safeUser } = user;
      res.status(200).json({ user: safeUser, token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
