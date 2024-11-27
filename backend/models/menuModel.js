// const mongoose = require('mongoose');

// const menuItemSchema = new mongoose.Schema({
//     name : {type: String, required: true},
//     description: {type: String,},
//     price: {type:Number, required: true},
//     restaurant : {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true}
// })

// const MenuItem = mongoose.model('MenuItem', menuItemSchema);
// module.exports = MenuItem;

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' } // Reference to the Restaurant
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
