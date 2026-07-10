const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        productName: {
            type: String,
            required: true,
            trim: true
        },
        healthScore: {
            type: Number,
            required: true
        },
        grade: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: ""
        }
    },
    { 
        timestamps: true 
    }
);

// Ek user ek hi product ko do baar favorite na kare, uske liye compound index:
favoriteSchema.index({ user: 1, productName: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;