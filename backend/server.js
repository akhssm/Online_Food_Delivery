// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const userRoutes = require('./routes/userRoutes');
// const restaurantRoutes = require('./routes/restaurantRoute');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB Successfully'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/user', userRoutes);
// app.use('/api/restaurants', restaurantRoutes);

// // Test route
// app.get('/test', (req, res) => {
//   res.send('Backend is working!');
// });

// // Error handling
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Server setup
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoute');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes); // Use payment routes

// Test route (for quick checks)
app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

// Error handling for undefined routes
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Server setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
