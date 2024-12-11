const MenuItem = require('../models/menuModel'); // Assuming you have a MenuItem model

// Fetch menu items for a specific restaurant
exports.getMenu = async (req, res) => {
  try {
    const { id: restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    const menuItems = await MenuItem.find({ restaurantId });
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).send('Server Error');
  }
};

// Add a new menu item to the restaurant
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const restaurantId = req.params.id;

    // Create a new menu item
    const newMenuItem = new MenuItem({
      name,
      price,
      quantity,
      restaurantId
    });

    // Save the new item
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).send('Server Error');
  }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuItemId } = req.params; // Get both restaurantId and menuItemId from params
    const { name, price, quantity } = req.body;

    // Find the menu item by its ID and restaurant ID, then update it
    const updatedMenuItem = await MenuItem.findOneAndUpdate(
      { _id: menuItemId, restaurantId }, // Match both IDs
      { name, price, quantity },
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return res.status(404).send('Menu item not found');
    }

    res.json(updatedMenuItem); // Send back the updated menu item
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).send('Server Error');
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuItemId } = req.params; // Get both restaurantId and menuItemId from params

    // Find and delete the menu item for the specific restaurant
    const deletedMenuItem = await MenuItem.findOneAndDelete({
      _id: menuItemId,
      restaurantId: restaurantId  // Ensure the deletion is for the specific restaurant
    });

    if (!deletedMenuItem) {
      return res.status(404).send('Menu item not found');
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).send('Server Error');
  }
};

