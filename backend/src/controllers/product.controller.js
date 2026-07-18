const { getProductByBarcode } = require('../services/product.service');
const History = require('../models/history.model');

const getProductDetails = async (req, res) => {
    try {
        const { barcode } = req.params;

        if (!barcode) {
            return res.status(400).json({ success: false, message: 'Barcode is required' });
        }

        const product = await getProductByBarcode(barcode);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found in any database' });
        }

        // Save to History (if user is authenticated)
        if (req.user && req.user._id) {
            // Avoid duplicate scan entries on quick refreshes (within last 10 seconds)
            const lastHistory = await History.findOne({ user: req.user._id }).sort({ createdAt: -1 });
            const isDuplicate = lastHistory && 
                lastHistory.productName === product.name && 
                (Date.now() - new Date(lastHistory.createdAt).getTime() < 10000);

            if (!isDuplicate) {
                let grade = product.grade;
                if (!grade) {
                    const getGradeFromScore = (score) => {
                        if (score >= 80) return 'A';
                        if (score >= 65) return 'B';
                        if (score >= 50) return 'C';
                        if (score >= 35) return 'D';
                        return 'E';
                    };
                    grade = getGradeFromScore(product.healthScore || 50);
                }

                const analysis = product.aiAnalysisRef || {};
                await History.create({
                    user: req.user._id,
                    productName: product.name,
                    healthScore: product.healthScore || 50,
                    grade: grade,
                    analysis: {
                        summary: analysis.summary || "No AI analysis summary available",
                        positives: analysis.positives || [],
                        negatives: analysis.negatives || [],
                        additives: (analysis.additivesFlagged || []).map(add => ({
                            name: add.name,
                            riskLevel: add.riskLevel,
                            reason: add.reason
                        })),
                        recommendation: analysis.recommendation || "",
                        macros: analysis.extracted_macros || {}
                    }
                });
                console.log(`Scan history successfully logged for product: ${product.name}`);
            }
        }

        res.status(200).json({
            success: true,
            product: product
        });

    } catch (error) {
        console.error("Product Controller Error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { getProductDetails };