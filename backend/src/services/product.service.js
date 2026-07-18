const Product = require('../models/Product');
const HealthAnalysis = require('../models/HealthAnalysis');
const { fetchProductFromExternalAPI } = require('./barcodeLookup.service');
const { analyzeIngredientsWithAI } = require('./aiAnalysis.service');
const { calculateHealthScore } = require('./scoring.service');

const getProductByBarcode = async (barcode) => {
    // 1. Pehle apne database (MongoDB Atlas) mein check karo
    let product = await Product.findOne({ barcode }).populate('aiAnalysisRef');

    if (product) {
        console.log(`Product found in local database cache! 🎯`);
        
        const hasMacros = product.aiAnalysisRef && 
            product.aiAnalysisRef.extracted_macros && 
            (product.aiAnalysisRef.extracted_macros instanceof Map ? 
                product.aiAnalysisRef.extracted_macros.size > 0 : 
                Object.keys(product.aiAnalysisRef.extracted_macros).length > 0);

        const macros = product.aiAnalysisRef?.extracted_macros;
        const isMock = macros && (
            macros instanceof Map ? 
                (macros.get('energy_100g') === 150 && macros.get('protein_100g') === 3) : 
                (macros.energy_100g === 150 && macros.protein_100g === 3)
        );

        const needsAIAnalysis = !product.aiAnalysisRef || !hasMacros || isMock;

        // Agar cached product mein AI analysis ya macros missing hai aur ingredients text available hai
        if (needsAIAnalysis && product.ingredientsText) {
            console.log(`AI Analysis or macros missing/mocked in cache. Running AI analysis... 🧠`);
            try {
                const aiAnalysisResult = await analyzeIngredientsWithAI(product.name, product.ingredientsText);
                
                // Fetch external product details to override/merge real macros
                const externalProduct = await fetchProductFromExternalAPI(barcode);
                if (externalProduct && externalProduct.macros) {
                    aiAnalysisResult.extracted_macros = {
                        ...aiAnalysisResult.extracted_macros,
                        ...externalProduct.macros
                    };
                    product.grade = externalProduct.grade;
                }

                const scoringResult = calculateHealthScore(aiAnalysisResult, product.grade);

                let healthAnalysis;
                if (product.aiAnalysisRef) {
                    healthAnalysis = await HealthAnalysis.findById(product.aiAnalysisRef._id);
                }

                if (healthAnalysis) {
                    healthAnalysis.summary = aiAnalysisResult.summary;
                    healthAnalysis.positives = aiAnalysisResult.positives;
                    healthAnalysis.negatives = aiAnalysisResult.negatives;
                    healthAnalysis.additivesFlagged = aiAnalysisResult.additivesFlagged;
                    healthAnalysis.recommendation = aiAnalysisResult.recommendation;
                    healthAnalysis.extracted_macros = aiAnalysisResult.extracted_macros;
                    await healthAnalysis.save();
                } else {
                    healthAnalysis = await HealthAnalysis.create({
                        productId: product._id,
                        summary: aiAnalysisResult.summary,
                        positives: aiAnalysisResult.positives,
                        negatives: aiAnalysisResult.negatives,
                        additivesFlagged: aiAnalysisResult.additivesFlagged,
                        recommendation: aiAnalysisResult.recommendation,
                        extracted_macros: aiAnalysisResult.extracted_macros
                    });
                }

                product.healthScore = scoringResult.final_score;
                product.grade = scoringResult.nutri_score_grade;
                product.aiAnalysisRef = healthAnalysis._id;
                await product.save();
                await product.populate('aiAnalysisRef');
                console.log(`AI Analysis successfully updated and cached for existing product! 💾`);
            } catch (aiError) {
                console.error("Failed to run AI analysis for cached product:", aiError.message);
            }
        }
        
        // Agar product mein grade missing hai, save a fallback grade 'C'
        if (!product.grade) {
            product.grade = 'C';
            await product.save();
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
        imageUrl: externalProduct.imageUrl,
        grade: externalProduct.grade
    });

    // Run AI analysis if ingredientsText is available
    if (externalProduct.ingredientsText) {
        try {
            console.log(`Running AI analysis for new product: ${externalProduct.name}... 🧠`);
            const aiAnalysisResult = await analyzeIngredientsWithAI(externalProduct.name, externalProduct.ingredientsText);
            
            // Merge actual macro values from Open Food Facts API if available
            if (externalProduct.macros) {
                aiAnalysisResult.extracted_macros = {
                    ...aiAnalysisResult.extracted_macros,
                    ...externalProduct.macros
                };
            }
            
            const scoringResult = calculateHealthScore(aiAnalysisResult, externalProduct.grade);

            const healthAnalysis = await HealthAnalysis.create({
                productId: product._id,
                summary: aiAnalysisResult.summary,
                positives: aiAnalysisResult.positives,
                negatives: aiAnalysisResult.negatives,
                additivesFlagged: aiAnalysisResult.additivesFlagged,
                recommendation: aiAnalysisResult.recommendation,
                extracted_macros: aiAnalysisResult.extracted_macros
            });

            product.healthScore = scoringResult.final_score;
            product.grade = scoringResult.nutri_score_grade;
            product.aiAnalysisRef = healthAnalysis._id;
        } catch (aiError) {
            console.error("Failed to run AI analysis for new product:", aiError.message);
        }
    }

    await product.save();
    if (product.aiAnalysisRef) {
        await product.populate('aiAnalysisRef');
    }
    console.log(`New product fetched and cached in database! 💾`);
    
    return product;
};

module.exports = { getProductByBarcode };