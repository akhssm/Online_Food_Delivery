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

// Route to add a new restaurant and its menu items
router.post('/', restaurantController.addNewRestaurant);

// Route to get a restaurant by its ID along with its menu items
router.get('/:id', restaurantController.getRestaurantById);

// Route to get all restaurants (optional)
router.get('/', restaurantController.getAllRestaurants);

module.exports = router;
