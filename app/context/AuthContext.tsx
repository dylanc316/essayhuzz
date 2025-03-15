'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for stored user data (localStorage only works client-side)
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('essayhuzz_user');
          
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear potentially corrupted data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('essayhuzz_user');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your authentication endpoint
      // For demo purposes, we're simulating successful login with mock data
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Demo login - in a real app, this would verify against your API
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
      
      // For demo purposes, also allow any email that ends with @example.com
      if (credentials.email.endsWith('@example.com') && credentials.password.length >= 6) {
        const nameParts = credentials.email.split('@')[0].split('.');
        const name = nameParts.map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
        
        const userData: User = {
          id: '2',
          name: name || 'User',
          email: credentials.email,
          avatar: undefined
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

  // Signup function
  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your registration endpoint
      // For demo purposes, we're simulating successful registration
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      const userData: User = {
        id: Date.now().toString(), // Generate a random ID
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        avatar: undefined
      };
      
      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('essayhuzz_user', JSON.stringify(userData));
      }
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // In a real app, this might call an API endpoint to invalidate the session
      
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