const express = require('express');
const eventController = require('../controllers/event');

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: List all events
 */
router.get('/', eventController.listEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Event details (with tickets)
 */
router.get('/:id', eventController.eventDetails);

/**
 * @swagger
 * /events/{id}/tickets:
 *   get:
 *     summary: List tickets for an event
 */
router.get('/:id/tickets', eventController.ticketsForEvent);

module.exports = router;
