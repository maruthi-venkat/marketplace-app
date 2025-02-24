const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getCustomerOrders,
  getOrdersByStatus,
  getOrdersByBuyerId,
  getOrdersBySellerId
} = require('../controllers/orders.controller');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware first
router.use(authMiddleware);

// Protected routes
router.get('/buyer/:buyerId', getOrdersByBuyerId);
router.get('/seller/:sellerId', getOrdersBySellerId);
router.get('/', getAllOrders);
router.get('/status', getOrdersByStatus);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
