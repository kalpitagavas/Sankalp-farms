const Order=require('../models/orderSchema')
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  try {
    const createdOrder = await Order.create({
      user: req.user._id,
      // Change 'customer' to match what your Schema expects
      customer: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        pincode: shippingAddress.zipCode || shippingAddress.pincode,
        city: shippingAddress.city,
        landmark: shippingAddress.landmark
      },
      // Change 'items' to match your Schema
      items: orderItems, 
      totalAmount: totalPrice, 
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("VALIDATION ERROR:", error.message);
    res.status(500).json({ 
      message: 'Order creation failed', 
      error: error.message 
    });
  }
};
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    // We find orders where the 'user' field matches the logged-in ID
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your orders' });
  }
};
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// backend/controllers/orderController.js
const getMyOrdersById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if it belongs to the user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};
module.exports = {
  addOrderItems,
  getMyOrders,
  getMyOrdersById
};