// // routes/cartRoutes.js
// const express = require('express');
// const Cart = require('../models/cartModel');
// const Menu = require('../models/menuModel');  // Assuming Menu model exists
// const router = express.Router();

// // Helper function to calculate the total cost
// const calculateTotal = (items) => {
//   return items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);
// };

// // Add or update item in the cart
// router.post('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { menuId, quantity } = req.body;  // Menu item id and quantity

//   try {
//     // Find the menu item to get the price
//     const menuItem = await Menu.findById(menuId);
//     if (!menuItem) {
//       return res.status(404).json({ message: 'Menu item not found' });
//     }

//     // Find the user's cart
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       // If no cart exists, create one
//       cart = new Cart({ userId, items: [], total: 0 });
//     }

//     // Check if item already exists in the cart
//     const existingItem = cart.items.find(item => item.menuId.toString() === menuId);
//     if (existingItem) {
//       // Update quantity if the item already exists
//       existingItem.quantity += quantity;
//     } else {
//       // Add new item to the cart
//       cart.items.push({
//         menuId,
//         name: menuItem.name,
//         price: menuItem.price,
//         quantity: quantity || 1,
//       });
//     }

//     // Recalculate total
//     cart.total = calculateTotal(cart.items);

//     // Save the updated cart
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error adding item to the cart' });
//   }
// });

// // Get cart by userId
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await Cart.findOne({ userId }).populate('items.menuId');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.status(200).json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving the cart' });
//   }
// });

// // Update item quantity in the cart
// router.put('/:userId/:menuId', async (req, res) => {
//   const { userId, menuId } = req.params;
//   const { quantity } = req.body;

//   try {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     const item = cart.items.find(item => item.menuId.toString() === menuId);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found in cart' });
//     }

//     // Update the quantity
//     item.quantity = Math.max(quantity, 1);

//     // Recalculate the total
//     cart.total = calculateTotal(cart.items);

//     // Save the updated cart
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating cart item' });
//   }
// });

// // Remove item from the cart
// router.delete('/:userId/:menuId', async (req, res) => {
//   const { userId, menuId } = req.params;

//   try {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Remove the item from the cart
//     cart.items = cart.items.filter(item => item.menuId.toString() !== menuId);

//     // Recalculate the total
//     cart.total = calculateTotal(cart.items);

//     // Save the updated cart
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error removing item from cart' });
//   }
// });

// module.exports = router;










const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cartModel'); // Assuming the cart model is set up
const Menu = require('../models/menuModel'); // Assuming the menu model is set up

const router = express.Router();

// Helper function to calculate the total cost of the cart
const calculateTotal = (items) =>
  items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);

// Validate ObjectId format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get cart by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add or update an item in the cart
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { menuId, quantity } = req.body;

  if (!isValidObjectId(userId) || !isValidObjectId(menuId)) {
    return res.status(400).json({ message: 'Invalid user ID or menu ID format' });
  }
  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  try {
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find((item) => item.menuId.toString() === menuId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        menuId,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
      });
    }

    cart.total = calculateTotal(cart.items);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update the quantity of a cart item
router.put('/:userId/:menuId', async (req, res) => {
  const { userId, menuId } = req.params;
  const { quantity } = req.body;

  if (!isValidObjectId(userId) || !isValidObjectId(menuId)) {
    return res.status(400).json({ message: 'Invalid user ID or menu ID format' });
  }
  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.menuId.toString() === menuId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;

    cart.total = calculateTotal(cart.items);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error updating item quantity:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove an item from the cart
router.delete('/:userId/:menuId', async (req, res) => {
  const { userId, menuId } = req.params;

  if (!isValidObjectId(userId) || !isValidObjectId(menuId)) {
    return res.status(400).json({ message: 'Invalid user ID or menu ID format' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.menuId.toString() === menuId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    cart.total = calculateTotal(cart.items);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Clear the cart
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
