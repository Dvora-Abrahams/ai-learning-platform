// User Types
export interface User {
  _id: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

// Auth Types
export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  category_id: string;
  createdAt: string;
}

// Prompt Types
export interface Prompt {
  _id: string;
  user_id: string;
  category_id: Category;
  sub_category_id: SubCategory;
  prompt: string;
  response: string;
  createdAt: string;
}

export interface CreatePromptData {
  category_id: string;
  sub_category_id: string;
  prompt: string;
}

// Admin Types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface UsersResponse {
  users: User[];
  pagination: PaginationInfo;
}

// API Response Types
export interface ApiError {
  message: string;
  error?: string;
}