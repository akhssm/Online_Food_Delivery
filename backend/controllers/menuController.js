const Menu = require('../models/Menu');

// Fetch menu items for a restaurant
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find({ restaurantId: req.params.restaurantId });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const newItem = new Menu({ ...req.body, restaurantId: req.params.restaurantId });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error adding menu item', error });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Error updating menu item', error });
    }
};
