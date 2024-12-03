const express = require('express');
const Cart = require('../models/cartModel'); // Import the Cart model
const MenuItem = require('../models/menuModel'); // Import the MenuItem model instead of Product
const router = express.Router();

// Get Cart for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.menuItemId'); // Populating the correct field
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Item to Cart
router.post('/:userId', async (req, res) => {
  const { menuItemId, quantity } = req.body; // Changed productId to menuItemId
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });

    // Create a new cart if none exists for the user
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    const menuItem = await MenuItem.findById(menuItemId); // Find menu item by ID
    if (!menuItem) return res.status(400).json({ message: 'Menu item not found' });

    // Check if the item is already in the cart
    const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);
    if (itemIndex >= 0) {
      // Update quantity if item already exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        menuItemId,
        quantity,
        name: menuItem.name,
        price: menuItem.price,
      });
    }

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save(); // Save the updated cart
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove Item from Cart
router.delete('/:userId/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Remove item by itemId
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save(); // Save the updated cart
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Item Quantity
router.put('/:userId/:itemId', async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item._id.toString() === req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Update item quantity
    item.quantity = quantity;

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save(); // Save the updated cart
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
