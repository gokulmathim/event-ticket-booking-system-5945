const express = require('express');
const healthController = require('../controllers/health');
const authRoutes = require('./auth');
const eventRoutes = require('./events');
const bookingRoutes = require('./booking');
const userRoutes = require('./user');

const router = express.Router();

/**
 * Health endpoint for service status monitoring.
 */
router.get('/', healthController.check.bind(healthController));

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/booking', bookingRoutes);
router.use('/user', userRoutes);

module.exports = router;
