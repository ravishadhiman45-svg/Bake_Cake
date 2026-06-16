import api from './api';

export const settingsService = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
  uploadLogo: (formData) => api.post('/settings/logo', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadFavicon: (formData) => api.post('/settings/favicon', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadPdf: (type, formData) => api.post(`/settings/${type}/pdf`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getPdf: (type) => api.get(`/settings/${type}/pdf`),
  deletePdf: (type) => api.delete(`/settings/${type}/pdf`),
  getSocials: () => api.get('/settings/socials'),
  updateSocials: (data) => api.put('/settings/socials', data),
  getReels: () => api.get('/settings/reels'),
  uploadReel: (formData) => api.post('/settings/reels', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteReel: (id) => api.delete(`/settings/reels/${id}`),
  getDashboardStats: () => api.get('/dashboard/stats'),
};
