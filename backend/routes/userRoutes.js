const express = require('express');
const userController = require('../controllers/userController'); // Correct import
const router = express.Router();

// POST route for login
router.post('/login', userController.loginUser);

// POST route for registration (if needed)
router.post('/register', userController.registerUser);

module.exports = router;
