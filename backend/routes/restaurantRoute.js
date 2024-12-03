// const express = require('express');
// const restaurantController = require('../controllers/restaurantController')
// const router = express.Router();

// constrouter = express.Router();

// router.post('/', reataurantController.addNewRestaurant);
// router.get('/:id', restaurantController.getRestaurantById);
// router.get('/', restaurantController.getAllRestaurants);

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

module.exports = router;

