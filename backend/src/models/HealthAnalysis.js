const mongoose = require('mongoose');

const healthAnalysisSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    positives: [{ type: String }],  // E.g., ["High in Protein", "No artificial colors"]
    negatives: [{ type: String }],  // E.g., ["High Sugar", "Contains Palm Oil"]
    additivesFlagged: [{
        name: { type: String },
        riskLevel: { type: String, enum: ['Low', 'Moderate', 'High'] },
        reason: { type: String }
    }],
    recommendation: {
        type: String // E.g., "Eat in moderation" or "Healthy choice"
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('HealthAnalysis', healthAnalysisSchema);