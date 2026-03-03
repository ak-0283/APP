const express = require('express');
const { getMenu, getRecommendations } = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMenu);
router.get('/recommendations', protect, getRecommendations);

module.exports = router;
