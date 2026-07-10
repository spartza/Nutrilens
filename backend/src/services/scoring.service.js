const nutriScore = require('nutri-score');

const calculateHealthScore = (aiData) => {
    try {
        const macros = aiData.extracted_macros || {};
        const additives = aiData.additivesFlagged || [];

        // 1. Setup Macros Data
        const macroData = {
            energy: macros.energy_100g || 0,
            sugars: macros.sugars_100g || 0,
            saturatedFat: macros.saturated_fat_100g || 0,
            sodium: (macros.salt_100g || 0) * 400,
            fiber: macros.fiber_100g || 0,
            protein: macros.protein_100g || 0,
            fruitsVegetablesNuts: macros.fruits_veg_nuts_100g || 0,
            isBeverage: macros.is_beverage || false,
            isCheese: macros.is_cheese || false
        };

        // 2. Bulletproof Nutri-Score Calculation (Handles different versions of npm package)
        let letterGrade = 'C'; // Default
        
        if (typeof nutriScore.calculateClass === 'function') {
            letterGrade = nutriScore.calculateClass(macroData);
        } else if (typeof nutriScore.calculate === 'function') {
            const res = nutriScore.calculate(macroData);
            letterGrade = typeof res === 'string' ? res : (res.class || res.grade || 'C');
        } else if (typeof nutriScore === 'function') {
            // Some versions export the function directly
            const res = nutriScore(macroData);
            letterGrade = typeof res === 'string' ? res : (res.class || res.grade || 'C');
        }

        letterGrade = letterGrade.toUpperCase();

        // 3. Yuka's Nutritional Quality Map
        let nutritionalQualityScore = 50;
        switch (letterGrade) {
            case 'A': nutritionalQualityScore = 95; break;
            case 'B': nutritionalQualityScore = 80; break;
            case 'C': nutritionalQualityScore = 60; break;
            case 'D': nutritionalQualityScore = 40; break;
            case 'E': nutritionalQualityScore = 20; break;
        }

        // 4. Additive Risk Evaluation
        let additivesScore = 30; 
        let hasHighRiskAdditive = false;

        additives.forEach(additive => {
            const risk = (additive.riskLevel || '').toUpperCase();
            if (risk === 'HIGH') {
                hasHighRiskAdditive = true;
                additivesScore = 0; 
            } else if (risk === 'MODERATE') {
                additivesScore -= 10;
            }
        });
        additivesScore = Math.max(0, additivesScore);

        // 5. Organic Bonus
        const organicBonus = macros.is_organic ? 10 : 0;

        // 6. Final Formula
        let finalScore = (nutritionalQualityScore * 0.60) + additivesScore + organicBonus;

        // 7. Hard Override Rule for High-Risk Additives
        if (hasHighRiskAdditive) {
            finalScore = Math.min(finalScore, 49);
        }

        return {
            final_score: Math.round(finalScore),
            nutri_score_grade: letterGrade,
            has_high_risk_additive: hasHighRiskAdditive
        };

    } catch (error) {
        console.error("Scoring Error:", error.message);
        return { final_score: 50, nutri_score_grade: 'C', error: true };
    }
};

module.exports = { calculateHealthScore };