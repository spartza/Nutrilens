const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Array of Product IDs taaki 2 ya 3 products ek saath compare ho sakein
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Comparison', comparisonSchema);