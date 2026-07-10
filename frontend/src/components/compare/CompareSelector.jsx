import React from 'react';

export const CompareSelector = ({ products = [], selectedIds = [], onSelect }) => {
  return (
    <div className="flex flex-col gap-4 select-none w-full">
      <h3 className="font-bold text-sm text-gray-750">Choose Products to Compare:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {[0, 1].map((index) => {
          const selectedValue = selectedIds[index] || '';
          return (
            <div key={index} className="flex flex-col gap-1 w-full">
              <label className="text-[10px] font-bold text-gray-450 uppercase tracking-wider px-1">
                PRODUCT {index === 0 ? 'A' : 'B'}
              </label>
              <select
                value={selectedValue}
                onChange={(e) => onSelect(index, e.target.value)}
                className="bg-gray-50 border border-gray-150 text-sm font-bold text-gray-650 rounded-xl px-3 py-2.5 w-full focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
              >
                <option value="">-- Choose Product --</option>
                {products.map((p) => {
                  const id = p._id || p.productId;
                  const name = p.name || p.productName;
                  return (
                    <option key={id} value={id} disabled={selectedIds.includes(id) && selectedValue !== id}>
                      {name} ({p.brand || 'Cached'})
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompareSelector;
