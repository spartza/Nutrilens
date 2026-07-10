const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // "Bearer token_string" se sirf token nikalna
            token = req.headers.authorization.split(' ')[1];

            // Token ko verify karna JWT_SECRET ke through
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User ko database se fetch karna (password chhod kar) aur req.user mein daalna
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Sab theek hai, aage badho
        } catch (error) {
            console.error("Auth Middleware Error:", error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };