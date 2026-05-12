const Order = require('../models/orderSchema');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        const createdOrder = await Order.create({
            user: req.user._id,
            customer: {
                fullName: shippingAddress.fullName,
                phone: shippingAddress.phone,
                address: shippingAddress.address,
                city: shippingAddress.city, // Added to ensure dashboard visibility
                pincode: shippingAddress.zipCode || shippingAddress.pincode,
                landmark: shippingAddress.landmark
            },
            // Mapping frontend keys to Schema keys
            items: orderItems.map(item => ({
                productId: item.productId?._id || item.productId || item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            totalAmount: totalPrice,
            status: 'Pending' 
        });

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Mongoose Error:", error.message);
        res.status(500).json({ message: 'Order creation failed', error: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your orders' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getMyOrdersById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Security check: ensure order belongs to the user
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching order' });
    }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this order' });
        }

        const nonCancelableStatus = ['Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
        if (nonCancelableStatus.includes(order.status)) {
            return res.status(400).json({ 
                message: `Order cannot be canceled because it is already ${order.status}` 
            });
        }

        order.status = 'Cancelled';
        const updatedOrder = await order.save();

        res.json({ message: 'Order cancelled successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error during cancellation' });
    }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = req.body.status || order.status;

        if (req.body.status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Server error during status update" });
    }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all orders' });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    getMyOrdersById,
    cancelOrder,
    updateOrderStatus,
    getAllOrders
};