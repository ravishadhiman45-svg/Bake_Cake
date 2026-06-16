import api from './api';

export const feedbackService = {
  getAll: (params) => api.get('/feedbacks', { params }),
  delete: (id) => api.delete(`/feedbacks/${id}`),
};
