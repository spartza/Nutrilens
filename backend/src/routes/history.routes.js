const express = require('express');
const { getUserHistory } = require('../controllers/history.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// GET request for fetching history -> http://localhost:5000/api/history
router.get('/', protect, getUserHistory);

module.exports = router;