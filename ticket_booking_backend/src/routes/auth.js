const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 */
router.post('/login', authController.login);

module.exports = router;
