const rateLimit = require('express-rate-limit');

// 1. General API Limiter: Poori app ke liye ek basic limit
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes ka time window
    max: 100, // 15 minute mein max 100 requests per IP
    message: { 
        success: false, 
        message: 'Too many requests from this IP, please try again after 15 minutes ⏳' 
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// 2. Strict AI/Scan Limiter: Gemini API ko spam se bachane ke liye
const scanLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute ka time window
    max: 10, // 1 minute mein max 10 scan allowed hain per IP
    message: { 
        success: false, 
        message: 'Whoa! Slow down bhai. Max 10 scans per minute allowed. 🛑' 
    }
});

module.exports = { apiLimiter, scanLimiter };