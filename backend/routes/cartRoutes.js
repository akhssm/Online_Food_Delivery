const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to the user's cart
router.post('/add', cartController.addItemToCart);

// Update item quantity in the cart
router.put('/update', cartController.updateItemQuantity);

// Remove item from the cart
router.delete('/remove', cartController.removeItemFromCart);

module.exports = router;
