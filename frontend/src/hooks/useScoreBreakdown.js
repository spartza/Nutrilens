export const useScoreBreakdown = () => {
  // Generates breakdown weights mirroring backend scoring.service.js
  const getBreakdown = (score, grade, hasHighRiskAdditive) => {
    let nutritionalVal = 60;
    switch (grade) {
      case 'A': nutritionalVal = 95; break;
      case 'B': nutritionalVal = 80; break;
      case 'C': nutritionalVal = 60; break;
      case 'D': nutritionalVal = 40; break;
      case 'E': nutritionalVal = 20; break;
    }

    return [
      {
        name: 'Nutritional Quality',
        score: Math.round(nutritionalVal),
        weight: 60,
        description: `Based on Nutri-Score class "${grade || 'C'}"`
      },
      {
        name: 'Additives Safety',
        score: hasHighRiskAdditive ? 0 : 100,
        weight: 30,
        description: hasHighRiskAdditive ? 'Contains high-risk additives' : 'Safe additive profile'
      },
      {
        name: 'Organic Bonus',
        score: score > 90 ? 100 : 0,
        weight: 10,
        description: score > 90 ? 'Organic product certification' : 'Standard product'
      }
    ];
  };

  return { getBreakdown };
};
