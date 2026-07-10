import { useCallback } from 'react';
import { useProductStore } from '../store/productStore';
import * as productApi from '../api/product.api';
import { useToast } from './useToast';
import { parseApiError } from '../utils/parseApiError';

export const useProduct = () => {
  const { 
    currentProduct, 
    setCurrentProduct, 
    searchedProducts, 
    setSearchedProducts, 
    isLoading, 
    error, 
    setLoading, 
    setError,
    clearCurrentProduct
  } = useProductStore();
  const { addToast } = useToast();

  const fetchProduct = useCallback(async (barcode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productApi.getProductByBarcode(barcode);
      if (res?.success) {
        setCurrentProduct(res.product);
        return res.product;
      }
      return null;
    } catch (e) {
      const errorMsg = parseApiError(e);
      setError(errorMsg);
      // Suppress toast for typical 404s so the UI can handle NotFound cleanly
      if (e.response?.status !== 404) {
        addToast(errorMsg, 'error');
      }
      setCurrentProduct(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setCurrentProduct, addToast]);

  const search = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productApi.searchProduct(query);
      if (res?.success) {
        setSearchedProducts(res.products || []);
      }
    } catch (e) {
      const errorMsg = parseApiError(e);
      setError(errorMsg);
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSearchedProducts, addToast]);

  return {
    currentProduct,
    searchedProducts,
    isLoading,
    error,
    fetchProduct,
    search,
    clearCurrentProduct
  };
};

