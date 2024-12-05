// // routes/restaurantRoute.js
// const express = require('express');
// const restaurantController = require('../controllers/restaurantController');
// const router = express.Router();

// // Route to add a new restaurant
// router.post('/', restaurantController.addNewRestaurant);

// // Route to get all restaurants
// router.get('/', restaurantController.getAllRestaurants);

// // Route to get a restaurant by its ID
// router.get('/:id', restaurantController.getRestaurantById);

// module.exports = router;



const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const router = express.Router();

// Route to add a new restaurant
router.post('/', restaurantController.addNewRestaurant);

// Route to get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Route to get a restaurant by its ID
router.get('/:id', restaurantController.getRestaurantById);

// Route to update a restaurant by its ID (PUT)
router.put('/:id', restaurantController.updateRestaurant);  // Corrected method name

// Route to delete a restaurant by its ID (DELETE)
router.delete('/:id', restaurantController.deleteRestaurant);  // Corrected method name

module.exports = router;

