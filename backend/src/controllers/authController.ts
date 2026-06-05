import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { validationResult } from 'express-validator';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // Longer expiry for better UX

export interface AuthRequest extends Request {
  user?: IUser;
}

// Generate JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  // Implementation for password reset
  res.status(200).json({ message: 'Password reset email sent' });
};

type GoogleUserData = {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
};

/**
 * Google OAuth authentication
 * Creates or updates a user based on Google OAuth data
 */
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { uid, email, name, photoURL }: GoogleUserData = req.body;

    if (!uid || !email || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists by UID (Firebase UID)
    let user = await User.findOne({ uid });

    if (user) {
      // Update last login time
      user.lastLoginAt = new Date();
      await user.save();
    } else {
      // Create new user if doesn't exist
      user = new User({
        uid,
        email,
        name,
        profileImage: photoURL || '',
        provider: 'google',
        lastLoginAt: new Date(),
      });
      await user.save();
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Return user data and token
    const userData = {
      id: user._id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      provider: user.provider,
      lastLoginAt: user.lastLoginAt,
    };

    res.status(200).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};
