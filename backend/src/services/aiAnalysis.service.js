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

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
        console.log(`Using realistic mock ingredient analysis fallback for: ${productName}... 🛠️`);
        return getMockAnalysis(productName, ingredientsText);
    }
};

const getMockAnalysis = (productName, ingredientsText) => {
    const text = (ingredientsText || "").toLowerCase();
    const name = (productName || "").toLowerCase();

    let isBeverage = text.includes("water") || text.includes("juice") || text.includes("soda") || text.includes("cola") || name.includes("drink") || name.includes("cola");
    let isOrganic = text.includes("organic") || name.includes("organic") || text.includes("bio") || name.includes("bio") || text.includes("biologique") || name.includes("biologique");
    
    let energy = 150;
    let sugars = 5;
    let satFat = 2;
    let salt = 0.5;
    let fiber = 1.5;
    let protein = 3;
    let summary = `${productName} contains standard food ingredients. It offers moderate nutritional value.`;
    let positives = ["Provides quick energy", "Easy to consume"];
    let negatives = ["Contains processed ingredients"];
    let recommendation = "Consume occasionally";
    let additives = [];

    // Specific product heuristics
    if (text.includes("sugar") || text.includes("syrup") || text.includes("fructose")) {
        sugars = 15;
        energy = 250;
        negatives.push("High sugar content from added sweeteners.");
    }
    if (text.includes("oil") || text.includes("butter") || text.includes("margarine") || text.includes("fat")) {
        satFat = 8;
        energy = 350;
        negatives.push("Contains saturated fats from oils or fats.");
    }
    if (text.includes("salt") || text.includes("sodium")) {
        salt = 1.5;
        negatives.push("Moderate to high sodium content.");
    }
    if (text.includes("lecithin") || text.includes("e322")) {
        additives.push({ name: "Lecithin (E322)", riskLevel: "Low", reason: "Common emulsifier, safe for most." });
    }
    if (text.includes("glutamate") || text.includes("msg") || text.includes("yeast extract")) {
        additives.push({ name: "Monosodium Glutamate", riskLevel: "Moderate", reason: "Flavor enhancer, may cause sensitivity in some." });
    }

    // Healthier profiles
    if (text.includes("wheat") || text.includes("oat") || text.includes("fiber") || text.includes("grain")) {
        fiber = 5.5;
        positives.push("Good source of dietary fiber.");
    }
    if (text.includes("milk") || text.includes("cheese") || text.includes("egg") || text.includes("protein")) {
        protein = 8;
        positives.push("Contains protein.");
    }

    return {
        summary,
        positives,
        negatives,
        additivesFlagged: additives,
        recommendation,
        extracted_macros: {
            energy_100g: energy,
            sugars_100g: sugars,
            saturated_fat_100g: satFat,
            salt_100g: salt,
            fiber_100g: fiber,
            protein_100g: protein,
            fruits_veg_nuts_100g: 0,
            is_beverage: isBeverage,
            is_cheese: false,
            is_organic: isOrganic
        }
    };
};

module.exports = { analyzeIngredientsWithAI };