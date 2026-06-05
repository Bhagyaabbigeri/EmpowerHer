import { User } from '../contexts/AuthContext';

// Extend the User type to include emergencyContacts
export type UserWithEmergencyContacts = User & {
  emergencyContacts?: string[];
};

declare global {
  interface Window {
    sosAlert?: {
      setEmergencyContacts: (emails: string[]) => void;
    };
  }
}

export {}; // This file needs to be a module
