import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Protected routes (require authentication)
router.route('/profile')
  .get(authenticate, getProfile)
  .put(authenticate, updateProfile);

export default router;
