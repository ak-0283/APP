const express = require('express');
const { getAllUsers, getAdminOverview } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', protect, adminOnly, getAllUsers);
router.get('/overview', protect, adminOnly, getAdminOverview);

module.exports = router;
