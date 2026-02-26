import { apiRequest } from './api';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  _count?: {
    menus: number;
  };
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
}

export interface AdminStats {
  totalUsers: number;
  totalMenus: number;
  totalMenuItems: number;
  recentUsers: number;
  activeSessions: number;
}

export const adminService = {
  // Statistics
  getStats: async (): Promise<AdminStats> => {
    return apiRequest<AdminStats>('/admin/stats');
  },

  // User management
  getAllUsers: async (): Promise<User[]> => {
    return apiRequest<User[]>('/admin/users');
  },

  getUserById: async (id: string): Promise<User> => {
    return apiRequest<User>(`/admin/users/${id}`);
  },

  createUser: async (data: CreateUserRequest): Promise<User> => {
    return apiRequest<User>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateUser: async (id: string, data: UpdateUserRequest): Promise<User> => {
    return apiRequest<User>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};
