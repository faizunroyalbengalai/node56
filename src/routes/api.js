const express = require('express');
const infoController = require('../controllers/infoController');

const router = express.Router();

/**
 * GET /api/info
 * Returns application name, version, and database status.
 */
router.get('/info', infoController.getInfo);

module.exports = router;