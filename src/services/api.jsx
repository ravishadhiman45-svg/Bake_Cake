import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('cake-bakery-auth');
  if (stored) {
    try { const { token } = JSON.parse(stored); if (token) config.headers.Authorization = `Bearer ${token}`; }
    catch { /* ignore */ }
  }
  return config;
});

api.interceptors.response.use((res) => res, (error) => {
  if (error.response?.status === 401) { localStorage.removeItem('cake-bakery-auth'); window.location.href = '/login'; }
  return Promise.reject(error);
});

export default api;
