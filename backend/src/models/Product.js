const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    barcode: {
        type: String,
        required: true,
        unique: true, // Ek barcode ek hi baar save hoga
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    ingredientsText: {
        type: String, // Ye sabse zaroori hai AI analysis ke liye
        required: true
    },
    healthScore: {
        type: Number, // 1 se 100 tak ka score jo AI generate karega
        default: null
    },
    imageUrl: {
        type: String
    },
    // Future connection: Is product ka detail AI analysis kahan save hai
    aiAnalysisRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthAnalysis' 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);