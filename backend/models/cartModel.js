// models/cartModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },  // Referencing Menu model
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },  // Assuming you have a User model
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);
