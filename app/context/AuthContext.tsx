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

// Mock users database - this would be replaced with a real database in production
const MOCK_USERS: Record<string, User> = {
  'demo@example.com': {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: '/avatar-placeholder.png',
    emailVerified: true
  }
};

// Mock passwords database
const MOCK_PASSWORDS: Record<string, string> = {
  'demo@example.com': 'password'
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

  // Send verification email (real implementation)
  const sendVerificationEmail = async (email: string, token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          type: 'verification',
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Log preview URL in development (useful for Ethereal test emails)
      if (data.previewUrl) {
        console.log('Email preview URL:', data.previewUrl);
      }
      
      // For demo purposes in development - auto-verify after delay
      // This makes the app work without actually clicking email links
      setTimeout(() => {
        mockVerifiedEmails.push(email);
        
        // If user is already logged in with this email, update their status
        if (user && user.email === email) {
          const updatedUser = { ...user, emailVerified: true };
          setUser(updatedUser);
          localStorage.setItem('essayhuzz_user', JSON.stringify(updatedUser));
        }
        
        console.log('Auto-verified email for testing:', email);
      }, 5000); // Auto-verify after 5 seconds for testing
      
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; needsVerification?: boolean }> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the user exists in our mock database
      const existingUser = MOCK_USERS[credentials.email];
      const correctPassword = MOCK_PASSWORDS[credentials.email] === credentials.password;
      
      if (existingUser && correctPassword) {
        // Check if email is verified
        const isVerified = mockVerifiedEmails.includes(credentials.email);
        
        if (!isVerified) {
          // Generate and send a new verification token
          const token = generateVerificationToken(credentials.email);
          await sendVerificationEmail(credentials.email, token);
          
          return { success: false, needsVerification: true };
        }
        
        setUser(existingUser);
        localStorage.setItem('essayhuzz_user', JSON.stringify(existingUser));
        return { success: true };
      }
      
      // If no existing user, check if this is a newly registered user trying to log in
      if (credentials.email.endsWith('@example.com') && credentials.password.length >= 6) {
        // The simplified approach for testing - create a new user entry if it doesn't exist
        const isVerified = mockVerifiedEmails.includes(credentials.email);
        
        if (!isVerified) {
          // Generate and send a new verification token
          const token = generateVerificationToken(credentials.email);
          await sendVerificationEmail(credentials.email, token);
          
          return { success: false, needsVerification: true };
        }
        
        // Create a simple display name from email
        const nameParts = credentials.email.split('@')[0].split('.');
        const name = nameParts.map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
        
        const newUser: User = {
          id: Date.now().toString(),
          name: name || 'User',
          email: credentials.email,
          emailVerified: true
        };
        
        // Store new user
        MOCK_USERS[credentials.email] = newUser;
        MOCK_PASSWORDS[credentials.email] = credentials.password;
        
        setUser(newUser);
        localStorage.setItem('essayhuzz_user', JSON.stringify(newUser));
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
      
      // Check if user already exists
      if (MOCK_USERS[data.email]) {
        return { success: false, needsVerification: false };
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        emailVerified: false
      };
      
      // Store user in mock database
      MOCK_USERS[data.email] = newUser;
      MOCK_PASSWORDS[data.email] = data.password;
      
      // Generate verification token
      const token = generateVerificationToken(data.email);
      
      // Send verification email
      await sendVerificationEmail(data.email, token);
      
      // Store user data in local storage but mark as unverified
      localStorage.setItem('essayhuzz_user', JSON.stringify(newUser));
      setUser(newUser);
      
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
      } else {
        // Update stored user record
        const storedUser = MOCK_USERS[tokenData.email];
        if (storedUser) {
          storedUser.emailVerified = true;
          MOCK_USERS[tokenData.email] = storedUser;
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