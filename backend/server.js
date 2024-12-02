require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoute'); // Import restaurant routes

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001
const MONGO_URI = process.env.MONGO_URI; // Use MongoDB URI from .env

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
app.use('/api/restaurants', restaurantRoutes); // Use restaurant routes

// Seed a restaurant (for testing purposes)
const seedRestaurant = async () => {
  const Restaurant = require('./models/restaurantModel'); // Adjust the path as needed
  try {
    const restaurant = new Restaurant({
      name: 'Sample Restaurant',
      description: 'A test restaurant for seeding purposes',
      rating: 4.2,
      imageUrl: 'https://example.com/sample-restaurant.jpg',
    });
    await restaurant.save();
    console.log('Test restaurant seeded successfully');
  } catch (error) {
    console.error('Error seeding test restaurant:', error.message);
  }
};

// Start the server and seed the test restaurant
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await seedRestaurant(); // Comment this out after the first run
});
