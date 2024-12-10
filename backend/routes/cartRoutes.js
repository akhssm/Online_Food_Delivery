const express = require('express');
const router = express.Router();
const {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} = require('../controllers/cartController');

// Route to get the cart for a specific user
router.get('/:userId', getCart);

// Route to add an item to the cart
router.post('/:userId', addItemToCart);

// Route to remove an item from the cart
router.delete('/:userId/:itemId', removeItemFromCart);

// Route to update the quantity of an item in the cart
router.put('/:userId/:itemId', updateItemQuantity);

module.exports = router;
