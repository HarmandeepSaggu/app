const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router(); // Create an Express Router instance

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username'); // Fetch all users, selecting only the username field
    res.json(users.map(user => user.username)); // Return an array of usernames
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;