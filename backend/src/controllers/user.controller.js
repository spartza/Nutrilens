const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

// 1. Get User Profile (Read)
const getUserProfile = asyncHandler(async (req, res) => {
    // Hamare 'protect' middleware ne pehle hi token verify karke user ki details req.user mein daal di hain
    // Toh try-catch ki zaroorat nahi, seedha ApiResponse bhej do
    res.status(200).json(
        new ApiResponse(200, req.user, "User profile fetched successfully! 🎉")
    );
});

// 2. Update User Profile (Update)
const updateUserProfile = asyncHandler(async (req, res) => {
    // Naya data database mein save karne ke liye pehle user dhundho
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found 🤷‍♂️");
    }

    // Agar request body mein naya naam/email aaya hai toh update karo, warna purana rehne do
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Agar user ne naya password bheja hai, toh usko bhi update kar do
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    // Password ko response mein nahi bhejna chahiye, isliye specific details return ki hain
    res.status(200).json(
        new ApiResponse(200, {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        }, "Profile updated successfully! ✨")
    );
});

module.exports = { getUserProfile, updateUserProfile };