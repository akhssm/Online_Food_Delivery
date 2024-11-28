// const express = require('express')
// const connectToDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const restaurantRoute = require('./routes/restaurantRoute');

// const app = express()

// connectToDB();

// app.use(express.json())
// app.use('/api/users', userRoutes);
// app.user('/api/restaurant', restaurantRoute);

// app.get('/', (req, res) => {
//     res.status(200).send({message:'Success'})
// })

// app.listen(5000, () => {
//     console.log('Server is running on port - 5000')
// })

const express = require('express');
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const restaurantRoute = require('./routes/restaurantRoute');

const app = express();

// Connect to the database
connectToDB();

// Middleware to parse JSON requests
app.use(express.json());

// Route definitions
app.use('/api/users', userRoutes);
app.use('/api/restaurant', restaurantRoute); // Corrected from `app.user` to `app.use`

// Default route
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Success' });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port - 5000');
});
