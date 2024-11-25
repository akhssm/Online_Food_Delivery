const mongoose = require('mongoose');

const mongo_conn_str = "mongodb+srv://mandaakshay3:akshay@food-delivery.a6dvh.mongodb.net/food-delivery?retryWrites=true&w=majority&appName=food-delivery";

const connectToDB = async () => {
    try {
        await mongoose.connect(mongo_conn_str, {
            useNewUrlParser: true,
            useUnifiedTopology: true // Corrected `True` to `true`
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('MongoDB connection error: ', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToDB;
