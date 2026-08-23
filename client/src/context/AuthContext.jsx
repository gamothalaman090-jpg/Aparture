import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          // Server endpoint is /auth/profile (not /auth/me)
          // and returns flat object: { _id, name, email, role }
          const res = await api.get('/auth/profile');
          if (res && res._id) {
            setUser(res);
          } else if (res?.success && res?.data) {
            setUser(res.data);
          } else {
            logout();
          }
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    // Server returns flat: { _id, name, email, role, token }
    // api.js response interceptor unwraps response.data already
    const res = await api.post('/auth/login', { email, password });

    // Handle both wrapped { success, data: {...} } and flat { _id, token, ... }
    let userData, jwtToken;

    if (res.success && res.data) {
      // Wrapped response format
      const d = res.data;
      jwtToken = d.token;
      userData = { _id: d._id, name: d.name, email: d.email, role: d.role };
    } else if (res.token) {
      // Flat response format (current server shape)
      jwtToken = res.token;
      userData = { _id: res._id, name: res.name, email: res.email, role: res.role };
    } else {
      throw new Error(res.message || 'Login failed');
    }

    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, phone) => {
    const res = await api.post('/auth/register', { name, email, password, phone });

    let userData, jwtToken;

    if (res.success && res.data) {
      const d = res.data;
      jwtToken = d.token;
      userData = { _id: d._id, name: d.name, email: d.email, role: d.role };
    } else if (res.token) {
      jwtToken = res.token;
      userData = { _id: res._id, name: res.name, email: res.email, role: res.role };
    } else {
      throw new Error(res.message || 'Registration failed');
    }

    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
