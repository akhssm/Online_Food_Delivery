const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuModel');

// Fetch all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found' });
    }
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching menu items', details: err.message });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  const { name, price, quantity } = req.body;

  // Input validation
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'All fields (name, price, quantity) are required' });
  }

  try {
    const newItem = new MenuItem({
      name,
      price,
      quantity,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error adding menu item', details: err.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;

  // Ensure at least one field is updated
  if (!name && !price && !quantity) {
    return res.status(400).json({ message: 'At least one field (name, price, quantity) is required for update' });
  }

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Error updating menu item', details: err.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully', deletedItem });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting menu item', details: err.message });
  }
});

module.exports = router;
