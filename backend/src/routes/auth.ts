import express from 'express';
import { register, login, verifyEmail, getCurrentUser } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

export default router; 