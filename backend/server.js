require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001
const MONGO_URI = process.env.MONGO_URI; // Use MongoDB URI from .env

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);

// Seed a user with a hashed password (for testing purposes)
const seedUser = async () => {
  const User = require('./models/userModel'); // Adjust the path as needed
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      username: 'testuser',
      password: hashedPassword,
    });
    await user.save();
    console.log('Test user seeded successfully');
  } catch (error) {
    console.error('Error seeding test user:', error.message);
  }
};

// Start the server and seed the test user
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await seedUser(); // Comment this out after the first run
});
