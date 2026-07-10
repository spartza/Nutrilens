import React from 'react';
import Button from '../ui/Button';

export const ProductNotFound = ({ barcode, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-gray-100 rounded-3xl bg-white shadow-sm select-none w-full max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-3xl mb-4">
        <i className="bx bx-barcode" />
      </div>
      <h3 className="text-base font-bold text-gray-850 mb-1">Product Not Found</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
        The barcode <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{barcode}</span> was not found in our local database or Open Food Facts.
      </p>
      
      <Button variant="primary" onClick={onReset}>
        <i className='bx bx-refresh text-lg' />
        <span>Scan Another Product</span>
      </Button>
    </div>
  );
};

export default ProductNotFound;
