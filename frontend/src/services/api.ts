import axios from 'axios';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  Category, 
  SubCategory, 
  Prompt, 
  CreatePromptData,
  UsersResponse,
  User
} from '../types';

// Use local development server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
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
  register: (userData: RegisterData) => 
    api.post<AuthResponse>('/auth/register', userData),
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),
};

// Categories API
export const categoriesAPI = {
  getAll: () => 
    api.get<Category[]>('/categories'),
  getSubCategories: (categoryId: string) => 
    api.get<SubCategory[]>(`/categories/${categoryId}/subcategories`),
};

// Prompts API
export const promptsAPI = {
  create: (promptData: CreatePromptData) => 
    api.post<Prompt>('/prompts', promptData),
  getUserPrompts: () => 
    api.get<Prompt[]>('/prompts/me'),
};

// Admin API
export const adminAPI = {
  getAllUsers: (params: Record<string, any> = {}) => 
    api.get<UsersResponse>('/admin/users', { params }),
  getUserPrompts: (userId: string) => 
    api.get<Prompt[]>(`/admin/users/${userId}/prompts`),
  deleteUser: (userId: string) => 
    api.delete<{ message: string }>(`/admin/users/${userId}`),
};

export default api;