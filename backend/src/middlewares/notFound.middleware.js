// Ye middleware tab chalega jab koi aisa route hit ho jo humne app.js mein define nahi kiya hai
const notFound = (req, res, next) => {
    const error = new Error(`Route Not Found - ${req.originalUrl} 🚫`);
    res.status(404);
    // Error ko aage error handler ke paas bhej do
    next(error);
};

module.exports = { notFound };