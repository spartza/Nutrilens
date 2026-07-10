import { useCallback } from 'react';
import { useFavoritesStore } from '../store/favoritesStore';
import * as favoritesApi from '../api/favorites.api';
import { useToast } from './useToast';
import { parseApiError } from '../utils/parseApiError';

export const useFavorites = () => {
  const { 
    favorites, 
    setFavorites, 
    addFavorite, 
    removeFavorite, 
    setLoading, 
    setError, 
    isLoading, 
    error 
  } = useFavoritesStore();
  const { addToast } = useToast();

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await favoritesApi.getFavorites();
      // Supports array wrapped in res.data or direct res.favorites
      const list = res.favorites || res.data?.favorites || [];
      setFavorites(list);
    } catch (e) {
      setError(parseApiError(e));
    } finally {
      setLoading(false);
    }
  }, [setFavorites, setLoading, setError]);

  const toggleFavorite = async (productName, healthScore, grade) => {
    try {
      const res = await favoritesApi.addFavorite(productName, healthScore, grade);
      if (res.success) {
        const isAdded = res.message && res.message.includes('added');
        if (isAdded) {
          addFavorite(res.favorite || res.data || { productName, healthScore, grade });
          addToast(res.message || 'Added to favorites 💖', 'success');
        } else {
          removeFavorite(productName);
          addToast(res.message || 'Removed from favorites 💔', 'success');
        }
        return isAdded;
      }
    } catch (e) {
      addToast(parseApiError(e), 'error');
    }
    return false;
  };

  const isFavorited = (productName) => {
    if (!productName) return false;
    return favorites.some((fav) => fav.productName?.toLowerCase() === productName.toLowerCase());
  };

  return {
    favorites,
    isLoading,
    error,
    fetchFavorites,
    toggleFavorite,
    isFavorited,
  };
};
