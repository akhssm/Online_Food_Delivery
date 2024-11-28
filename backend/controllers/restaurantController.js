// const { menuitem } = require('framer-motion/client');
// const Restaurant = require('../models/restaurantModel');


// exports.addNewRestaurant = async (req, res) => {
//     const {name, address, rating, imageUrl, menuItems} = req.body;
//      try {
//     const newRestaurant = new Restaurant({name, address, rating, imageUrl});
//     await newRestaurant.save();

//     const menuItemDocs = await menuitem.insertMany(
//         menuItems.map(item => ({
//             name: item.name,
//             description: item.description,
//             price: item.price,
//             quantity: quantity,item,
//             restaurant: newRestaurant._id
//         }))
//     );

//     newRestaurant.menuItems = menuItemDocs.map(item => item._id);
//     await newRestaurant.save();

//     res.status(201).json({
//         message: "Restaurant created successfully",
//         restaurant: newRestaurant,
//         menuItems: menuItemDocs
//     });
//      } catch (error) {
//         res.status(500).json({message: "Mongo DB is down, please try again later", error})
//      }
// }

// exports.getRestaurantById = async (req, res) =>{
//     try {
//         const restaurantId = req.params.id;
//         const restaurant = await Restaurant.findById(restaurantId);
//         res.status(200).json(restaurant);
//     } catch (error) {
//         res.status(500).json({message: "Mongo DB is down, please try again later", error}) 
//     } 
// }

const Restaurant = require('../models/restaurantModel'); // Import Restaurant model

// Add a new restaurant
exports.addNewRestaurant = async (req, res) => {
    const { name, rating, imageUrl, description } = req.body;
    
    // Basic validation
    if (!name || !rating || !imageUrl || !description) {
        return res.status(400).json({ message: 'Name, rating, imageUrl, and description are required' });
    }

    try {
        // Create and save the new restaurant
        const newRestaurant = new Restaurant({ name, rating, imageUrl, description });
        await newRestaurant.save();

        // Return the response with the newly created restaurant
        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant: newRestaurant
        });
    } catch (error) {
        // Handle errors and return a response
        res.status(500).json({
            message: "Error in adding the restaurant, please try again later",
            error: error.message
        });
    }
};

// Get a restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        // Find the restaurant by its ID
        const restaurant = await Restaurant.findById(restaurantId);
        
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching the restaurant, please try again later",
            error: error.message
        });
    }
};

// Get all restaurants (optional)
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); // Get all restaurants
        
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching the restaurants, please try again later",
            error: error.message
        });
    }
};

