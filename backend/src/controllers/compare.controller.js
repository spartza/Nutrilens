const Comparison = require('../models/Comparison');
const Product = require('../models/Product');
const History = require('../models/history.model');

// Compare Multiple Products
const compareProducts = async (req, res) => {
    try {
        const { productIds } = req.body;

        // Validation: Kam se kam 2 products hone chahiye comparison ke liye
        if (!productIds || productIds.length < 2) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide at least two product IDs to compare ⚖️' 
            });
        }

        // Database se un saare products ko unke AI Analysis ke saath fetch karo
        const productsFromDB = await Product.find({ _id: { $in: productIds } })
            .populate('aiAnalysisRef');

        const historyFromDB = await History.find({ _id: { $in: productIds } });

        // Map history documents to match product schema
        const mappedHistory = historyFromDB.map(h => ({
            _id: h._id,
            name: h.productName,
            brand: 'Manual Scan Log',
            healthScore: h.healthScore,
            grade: h.grade,
            ingredientsText: h.ingredientsText || '',
            aiAnalysisRef: {
                summary: h.analysis?.summary,
                positives: h.analysis?.positives,
                negatives: h.analysis?.negatives,
                additivesFlagged: h.analysis?.additives || [],
                recommendation: h.analysis?.recommendation
            },
            extracted_macros: h.analysis?.macros || {}
        }));

        const productsMap = {};
        productsFromDB.forEach(p => {
            productsMap[p._id.toString()] = p;
        });
        mappedHistory.forEach(h => {
            productsMap[h._id.toString()] = h;
        });

        const orderedProducts = productIds
            .map(id => productsMap[id.toString()])
            .filter(Boolean);

        // Agar koi ID galat hai ya scan nahi hui pehle
        if (orderedProducts.length !== productIds.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'One or more products not found in database. Please scan them first.' 
            });
        }

        // Comparison history save karo
        const comparisonRecord = await Comparison.create({
            user: req.user._id,
            products: productIds
        });

        res.status(200).json({
            success: true,
            message: 'Comparison successful! 🚀',
            comparisonId: comparisonRecord._id,
            products: orderedProducts
        });

    } catch (error) {
        console.error("Comparison Error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get User's Comparison History
const getComparisonHistory = async (req, res) => {
    try {
        const history = await Comparison.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        const populatedHistory = await Promise.all(history.map(async (record) => {
            const productIds = record.products;
            
            const productsFromDB = await Product.find({ _id: { $in: productIds } })
                .populate('aiAnalysisRef');
            const historyFromDB = await History.find({ _id: { $in: productIds } });
            
            const mappedHistory = historyFromDB.map(h => ({
                _id: h._id,
                name: h.productName,
                brand: 'Manual Scan Log',
                healthScore: h.healthScore,
                grade: h.grade,
                ingredientsText: h.ingredientsText || '',
                aiAnalysisRef: {
                    summary: h.analysis?.summary,
                    positives: h.analysis?.positives,
                    negatives: h.analysis?.negatives,
                    additivesFlagged: h.analysis?.additives || [],
                    recommendation: h.analysis?.recommendation
                },
                extracted_macros: h.analysis?.macros || {}
            }));

            const productsMap = {};
            productsFromDB.forEach(p => {
                productsMap[p._id.toString()] = p;
            });
            mappedHistory.forEach(h => {
                productsMap[h._id.toString()] = h;
            });

            const orderedProducts = productIds
                .map(id => productsMap[id.toString()])
                .filter(Boolean);

            const recordObj = record.toObject();
            recordObj.products = orderedProducts;
            return recordObj;
        }));

        res.status(200).json({
            success: true,
            count: populatedHistory.length,
            comparisons: populatedHistory
        });
    } catch (error) {
        console.error("Comparison History Error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { compareProducts, getComparisonHistory };