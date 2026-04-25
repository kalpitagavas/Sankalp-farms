const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Must match the name in your User model
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Must match the name in your Product model
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity can not be less than 1.']
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);