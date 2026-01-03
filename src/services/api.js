// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const reportsAPI = {
  upload: (formData) => {
    return api.post('/reports/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAll: (params) => api.get('/reports', { params }),
  getById: (id) => api.get(`/reports/${id}`),
  download: (id) => `${API_BASE_URL}/reports/${id}/download`,
  delete: (id) => api.delete(`/reports/${id}`),
  share: (id, data) => api.post(`/reports/${id}/share`, data),
  getSharedWith: (id) => api.get(`/reports/${id}/shared-with`),
  revokeAccess: (reportId, userId) => api.delete(`/reports/${reportId}/share/${userId}`),
  getSharedReports: () => api.get('/shared-reports'),
  getMySharedReports: () => api.get('/my-shared-reports'),
};

export const vitalsAPI = {
  add: (data) => api.post('/vitals', data),
  getAll: (params) => api.get('/vitals', { params }),
  getTypes: () => api.get('/vitals/types'),
  getTrends: (type, params) => api.get(`/vitals/trends/${type}`, { params }),
  getLatest: () => api.get('/vitals/latest'),
};

export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/summary'),
  getReportTypes: () => api.get('/dashboard/report-types'),
};

export const searchAPI = {
  search: (params) => api.get('/search', { params }),
};

export default api;


