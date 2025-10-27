import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getSubCategories: (categoryId) => api.get(`/categories/${categoryId}/subcategories`),
};

// Prompts API
export const promptsAPI = {
  create: (promptData) => api.post('/prompts', promptData),
  getUserPrompts: () => api.get('/prompts/me'),
};

// Admin API
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getUserPrompts: (userId) => api.get(`/admin/users/${userId}/prompts`),
};

export default api;