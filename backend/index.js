const express = require('express')
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const restaurantRoute = require('./routes/restaurantRoute');

const app = express()

connectToDB();

app.use(express.json())
app.use('/api/users', userRoutes);
app.user('/api/restaurant', restaurantRoute);

app.get('/', (req, res) => {
    res.status(200).send({message:'Success'})
})

app.listen(5000, () => {
    console.log('Server is running on port - 5000')
})