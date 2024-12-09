// models/Payment.js

const mongoose = require('mongoose');

// Define the schema for payment details
const paymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true }
});

// Create and export the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
