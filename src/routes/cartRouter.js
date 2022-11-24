const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController')

router.get('/', cartController.listado);
router.post('comprar',cartController.comprar)

module.exports = router;