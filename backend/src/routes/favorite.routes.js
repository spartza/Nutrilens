const express = require('express');
const { toggleFavorite, getFavorites } = require('../controllers/favorite.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// POST request product ko favorite/unfavorite karne ke liye -> http://localhost:5000/api/favorites/toggle
router.post('/toggle', protect, toggleFavorite);

// GET request user ki saari favorite list dekhne ke liye -> http://localhost:5000/api/favorites
router.get('/', protect, getFavorites);

module.exports = router;