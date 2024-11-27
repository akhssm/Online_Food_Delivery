// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const authRoutes = require('./Components/authRoutes'); // Adjust the path as needed

// const app = express();
// const PORT = process.env.PORT || 5001; // Use PORT from .env or fallback to 5001

// // CORS middleware (allow requests from multiple origins for development)
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow multiple frontend origins
//   methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
//   credentials: true, // Include credentials if needed (e.g., for cookies)
// }));

// // Body parser middleware for JSON requests
// app.use(bodyParser.json());

// // Example route to test if the backend is working
// app.get('/test', (req, res) => {
//   res.json({ message: 'Backend is working!' });
// });

// // Use authentication routes (adjust the path as necessary)
// app.use('/auth', authRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes using CommonJS

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS with specific origins and credentials
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow requests from these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Test route to check if the backend is running
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Use routes for user-related operations
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
