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

const MenuItem = require('../models/menuItemModel'); // Import MenuItem model
const Restaurant = require('../models/restaurantModel'); // Import Restaurant model

// Add a new restaurant along with its menu items
exports.addNewRestaurant = async (req, res) => {
    const { name, address, rating, imageUrl, menuItems } = req.body;
    
    try {
        // Create and save the new restaurant
        const newRestaurant = new Restaurant({ name, address, rating, imageUrl });
        await newRestaurant.save();

        // Insert the menu items into the menuItems collection
        const menuItemDocs = await MenuItem.insertMany(
            menuItems.map(item => ({
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: item.quantity, // Corrected 'quantity:item,' to 'quantity:item.quantity'
                restaurant: newRestaurant._id // Link menu item to the new restaurant
            }))
        );

        // Update the restaurant's menuItems field with the inserted menu items' ObjectIds
        newRestaurant.menuItems = menuItemDocs.map(item => item._id);
        await newRestaurant.save(); // Save the updated restaurant

        // Return the response with the newly created restaurant and its menu items
        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant: newRestaurant,
            menuItems: menuItemDocs
        });
    } catch (error) {
        // Handle errors and return a response
        res.status(500).json({
            message: "Mongo DB is down, please try again later",
            error: error.message
        });
    }
};

// Get a restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        // Find the restaurant by its ID and populate the menuItems
        const restaurant = await Restaurant.findById(restaurantId).populate('menuItems');
        
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({
            message: "Mongo DB is down, please try again later",
            error: error.message
        });
    }
};

// Get all restaurants (optional)
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('menuItems'); // Populate menu items
        
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({
            message: "Mongo DB is down, please try again later",
            error: error.message
        });
    }
};
