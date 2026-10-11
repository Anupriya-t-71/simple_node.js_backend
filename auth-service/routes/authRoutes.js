const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);

// POST /api/auth/login
router.post('/login', authController.loginUser);

module.exports = router;