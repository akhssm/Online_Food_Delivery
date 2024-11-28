const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Changed 'name' to 'username'
  password: { type: String, required: true },              // Removed 'email' and 'address'
});

const User = mongoose.model('User', userSchema); // Capitalized 'User' for model convention
module.exports = User;
