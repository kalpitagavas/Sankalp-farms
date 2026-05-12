const Subscription = require('../models/subscription');

// @desc    Get logged in user subscriptions
// @route   GET /api/subscriptions/my-subscriptions
const getMySubscriptions = async (req, res) => {
  const subs = await Subscription.find({ user: req.user._id }).populate('product', 'name price image');
  res.json(subs);
};

// @desc    Create a new subscription
// @route   POST /api/subscriptions
const createSubscription = async (req, res) => {
  const { productId, cycle } = req.body;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 30); // Default to 30 days later

  const subscription = new Subscription({
    user: req.user._id,
    product: productId,
    cycle: cycle || 'Monthly',
    nextDelivery: nextDate,
  });

  const createdSub = await subscription.save();
  res.status(201).json(createdSub);
};

// @desc    Toggle status between Active and Paused
// @route   PUT /api/subscriptions/:id/toggle
const toggleSubscriptionStatus = async (req, res) => {
  const sub = await Subscription.findById(req.params.id);

  if (sub) {
    sub.status = sub.status === 'Active' ? 'Paused' : 'Active';
    const updatedSub = await sub.save();
    // Re-populate product so frontend doesn't lose data
    const populatedSub = await Subscription.findById(updatedSub._id).populate('product', 'name price image');
    res.json(populatedSub);
  } else {
    res.status(404).json({ message: 'Subscription not found' });
  }
};

module.exports = { getMySubscriptions, createSubscription, toggleSubscriptionStatus };