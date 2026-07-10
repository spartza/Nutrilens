import axiosInstance from './axiosInstance';
import { SCAN_ANALYZE } from '../constants/apiEndpoints';

export const triggerScan = async (productName, text) => {
  // Sends the manually typed/pasted ingredients to the backend for analysis
  const response = await axiosInstance.post(SCAN_ANALYZE, { productName, text });
  return response.data;
};

export const getScanResult = async (id) => {
  try {
    const response = await axiosInstance.get(`/scan/${id}`);
    return response.data;
  } catch (e) {
    // If the endpoint doesn't exist, we will handle it locally from history state
    return null;
  }
};
