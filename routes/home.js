const express = require('express');
const homeController = require('../controllers/home');

const router = express.Router();

router.get('/',homeController.getIndex);

router.get('/form',homeController.getForm);

router.get('/login',homeController.getLogin);

router.get('/relogin',homeController.getRelogin);

router.post('/addUser',homeController.postAddUser);

router.post('/auth',homeController.postAuth);

module.exports = router;