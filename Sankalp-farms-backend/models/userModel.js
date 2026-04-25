const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: 'Mumbai' },
    pincode: { type: String, required: true }, // Matches frontend 'zipCode' mapping
    landmark: { type: String },
    isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true, 
        select: false, 
        minlength: 6 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    // Added this field to store saved locations for checkout
    addresses: [addressSchema] 
}, { timestamps: true });

// Password Hashing Middleware
// Password Hashing Middleware
userSchema.pre('save', async function() {
    // If password isn't being changed, just stop here
    if (!this.isModified('password')) return;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // NOTE: We removed 'next' entirely from the arguments and the return
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;