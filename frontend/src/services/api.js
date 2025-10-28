import axios from 'axios';

// FINAL FIX - Hard coded for production
const API_BASE_URL = 'https://ai-learning-platform-production-6871.up.railway.app/api';
console.log('🔍 API_BASE_URL:', API_BASE_URL);
console.log('🔍 VITE_API_URL from env:', import.meta.env.VITE_API_URL);

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
  getAllUsers: (params = {}) => api.get('/admin/users', { params }),
  getUserPrompts: (userId) => api.get(`/admin/users/${userId}/prompts`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
};

export default api;"// Updated $(date)" 
