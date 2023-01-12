const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/users', apiController.usuarios)
router.get('/users/lastCreated',apiController.lastCreatedUser)
router.get('/users/:id',apiController.usuarioPorId)


router.get('/products',apiController.productos)
router.get('/products/categories',apiController.productosPorCategoria)
router.get('/products/lastCreated',apiController.lastCreatedProduct)
router.get('/products/:id',apiController.productosrPorId)


module.exports = router;