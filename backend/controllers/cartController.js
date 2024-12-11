const Cart = require('../models/cartModel');
const Menu = require('../models/menuModel'); // Assuming you have a Menu model

// Add or Update item in the user's cart
exports.addItemToCart = async (req, res) => {
  const { uid, menuId, name, price, quantity } = req.body;  // User ID and item details from the client

  try {
    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ uid });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        uid,
        items: [],
        totalAmount: 0,
      });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.menuId.toString() === menuId.toString());
    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({ menuId, name, price, quantity });
    }

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: 'Item added to cart successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

// Update item quantity in the cart
exports.updateItemQuantity = async (req, res) => {
  const { uid, menuId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ uid });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.menuId.toString() === menuId.toString());

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the item quantity
    item.quantity = quantity;

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      message: 'Item quantity updated successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity', error: error.message });
  }
};

// Remove item from the cart
exports.removeItemFromCart = async (req, res) => {
  const { uid, menuId } = req.body;

  try {
    const cart = await Cart.findOne({ uid });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(item => item.menuId.toString() === menuId.toString());

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      message: 'Item removed from cart successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};
