const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
// No need for 'protect' here unless you are creating a 'getProfile' route

// Public: Anyone can register
router.post('/register', registerUser);

// Public: Anyone can try to login (Remove 'protect' from here)
router.post('/login', loginUser);

module.exports = router;