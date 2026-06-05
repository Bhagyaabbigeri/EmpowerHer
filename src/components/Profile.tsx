import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User } from '../contexts/AuthContext';

export function Profile() {
  const { user: authUser, updateProfile, logout } = useAuth();
  const [user, setUser] = useState<User | null>(authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name || '',
    email: authUser?.email || '',
    phone: authUser?.phone || '',
  });
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([]);
  const [newContact, setNewContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      setEmergencyContacts(authUser.emergencyContacts || []);
      setFormData({
        name: authUser.name || '',
        email: authUser.email || '',
        phone: authUser.phone || '',
      });
    }
  }, [authUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const success = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        emergencyContacts: emergencyContacts
      });
      
      if (success) {
        // Update the SOS alert system with new contacts
        if (window.sosAlert) {
          window.sosAlert.setEmergencyContacts(emergencyContacts);
        }
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating your profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  {isEditing ? 'Edit your profile information' : 'View your profile information'}
                </CardDescription>
              </div>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage 
                    src={user.profileImage} 
                    alt={user.name} 
                  />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">
                  Signed in with {user.provider === 'google' ? 'Google' : 'Email'}
                </p>
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Full Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled // Email is not editable
                        className="bg-muted"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Emergency Contacts
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          value={newContact}
                          onChange={(e) => setNewContact(e.target.value)}
                          placeholder="Enter emergency email"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (newContact && !emergencyContacts.includes(newContact)) {
                              setEmergencyContacts([...emergencyContacts, newContact]);
                              setNewContact('');
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {emergencyContacts.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {emergencyContacts.map((contact, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                              <span className="text-sm">{contact}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEmergencyContacts(
                                    emergencyContacts.filter((_, i) => i !== index)
                                  );
                                }}
                                className="text-destructive hover:text-destructive/80"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    
                    {success && (
                      <p className="text-sm text-green-600">{success}</p>
                    )}
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setError('');
                          setSuccess('');
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    
                    {user.phone && (
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                    )}

                    {emergencyContacts.length > 0 && (
                      <div>
                        <p className="text-sm font-medium">Emergency Contacts</p>
                        <ul className="mt-1 space-y-1">
                          {emergencyContacts.map((contact, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {contact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <Button variant="outline" onClick={() => logout()}>
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
