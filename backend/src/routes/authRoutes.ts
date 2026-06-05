import { Router } from 'express';
import { body } from 'express-validator';
import { 
  register, 
  login, 
  forgotPassword, 
  googleAuth 
} from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
  ],
  register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

// @route   POST api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   POST api/auth/google
// @desc    Authenticate user with Google
// @access  Public
router.post(
  '/google',
  [
    body('uid', 'User ID is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('name', 'Name is required').not().isEmpty(),
  ],
  validateRequest,
  googleAuth
);

export default router;
