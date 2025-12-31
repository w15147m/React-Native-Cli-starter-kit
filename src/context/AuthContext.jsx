import React, { createContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const authInfo = await getItem('authInfo');
      if (authInfo) {
        setUser(authInfo);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      await setItem('authInfo', userData);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user?.user?.id) throw new Error('User not found');

      // 1. Update in Database (SQLite)
      const updatedDbUser = await authServices.updateUser(user.user.id, updates);

      // 2. Update Local State & Storage
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          ...updatedDbUser // Use actual data from DB to be safe
        }
      };
      
      await setItem('authInfo', updatedUser);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeItem('authInfo');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
