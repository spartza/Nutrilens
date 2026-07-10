import React, { createContext, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { getUserProfile } from '../api/auth.api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, token, isLoggedIn, setUser, setToken, logout } = useAuthStore();

  useEffect(() => {
    const loadProfile = async () => {
      if (token) {
        try {
          const res = await getUserProfile();
          if (res?.success) {
            // Support both direct return or nested structure
            setUser(res.user || res.data || res);
          }
        } catch (e) {
          // If token expired, clear it
          if (e.response?.status === 401) {
            logout();
          }
        }
      }
    };
    loadProfile();
  }, [token, setUser, logout]);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, setUser, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
