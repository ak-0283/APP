const express = require('express');
const {
  upsertProfile,
  getMyProfile,
  getAllProfiles,
} = require('../controllers/profileController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.post('/', protect, upsertProfile);
router.get('/all', protect, adminOnly, getAllProfiles);

module.exports = router;
