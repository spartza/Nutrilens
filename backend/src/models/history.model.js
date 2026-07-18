const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to our User model
            required: true
        },
        productName: {
            type: String,
            required: true,
            trim: true
        },
        healthScore: {
            type: Number,
            required: false
        },
        grade: {
            type: String,
            required: true
        },
        // AI ka poora analysis hum nested object ki tarah store kar lenge
        // taaki history detail page par asani se dikha sakein
        analysis: {
            summary: String,
            positives: [String],
            negatives: [String],
            additives: [
                {
                    name: String,
                    riskLevel: String,
                    reason: String
                }
            ],
            recommendation: String,
            macros: {
                type: Map,
                of: mongoose.Schema.Types.Mixed
            }
        }
    },
    { 
        timestamps: true // Ye automatically 'createdAt' aur 'updatedAt' add kar dega
    }
);

const History = mongoose.model('History', historySchema);
module.exports = History;