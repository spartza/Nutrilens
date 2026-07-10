import axiosInstance from './axiosInstance';

export const getHealthAnalysis = async (productId) => {
  try {
    const response = await axiosInstance.get(`/health/${productId}`);
    return response.data;
  } catch (e) {
    return null;
  }
};
