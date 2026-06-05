// RoutePlanner.tsx
import { useState, useEffect } from 'react';
import { MapPin, Route as RouteIcon, X, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Map from './Map';

interface RouteInfo {
  distance: string;
  duration: string;
}

export function RoutePlanner({ onClose }: { onClose: () => void }) {
  const [origin, setOrigin] = useState('Gulbarga');
  const [destination, setDestination] = useState('Koppal');
  const [isLoading, setIsLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [safetyTips] = useState<string[]>([
    'Avoid poorly lit areas at night',
    'Share your route with a trusted contact',
    'Keep emergency numbers saved in your phone',
    'Be aware of your surroundings',
    'Trust your instincts - if something feels wrong, change your route'
  ]);

  const handlePlanRoute = () => {
    if (!origin || !destination) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both origin and destination',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
  };

  const handleRouteCalculated = (distance: string, duration: string) => {
    setRouteInfo({ distance, duration });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Plan Your Route</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Starting Point</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter starting location"
                  className="pl-10"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter destination"
                  className="pl-10"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handlePlanRoute}
            disabled={isLoading || !origin || !destination}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              'Planning Route...'
            ) : (
              <>
                <RouteIcon className="mr-2 h-4 w-4" />
                Plan Route
              </>
            )}
          </Button>

          {isLoading && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Your Route</h3>
              <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
                <Map 
                  origin={origin}
                  destination={destination}
                  onRouteCalculated={handleRouteCalculated}
                />
              </div>
              
              {routeInfo && (
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                  <span>Distance: <span className="font-medium">{routeInfo.distance}</span></span>
                  <span>Duration: <span className="font-medium">{routeInfo.duration}</span></span>
                </div>
              )}
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Safety Tips for Your Journey
                </h4>
                <ul className="space-y-2">
                  {safetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}