const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

// Get user info with kayaks and reviews
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('kayaks')
      .populate('reviews');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;