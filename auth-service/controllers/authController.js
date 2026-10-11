const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        user = new User({ email, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ 
            message: 'User registered successfully', 
            userId: user._id 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Richer payload
            JWT_SECRET, 
            { expiresIn: JWT_EXPIRY }
        );

        res.json({ 
            token,
            expiresIn: JWT_EXPIRY 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};