const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Ek hi route path ('/profile') par GET aur PUT dono methods laga diye
// Dono routes par 'protect' guard laga hua hai
router.route('/profile')
    .get(protect, getUserProfile)      // Profile dekhne ke liye (GET)
    .put(protect, updateUserProfile);  // Profile update karne ke liye (PUT)

module.exports = router;