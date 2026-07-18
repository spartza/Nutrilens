const { analyzeIngredientsWithAI } = require('./src/services/aiAnalysis.service');
require('dotenv').config();

async function test() {
    try {
        console.log("Calling Gemini API...");
        const result = await analyzeIngredientsWithAI(
            "PESTO alla GENOVESE",
            "Oil, Basil, Cheese, Cashew nuts, Salt, Garlic"
        );
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Error occurred:", e);
    }
}

test();
