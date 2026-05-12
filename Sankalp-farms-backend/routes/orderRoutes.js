const express=require('express');
const { addOrderItems, getMyOrders, getMyOrdersById, cancelOrder, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const router=express.Router()
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/orders -> Place a new order


// GET /api/orders/myorders -> Get the logged-in user's order history'
router.route('/myorders').get(protect, getMyOrders); // Keep this ABOVE the :id route
router.route('/:id').get(protect, getMyOrdersById);
router.route('/:id/cancel').put(protect, cancelOrder);
router.route('/:id/status').put(protect, admin, updateOrderStatus);
router.route('/')
  .post(protect, addOrderItems)      // For users placing orders
  .get(protect, admin, getAllOrders); // For Admin viewing everything
 module.exports = router;