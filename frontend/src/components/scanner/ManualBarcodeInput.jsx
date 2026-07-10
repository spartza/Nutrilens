import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export const ManualBarcodeInput = ({ onSubmit, loading }) => {
  const [barcode, setBarcode] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!barcode.trim()) return;
    onSubmit(barcode.trim());
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3 w-full items-end select-none">
      <Input
        label="Or Enter Barcode Manually"
        placeholder="e.g. 5449000000996"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        icon={<i className="bx bx-barcode-reader" />}
      />
      <Button 
        type="submit" 
        variant="primary"
        className="w-full sm:w-auto h-[46px] whitespace-nowrap"
        disabled={loading || !barcode.trim()}
      >
        <i className='bx bx-search-alt' />
        <span>Analyze Barcode</span>
      </Button>
    </form>
  );
};

export default ManualBarcodeInput;
