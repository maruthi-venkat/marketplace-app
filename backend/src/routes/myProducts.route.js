const express = require('express');
const router = express.Router();
const myProductsController = require('../controllers/myProducts.controller');
const authMiddleware = require('../middleware/auth');

// Protect all routes
router.use(authMiddleware);

// MyProducts routes
router.get('/', myProductsController.getAllMyProducts);
router.post('/', myProductsController.createMyProduct);
router.get('/:id', myProductsController.getMyProductById);
router.put('/:id', myProductsController.updateMyProduct);
router.delete('/:id', myProductsController.deleteMyProduct);

module.exports = router; 