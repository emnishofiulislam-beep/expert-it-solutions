import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.js';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  id: 'usr-1001',
  fullName: 'Shofiul Islam',
  email: 'emnishofiulislam@gmail.com',
  phone: '+880 1711-223344',
  address: 'House 42, Road 11, Sector 4, Uttara',
  city: 'Dhaka',
  postalCode: '1230',
  isVerified: true,
  role: 'customer',
  avatar: '/placeholder.jpg'
};

const INITIAL_DEMO_ORDERS = [
  {
    _id: 'EXP-89021',
    createdAt: '2026-03-01T10:30:00Z',
    items: [
      {
        product: {
          _id: 'prod-001',
          name: 'HP M22f 21.5-inch FHD IPS Borderless Monitor',
          price: 12200,
          image: '/placeholder.jpg',
          category: 'Monitor'
        },
        quantity: 1,
        price: 12200
      },
      {
        product: {
          _id: 'prod-010',
          name: 'Logitech MK295 Silent Wireless Keyboard and Mouse Combo',
          price: 2850,
          image: '/placeholder.jpg',
          category: 'Keyboard'
        },
        quantity: 1,
        price: 2850
      }
    ],
    subtotal: 15050,
    shippingFee: 60,
    discount: 0,
    total: 15110,
    orderStatus: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    deliveryAddress: {
      fullName: 'Shofiul Islam',
      phone: '+880 1711-223344',
      address: 'House 42, Road 11, Sector 4, Uttara',
      city: 'Dhaka',
      postalCode: '1230'
    }
  },
  {
    _id: 'EXP-89022',
    createdAt: '2026-03-07T14:15:00Z',
    items: [
      {
        product: {
          _id: 'prod-002',
          name: 'Hikvision DS-2CE16D0T-IRPF 2MP HD Bullet CCTV Camera',
          price: 1599,
          image: '/placeholder.jpg',
          category: 'CCTV'
        },
        quantity: 4,
        price: 1599
      },
      {
        product: {
          _id: 'prod-018',
          name: 'CCTV 12V 2A Regulated DC Power Adapter',
          price: 280,
          image: '/placeholder.jpg',
          category: 'Adapter'
        },
        quantity: 4,
        price: 280
      }
    ],
    subtotal: 7516,
    shippingFee: 60,
    discount: 200,
    total: 7376,
    orderStatus: 'Processing',
    paymentMethod: 'bKash Online',
    paymentStatus: 'Paid',
    deliveryAddress: {
      fullName: 'Shofiul Islam',
      phone: '+880 1711-223344',
      address: 'House 42, Road 11, Sector 4, Uttara',
      city: 'Dhaka',
      postalCode: '1230'
    }
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('expert_it_user');
      return stored ? JSON.parse(stored) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('expert_it_token') || 'demo-jwt-token-expert-it';
  });

  const [orders, setOrders] = useState(() => {
    try {
      const storedOrders = localStorage.getItem('expert_it_orders');
      return storedOrders ? JSON.parse(storedOrders) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('expert_it_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('expert_it_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('expert_it_token', token);
    } else {
      localStorage.removeItem('expert_it_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('expert_it_orders', JSON.stringify(orders));
  }, [orders]);

  // Login handler
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // If backend API URL is active, try backend first
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.post('/auth/login', { email, password });
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      }

      // Default client-side auth simulation
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Check if user matches current demo user or registered accounts
      const registeredAccounts = JSON.parse(localStorage.getItem('expert_it_registered') || '[]');
      const found = registeredAccounts.find(
        (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
      );

      if (found) {
        setUser(found);
        setToken('token-' + Date.now());
        return { success: true, user: found };
      }

      // Also allow demo user credentials
      if (email.toLowerCase() === 'emnishofiulislam@gmail.com' || email.toLowerCase() === 'admin@expertit.com') {
        const loggedUser = { ...DEFAULT_DEMO_USER, email };
        setUser(loggedUser);
        setToken('token-' + Date.now());
        return { success: true, user: loggedUser };
      }

      // Generic fallback for any email with standard password
      if (password.length >= 6) {
        const newUser = {
          id: 'usr-' + Date.now(),
          fullName: email.split('@')[0].toUpperCase(),
          email,
          phone: '+880 1700-000000',
          address: 'Dhaka, Bangladesh',
          city: 'Dhaka',
          postalCode: '1000',
          isVerified: true,
          role: 'customer',
          avatar: '/placeholder.jpg'
        };
        setUser(newUser);
        setToken('token-' + Date.now());
        return { success: true, user: newUser };
      }

      throw new Error('Invalid email or password. Minimum password length is 6 characters.');
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async ({ fullName, email, phone, password }) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.post('/auth/register', { fullName, email, phone, password });
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 700));

      const newUser = {
        id: 'usr-' + Date.now(),
        fullName,
        email,
        phone,
        password, // Stored in client mock only
        address: '',
        city: 'Dhaka',
        postalCode: '',
        isVerified: false, // Requires verification
        role: 'customer',
        avatar: '/placeholder.jpg'
      };

      const registered = JSON.parse(localStorage.getItem('expert_it_registered') || '[]');
      registered.push(newUser);
      localStorage.setItem('expert_it_registered', JSON.stringify(registered));

      return {
        success: true,
        message: 'Registration successful. Please check your email to verify your account.',
        user: newUser
      };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email handler
  const verifyEmail = async (tokenParam) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.post('/auth/verify-email', { token: tokenParam });
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 900));

      if (!tokenParam || tokenParam === 'expired' || tokenParam === 'invalid') {
        throw new Error('This verification link is invalid or has expired.');
      }

      if (user) {
        const updated = { ...user, isVerified: true };
        setUser(updated);
      }

      return { success: true, message: 'Email verified successfully!' };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification email
  const resendVerification = async (email) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.post('/auth/resend-verification', { email });
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: 'Verification email has been sent. Please check your inbox.'
      };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Failed to resend verification email.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.post('/auth/forgot-password', { email });
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent. Please check your inbox.'
      };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Error sending password reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (tokenParam, newPassword) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.post('/auth/reset-password', { token: tokenParam, newPassword });
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 900));

      if (!tokenParam || tokenParam === 'expired' || tokenParam === 'invalid') {
        throw new Error('This password reset link is invalid or has expired.');
      }

      return {
        success: true,
        message: 'Password reset successfully. You can now log in with your new password.'
      };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Password reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.put('/users/profile', profileData);
        setUser(res.data.user);
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const updated = { ...user, ...profileData };
      setUser(updated);
      return { success: true, user: updated, message: 'Profile updated successfully!' };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_API_BASE_URL) {
        const res = await axiosInstance.put('/users/change-password', { currentPassword, newPassword });
        return res.data;
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
      return { success: true, message: 'Password changed successfully!' };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Failed to change password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add an order to history
  const addOrder = (orderData) => {
    const newOrder = {
      _id: 'EXP-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
      orderStatus: 'Pending',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('expert_it_user');
    localStorage.removeItem('expert_it_token');
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        orders,
        login,
        register,
        logout,
        verifyEmail,
        resendVerification,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
