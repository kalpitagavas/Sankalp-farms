const express=require('express');
const { addOrderItems, getMyOrders, getMyOrdersById } = require('../controllers/orderController');
const router=express.Router()
const { protect } = require('../middleware/authMiddleware');

// POST /api/orders -> Place a new order
// GET  /api/orders -> (Optional) Get all orders (Admin only)
router.route('/').post(protect, addOrderItems);

// GET /api/orders/myorders -> Get the logged-in user's order history'
router.route('/myorders').get(protect, getMyOrders); // Keep this ABOVE the :id route
router.route('/:id').get(protect, getMyOrdersById);
 module.exports = router;