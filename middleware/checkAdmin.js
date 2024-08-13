const User = require('../models/User.model');

const checkAdmin = async (req, res, next) => {
  const userId = req.payload._id; // Assuming user ID is stored in req.user

  try {
    const user = await User.findById(userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking admin role', error });
  }
};

module.exports = checkAdmin;