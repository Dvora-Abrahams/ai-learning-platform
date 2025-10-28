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

// Local development API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Response interceptor to handle ApiResponse format
api.interceptors.response.use(
  (response) => {
    // If response has the new ApiResponse format, extract the data
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return {
        ...response,
        data: response.data.data // Extract the actual data from ApiResponse
      };
    }
    return response;
  },
  (error) => {
    // Handle error responses with ApiResponse format
    if (error.response?.data && typeof error.response.data === 'object' && 'success' in error.response.data) {
      error.message = error.response.data.message || error.message;
    }
    return Promise.reject(error);
  }
);

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