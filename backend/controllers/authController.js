const jwt = require('jsonwebtoken');

// Login User Function
exports.loginUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Generate a token (use a secret from environment variables)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Simple Login Route
exports.login = (req, res) => {
    res.status(200).json({ message: 'Login successful' });
};

// Simple Signup Route
exports.signup = (req, res) => {
    res.status(201).json({ message: 'Signup successful' });
};