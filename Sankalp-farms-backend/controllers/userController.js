const express = require('express')
const User = require('../models/UserModel')

const jwt = require('jsonwebtoken');
// Import it and NAME it 'bcrypt' so your code below recognizes it
const bcrypt = require('bcryptjs');

// Helper function for your token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

//@desc:Register a new user
// @route   POST /api/users
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            return res.json({
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                // Fixed the brackets and comma in your jwt.sign
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            })
        }
    }
    res.status(401).json({ message: 'Invalid email or password' });
}
// controllers/userController.js
const getUserProfile = async (req, res) => {
    try {
        // Find user by ID (id comes from protect middleware)
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone || "", // Prevents undefined if new user
                addresses: user.addresses || [], 
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error fetching profile" });
    }
};

// Add new address to user profile
// controllers/userController.js

// controllers/userController.js
const addUserAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { fullName, phone, address, pincode, landmark, city } = req.body;

        // Validation check
        if (!fullName || !phone || !address || !pincode) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const newAddress = { fullName, phone, address, pincode, landmark, city };

        user.addresses.push(newAddress);
        const updatedUser = await user.save();
        
        res.status(201).json(updatedUser);
    } catch (err) {
        console.error("Error saving address:", err.message);
        res.status(500).json({ message: err.message });
    }
};
module.exports = { registerUser, loginUser,getUserProfile,addUserAddress };