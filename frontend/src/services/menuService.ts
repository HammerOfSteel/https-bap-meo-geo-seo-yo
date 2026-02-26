import { apiRequest } from './api';

export interface Menu {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  menuItems: MenuItem[];
  _count?: {
    menuItems: number;
  };
}

export interface MenuItem {
  id: string;
  menuId: string;
  name: string;
  description: string;
  cuisineType: string;
  itemType: 'FOOD' | 'DRINK';
  imageUrl: string;
  restaurantUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuRequest {
  title: string;
}

export interface CreateMenuItemRequest {
  menuId: string;
  name: string;
  description?: string;
  cuisineType?: string;
  itemType: 'FOOD' | 'DRINK';
  imageUrl?: string;
  restaurantUrl?: string;
  rating?: number;
}

export interface UpdateMenuRequest {
  title: string;
}

export interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  cuisineType?: string;
  itemType?: 'FOOD' | 'DRINK';
  imageUrl?: string;
  restaurantUrl?: string;
  rating?: number;
}

export interface RandomMenuResponse {
  food: MenuItem | null;
  drink: MenuItem | null;
  message: string;
}

export const menuService = {
  // Menu operations
  getMenus: async (): Promise<Menu[]> => {
    return apiRequest<Menu[]>('/menus');
  },

  getMenuById: async (id: string): Promise<Menu> => {
    return apiRequest<Menu>(`/menus/${id}`);
  },

  createMenu: async (data: CreateMenuRequest): Promise<Menu> => {
    return apiRequest<Menu>('/menus', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateMenu: async (id: string, data: UpdateMenuRequest): Promise<Menu> => {
    return apiRequest<Menu>(`/menus/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteMenu: async (id: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/menus/${id}`, {
      method: 'DELETE',
    });
  },

  // Menu item operations
  getMenuItems: async (menuId: string): Promise<MenuItem[]> => {
    return apiRequest<MenuItem[]>(`/menus/${menuId}/items`);
  },

  addMenuItem: async (data: CreateMenuItemRequest): Promise<MenuItem> => {
    return apiRequest<MenuItem>('/menus/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateMenuItem: async (id: string, data: UpdateMenuItemRequest): Promise<MenuItem> => {
    return apiRequest<MenuItem>(`/menus/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteMenuItem: async (id: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/menus/items/${id}`, {
      method: 'DELETE',
    });
  },

  // Random menu
  getRandomMenu: async (menuId: string): Promise<RandomMenuResponse> => {
    return apiRequest<RandomMenuResponse>(`/menus/${menuId}/random`);
  },

  // Global/Public menu operations
  getRandomGlobalItem: async (): Promise<MenuItem> => {
    const response = await fetch('http://localhost:5000/api/menus/public/random');
    if (!response.ok) {
      throw new Error('Failed to get random item');
    }
    return response.json();
  },

  getAllItems: async (): Promise<MenuItem[]> => {
    const response = await fetch('http://localhost:5000/api/menus/public/all');
    if (!response.ok) {
      throw new Error('Failed to get items');
    }
    return response.json();
  },
};
