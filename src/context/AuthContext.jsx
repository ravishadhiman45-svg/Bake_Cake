import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

const AuthContext = createContext();
const SESSION_KEY = 'cake-bakery-auth';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const { admin: savedAdmin, timestamp } = JSON.parse(stored);
        if (Date.now() - timestamp < SESSION_DURATION) setAdmin(savedAdmin);
        else localStorage.removeItem(SESSION_KEY);
      } catch { localStorage.removeItem(SESSION_KEY); }
    }
    setLoading(false);
  }, []);

  const login = (adminData, token) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ admin: adminData, token, timestamp: Date.now() }));
    setAdmin(adminData);
    toast.success('Welcome back, Admin!');
    navigate('/admin/dashboard');
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setAdmin(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isSessionExpired = useCallback(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return true;
    try { return Date.now() - JSON.parse(stored).timestamp >= SESSION_DURATION; }
    catch { return true; }
  }, []);

  return <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin, isSessionExpired }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
