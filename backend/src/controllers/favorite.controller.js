const Favorite = require('../models/favorite.model');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

// Add or Remove from Favorites (Toggle)
const toggleFavorite = asyncHandler(async (req, res) => {
    const { productName, healthScore, grade } = req.body;

    if (!productName) {
        throw new ApiError(400, "Product Name is required");
    }

    // Check karo ki kya user ne pehle se isko favorite kiya hua hai
    const existingFavorite = await Favorite.findOne({ 
        user: req.user._id, 
        productName: productName 
    });

    if (existingFavorite) {
        // Agar pehle se hai, toh remove (Unfavorite) kar do
        await Favorite.findByIdAndDelete(existingFavorite._id);
        
        return res.status(200).json(
            new ApiResponse(200, {}, "Product removed from favorites 💔")
        );
    } else {
        // Agar nahi hai, toh Add (Favorite) kar do
        if (healthScore === undefined || !grade) {
             throw new ApiError(400, "healthScore and grade are required to add a new favorite");
        }

        const newFavorite = await Favorite.create({ 
            user: req.user._id, 
            productName,
            healthScore,
            grade
        });
        
        return res.status(201).json(
            new ApiResponse(201, newFavorite, "Product added to favorites 💖")
        );
    }
});

// Get All Favorites for the Logged-in User
const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, {
            count: favorites.length,
            favorites: favorites
        }, "Favorites fetched successfully! ⭐")
    );
});

module.exports = { toggleFavorite, getFavorites };