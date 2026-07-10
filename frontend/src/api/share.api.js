import axiosInstance from './axiosInstance';
import { SHARE } from '../constants/apiEndpoints';

export const getPublicShareDetails = async (productId) => {
  const response = await axiosInstance.get(SHARE(productId));
  return response.data;
};
