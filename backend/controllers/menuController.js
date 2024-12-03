const Menu = require('../models/MenuItem');

// Fetch menu items
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find(); // Fetch all menu items
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const newItem = new Menu(req.body); // Only using name, price, and quantity
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error adding menu item', error });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(
            req.params.itemId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Error updating menu item', error });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndDelete(req.params.itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error });
    }
};
