const MENU_ITEMS = require('../utils/menuData');
const { buildRecommendations } = require('../utils/recommendationEngine');
const HealthProfile = require('../models/HealthProfile');

const getMenu = async (_req, res) => {
  return res.status(200).json({ menu: MENU_ITEMS });
};

const getRecommendations = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res
        .status(404)
        .json({ message: 'Health profile not found. Please complete your profile first.' });
    }

    const result = buildRecommendations(MENU_ITEMS, profile);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Could not generate recommendations' });
  }
};

module.exports = { getMenu, getRecommendations };
