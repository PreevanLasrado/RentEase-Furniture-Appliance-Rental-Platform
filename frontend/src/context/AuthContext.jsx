import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user info on initial load
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
    }
    setInitialLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast('Successfully logged in', {
        id: 'auth-success',
        duration: 1000,
        position: 'top-center',
        icon: <CheckCircle className="w-5 h-5" />,
        style: {
          background: '#16A34A',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 24px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
      return data;
    } catch (error) {
      toast('Invalid email or password', {
        id: 'auth-error',
        duration: 1000,
        position: 'top-center',
        icon: <AlertTriangle className="w-5 h-5" />,
        style: {
          background: '#E53935',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 24px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/register', userData);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast('Registration successful! Welcome to RentEase.', {
        id: 'auth-success',
        duration: 1000,
        position: 'top-center',
        icon: <CheckCircle className="w-5 h-5" />,
        style: {
          background: '#16A34A',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 24px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed.';
      toast(message, {
        id: 'auth-error',
        duration: 1000,
        position: 'top-center',
        icon: <AlertTriangle className="w-5 h-5" />,
        style: {
          background: '#E53935',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 24px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    toast('Logged out successfully.', {
      id: 'auth-logout',
      duration: 1000,
      position: 'top-center',
      icon: <CheckCircle className="w-5 h-5" />,
      style: {
        background: '#16A34A',
        color: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '12px 24px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        maxWidth: 'none',
      },
    });
  };

  const forgotPassword = async (email, newPassword) => {
    try {
      setLoading(true);
      const { data } = await api.put('/auth/forgot-password', { email, newPassword });
      toast(data.message || 'Password updated successfully', {
        id: 'auth-success',
        duration: 1000,
        position: 'top-center',
        icon: <CheckCircle className="w-5 h-5" />,
        style: {
          background: '#16A34A',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 24px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update password';
      toast(message, {
        id: 'auth-error',
        duration: 1000,
        position: 'top-center',
        icon: <AlertTriangle className="w-5 h-5" />,
        style: {
          background: '#E53935',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '12px 24px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    setUser,
  };

  return <AuthContext.Provider value={value}>{!initialLoading && children}</AuthContext.Provider>;
};
