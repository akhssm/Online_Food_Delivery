// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel'); // Ensure the User model is imported correctly

// // Login user
// exports.loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username }); // Find the user by username

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Respond with success and user information (excluding sensitive data like password)
//     res.status(200).json({
//       message: 'Login successful',
//       user: { username: user.username, role: user.role }, // Exclude password from response
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

// // Registration logic
// exports.registerUser = async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     // Check if the username already exists in the database
//     const userExists = await User.findOne({ username });

//     if (userExists) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the provided details
//     const newUser = new User({
//       username,
//       password: hashedPassword, // Store the hashed password
//       role, // Store the user's role
//     });

//     // Save the new user to the database
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// };


// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel'); // Ensure the User model is imported correctly

// // Login user
// exports.loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username }); // Find the user by username

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Respond with success and user information (including userId)
//     res.status(200).json({
//       message: 'Login successful',
//       user: {
//         userId: user._id, // Include the _id in the response
//         username: user.username,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

// // Registration logic
// exports.registerUser = async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     // Check if the username already exists in the database
//     const userExists = await User.findOne({ username });

//     if (userExists) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the provided details
//     const newUser = new User({
//       username,
//       password: hashedPassword, // Store the hashed password
//       role, // Store the user's role
//     });

//     // Save the new user to the database
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// };

const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Ensure the User model is imported correctly
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique ID

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with success and user information (including userId)
    res.status(200).json({
      message: 'Login successful',
      user: {
        userId: user._id, // Include the _id in the response
        uid: user.uid, // Include the uid in the response
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Register user
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username already exists in the database
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Generate a unique UID
    const uid = uuidv4(); // Generate a unique UID

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided details and the generated uid
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'user', // If role is not provided, default to 'user'
      uid, // Set the generated uid
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        uid: newUser.uid,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};
