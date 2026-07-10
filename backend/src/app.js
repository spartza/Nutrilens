const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middlewares/rateLimiter.middleware');

const app = express();

// 1. Basic Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiLimiter);

// 2. Route Imports
const authRoutes = require('./routes/auth.routes');
//const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const scanRoutes = require('./routes/scan.routes');
const historyRoutes = require('./routes/history.routes');
//const favoriteRoutes = require('./routes/favorite.routes');
const compareRoutes = require('./routes/compare.routes');
const shareRoutes = require('./routes/share.routes');
const userRoutes = require('./routes/user.routes');
const favoriteRoutes = require('./routes/favorite.routes');

// 3. Error Middleware Imports (Naya addition)
const { notFound } = require('./middlewares/notFound.middleware');
const { errorHandler } = require('./middlewares/error.middleware');

// 4. API Routes Mounting
app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/history', historyRoutes);
//app.use('/api/favorites', favoriteRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/share', shareRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

// 5. Basic Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'NutriLens Backend is up and running! 🚀' 
    });
});

// --- ERROR HANDLING MIDDLEWARES ---
// (Dhyan rahe: Ye hamesha sabhi routes ke aakhiri mein aate hain)

// 6. Agar upar wale kisi route se URL match nahi hua, toh NotFound trigger hoga
app.use(notFound);

// 7. Agar app mein kahin bhi error aayi, toh ErrorHandler catch karega
app.use(errorHandler);

module.exports = app;