// routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/cartModel');
const Menu = require('../models/menuModel');  // Assuming Menu model exists
const router = express.Router();

// Helper function to calculate the total cost
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);
};

// Add or update item in the cart
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { menuId, quantity } = req.body;  // Menu item id and quantity

  try {
    // Find the menu item to get the price
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If no cart exists, create one
      cart = new Cart({ userId, items: [], total: 0 });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find(item => item.menuId.toString() === menuId);
    if (existingItem) {
      // Update quantity if the item already exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({
        menuId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: quantity || 1,
      });
    }

    // Recalculate total
    cart.total = calculateTotal(cart.items);

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding item to the cart' });
  }
});

// Get cart by userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.menuId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving the cart' });
  }
});

// Update item quantity in the cart
router.put('/:userId/:menuId', async (req, res) => {
  const { userId, menuId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.menuId.toString() === menuId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity
    item.quantity = Math.max(quantity, 1);

    // Recalculate the total
    cart.total = calculateTotal(cart.items);

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating cart item' });
  }
});

// Remove item from the cart
router.delete('/:userId/:menuId', async (req, res) => {
  const { userId, menuId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.menuId.toString() !== menuId);

    // Recalculate the total
    cart.total = calculateTotal(cart.items);

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

module.exports = router;
