const Cart = require('../models/cartSchema');
const Product = require('../models/productModel');

// @desc    Get user cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    // .populate('items.productId') pulls in name, price, image from your Product model
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    
    if (!cart) {
      return res.status(200).json({ items: [], totalPrice: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Add or Update item in cart
// @route   POST /api/cart
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body; // quantity can be 1 or -1

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId: req.user._id, items: [{ productId, quantity }] });
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
        
        // Remove item if quantity drops to 0 or less
        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else if (quantity > 0) {
        // Add new item
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    const updatedCart = await cart.populate('items.productId');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

// @desc    Remove specific item from cart
// @route   DELETE /api/cart/:productId
exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};

