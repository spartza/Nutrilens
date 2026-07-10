import React, { createContext, useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import * as authApi from '../api/auth.api';

export const AllergenContext = createContext(null);

export const AllergenProvider = ({ children }) => {
  const { user, token, setUser } = useAuthStore();
  const [allergens, setAllergens] = useState([]);

  // Load allergens from user preferences
  useEffect(() => {
    if (user?.preferences?.allergens) {
      setAllergens(user.preferences.allergens);
    } else {
      const local = localStorage.getItem('nutrilens-allergens');
      if (local) {
        try {
          setAllergens(JSON.parse(local));
        } catch (e) {}
      }
    }
  }, [user]);

  const saveAllergens = async (newAllergens) => {
    setAllergens(newAllergens);
    localStorage.setItem('nutrilens-allergens', JSON.stringify(newAllergens));

    if (token) {
      try {
        const response = await authApi.updateUserProfile({
          preferences: {
            ...(user?.preferences || {}),
            allergens: newAllergens
          }
        });
        if (response?.success) {
          setUser(response.user || response.data || response);
        }
      } catch (e) {
        console.warn("Could not sync allergen settings with database: ", e.message);
      }
    }
  };

  return (
    <AllergenContext.Provider value={{ allergens, saveAllergens }}>
      {children}
    </AllergenContext.Provider>
  );
};
