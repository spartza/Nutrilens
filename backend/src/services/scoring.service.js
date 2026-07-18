const nutriScoreLib = require('nutri-score');
const nutriScore = nutriScoreLib.nutriScore || nutriScoreLib;

const calculateHealthScore = (aiData, apiGrade) => {
    try {
        const letterGrade = (apiGrade || 'C').toUpperCase();
        const additives = aiData.additivesFlagged || [];
        const hasHighRiskAdditive = additives.some(
            additive => (additive.riskLevel || '').toUpperCase() === 'HIGH'
        );

        return {
            final_score: null,
            nutri_score_grade: letterGrade,
            has_high_risk_additive: hasHighRiskAdditive
        };

    } catch (error) {
        console.error("Scoring Error:", error.message);
        return { final_score: null, nutri_score_grade: 'C', error: true };
    }
};

module.exports = { calculateHealthScore };