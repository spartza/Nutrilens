const Product = require('../models/Product');
const HealthAnalysis = require('../models/HealthAnalysis');

// Get Public Product Details for Sharing
const getPublicShareDetails = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        // Product fetch karo aur uska AI analysis bhi saath mein le aao
        const product = await Product.findById(productId).populate('aiAnalysisRef');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Shared product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Public share data fetched successfully! 🌐',
            product: product
        });

    } catch (error) {
        console.error("Share Controller Error:", error.message);
        // Agar Invalid MongoDB ObjectId pass ki ho toh cast error handle karne ke liye
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid Product ID format' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { getPublicShareDetails };