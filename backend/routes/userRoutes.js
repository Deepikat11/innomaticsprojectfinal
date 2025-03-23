const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is created in models/User.js

// POST /api/v1/user/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;


// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }
  
      res.json({ success: true, message: 'Login successful', userId: user._id, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  