import { create } from 'zustand';

export const useHistoryStore = create((set) => ({
  history: [],
  isLoading: false,
  error: null,
  setHistory: (history) => set({ history }),
  removeHistoryItem: (id) => set((state) => ({ history: state.history.filter((item) => item._id !== id) })),
  addHistoryItem: (item) => set((state) => ({ history: [item, ...state.history] })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
