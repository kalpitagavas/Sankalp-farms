const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
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
        select: false, // Ensures password isn't sent in GET requests by default
        minlength: 6 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
}, { timestamps: true });


userSchema.pre(('save'),async function(next){
 if(!this.isModified('password'))return next();
 const salt=await bcrypt.genSalt(10)
 this.password=await bcrypt.hash(this.password,salt)
})
// This check prevents "OverwriteModelError" during nodemon restarts
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User; // Use this to match your 'require' statement