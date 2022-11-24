// ************ Require's ************
const express = require('express');
const router = express.Router();
// requerimos multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//requerimos express validator
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, path.join(__dirname,'../../public/images/uploads')); 
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    },
})

// constante de multer
const uploadFile = multer({storage})

// constante de express validator, es un array de validaciones de campos vacios
// en body va el name de cada imput del formulario
let validaciones = [
    body('emailLogin').isEmail().notEmpty().withMessage('email vacio'),
    body('passwordLogin').notEmpty().withMessage('password vacio'),
]

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// HOME
router.get('/', mainController.index); 
router.get('/home',mainController.index)

// LOGIN
router.get('/login', mainController.login);
// ruta que le paso el array de validaciones para Express Validator
router.post('/login', validaciones , mainController.loginValidator);

// REGISTRARSE
router.get('/register',mainController.vistaCrearUsuario)
router.post('/register',uploadFile.single('imageProduct'),mainController.accionGuardar) //guardar un nuevo usuario

// PERFIL DE USUARIO
router.get('/perfil/:id', mainController.perfil);


module.exports = router;