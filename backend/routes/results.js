const express = require('express');
const router = express.Router();
const { getResultsByCategory, getDashboardStats } = require('../controllers/resultController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/:categoryId', protect, admin, getResultsByCategory);

module.exports = router;
