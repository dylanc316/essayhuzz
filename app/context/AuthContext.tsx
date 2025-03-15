'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, LoginCredentials, SignupData } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
});

// Hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      
      try {
        const storedUser = localStorage.getItem('essayhuzz_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear any invalid data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('essayhuzz_user');
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate successful login with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: '/avatar-placeholder.png'
        };
        
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('essayhuzz_user', JSON.stringify(userData));
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: '2',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        avatar: '/avatar-placeholder.png'
      };
      
      setUser(newUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('essayhuzz_user', JSON.stringify(newUser));
      }
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('essayhuzz_user');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}