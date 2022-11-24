// ************ Require's ************
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
router.get('/',userController.vistaLogin)
router.get('/login',userController.vistaLogin)
router.get('/register',userController.vistaRegister)
router.get('/profile',userController.vistaProfile)

module.exports = router;