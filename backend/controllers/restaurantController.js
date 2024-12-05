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

const Restaurant = require('../models/restaurantModel');

// Function to add a new restaurant
const addNewRestaurant = async (req, res) => {
  const { name, description, rating, imageUrl } = req.body;
  try {
    const newRestaurant = new Restaurant({ name, description, rating, imageUrl });
    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ message: 'Error adding restaurant', error });
  }
};

// **Re-declare `getAllRestaurants`:**
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
};

// Function to get a restaurant by its ID
const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error);
    res.status(500).json({ message: 'Error fetching restaurant by ID', error });
  }
};

// Export the functions
module.exports = {
  addNewRestaurant,
  getAllRestaurants, // Ensure this matches the re-declared function
  getRestaurantById,
};