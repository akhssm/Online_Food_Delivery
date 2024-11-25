const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name : {type: String, required: true},
    address : {type: String, required: true},
    rating : {type: Number, default:0},
    imageUrl: {type: String},
    menuItems: [{type:mongoose.Schema.Types.ObjectId, ref: 'MenuItem'}]
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant;