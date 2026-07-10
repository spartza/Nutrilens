import { create } from 'zustand';

export const useHealthStore = create((set) => ({
  analysis: null,
  scoreBreakdown: null,
  isLoading: false,
  error: null,
  setAnalysis: (analysis) => set({ analysis }),
  setScoreBreakdown: (scoreBreakdown) => set({ scoreBreakdown }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearAnalysis: () => set({ analysis: null, scoreBreakdown: null }),
}));
