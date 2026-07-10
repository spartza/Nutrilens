require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db'); // 👈 DB connection import kiya

const PORT = process.env.PORT || 5000;

// Database connect kar rahe hain
connectDB(); // 👈 Function call kiya


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});