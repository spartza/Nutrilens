import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

export const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const addProductToCompare = (productId) => {
    if (selectedProductIds.includes(productId)) {
      addToast('Product already in compare list', 'info');
      return;
    }
    
    if (selectedProductIds.length >= 3) {
      addToast('You can compare max 3 products', 'warning');
      return;
    }

    const updated = [...selectedProductIds, productId];
    setSelectedProductIds(updated);
    addToast('Product added to compare queue ⚖️', 'success');

    if (updated.length >= 2) {
      navigate('/compare');
    }
  };

  const removeProductFromCompare = (productId) => {
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    addToast('Removed from comparison list', 'info');
  };

  const clearCompareQueue = () => {
    setSelectedProductIds([]);
  };

  return (
    <CompareContext.Provider value={{ selectedProductIds, addProductToCompare, removeProductFromCompare, clearCompareQueue }}>
      {children}
    </CompareContext.Provider>
  );
};
