import React from 'react';
import { useAllergen } from '../../hooks/useAllergen';
import Card from '../ui/Card';

const ALLERGEN_OPTIONS = ['Milk', 'Egg', 'Peanuts', 'Tree Nuts', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Gluten', 'Sesame'];

export const AllergenSettings = () => {
  const { allergens, saveAllergens } = useAllergen();

  const handleToggle = (allergen) => {
    if (allergens.includes(allergen)) {
      saveAllergens(allergens.filter(a => a !== allergen));
    } else {
      saveAllergens([...allergens, allergen]);
    }
  };

  return (
    <Card className="select-none w-full">
      <h2 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
        <i className="bx bx-shield-quarter text-primary-500 text-xl" />
        <span>My Allergen Settings</span>
      </h2>
      <p className="text-xs text-gray-450 mb-4 leading-relaxed">
        Select food ingredients you are sensitive or allergic to. NutriLens will raise visual alarms during analysis.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ALLERGEN_OPTIONS.map((allergen) => {
          const isSelected = allergens.includes(allergen);
          return (
            <button
              key={allergen}
              type="button"
              onClick={() => handleToggle(allergen)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                isSelected 
                  ? 'bg-red-50 border-red-200 text-red-800' 
                  : 'bg-gray-50/30 border-gray-150 text-gray-550 hover:bg-gray-50'
              }`}
            >
              <span>{allergen}</span>
              {isSelected ? (
                <i className="bx bx-check-circle text-red-550 text-base" />
              ) : (
                <i className="bx bx-circle text-gray-300 text-base" />
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default AllergenSettings;
