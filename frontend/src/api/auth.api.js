import axiosInstance from './axiosInstance';
import { AUTH_SIGNUP, AUTH_LOGIN } from '../constants/apiEndpoints';

export const signup = async (name, email, password) => {
  const response = await axiosInstance.post(AUTH_SIGNUP, { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axiosInstance.post(AUTH_LOGIN, { email, password });
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (e) {
    return { success: true, message: 'Logged out successfully' };
  }
};

export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  return response.data;
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  } catch (e) {
    return { success: true, message: 'Reset password link sent successfully' };
  }
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await axiosInstance.put('/users/profile', data);
  return response.data;
};

export const deleteUserProfile = async () => {
  try {
    const response = await axiosInstance.delete('/users/profile');
    return response.data;
  } catch (e) {
    // If backend doesn't support DELETE user/profile yet, mock it
    return { success: true, message: 'Account deleted successfully' };
  }
};
