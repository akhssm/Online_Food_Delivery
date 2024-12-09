// // controllers/cartController.js
// const Cart = require('../models/cartModel');
// const Product = require('../models/Product'); // Assuming you have a Product model

// // Get Cart for a specific user
// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Add Item to Cart
// const addItemToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   try {
//     let cart = await Cart.findOne({ userId: req.params.userId });

//     // Create a new cart if none exists for the user
//     if (!cart) {
//       cart = new Cart({ userId: req.params.userId, items: [] });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(400).json({ message: 'Product not found' });
//     }

//     // Check if the item is already in the cart
//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//     if (itemIndex >= 0) {
//       // Update quantity if item already exists
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       // Add new item to cart
//       cart.items.push({
//         productId,
//         quantity,
//         name: product.name,
//         price: product.price,
//       });
//     }

//     // Recalculate the total amount
//     cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

//     await cart.save(); // Save the updated cart
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Remove Item from Cart
// const removeItemFromCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Remove item by itemId
//     cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

//     // Recalculate the total amount
//     cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

//     await cart.save(); // Save the updated cart
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update Item Quantity
// const updateItemQuantity = async (req, res) => {
//   const { quantity } = req.body;
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     const item = cart.items.find(item => item._id.toString() === req.params.itemId);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     // Update item quantity
//     item.quantity = quantity;

//     // Recalculate the total amount
//     cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

//     await cart.save(); // Save the updated cart
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   getCart,
//   addItemToCart,
//   removeItemFromCart,
//   updateItemQuantity,
// };





const Cart = require('../models/cartModel');
const MenuItem = require('../models/menuModel'); // Import MenuItem model

// Get Cart for a specific user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.menuItemId'); // Correct field for population
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
const addItemToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body; // Using menuItemId instead of productId
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });

    // Create a new cart if none exists for the user
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    const menuItem = await MenuItem.findById(menuItemId); // Fetching menu item by ID
    if (!menuItem) {
      return res.status(400).json({ message: 'Menu item not found' });
    }

    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);
    if (itemIndex >= 0) {
      // Update quantity if the item already exists
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
};

// Remove Item from Cart
const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item by itemId (cart item ID)
    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save(); // Save the updated cart
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
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
};
