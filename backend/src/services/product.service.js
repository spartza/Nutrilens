const Product = require('../models/Product');
const HealthAnalysis = require('../models/HealthAnalysis');
const { fetchProductFromExternalAPI } = require('./barcodeLookup.service');
const { analyzeIngredientsWithAI } = require('./aiAnalysis.service');
const { calculateHealthScore } = require('./scoring.service');

const getProductByBarcode = async (barcode) => {
    // 1. Pehle apne database (MongoDB Atlas) mein check karo
    let product = await Product.findOne({ barcode });

    if (product) {
        console.log(`Product found in local database cache! 🎯`);
        // Agar cached product mein AI analysis missing hai aur ingredients text available hai
        if (!product.aiAnalysisRef && product.ingredientsText) {
            console.log(`AI Analysis missing in cache. Running AI analysis... 🧠`);
            try {
                const aiAnalysisResult = await analyzeIngredientsWithAI(product.name, product.ingredientsText);
                const scoringResult = calculateHealthScore(aiAnalysisResult);

                const healthAnalysis = await HealthAnalysis.create({
                    productId: product._id,
                    summary: aiAnalysisResult.summary,
                    positives: aiAnalysisResult.positives,
                    negatives: aiAnalysisResult.negatives,
                    additivesFlagged: aiAnalysisResult.additivesFlagged,
                    recommendation: aiAnalysisResult.recommendation
                });

                product.healthScore = scoringResult.final_score;
                product.aiAnalysisRef = healthAnalysis._id;
                await product.save();
                console.log(`AI Analysis successfully generated and cached for existing product! 💾`);
            } catch (aiError) {
                console.error("Failed to run AI analysis for cached product:", aiError.message);
            }
        }
        return product;
    }

    // 2. Agar DB mein nahi mila, toh external API call karo
    console.log(`Product not in DB. Fetching from Open Food Facts... 🌐`);
    const externalProduct = await fetchProductFromExternalAPI(barcode);

    if (!externalProduct) {
        return null; // Product kahin nahi mila
    }

    // 3. External API se mila data apne database mein save karo future use ke liye
    product = new Product({
        barcode: externalProduct.barcode,
        name: externalProduct.name,
        brand: externalProduct.brand,
        ingredientsText: externalProduct.ingredientsText,
        imageUrl: externalProduct.imageUrl
    });

    // Run AI analysis if ingredientsText is available
    if (externalProduct.ingredientsText) {
        try {
            console.log(`Running AI analysis for new product: ${externalProduct.name}... 🧠`);
            const aiAnalysisResult = await analyzeIngredientsWithAI(externalProduct.name, externalProduct.ingredientsText);
            const scoringResult = calculateHealthScore(aiAnalysisResult);

            const healthAnalysis = await HealthAnalysis.create({
                productId: product._id,
                summary: aiAnalysisResult.summary,
                positives: aiAnalysisResult.positives,
                negatives: aiAnalysisResult.negatives,
                additivesFlagged: aiAnalysisResult.additivesFlagged,
                recommendation: aiAnalysisResult.recommendation
            });

            product.healthScore = scoringResult.final_score;
            product.aiAnalysisRef = healthAnalysis._id;
        } catch (aiError) {
            console.error("Failed to run AI analysis for new product:", aiError.message);
        }
    }

    await product.save();
    console.log(`New product fetched and cached in database! 💾`);
    
    return product;
};

module.exports = { getProductByBarcode };