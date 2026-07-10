import React from 'react';

export const ProductHeader = ({ imageUrl, name, brand, barcode }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center bg-white border border-gray-100 rounded-3xl p-6 shadow-sm select-none w-full">
      <div className="w-32 h-32 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-contain" />
        ) : (
          <i className="bx bx-shopping-bag text-5xl text-gray-300" />
        )}
      </div>
      
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 min-w-0 w-full">
        <h1 className="text-2xl font-black text-gray-800 leading-tight truncate w-full">{name || 'Unknown Product'}</h1>
        <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">{brand || 'Unknown Brand'}</p>
        {barcode && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold mt-1 border border-gray-100">
            <i className="bx bx-barcode-reader text-sm" />
            <span>{barcode}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHeader;
