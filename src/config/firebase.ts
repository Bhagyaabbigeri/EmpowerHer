import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth';

// 🔐 Firebase configuration (from .env.local)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate environment variables
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error('Missing Firebase configuration. Please check your .env file.');
}

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Set custom parameters for Google Auth
// This forces account selection even when one account is available
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Interface for the backend response
interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    uid: string;
    name: string;
    email: string;
    profileImage?: string;
    provider: string;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Handles Google Sign-In and creates/updates user in our backend
 * @returns Promise with user data from our backend
 */
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  console.log('Initiating Google Sign-In...');
  try {
    // 1. Sign in with Google using Firebase Auth
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;
    
    if (!user.email || !user.displayName) {
      throw new Error('Google account is missing required information');
    }

    // 2. Prepare user data for our backend
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL || ''
    };

    console.log('Sending user data to backend...', userData);
    
    // 3. Send user data to our backend
    const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to authenticate with backend');
    }

    console.log('Backend authentication successful:', data);
    return data;
    
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    
    // Sign out from Firebase if there was an error
    if (auth.currentUser) {
      await signOut(auth);
    }
    
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    
    throw new Error('Authentication failed');
  }
};

// ✅ Sign out function
export const logout = async (): Promise<void> => {
  try {
    // Clear any stored tokens or user data from localStorage
    localStorage.removeItem('authToken');
    
    // Sign out from Firebase
    await signOut(auth);
    console.log('Successfully signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    if (error instanceof Error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
    throw new Error('Sign out failed');
  }
};

// Export auth instance for other components to use
export { auth };
