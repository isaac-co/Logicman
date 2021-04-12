const express = require('express');
const usuarioController = require('../controllers/usuario');

const router = express.Router();

router.get('/home',usuarioController.getHome);

module.exports = router;