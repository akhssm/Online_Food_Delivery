const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cart item schema for individual items in the cart
const cartItemSchema = new Schema({
  menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

// Cart schema to store user's cart with associated items
const cartSchema = new Schema({
  uid: { type: String, required: true, unique: true }, // Linked to User's UID
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0 }, // Calculated based on cart items
});

module.exports = mongoose.model('Cart', cartSchema);
