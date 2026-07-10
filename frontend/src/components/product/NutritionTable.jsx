import React from 'react';

export const NutritionTable = ({ macros = {} }) => {
  const energy = macros.energy_100g || macros.energy || 0;
  const sugars = macros.sugars_100g || macros.sugars || 0;
  const fat = macros.saturated_fat_100g || macros.saturatedFat || 0;
  const salt = macros.salt_100g || (macros.sodium ? (macros.sodium / 400).toFixed(2) : 0) || 0;
  const fiber = macros.fiber_100g || macros.fiber || 0;
  const protein = macros.protein_100g || macros.protein || 0;

  const rows = [
    { label: 'Energy (Calories)', value: `${energy} kcal`, icon: 'bx-bolt-circle', color: 'text-amber-500' },
    { label: 'Saturated Fat', value: `${fat}g`, icon: 'bx-droplet', color: 'text-red-400' },
    { label: 'Sugars', value: `${sugars}g`, icon: 'bx-cookie', color: 'text-orange-400' },
    { label: 'Salt', value: `${salt}g`, icon: 'bx-water', color: 'text-blue-400' },
    { label: 'Dietary Fiber', value: `${fiber}g`, icon: 'bx-leaf', color: 'text-green-500' },
    { label: 'Protein', value: `${protein}g`, icon: 'bx-dumbbell', color: 'text-indigo-400' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm select-none w-full">
      <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i className="bx bx-list-ol text-primary-500 text-xl" />
        <span>Nutrition Facts (Per 100g)</span>
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between border-b border-gray-50 pb-2.5">
            <div className="flex items-center gap-2">
              <i className={`bx ${row.icon} ${row.color} text-lg`} />
              <span className="text-sm font-semibold text-gray-500">{row.label}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionTable;
