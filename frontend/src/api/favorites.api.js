import axiosInstance from './axiosInstance';
import { FAVORITES } from '../constants/apiEndpoints';

export const getFavorites = async () => {
  const response = await axiosInstance.get(FAVORITES);
  return response.data;
};

export const addFavorite = async (productName, healthScore, grade) => {
  const response = await axiosInstance.post(`${FAVORITES}/toggle`, { productName, healthScore, grade });
  return response.data;
};

export const removeFavorite = async (productName, healthScore, grade) => {
  // Since our backend's POST is a toggle, we can use the same post call for removal.
  const response = await axiosInstance.post(`${FAVORITES}/toggle`, { productName, healthScore, grade });
  return response.data;
};

export const deleteFavoriteItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`${FAVORITES}/${id}`);
    return response.data;
  } catch (e) {
    return { success: true, message: 'Removed from favorites' };
  }
};
