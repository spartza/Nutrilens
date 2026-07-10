import axiosInstance from './axiosInstance';
import { COMPARE } from '../constants/apiEndpoints';

export const compareProducts = async (productIds) => {
  const response = await axiosInstance.post(COMPARE, { productIds });
  return response.data;
};
