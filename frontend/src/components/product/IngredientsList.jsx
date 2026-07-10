import React from 'react';
import { highlightRiskyIngredients } from '../../utils/highlightRiskyIngredients';

export const IngredientsList = ({ ingredientsText, additives = [] }) => {
  const highlightedHtml = highlightRiskyIngredients(ingredientsText, additives);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm select-none w-full">
      <h3 className="text-base font-bold text-gray-800 mb-3.5 flex items-center gap-2">
        <i className="bx bx-receipt text-primary-500 text-xl" />
        <span>Ingredients List</span>
      </h3>
      
      {ingredientsText ? (
        <p 
          className="text-sm text-gray-600 leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <p className="text-sm text-gray-400 italic">No ingredient details provided.</p>
      )}
    </div>
  );
};

export default IngredientsList;
