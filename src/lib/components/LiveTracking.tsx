import { useState, useEffect } from 'react';
import { MapPin, Share2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type Location = {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
};

export function LiveTracking({ onClose }: { onClose: () => void }) {
  const [isSharing, setIsSharing] = useState(false);
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
  });
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Get current location
  const getLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    // Request permission and get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
        });
        setIsLoading(false);
        toast({
          title: 'Location Found',
          description: 'Your location has been successfully retrieved.',
        });
      },
      (err) => {
        setError(`Unable to retrieve your location: ${err.message}`);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Start watching position
  const startSharing = () => {
    if (isSharing) {
      // Stop sharing
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
      setIsSharing(false);
      setShareLink('');
      toast({
        title: 'Sharing Stopped',
        description: 'Your live location is no longer being shared.',
      });
      return;
    }

    // Start sharing
    getLocation();
    setIsSharing(true);
    
    // In a real app, you would generate a unique shareable link here
    // and send location updates to your backend
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
        });
        
        // In a real app, you would send this to your backend
        console.log('Location update:', { latitude, longitude });
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setIsSharing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
    
    // Generate a mock shareable link (in a real app, this would be a real URL)
    setShareLink(`https://maps.google.com/?q=${location.latitude},${location.longitude}`);
    
    toast({
      title: 'Live Sharing Started',
      description: 'Your location is now being shared with your emergency contacts.',
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const copyToClipboard = () => {
    if (!shareLink) return;
    
    navigator.clipboard.writeText(shareLink);
    toast({
      title: 'Link Copied',
      description: 'The shareable link has been copied to your clipboard.',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Live Location Tracking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Your Current Location</h3>
                {location.latitude && location.longitude ? (
                  <p className="text-sm text-gray-600 mt-1">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    {location.accuracy && (
                      <span className="text-xs text-gray-500 block mt-1">
                        Accuracy: {Math.round(location.accuracy)} meters
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    {isLoading ? 'Getting your location...' : 'Location not available'}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {shareLink && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">Share your live location:</p>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={shareLink}
                  className="flex-1 bg-white border border-gray-300 rounded-l-md px-3 py-2 text-sm text-gray-700 truncate"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-r-md text-sm font-medium transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This link will be active for 24 hours or until you stop sharing.
              </p>
            </div>
          )}
          
          <div className="pt-2 space-y-3">
            <Button 
              onClick={startSharing}
              disabled={isLoading}
              className={`w-full ${isSharing ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isLoading ? (
                'Loading...'
              ) : isSharing ? (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Stop Sharing
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Start Live Sharing
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              {isSharing 
                ? 'Your location is being shared with your emergency contacts.'
                : 'When enabled, your location will be shared with your emergency contacts.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
