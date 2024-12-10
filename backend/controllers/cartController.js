const Cart = require('../models/cartModel');
const MenuItem = require('../models/menuModel');

// Helper function to calculate the total cost of the cart
const calculateTotal = (items) =>
  items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);

// Get Cart for a specific user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.menuId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add Item to Cart
const mongoose = require('mongoose');

const addItemToCart = async (req, res) => {
  const { menuId, quantity, name, price } = req.body;
  const userId = req.params.userId.trim(); // Trim whitespace

  // Validate userId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    // Create a new cart if none exists for the user
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const menuItem = { _id: menuId, name, price }; // Mocking Menu item for testing purposes
    if (!menuItem) {
      return res.status(400).json({ message: 'Menu item not found' });
    }

    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.menuId.toString() === menuId);
    if (itemIndex >= 0) {
      // Update quantity if the item already exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        menuId,
        quantity,
        name: menuItem.name,
        price: menuItem.price,
      });
    }

    // Recalculate the total amount
    cart.totalAmount = calculateTotal(cart.items);

    await cart.save(); // Save the updated cart
    res.json(cart);
  } catch (err) {
    console.error('Error while adding item to cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Remove Item from Cart
const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    cart.items.splice(itemIndex, 1);
    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Item Quantity
const updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item._id.toString() === req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;
    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
};
