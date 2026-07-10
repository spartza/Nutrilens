import React from 'react';

export const AllergenAlert = ({ matchedAllergens = [] }) => {
  if (!matchedAllergens || matchedAllergens.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-3xl p-5 select-none text-red-900 flex items-start gap-3 w-full shadow-sm">
      <i className="bx bx-error text-red-500 text-2xl flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-extrabold text-red-800 text-[10px] tracking-widest uppercase mb-1">Allergen Alarm</h4>
        <p className="text-sm font-semibold leading-relaxed">
          Warning: This product contains ingredients matching your allergen profile: <span className="font-bold underline text-red-700">{matchedAllergens.join(', ')}</span>.
        </p>
      </div>
    </div>
  );
};

export default AllergenAlert;
