const express = require('express');
const theatreController = require('../controllers/theatre');

const router = express.Router();

/**
 * @swagger
 * /theatres:
 *   get:
 *     summary: List all theatres
 *   post:
 *     summary: Add a new theatre
 */
router.get('/', theatreController.listTheatres);
router.post('/', theatreController.addTheatre);

module.exports = router;
