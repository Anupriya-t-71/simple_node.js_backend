const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); 

const User = mongoose.model('User', UserSchema);
module.exports = User;