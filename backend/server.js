require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoute');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Import cartRoutes

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001
const MONGO_URI = process.env.MONGO_URI; // Use MongoDB URI from .env

// Check if MONGO_URI is missing
if (!MONGO_URI) {
  console.error('MongoDB URI is not provided in the environment variables!');
  process.exit(1); // Exit the process if MONGO_URI is not set
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes); // Use cart routes for cart functionality

// Seed a menu item (for testing purposes)
const seedMenu = async () => {
  const MenuItem = require('./models/menuModel'); // Adjust the path as needed
  try {
    const menuItem = new MenuItem({
      restaurantId: '64b4f2d7b45a2e0011223344', // Replace with a valid restaurant ID
      name: 'Sample Dish',
      price: 10.99,
      quantity: 50,
    });
    await menuItem.save();
    console.log('Test menu item seeded successfully');
  } catch (error) {
    console.error('Error seeding menu item:', error.message);
  }
};

// Start the server and seed the test menu item
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await seedMenu(); // Comment this out after the first run
});
