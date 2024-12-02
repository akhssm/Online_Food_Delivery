const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Fetch all menu items for a restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.params.restaurantId });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  const { restaurantId, name, price, quantity, description } = req.body;

  try {
    const newItem = new MenuItem({
      restaurantId,
      name,
      price,
      quantity,
      description,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  const { name, price, quantity, description } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, description },
      { new: true }
    );

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
