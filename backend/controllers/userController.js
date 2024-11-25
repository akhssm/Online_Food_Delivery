const User = require('../models/userModel');

exports.login = async (req, res) => {
    const {name, email, password, address} = req.body;
    
    const newUser = new User ({
        name,
        email,
        password,
        address
    })

    await newUser.save();
    
    res.status(200).json({message:'Gotchal!'});
}
