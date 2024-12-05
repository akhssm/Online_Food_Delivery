const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true }  // Ensure this is correctly defined
});

// Export the model
module.exports = mongoose.model('Restaurant', restaurantSchema);
