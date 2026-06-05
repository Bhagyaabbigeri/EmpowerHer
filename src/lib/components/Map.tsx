// Map.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { loadGoogleMapsApi } from '@/lib/utils/googleMaps';

interface MapProps {
  origin: string;
  destination: string;
  onRouteCalculated?: (distance: string, duration: string) => void;
}

const Map: React.FC<MapProps> = ({ origin, destination, onRouteCalculated }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Format duration for display
  const formatDuration = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.ceil((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  }, []);

  // Format distance to km with one decimal place
  const formatDistance = useCallback((meters: number): string => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  }, []);

  // Initialize the map
  const initMap = useCallback(async () => {
    try {
      if (!mapRef.current) {
        setMapError('Map container not found');
        return false;
      }

      try {
        // Create map instance
        mapInstance.current = new google.maps.Map(mapRef.current, {
          zoom: 7,
          center: { lat: 17.3850, lng: 78.4867 }, // Center of India
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        // Initialize directions service and renderer
        directionsService.current = new google.maps.DirectionsService();
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          map: mapInstance.current,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#3b82f6',
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
        });

        return true;
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to load Google Maps. Please check your API key and internet connection.');
        return false;
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to load Google Maps. Please check your API key and internet connection.');
      return false;
    }
  }, []);

  // Calculate and display route
  const calculateAndDisplayRoute = useCallback(async () => {
    if (!directionsService.current || !directionsRenderer.current || !origin || !destination) {
      return;
    }

    try {
      // Geocode origin and destination
      const geocoder = new google.maps.Geocoder();
      
      const [originResult, destResult] = await Promise.all([
        new Promise<google.maps.GeocoderResult[]>((resolve) => 
          geocoder.geocode({ address: origin }, (results, status) => 
            status === 'OK' ? resolve(results || []) : resolve([])
          )
        ),
        new Promise<google.maps.GeocoderResult[]>((resolve) => 
          geocoder.geocode({ address: destination }, (results, status) => 
            status === 'OK' ? resolve(results || []) : resolve([])
          )
        )
      ]);

      if (!originResult?.[0] || !destResult?.[0]) {
        throw new Error('Could not find one or both locations');
      }

      const originLocation = originResult[0].geometry.location;
      const destLocation = destResult[0].geometry.location;

      // Set map view to show both locations
      if (mapInstance.current) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(originLocation);
        bounds.extend(destLocation);
        mapInstance.current.fitBounds(bounds);
      }

      // Calculate and display route
      const response = await directionsService.current!.route({
        origin: originLocation,
        destination: destLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      directionsRenderer.current!.setDirections(response);
      
      // Get route details
      const route = response.routes[0];
      const distance = formatDistance(route.legs[0].distance!.value);
      const duration = formatDuration(route.legs[0].duration!.value);
      
      // Call the callback with distance and duration
      onRouteCalculated?.(distance, duration);
      setMapError(null);
      
    } catch (error) {
      console.error('Error calculating route:', error);
      setMapError('Could not calculate route. Please check the locations and try again.');
    }
  }, [origin, destination, formatDistance, formatDuration, onRouteCalculated]);

  // Load Google Maps script and initialize map
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        await loadGoogleMapsApi();
        if (isMounted && origin && destination) {
          const initialized = await initMap();
          if (initialized) {
            await calculateAndDisplayRoute();
          }
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        if (isMounted) {
          setMapError('Failed to load Google Maps. Please check your API key and internet connection.');
        }
      }
    };

    if (origin && destination) {
      initialize();
    }

    return () => {
      isMounted = false;
    };
  }, [origin, destination, initMap, calculateAndDisplayRoute]);

  // Recalculate route when origin or destination changes
  useEffect(() => {
    if (window.google && origin && destination) {
      calculateAndDisplayRoute();
    }
  }, [origin, destination, calculateAndDisplayRoute]);

  return (
    <div className="h-full w-full relative">
      <div ref={mapRef} className="h-full w-full" />
      {mapError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-10">
          {mapError}
        </div>
      )}
    </div>
  );
};

export default Map;