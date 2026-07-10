import { create } from 'zustand';

export const useCompareStore = create((set) => ({
  comparisonResults: null,
  isLoading: false,
  error: null,
  setComparisonResults: (results) => set({ comparisonResults: results }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearComparison: () => set({ comparisonResults: null }),
}));
