const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access Denied. Please log in.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded; 
        
        next();
    } catch (ex) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};