const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,getUserProfile,addUserAddress} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
// Public: Anyone can register
router.post('/register', registerUser);

// Public: Anyone can try to login (Remove 'protect' from here)
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.route('/address').post(protect, addUserAddress);
module.exports = router;