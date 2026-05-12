// models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  status: { type: String, enum: ['Active', 'Paused', 'Cancelled'], default: 'Active' },
  cycle: { type: String, default: 'Monthly' },
  nextDelivery: { type: Date, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);