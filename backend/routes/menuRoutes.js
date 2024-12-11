const express = require('express');
const menuController = require('../controllers/menuController'); // Ensure the path is correct
const router = express.Router();

// Route to fetch all menu items for a specific restaurant
router.get('/restaurant/:id', menuController.getMenu);

// Route to add a new menu item
router.post('/restaurant/:id', menuController.addMenuItem);

// Route to update an existing menu item
router.put('/restaurant/:restaurantId/:menuItemId', menuController.updateMenuItem);

// Route to delete a menu item
router.delete('/restaurant/:restaurantId/:menuItemId', menuController.deleteMenuItem);

module.exports = router;
