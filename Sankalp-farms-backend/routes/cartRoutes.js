const express = require('express');
const router = express.Router();
const { getCart, updateCart, removeItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware'); // Your JWT protector

router.route('/')
  .get(protect, getCart)
  .post(protect, updateCart);

router.delete('/:productId', protect, removeItem);

module.exports = router;