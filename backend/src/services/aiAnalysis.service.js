const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeIngredientsWithAI = async (productName, ingredientsText) => {
    try {
        if (!ingredientsText) {
            throw new Error("No ingredients details available for analysis.");
        }

        const prompt = `
        You are an expert food scientist and nutritionist analyzing a product for an ingredient analysis app called NutriLens.
        Analyze the following product ingredients list and text.

        Product Name: ${productName}
        Ingredients List / Text: ${ingredientsText}

        Return the response strictly as a JSON object matching this exact structure. Estimate the macros per 100g based on the ingredients if exact numbers are hidden, or put 0 if completely unknown:
        {
          "summary": "A concise 2-sentence summary of how healthy or unhealthy this product is.",
          "positives": ["List 2-3 healthy aspects or good ingredients"],
          "negatives": ["List 2-3 unhealthy aspects like high sugar, sodium, or bad fats"],
          "additivesFlagged": [
            {
              "name": "Name of the additive",
              "riskLevel": "Low" or "Moderate" or "High",
              "reason": "Brief explanation"
            }
          ],
          "recommendation": "A brief final advice (e.g., Good choice, Consume occasionally, or Avoid)",
          "extracted_macros": {
            "energy_100g": 0,
            "sugars_100g": 0,
            "saturated_fat_100g": 0,
            "salt_100g": 0,
            "fiber_100g": 0,
            "protein_100g": 0,
            "fruits_veg_nuts_100g": 0,
            "is_beverage": false,
            "is_cheese": false,
            "is_organic": false
          }
        }
        `;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const responseText = result.response.text();
        return JSON.parse(responseText);

    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new Error("Failed to analyze ingredients using AI");
    }
};

module.exports = { analyzeIngredientsWithAI };