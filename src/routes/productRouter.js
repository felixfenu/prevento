// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, path.join(__dirname,'../../public/images/uploads')); 
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    },
})

const uploadFile = multer({storage})

// ************ Controller Require ************
const productController = require('../controllers/productController');
//products/create
router.get('/',productController.vistaListadoProd)

router.get('/create',productController.vistaCrearProd)
router.post('/create',uploadFile.single('imageProduct'),productController.accionGuardar) //guardar un nuevo producto
router.get('/descripcion/:id',productController.vistaDetalleProd)

router.get('/editar/:id',productController.vistaEditarProd)
router.put('/editar/:id',uploadFile.single('imageProductEdit'),productController.accionEditar)

router.delete('/:id',productController.accionEliminar)

module.exports = router;

