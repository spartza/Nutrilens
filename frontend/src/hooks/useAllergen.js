import { useContext } from 'react';
import { AllergenContext } from '../context/AllergenContext';

export const useAllergen = () => {
  const context = useContext(AllergenContext);
  if (!context) {
    throw new Error('useAllergen must be used within an AllergenProvider');
  }

  // Scans product ingredients to check if any user allergen is matched
  const checkProductAllergens = (ingredientsText) => {
    if (!ingredientsText || !context.allergens || context.allergens.length === 0) {
      return [];
    }
    const lowerText = ingredientsText.toLowerCase();
    return context.allergens.filter((allergen) => {
      const cleanAllergen = allergen.toLowerCase().trim();
      if (!cleanAllergen) return false;
      return lowerText.includes(cleanAllergen);
    });
  };

  return {
    ...context,
    checkProductAllergens,
  };
};
