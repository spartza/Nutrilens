import { create } from 'zustand';

export const useFavoritesStore = create((set) => ({
  favorites: [],
  isLoading: false,
  error: null,
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (favorite) => set((state) => ({ 
    favorites: [favorite, ...state.favorites.filter(f => f.productName !== favorite.productName)] 
  })),
  removeFavorite: (productName) => set((state) => ({ 
    favorites: state.favorites.filter((fav) => fav.productName !== productName) 
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
