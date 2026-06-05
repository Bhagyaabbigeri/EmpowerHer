import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = await verifyToken(token);
    
    // Get user from the token
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    const message = error instanceof Error ? error.message : 'Token is not valid';
    res.status(401).json({ message });
  }
};

// Role-based access control middleware (optional, for future use)
export const authorize = (...requiredRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }
    
    // If no roles are required, allow access
    if (requiredRoles.length === 0) {
      return next();
    }
    
    // Check if user has any of the required roles
    // Note: You'll need to add a 'roles' field to your User model if you want to use this
    const userRoles = req.user.roles || [];
    const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
    
    if (!hasRequiredRole) {
      return res.status(403).json({
        message: 'You do not have permission to access this resource'
      });
    }
    
    next();
  };
};
