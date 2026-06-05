import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

export const getCurrentUser = async (req: any, res: Response) => {
  try {
    // Get user from request object (set by auth middleware)
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name, email } = req.body;
    
    // Build user object
    const userFields: { name?: string; email?: string } = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if email is already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    // Update user
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
