import React, { useState, useEffect } from 'react';
import { threatDetectionService } from '../services/threatDetectionService';
import { EmergencyContact } from '../types/emergency';

interface ThreatDetectionProps {
  userName: string;
  contacts: EmergencyContact[];
  onThreatDetected?: () => void;
}

const ThreatDetection: React.FC<ThreatDetectionProps> = ({
  userName,
  contacts,
  onThreatDetected,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Tap to start detection');
  const [lastDetected, setLastDetected] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the service with user info
    threatDetectionService.setUserInfo(userName, contacts);

    // Cleanup on unmount
    return () => {
      threatDetectionService.stopListening();
    };
  }, [userName, contacts]);

  const toggleListening = () => {
    if (isListening) {
      threatDetectionService.stopListening();
      setIsListening(false);
      setStatus('Tap to start detection');
    } else {
      threatDetectionService.startListening();
      setIsListening(true);
      setStatus('Listening for threats...');
      setLastDetected(null);
    }
  };

  // Listen for threat detection events
  useEffect(() => {
    const handleThreatDetected = (transcript: string) => {
      setLastDetected(transcript);
      setStatus('Threat detected! Alert sent.');
      onThreatDetected?.();
      
      // Stop listening after detection
      setTimeout(() => {
        threatDetectionService.stopListening();
        setIsListening(false);
        setStatus('Tap to start detection');
      }, 5000);
    };

    // Add event listener for threat detection
    window.addEventListener('threatDetected', ((e: CustomEvent) => {
      handleThreatDetected(e.detail.transcript);
    }) as EventListener);

    return () => {
      window.removeEventListener('threatDetected', ((e: CustomEvent) => {
        handleThreatDetected(e.detail.transcript);
      }) as EventListener);
    };
  }, [onThreatDetected]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Voice Threat Detection</h2>
      
      <div className="flex flex-col items-center">
        <button
          onClick={toggleListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        
        <p className="text-center text-gray-600 mb-2">{status}</p>
        
        {lastDetected && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg w-full">
            <h3 className="font-medium text-red-800">Threat Detected:</h3>
            <p className="text-red-700">"{lastDetected}"</p>
          </div>
        )}
        
        <div className="mt-6 w-full">
          <h3 className="font-medium text-gray-700 mb-2">Threat Types Detected</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            {lastDetected ? (
              <div className="text-red-600">
                <p>• Harassment</p>
                <p>• Threat detected in speech</p>
              </div>
            ) : (
              <p className="text-gray-500">No threats detected</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Note: The app will automatically detect threatening language and send an alert to your emergency contacts with your location.</p>
      </div>
    </div>
  );
};

export default ThreatDetection;
