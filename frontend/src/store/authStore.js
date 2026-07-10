import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token, isLoggedIn: !!token }),
      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: 'nutrilens-auth-store', // Managed automatically by Zustand persist
    }
  )
);
