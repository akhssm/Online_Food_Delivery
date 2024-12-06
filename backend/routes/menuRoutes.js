const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuModel'); // Import the MenuItem model

// Create a new menu item
router.post('/', async (req, res) => {
  const { name, price, quantity, restaurantId } = req.body;

  if (!name || !price || !quantity || !restaurantId) {
    return res.status(400).json({ 
      message: 'All fields are required: name, price, quantity, and restaurantId.' 
    });
  }

  try {
    const newItem = await MenuItem.create({ name, price, quantity, restaurantId });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ 
      message: 'Failed to create menu item.', 
      error: error.message 
    });
  }
});

// Get menu items for a specific restaurant
router.get('/restaurant/:id', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.params.id });
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this restaurant.' });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items for restaurant:', error);
    res.status(500).json({ 
      message: 'Failed to fetch menu items.', 
      error: error.message 
    });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    return res.status(400).json({ 
      message: 'All fields are required: name, price, and quantity.' 
    });
  }

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ 
      message: 'Failed to update menu item.', 
      error: error.message 
    });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully.' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ 
      message: 'Failed to delete menu item.', 
      error: error.message 
    });
  }
});

module.exports = router;
