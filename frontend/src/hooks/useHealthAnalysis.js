import { useCallback } from 'react';
import { useHealthStore } from '../store/healthStore';
import { triggerScan as apiTriggerScan } from '../api/scan.api';
import { useToast } from './useToast';
import { parseApiError } from '../utils/parseApiError';

export const useHealthAnalysis = () => {
  const { analysis, setAnalysis, isLoading, error, setLoading, setError, clearAnalysis } = useHealthStore();
  const { addToast } = useToast();

  const analyzeIngredients = useCallback(async (productName, text) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiTriggerScan(productName, text);
      // Support both parsed ApiResponse formats
      const data = res.data || res;
      setAnalysis(data);
      addToast('Ingredients analyzed successfully! 🥗', 'success');
      return data;
    } catch (e) {
      const errorMsg = parseApiError(e);
      setError(errorMsg);
      addToast(errorMsg, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setAnalysis, addToast]);

  return {
    analysis,
    isLoading,
    error,
    analyzeIngredients,
    clearAnalysis,
  };
};

