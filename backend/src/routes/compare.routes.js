const express = require('express');
const { compareProducts, getComparisonHistory } = require('../controllers/compare.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// POST request for new comparison -> http://localhost:5000/api/compare
router.post('/', protect, compareProducts);

// GET request for comparison history -> http://localhost:5000/api/compare/history
router.get('/history', protect, getComparisonHistory);

module.exports = router;