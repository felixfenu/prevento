const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const cartController = require('../controllers/cartController')

router.get('/', cartController.listado);
router.post('/comprar',authMiddleware,cartController.comprar)

module.exports = router;