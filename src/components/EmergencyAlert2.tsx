import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Shield, Loader2, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { emergencyService } from '@/services/emergencyService';
import { sendEmergencyEmail } from '@/services/emailService';
import { LocationData, EmergencyContact } from '@/types/emergency';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const EmergencyAlert2 = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSOSOptions, setShowSOSOptions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [locationWatchId, setLocationWatchId] = useState<number | null>(null);

  // Get trusted contacts from localStorage
  const getTrustedContacts = (): EmergencyContact[] => {
    const stored = localStorage.getItem('trustedContacts');
    const contacts = stored ? JSON.parse(stored) : [];
    // Ensure each contact has an ID
    return contacts.map((contact: any, index: number) => ({
      id: contact.id || `contact-${index}`,
      name: contact.name,
      phone: contact.phone,
      isPrimary: contact.isPrimary || false
    }));
  };

  // Get user name from localStorage
  const getUserName = (): string => {
    return localStorage.getItem('userName') || 'User';
  };

  // Handle SOS button press
  const handleSOSPress = async () => {
    if (isActivated) {
      // Cancel emergency
      setIsActivated(false);
      setIsSending(false);
      stopLocationTracking();
      return;
    }

    // Start location tracking
    try {
      const location = await emergencyService.getCurrentLocation();
      setCurrentLocation(location);
      setShowSOSOptions(true);
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: 'Location Error',
        description: 'Could not get your location. Please enable location services.',
        variant: 'destructive',
      });
    }
  };

  // Start location tracking
  const startLocationTracking = () => {
    try {
      const watchId = emergencyService.watchLocation(
        (location) => {
          setCurrentLocation(location);
        },
        (error) => {
          console.error('Location tracking error:', error);
        }
      );
      setLocationWatchId(watchId);
    } catch (error) {
      console.error('Error starting location tracking:', error);
    }
  };

  // Stop location tracking
  const stopLocationTracking = () => {
    if (locationWatchId !== null) {
      emergencyService.clearLocationWatch(locationWatchId);
      setLocationWatchId(null);
    }
  };

  // Send emergency alert
  const sendEmergencyAlert = async () => {
    setIsSending(true);
    setShowSOSOptions(false);

    try {
      // Get current location if not already available
      let location = currentLocation;
      if (!location) {
        location = await emergencyService.getCurrentLocation();
        setCurrentLocation(location);
      }

      // Get user name
      const userName = getUserName();
      
      // Send email alert
      await sendEmergencyEmail('SOS Button', userName);

      // Start location tracking
      startLocationTracking();
      setIsActivated(true);

      toast({
        title: 'Emergency Alert Sent',
        description: 'Your emergency contacts have been notified with your location via email.',
      });
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send emergency alert',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  // Call emergency services
  const callEmergencyServices = () => {
    window.open('tel:100', '_blank');
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Emergency Alert</h3>
            <p className="text-sm text-gray-500">One press to alert emergency contacts with live location</p>
          </div>
        </div>
        <Button
          variant={isActivated ? 'destructive' : 'default'}
          size="lg"
          className="font-bold"
          onClick={handleSOSPress}
          disabled={isSending}
        >
          {isSending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isActivated ? (
            'Cancel Emergency'
          ) : (
            'SOS EMERGENCY'
          )}
        </Button>
      </div>

      {/* Emergency Options Dialog */}
      <Dialog open={showSOSOptions} onOpenChange={setShowSOSOptions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">Emergency Options</DialogTitle>
            <DialogDescription className="text-center">
              Choose how you'd like to proceed with the emergency alert.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="destructive"
              size="lg"
              className="w-full justify-start"
              onClick={sendEmergencyAlert}
              disabled={isSending}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSending ? 'Sending...' : 'Send Alert to Contacts'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-start"
              onClick={callEmergencyServices}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Emergency Services
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Active Emergency Status */}
      {isActivated && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-medium text-yellow-800">Emergency Alert Active</span>
          </div>
          <p className="mt-1 text-sm text-yellow-700">
            Your location is being shared with your emergency contacts.
          </p>
          {currentLocation && (
            <p className="mt-2 text-xs text-yellow-600">
              Last location: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
