const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0 }, // Updated to match logic in cartController.js
});

module.exports = mongoose.model('Cart', cartSchema);
