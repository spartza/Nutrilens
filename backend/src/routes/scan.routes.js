const express = require('express');
// Naya getScanHistory import kar liya
const { processProductScan, getScanHistory } = require('../controllers/scan.controller');
const { protect } = require('../middlewares/auth.middleware');
const { scanLimiter } = require('../middlewares/rateLimiter.middleware');

const router = express.Router();

// NAYA GET route (History fetch karne ke liye)
// Isko '/analyze' se upar rakhna best practice hoti hai routing mein
router.get('/history', protect, getScanHistory);

// Pehle wala POST route (New Scan ke liye)
router.post('/analyze', protect, scanLimiter, processProductScan);

module.exports = router;