// const mongoose = require('mongoose');

// const restaurantSchema = new mongoose.Schema({
//     name : {type: String, required: true},
//     address : {type: String, required: true},
//     rating : {type: Number, default:0},
//     imageUrl: {type: String},
//     menuItems: [{type:mongoose.Schema.Types.ObjectId, ref: 'MenuItem'}]
// })

// const Restaurant = mongoose.model('Restaurant', restaurantSchema)
// module.exports = Restaurant;

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }] // Array of references to menu items
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
