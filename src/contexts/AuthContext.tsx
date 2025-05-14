
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, username?: string) => void;
  logout: () => void;
  signup: (email: string, password: string, username: string) => void;
};

const ADMIN_EMAIL = 'admin@aahakalyanam.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string, username?: string) => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    let role: 'admin' | 'user' = 'user';
    if (email === ADMIN_EMAIL) {
      role = 'admin';
    }

    // Create a user object
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      username: username || email.split('@')[0],
      email,
      role,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));

    toast.success('Login successful!');
    
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const signup = (email: string, password: string, username: string) => {
    if (!email || !password || !username) {
      toast.error('Please fill in all fields');
      return;
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      username,
      email,
      role: 'user',
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));

    toast.success('Sign up successful!');
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
