import { create } from 'zustand';

export const useProductStore = create((set) => ({
  currentProduct: null,
  searchedProducts: [],
  isLoading: false,
  error: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setSearchedProducts: (products) => set({ searchedProducts: products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearCurrentProduct: () => set({ currentProduct: null }),
}));
