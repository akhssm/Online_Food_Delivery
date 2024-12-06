// menuController.js (as you already defined)
const MenuItem = require('../models/MenuItem');

// Create a new menu item
exports.addMenuItem = async (req, res) => {
  const { name, price, quantity, restaurantId } = req.body;
  if (!name || !price || !quantity || !restaurantId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newItem = new MenuItem({ name, price, quantity, restaurantId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create menu item.', error });
  }
};

// Fetch menu items for a specific restaurant
exports.getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.params.id });
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this restaurant.' });
    }
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error });
  }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};
