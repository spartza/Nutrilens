import axiosInstance from './axiosInstance';
import { PRODUCT_DETAILS } from '../constants/apiEndpoints';

export const getProductByBarcode = async (barcode) => {
  const response = await axiosInstance.get(PRODUCT_DETAILS(barcode));
  return response.data;
};

export const searchProduct = async (query) => {
  try {
    const response = await axiosInstance.get(`/products/search?q=${query}`);
    return response.data;
  } catch (e) {
    return { success: true, products: [] };
  }
};
