// paymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel'); // Make sure your Payment model is correctly set up

// POST route for saving payment details
router.post('/', async (req, res) => {
  try {
    // Get payment data from request body
    const { cardNumber, expirationDate, cvv, phoneNumber, address } = req.body;

    // Create a new payment document
    const newPayment = new Payment({
      cardNumber,
      expirationDate,
      cvv,
      phoneNumber,
      address,
    });

    // Save the payment document to MongoDB
    const savedPayment = await newPayment.save();

    // Return success response
    res.status(201).json({
      message: 'Payment details saved successfully',
      payment: savedPayment,
    });
  } catch (err) {
    console.error('Error saving payment details:', err);
    res.status(500).json({ message: 'Failed to save payment details' });
  }
});

module.exports = router;
