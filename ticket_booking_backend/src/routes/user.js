const express = require('express');
const userController = require('../controllers/user');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /user/orders:
 *   get:
 *     summary: Get user order (booking) history
 */
router.get('/orders', authenticateJWT, userController.orderHistory);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile info
 */
router.get('/profile', authenticateJWT, userController.profile);

module.exports = router;
