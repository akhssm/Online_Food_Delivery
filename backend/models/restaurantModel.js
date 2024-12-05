const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
