// app/lib/tokens.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('JWT_SECRET is not defined in the environment variables!');
}

// Generate JWT token for authentication
export const generateToken = (user: any): string => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified
    },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// Generate random token for email verification or password reset
export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Get user data from token for client
export const getUserFromToken = (token: string): any => {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  return {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    emailVerified: decoded.emailVerified
  };
};