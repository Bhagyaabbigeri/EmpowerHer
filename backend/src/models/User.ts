import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  uid: string; // Firebase UID
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  profileImage?: string;
  provider: 'email' | 'google';
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    uid: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      select: false,
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    profileImage: {
      type: String,
      default: ''
    },
    provider: {
      type: String,
      enum: ['email', 'google'],
      default: 'email',
      required: true
    },
    lastLoginAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (only for email/password users)
userSchema.pre<IUser>('save', async function (next) {
  // Only hash the password if it's modified (or new) and provider is email
  if (this.provider !== 'email' || !this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password for login (only for email/password users)
userSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  if (!this.password || this.provider !== 'email') return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
