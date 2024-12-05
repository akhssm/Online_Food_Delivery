// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes'); // Adjust if needed

// const app = express();

// // Middleware
// app.use(express.json()); // Parse JSON bodies
// app.use(cors()); // Allow CORS for frontend requests

// // MongoDB connection
// mongoose
//   .connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected To MongoDB Successfully');
//   })
//   .catch((err) => {
//     console.log('MongoDB connection error:', err);
//   });

// // Routes
// app.use('/api/user', userRoutes); // Use the userRoutes for any /api/user requests

// // Test Route
// app.get('/test', (req, res) => {
//   res.send('Backend is working!');
// });

// // Error handling for unhandled routes
// app.use((req, res) => {
//   res.status(404).send({ message: 'Route not found' });
// });

// // Server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoute');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Test route
app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
