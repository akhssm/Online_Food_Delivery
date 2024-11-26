// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// POST route for login
router.post('/login', userController.loginUser);

module.exports = router;
