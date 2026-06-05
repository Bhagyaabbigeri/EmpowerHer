import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Shield, Loader2, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
// Define LocationData interface
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { sendEmergencyEmail } from '@/services/emailService';
import { useAudio } from 'react-use';

// Audio for SOS beep
const SOS_BEEP = 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3';

export const EmergencyAlert = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSOSOptions, setShowSOSOptions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [audio, state, controls] = useAudio({
    src: SOS_BEEP,
    autoPlay: false,
    loop: true
  });
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get user name from localStorage
  const getUserName = (): string => {
    return localStorage.getItem('userName') || 'User';
  };

  // Play SOS beep sound
  const playSOSBeep = async () => {
    try {
      // Ensure audio context is in a resumed state
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise.catch(error => {
            console.warn('Audio playback failed:', error);
            // If autoplay was prevented, show a message to the user
            if (error.name === 'NotAllowedError') {
              toast({
                title: 'Audio Permission Required',
                description: 'Please interact with the page to enable audio alerts.',
                variant: 'default',
              });
            }
          });
        }
      }
    } catch (error) {
      console.error('Error playing SOS sound:', error);
    }
  };

  // Stop SOS beep sound
  const stopSOSBeep = () => {
    controls.pause();
    controls.seek(0);
  };

  // Handle SOS button press
  const handleSOSPress = async () => {
    if (isActivated) {
      // Cancel emergency
      setIsActivated(false);
      setIsSending(false);
      stopSOSBeep();
      return;
    }

    // Show options
    setShowSOSOptions(true);
  };

  // Send emergency alert
  const sendEmergencyAlert = async () => {
    setIsSending(true);
    setShowSOSOptions(false);

    try {
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });

      // Get user's name from localStorage or use a default
      const userName = localStorage.getItem('userName') || 'User';
      
      // Format current time
      const currentTime = new Date().toLocaleString();
      
      // Format location string
      const locationString = currentLocation 
        ? `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`
        : 'Location unavailable';
      
      // Send email alert with all required parameters
      await sendEmergencyEmail({
        user_name: userName,
        time: currentTime,
        location: locationString,
        source: 'SOS Button'
      });
      
      // Activate emergency mode
      setIsActivated(true);
      playSOSBeep();

      toast({
        title: 'Emergency Alert Sent!',
        description: 'Your emergency contacts have been notified with your location.',
      });
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to send emergency alert. Please try again.',
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
  const stopEmergency = () => {
    setIsActivated(false);
    stopSOSBeep();
  };

  // Initialize audio on user interaction
  const initializeAudio = () => {
    if (!audioInitialized) {
      setAudioInitialized(true);
      // This will trigger the audio context to be created
      const audio = new Audio(SOS_BEEP);
      audio.load();
      audioRef.current = audio;
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      onClick={initializeAudio}
      onKeyDown={initializeAudio}
      role="button"
      tabIndex={0}
    >
      {audio}
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <button
          onClick={isActivated ? stopEmergency : handleSOSPress}
          disabled={isSending}
          className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200 ${isActivated ? 'bg-red-600 animate-pulse' : 'bg-red-500'}`}
        >
          {isSending ? (
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full ${isActivated ? 'bg-red-600' : 'bg-red-500'} ${isActivated ? 'animate-ping' : 'opacity-0'} opacity-20`}></div>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
                <span className="mt-2 text-lg font-bold text-white">
                  {isActivated ? 'CANCEL' : 'SOS'}
                </span>
              </div>
            </>
          )}
        </button>
        <h3 className="mt-6 text-2xl font-bold text-gray-900">
          {isActivated ? 'Emergency Alert Active' : 'Emergency Alert'}
        </h3>
        <p className="mt-2 text-gray-600">
          {isActivated 
            ? 'Your location is being shared with emergency contacts' 
            : 'Press the button to alert your emergency contacts with your location'}
        </p>
      </div>

      {/* Emergency Options Dialog */}
      <Dialog open={showSOSOptions} onOpenChange={setShowSOSOptions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-red-600">Emergency Alert</DialogTitle>
            <DialogDescription className="text-center">
              Send an emergency alert to your trusted contacts with your current location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <p className="text-sm text-red-800">
                This will send your current location to your emergency contacts. Only use in case of a real emergency.
              </p>
            </div>
            
            <Button
              variant="destructive"
              size="lg"
              className="w-full justify-start"
              onClick={sendEmergencyAlert}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Emergency Alert
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-start"
              onClick={() => {
                callEmergencyServices();
                setShowSOSOptions(false);
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Emergency Services (100)
            </Button>
            
            <div className="text-xs text-muted-foreground text-center mt-2">
              <p>Your location will be included in the alert.</p>
              {currentLocation && (
                <p className="mt-1 text-green-600">
                  Location available: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Active Emergency Status */}
      {isActivated && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-pulse">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-bold text-red-800">EMERGENCY ALERT ACTIVE</span>
          </div>
          <p className="mt-2 text-sm text-red-700">
            Your emergency contacts have been notified with your location.
          </p>
          {currentLocation && (
            <div className="mt-3">
              <p className="text-xs font-medium text-red-800">Your current location:</p>
              <a 
                href={`https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm block mt-1"
              >
                View on Google Maps
              </a>
              <p className="text-xs text-gray-600 mt-1">
                {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
              </p>
            </div>
          )}
          <div className="mt-3 pt-3 border-t border-red-100">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
              onClick={stopEmergency}
            >
              Cancel Emergency
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAlert;
