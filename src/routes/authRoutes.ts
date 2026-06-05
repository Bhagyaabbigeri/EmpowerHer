import { Router } from 'express';
import * as authController from '@/controllers/authController';

const router = Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes
router.get('/me', authController.protect, authController.getCurrentUser);

// Admin routes
// Add admin-only routes here if needed

export default router;
