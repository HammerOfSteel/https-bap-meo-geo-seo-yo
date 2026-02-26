import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { setAuthToken, removeAuthToken } from '../services/api';

interface User {
  id: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Invalid stored user data:', error);
        removeAuthToken();
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const { token: newToken, user: userData } = response;
      setToken(newToken);
      setUser(userData);
      setAuthToken(newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.error || 'Login failed');
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      const response = await authService.register({ email, username, password });
      const { token: newToken, user: userData } = response;
      setToken(newToken);
      setUser(userData);
      setAuthToken(newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.error || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeAuthToken();
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
