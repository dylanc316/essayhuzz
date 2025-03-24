import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Check header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication invalid'
      });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Verify token
      const payload = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your-secret-key'
      ) as UserPayload;
      
      // Attach user to request object
      req.user = { userId: payload.userId };
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Authentication invalid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during authentication'
    });
  }
};

export default authMiddleware;

 