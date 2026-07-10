import { useContext, useCallback } from 'react';
import { CompareContext } from '../context/CompareContext';
import { useCompareStore } from '../store/compareStore';
import { compareProducts as apiCompareProducts } from '../api/compare.api';
import { useToast } from './useToast';
import { parseApiError } from '../utils/parseApiError';

export const useCompare = () => {
  const context = useContext(CompareContext);
  const { comparisonResults, setComparisonResults, setLoading, setError, isLoading, error, clearComparison } = useCompareStore();
  const { addToast } = useToast();

  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }

  const { selectedProductIds } = context;

  const runComparison = useCallback(async () => {
    if (selectedProductIds.length < 2) {
      addToast('Please select at least 2 products to compare', 'warning');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await apiCompareProducts(selectedProductIds);
      if (res.success) {
        // Backend returns comparison results inside res.products
        setComparisonResults(res.products);
      } else {
        throw new Error(res.message || 'Comparison failed');
      }
    } catch (e) {
      const errorMsg = parseApiError(e);
      setError(errorMsg);
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedProductIds, setComparisonResults, setLoading, setError, addToast]);

  return {
    ...context,
    runComparison,
    comparisonResults,
    isLoading,
    error,
    clearComparison,
  };
};

