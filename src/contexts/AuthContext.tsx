// src/contexts/AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithGoogle, logout as firebaseSignOut, auth } from '../config/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export type User = {
  id: string;
  uid: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  emergencyContacts?: string[];
  profileImage?: string;
  provider: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

type AuthTokens = {
  token: string;
  refreshToken?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKENS_KEY = 'empowerher_auth_tokens';
const API_BASE_URL = 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isBrowser = typeof window !== 'undefined';

  // Initialize axios interceptor
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const tokens = getStoredTokens();
        if (tokens?.token) {
          config.headers.Authorization = `Bearer ${tokens.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const getStoredTokens = (): AuthTokens | null => {
    if (!isBrowser) return null;
    const storedTokens = localStorage.getItem(AUTH_TOKENS_KEY) || sessionStorage.getItem(AUTH_TOKENS_KEY);
    return storedTokens ? JSON.parse(storedTokens) : null;
  };

  // Load user from token on initial load
  useEffect(() => {
    const loadUser = async () => {
      if (!isBrowser) {
        setLoading(false);
        return;
      }

      try {
        const tokens = getStoredTokens();
        if (tokens?.token) {
          // Verify token with backend
          const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
              'Authorization': `Bearer ${tokens.token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.data) {
            setUser(response.data);
          } else {
            clearAuthData();
          }
        }
      } catch (error) {
        console.error('Failed to load user data', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [isBrowser]);

  const clearAuthData = () => {
    if (isBrowser) {
      localStorage.removeItem(AUTH_TOKENS_KEY);
      sessionStorage.removeItem(AUTH_TOKENS_KEY);
      localStorage.removeItem('authToken');
    }
    setUser(null);
  };

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    if (!isBrowser) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      // Store token in appropriate storage
      const authData = { token };
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authData));
      
      setUser(userData);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      // 1. Sign in with Google and get user data from our backend
      const response = await signInWithGoogle();
      
      if (!response.success || !response.user) {
        throw new Error('Failed to authenticate with Google');
      }
      
      const { user, token } = response;
      
      // 2. Store the auth token in both localStorage and sessionStorage
      const authData = { token };
      localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authData));
      
      // 3. Set the user in state with all required fields
      const userData: User = {
        id: user.id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        provider: user.provider,
        lastLoginAt: user.lastLoginAt || new Date().toISOString(),
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.updatedAt || new Date().toISOString(),
        role: 'user', // Default role
        phone: '' // Default empty phone number
      };
      
      setUser(userData);
      
      // 4. Set the default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // 5. Redirect to dashboard
      navigate('/dashboard');
      return true;
      
    } catch (error) {
      console.error('Google login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
      setError(errorMessage);
      
      // Show error toast using the toast function from useToast
      try {
        const { toast } = await import('@/components/ui/use-toast');
        toast({
          title: 'Google Sign-In Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      } catch (toastError) {
        console.error('Failed to show toast:', toastError);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (!isBrowser) return false;

    setLoading(true);
    setError(null);

    try {
      console.log('Sending registration request with:', { name, email, password });
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      console.log('Registration response:', response.data);
      
      if (response.data && response.data.user) {
        // Auto-login after successful registration
        const loginSuccess = await login(email, password, true);
        if (loginSuccess) {
          return true;
        }
      }
      
      throw new Error('Registration completed but failed to log in automatically');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid registration data';
        } else if (error.response.status === 409) {
          errorMessage = 'An account with this email already exists';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'Unable to connect to the server. Please check your connection.';
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase
      await firebaseSignOut();
      
      // Clear any stored tokens and user data
      clearAuthData();
      
      // Clear axios default headers
      delete axios.defaults.headers.common['Authorization'];
      
      // Redirect to login page
      navigate('/login');
      
      // Show success message using the toast function from useToast
      try {
        const { toast } = await import('@/components/ui/use-toast');
        toast({
          title: 'Signed Out',
          description: 'You have been successfully signed out.',
        });
      } catch (toastError) {
        console.error('Failed to show toast:', toastError);
      }
    } catch (error) {
      console.error('Error during sign out:', error);
      
      // Even if there's an error, we should still clear local data
      clearAuthData();
      navigate('/login');
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!isBrowser || !user) return false;

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/user/profile`,
        updates,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getStoredTokens()?.token}`
          }
        }
      );

      if (response.data) {
        // Update the user in state with the new data
        setUser(prev => ({
          ...prev!,
          ...updates,
          updatedAt: new Date().toISOString()
        }));
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      
      // Show error toast using the toast function from useToast
      try {
        const { toast } = await import('@/components/ui/use-toast');
        toast({
          title: 'Update Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      } catch (toastError) {
        console.error('Failed to show toast:', toastError);
      }
      
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    register,
    logout,
    updateProfile,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}