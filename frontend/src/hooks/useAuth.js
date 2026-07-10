import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as authApi from '../api/auth.api';
import { useToast } from './useToast';
import { parseApiError } from '../utils/parseApiError';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await authApi.signup(name, email, password);
      addToast(res.message || 'Account created successfully! 🎉', 'success');
      return res;
    } catch (e) {
      const errorMsg = parseApiError(e);
      addToast(errorMsg, 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      context.setToken(res.token);
      context.setUser(res.user);
      addToast(res.message || 'Logged in successfully! 🚀', 'success');
      return res;
    } catch (e) {
      const errorMsg = parseApiError(e);
      addToast(errorMsg, 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } catch (e) {
      // Silent catch
    } finally {
      context.logout();
      addToast('Logged out successfully! 👋', 'success');
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.updateUserProfile(data);
      // Support nested updates
      const updatedUser = res.user || res.data || res;
      context.setUser(updatedUser);
      addToast(res.message || 'Profile updated successfully! ✨', 'success');
      return res;
    } catch (e) {
      const errorMsg = parseApiError(e);
      addToast(errorMsg, 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    ...context,
    signup,
    login,
    logout,
    updateProfile,
    loading,
  };
};
