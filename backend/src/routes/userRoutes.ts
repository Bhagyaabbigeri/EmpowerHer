import { Router } from 'express';
import { body } from 'express-validator';
import { getCurrentUser, updateProfile } from '../controllers/userController';
import { auth } from '../middleware/authMiddleware';

const router = Router();

// All routes in this file are protected by the auth middleware
router.use(auth);

// @route   GET api/user/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', getCurrentUser);

// @route   PUT api/user/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    body('name', 'Name is required').optional().not().isEmpty(),
    body('email', 'Please include a valid email').optional().isEmail()
  ],
  updateProfile
);

export default router;
