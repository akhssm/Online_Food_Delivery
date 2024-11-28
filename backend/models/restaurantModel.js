const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, // Description field
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
