const express = require('express');
const restaurantController = require('../controllers/restaurantController')
const router = express.Router();

constrouter = express.Router();

router.post('/', reataurantController.addNewRestaurant);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/', restaurantController.getAllRestaurants);

module.exports = router;