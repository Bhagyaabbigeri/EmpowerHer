// googleMaps.ts
console.log('Environment variables:', import.meta.env);
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log('Google Maps API Key:', GOOGLE_MAPS_API_KEY ? 'Key exists' : 'Key is missing or undefined');

declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

export const loadGoogleMapsApi = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(true);
      return;
    }

    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key is not configured in environment variables');
      console.error('Make sure VITE_GOOGLE_MAPS_API_KEY is set in your .env file');
      reject(new Error('Google Maps API key is not configured in environment variables'));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,directions`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps API script loaded successfully');
      if (window.google && window.google.maps) {
        console.log('Google Maps API is available');
        resolve(true);
      } else {
        console.error('Google Maps API is not available on window object');
        reject(new Error('Failed to load Google Maps API'));
      }
    };
    
    script.onerror = (error) => {
      console.error('Error loading Google Maps API script:', error);
      reject(new Error(`Failed to load Google Maps API script: ${error}`));
    };
    
    console.log('Attempting to load Google Maps API with key:', GOOGLE_MAPS_API_KEY);

    document.head.appendChild(script);
  });
};
