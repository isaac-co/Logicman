const express = require('express');
const usuarioController = require('../controllers/usuario');

const router = express.Router();

router.get('/home',usuarioController.getHome);

router.get('/juego',usuarioController.getJuego);

module.exports = router;