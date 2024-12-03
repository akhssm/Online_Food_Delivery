const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Ensure the User model is imported correctly

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

    // Respond with success and user information (excluding sensitive data like password)
    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, role: user.role }, // Exclude password from response
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Registration logic
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username already exists in the database
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided details
    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
      role, // Store the user's role
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};
