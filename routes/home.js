const express = require('express');
const homeController = require('../controllers/home');

const router = express.Router();

router.get('/',homeController.getIndex);

router.get('/form',homeController.getForm);

router.get('/confirmacion',homeController.getConfirmacion);

router.get('/login',homeController.getLogin);

router.get('/relogin',homeController.getRelogin);

router.post('/addUser',homeController.postAddUser);

router.post('/auth',homeController.postAuth);

router.post('/postVer', homeController.postVer);

module.exports = router;