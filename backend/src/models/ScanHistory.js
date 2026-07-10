const mongoose = require('mongoose');

const scanHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { 
    timestamps: true // Ye automatically scan ka time (createdAt) save kar lega
});

module.exports = mongoose.model('ScanHistory', scanHistorySchema);