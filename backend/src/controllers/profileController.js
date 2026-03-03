const HealthProfile = require('../models/HealthProfile');

const upsertProfile = async (req, res) => {
  try {
    const { diabetes, highBloodPressure, highCholesterol, allergies, calorieGoal } = req.body;

    const profile = await HealthProfile.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        diabetes: Boolean(diabetes),
        highBloodPressure: Boolean(highBloodPressure),
        highCholesterol: Boolean(highCholesterol),
        allergies: allergies || '',
        calorieGoal: Number(calorieGoal) || 2000,
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(200).json({ message: 'Health profile saved', profile });
  } catch (error) {
    return res.status(500).json({ message: 'Could not save profile' });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user._id });
    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch profile' });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await HealthProfile.find().populate('user', 'name email role');
    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch all profiles' });
  }
};

module.exports = { upsertProfile, getMyProfile, getAllProfiles };
