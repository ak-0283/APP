const User = require('../models/User');
const HealthProfile = require('../models/HealthProfile');

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch users' });
  }
};

const getAdminOverview = async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    const profiles = await HealthProfile.find().populate('user', 'name email');

    return res.status(200).json({ users, profiles });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch admin overview' });
  }
};

module.exports = { getAllUsers, getAdminOverview };
