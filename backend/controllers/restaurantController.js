const { menuitem } = require('framer-motion/client');
const Restaurant = require('../models/restaurantModel');


exports.addNewRestaurant = async (req, res) => {
    const {name, address, rating, imageUrl, menuItems} = req.body;
     try {
    const newRestaurant = new Restaurant({name, address, rating, imageUrl});
    await newRestaurant.save();

    const menuItemDocs = await menuitem.insertMany(
        menuItems.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: quantity,item,
            restaurant: newRestaurant._id
        }))
    );

    newRestaurant.menuItems = menuItemDocs.map(item => item._id);
    await newRestaurant.save();

    res.status(201).json({
        message: "Restaurant created successfully",
        restaurant: newRestaurant,
        menuItems: menuItemDocs
    });
     } catch (error) {
        res.status(500).json({message: "Mongo DB is down, please try again later", error})
     }
}

exports.getRestaurantById = async (req, res) =>{
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({message: "Mongo DB is down, please try again later", error}) 
    } 
}