const express = require('express');
const bookingController = require('../controllers/booking');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /booking/reserve:
 *   post:
 *     summary: Reserve a ticket
 */
router.post('/reserve', authenticateJWT, bookingController.reserveTicket);

/**
 * @swagger
 * /booking/book:
 *   post:
 *     summary: Book a reserved ticket (finalize order)
 */
router.post('/book', authenticateJWT, bookingController.bookTicket);

module.exports = router;
