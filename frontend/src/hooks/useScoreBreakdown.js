export const useScoreBreakdown = () => {
  // Generates breakdown weights mirroring backend scoring.service.js
  const getBreakdown = (score, grade, additives = [], isOrganic = false) => {
    let nutritionalVal = 50;
    switch (grade) {
      case 'A': nutritionalVal = 95; break;
      case 'B': nutritionalVal = 80; break;
      case 'C': nutritionalVal = 60; break;
      case 'D': nutritionalVal = 40; break;
      case 'E': nutritionalVal = 20; break;
    }

    let additivesList = Array.isArray(additives) ? additives : [];
    let hasHighRisk = typeof additives === 'boolean' ? additives : false;
    
    let additivesScore = 30;
    if (hasHighRisk) {
      additivesScore = 0;
    } else {
      additivesList.forEach(additive => {
        const risk = (additive.riskLevel || '').toUpperCase();
        if (risk === 'HIGH') {
          hasHighRisk = true;
          additivesScore = 0;
        } else if (risk === 'MODERATE') {
          additivesScore -= 10;
        }
      });
    }
    additivesScore = Math.max(0, additivesScore);
    const additivesVal = hasHighRisk ? 0 : Math.round((additivesScore / 30) * 100);

    const organicVal = isOrganic ? 100 : 0;

    return [
      {
        name: 'Nutritional Quality',
        score: Math.round(nutritionalVal),
        weight: 60,
        description: `Based on Nutri-Score class "${grade || 'C'}"`
      },
      {
        name: 'Additives Safety',
        score: additivesVal,
        weight: 30,
        description: hasHighRisk 
          ? 'Contains high-risk additives' 
          : additivesVal < 100 
            ? 'Contains moderate-risk additives' 
            : 'Safe additive profile'
      },
      {
        name: 'Organic Bonus',
        score: organicVal,
        weight: 10,
        description: isOrganic ? 'Organic product certification' : 'Standard product'
      }
    ];
  };

  return { getBreakdown };
};
