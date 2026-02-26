const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_BASE_URL,
  MODE: import.meta.env.MODE
});

export interface ApiError {
  error: string;
  status?: number;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  console.log(`API Request: ${options.method || 'GET'} ${fullUrl}`);

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    console.error(`API Error: ${response.status} ${response.statusText}`, error);
    throw { ...error, status: response.status };
  }

  return response.json();
};
