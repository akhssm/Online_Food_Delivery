// const Restaurant = require('../models/restaurantModel');

// // Function to add a new restaurant
// const addNewRestaurant = async (req, res) => {
//   const { name, description, rating, imageUrl } = req.body;
//   try {
//     const newRestaurant = new Restaurant({ name, description, rating, imageUrl });
//     await newRestaurant.save();
//     res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
//   } catch (error) {
//     console.error('Error adding restaurant:', error);
//     res.status(500).json({ message: 'Error adding restaurant', error });
//   }
// };

// // **Re-declare `getAllRestaurants`:**
// const getAllRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find();
//     res.status(200).json(restaurants);
//   } catch (error) {
//     console.error('Error fetching restaurants:', error);
//     res.status(500).json({ message: 'Error fetching restaurants', error });
//   }
// };

// // Function to get a restaurant by its ID
// const getRestaurantById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant) {
//       return res.status(404).json({ message: 'Restaurant not found' });
//     }
//     res.status(200).json(restaurant);
//   } catch (error) {
//     console.error('Error fetching restaurant by ID:', error);
//     res.status(500).json({ message: 'Error fetching restaurant by ID', error });
//   }
// };

// // Export the functions
// module.exports = {
//   addNewRestaurant,
//   getAllRestaurants, // Ensure this matches the re-declared function
//   getRestaurantById,
// };



const Restaurant = require('../models/restaurantModel');

// Add a new restaurant
const addNewRestaurant = async (req, res) => {
  const { name, description, rating, imageUrl } = req.body;
  
  if (!name || !description || !rating || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRestaurant = new Restaurant({ name, description, rating, imageUrl });
    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ message: 'Error adding restaurant', error });
  }
};

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
};

// Get a restaurant by ID
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

// Update a restaurant by ID
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, rating, imageUrl } = req.body;

  if (!name || !description || !rating || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, description, rating, imageUrl },
      { new: true, runValidators: true } // Ensure updated document and validation
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error });
    }
    res.status(500).json({ message: 'Error updating restaurant', error });
  }
};

// Delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: 'Error deleting restaurant', error });
  }
};

module.exports = {
  addNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
};
