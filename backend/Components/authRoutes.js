const express = require('express');
const { loginUser, login, signup } = require('../controllers/authController');
const router = express.Router();

// Define routes
router.post('/login-user', loginUser);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;