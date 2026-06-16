import api from './api';

export const cakeService = {
  getAll: (params) => api.get('/cakes', { params }),
  getById: (id) => api.get(`/cakes/${id}`),
  create: (data) => api.post('/cakes', data),
  update: (id, data) => api.put(`/cakes/${id}`, data),
  delete: (id) => api.delete(`/cakes/${id}`),
  uploadImages: (formData) => api.post('/uploads/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
