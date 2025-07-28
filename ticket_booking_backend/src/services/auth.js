const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Authentication and registration service.
 */
class AuthService {
  // PUBLIC_INTERFACE
  static async register({ email, password, name }) {
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, passwordHash, name });
    return user;
  }

  // PUBLIC_INTERFACE
  static async authenticate({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid email or password');
    return user;
  }

  // PUBLIC_INTERFACE
  static generateToken(user) {
    const payload = { id: user.id, email: user.email, name: user.name };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }
}

module.exports = AuthService;
