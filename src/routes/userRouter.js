// ************ Require's ************
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const userController = require('../controllers/userController')
router.get('/',userController.vistaLogin)
router.get('/login',userController.vistaLogin)
router.get('/register',userController.vistaRegister)
router.get('/profile',authMiddleware,userController.vistaProfile)
router.put('/editar/:id',authMiddleware,userController.editarProfile)

module.exports = router;