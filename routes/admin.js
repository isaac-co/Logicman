const express = require('express');
const adminController = require('../controllers/admin');

// Mini app
const router = express.Router();

// A
router.get('/dashboard',adminController.getDashboard);

// A
router.get('/tablero',adminController.getTablero);

module.exports = router;