import api from './api';

export const reviewService = {
  getAll: (params) => api.get('/reviews', { params }),
  approve: (id) => api.put(`/reviews/${id}/approve`),
  reject: (id) => api.put(`/reviews/${id}/reject`),
  delete: (id) => api.delete(`/reviews/${id}`),
};
