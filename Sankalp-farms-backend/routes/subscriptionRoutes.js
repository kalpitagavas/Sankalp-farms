const express = require('express');
const router = express.Router();
const { 
  getMySubscriptions, 
  createSubscription, 
  toggleSubscriptionStatus 
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createSubscription);

router.route('/my-subscriptions')
  .get(protect, getMySubscriptions);

router.route('/:id/toggle')
  .put(protect, toggleSubscriptionStatus);

module.exports = router;