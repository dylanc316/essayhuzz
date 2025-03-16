'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  emailVerified: boolean;
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
  isEmailVerified: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; needsVerification?: boolean }>;
  signup: (data: SignupData) => Promise<{ success: boolean; needsVerification: boolean }>;
  logout: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isEmailVerified: false,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false, needsVerification: false }),
  logout: async () => {},
  resendVerificationEmail: async () => false,
  verifyEmail: async () => false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// Local storage key
const USER_STORAGE_KEY = 'essayhuzz_user';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (isBrowser) {
          // Try to get user from local storage
          const storedUser = localStorage.getItem(USER_STORAGE_KEY);
          
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          }

          // Also check with the server to verify the session
          fetch('/api/auth/me')
            .then(res => {
              if (res.ok) return res.json();
              // If server says we're not authenticated, clear local storage
              throw new Error('Not authenticated');
            })
            .then(data => {
              if (data.user) {
                setUser(data.user);
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
              }
            })
            .catch(() => {
              // If server auth check fails, clear storage
              localStorage.removeItem(USER_STORAGE_KEY);
              setUser(null);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (isBrowser) {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
        setUser(null);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [isBrowser]);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; needsVerification?: boolean }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false };
      }
      
      if (data.user) {
        setUser(data.user);
        if (isBrowser) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
        }
        return { success: true };
      } else if (data.needsVerification) {
        return { success: false, needsVerification: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; needsVerification: boolean }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        return { success: false, needsVerification: false };
      }
      
      if (responseData.success) {
        // Store user data temporarily but don't set as authenticated yet (needs verification)
        const userData = responseData.user;
        setUser(userData);
        if (isBrowser) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        }
        return { success: true, needsVerification: true };
      }
      
      return { success: false, needsVerification: false };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, needsVerification: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout API to clear server-side cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      // Clear local state and storage
      setUser(null);
      if (isBrowser) {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error resending verification email:', error);
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/auth/verify?token=${token}`);
      
      if (!response.ok) {
        return false;
      }
      
      // If the user is currently logged in, update their verification status
      if (user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        if (isBrowser) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error verifying email:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user && user.emailVerified,
      isEmailVerified: user?.emailVerified || false,
      login, 
      signup, 
      logout,
      resendVerificationEmail,
      verifyEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}