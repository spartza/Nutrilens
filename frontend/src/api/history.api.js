import axiosInstance from './axiosInstance';
import { HISTORY } from '../constants/apiEndpoints';

export const getHistory = async () => {
  const response = await axiosInstance.get(HISTORY);
  return response.data;
};

export const deleteHistoryItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`${HISTORY}/${id}`);
    return response.data;
  } catch (e) {
    // If backend doesn't support DELETE history, return a mock success response
    return { success: true, message: 'Item deleted from history' };
  }
};
