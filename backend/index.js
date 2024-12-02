const express = require('express');
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes'); // Consistent naming
const menuRoutes = require('./routes/menuRoutes'); // New route for menu management

const app = express();

// Connect to the database
connectToDB();

// Middleware to parse JSON requests
app.use(express.json());

// Route definitions
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes); // Updated plural naming for REST convention
app.use('/api/menus', menuRoutes); // Menu-related routes

// Default route
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Success' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
