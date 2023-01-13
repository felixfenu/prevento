// ************ Require's ************
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const userController = require('../controllers/userController')
router.put('/editar/:id',authMiddleware,userController.vistaLogin)
router.get('/',userController.vistaLogin)
router.get('/login',userController.vistaLogin)
router.get('/register',userController.vistaRegister)
router.get('/profile',authMiddleware,userController.vistaProfile)



module.exports = router;