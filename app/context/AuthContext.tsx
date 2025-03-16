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

// Mock email verification storage
const mockVerificationTokens: Record<string, { email: string; expiresAt: number }> = {};
const mockVerifiedEmails: string[] = ['demo@example.com'];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('essayhuzz_user');
          
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('essayhuzz_user');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Generate a verification token
  const generateVerificationToken = (email: string): string => {
    const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
    
    // Store token with expiration (24 hours)
    mockVerificationTokens[token] = {
      email,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };
    
    return token;
  };

  // Send verification email (mock)
  const sendVerificationEmail = async (email: string, token: string): Promise<boolean> => {
    // In a real app, we would send an actual email here
    console.log(`[MOCK] Sending verification email to ${email} with token ${token}`);
    console.log(`[MOCK] Verification link: http://localhost:3000/verify-email?token=${token}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Just for demonstration, we'll automatically "verify" after a delay
    // In a real app, the user would click a link in their email
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        mockVerifiedEmails.push(email);
        
        // If user is already logged in with this email, update their status
        if (user && user.email === email) {
          const updatedUser = { ...user, emailVerified: true };
          setUser(updatedUser);
          localStorage.setItem('essayhuzz_user', JSON.stringify(updatedUser));
        }
      }, 10000); // Auto-verify after 10 seconds in development
    }
    
    return true;
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; needsVerification?: boolean }> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: '/avatar-placeholder.png',
          emailVerified: true
        };
        
        setUser(userData);
        localStorage.setItem('essayhuzz_user', JSON.stringify(userData));
        return { success: true };
      }
      
      // Regular login (simplified)
      // First check if this is a test email format
      if (credentials.email.endsWith('@example.com') && credentials.password.length >= 6) {
        const nameParts = credentials.email.split('@')[0].split('.');
        const name = nameParts.map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
        
        // Check if email is verified
        const isVerified = mockVerifiedEmails.includes(credentials.email);
        
        // If not verified, require verification
        if (!isVerified) {
          // Generate and send a new verification token
          const token = generateVerificationToken(credentials.email);
          await sendVerificationEmail(credentials.email, token);
          
          return { success: false, needsVerification: true };
        }
        
        const userData: User = {
          id: Date.now().toString(),
          name: name || 'User',
          email: credentials.email,
          emailVerified: true
        };
        
        setUser(userData);
        localStorage.setItem('essayhuzz_user', JSON.stringify(userData));
        return { success: true };
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate verification token
      const token = generateVerificationToken(data.email);
      
      // Send verification email
      await sendVerificationEmail(data.email, token);
      
      // Create user with unverified email
      const userData: User = {
        id: Date.now().toString(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        emailVerified: false
      };
      
      // Store user data in local storage but mark as unverified
      localStorage.setItem('essayhuzz_user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, needsVerification: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, needsVerification: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      localStorage.removeItem('essayhuzz_user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      // Generate new token
      const token = generateVerificationToken(email);
      
      // Send verification email
      return await sendVerificationEmail(email, token);
    } catch (error) {
      console.error('Error resending verification email:', error);
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // Check if token exists and is valid
      const tokenData = mockVerificationTokens[token];
      
      if (!tokenData) {
        return false; // Token not found
      }
      
      if (tokenData.expiresAt < Date.now()) {
        delete mockVerificationTokens[token];
        return false; // Token expired
      }
      
      // Mark email as verified
      mockVerifiedEmails.push(tokenData.email);
      
      // Remove used token
      delete mockVerificationTokens[token];
      
      // Update user if logged in
      if (user && user.email === tokenData.email) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        localStorage.setItem('essayhuzz_user', JSON.stringify(updatedUser));
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
      isAuthenticated: !!user,
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