const express = require('express');
const userController = require('../controllers/userController'); // Correct import
const router = express.Router();

// POST route for login
router.post('/login', userController.loginUser);

module.exports = router;
