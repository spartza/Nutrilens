const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { analyzeIngredientsWithAI } = require('../services/aiAnalysis.service');
const { calculateHealthScore } = require('../services/scoring.service');
const History = require('../models/history.model'); // 🔥 NAYA: History model import kiya

const processProductScan = asyncHandler(async (req, res) => {
    const { productName, text } = req.body;

    if (!text || !productName) {
        throw new ApiError(400, "Please provide both productName and text (ingredients).");
    }

    // Step 1: Get AI Analysis (Qualitative details + Macros)
    const aiAnalysisResult = await analyzeIngredientsWithAI(productName, text);

    // Step 2: Pass AI Data to Scoring Engine
    const scoringResult = calculateHealthScore(aiAnalysisResult);

    // Step 3: 🔥 SAVE TO DATABASE 🔥
    // Protect middleware ke karan req.user._id humare paas pehle se hai
    const scanHistory = await History.create({
        user: req.user._id,
        productName: productName,
        healthScore: scoringResult.final_score,
        grade: scoringResult.nutri_score_grade,
        analysis: {
            summary: aiAnalysisResult.summary,
            positives: aiAnalysisResult.positives,
            negatives: aiAnalysisResult.negatives,
            additives: aiAnalysisResult.additivesFlagged,
            recommendation: aiAnalysisResult.recommendation
        }
    });

    // Step 4: Combine and send response
    res.status(200).json(
        new ApiResponse(200, {
            historyId: scanHistory._id, // NAYA: Frontend ko DB id bhi bhej di
            productName,
            health_score: scoringResult.final_score,
            grade: scoringResult.nutri_score_grade,
            analysis: {
                summary: aiAnalysisResult.summary,
                positives: aiAnalysisResult.positives,
                negatives: aiAnalysisResult.negatives,
                additives: aiAnalysisResult.additivesFlagged,
                recommendation: aiAnalysisResult.recommendation
            }
        }, "Product scanned and saved to history successfully! 🚀")
    );
});

// Naya function history fetch karne ke liye
const getScanHistory = asyncHandler(async (req, res) => {
    // Database se current user ki saari history nikalo
    // .sort({ createdAt: -1 }) se sabse naye scans sabse upar aayenge (Descending order)
    const history = await History.find({ user: req.user._id }).sort({ createdAt: -1 });

    if (!history) {
        throw new ApiError(404, "No scan history found");
    }

    res.status(200).json(
        new ApiResponse(200, {
            totalScans: history.length,
            history
        }, "Scan history fetched successfully! 📜")
    );
});

// Ab export mein is naye function ko bhi add kar de
module.exports = { processProductScan, getScanHistory };
