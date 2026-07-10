const History = require('../models/history.model');

const getUserHistory = async (req, res) => {
    try {
        // Logged-in user ki saari history nikalo
        const history = await History.find({ user: req.user._id })
            .sort({ createdAt: -1 }); // Latest scan sabse upar aayega (-1 descending)

        res.status(200).json({
            success: true,
            count: history.length,
            history: history
        });

    } catch (error) {
        console.error("History Fetch Error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { getUserHistory };