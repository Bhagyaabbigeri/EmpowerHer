import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceThreatDetection = () => {
  const [isListening, setIsListening] = useState(false);
  const [threats, setThreats] = useState([
    { type: 'Harassment', detected: false },
    { type: 'Threats', detected: false },
    { type: 'Discrimination', detected: false },
    { type: 'Hate Speech', detected: false },
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    // TODO: Implement actual voice detection logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">Voice Threat Detection</h1>
        
        <div className="flex flex-col items-center space-y-4 py-8">
          <button
            onClick={toggleListening}
            className={`p-6 rounded-full ${isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500`}
            aria-label={isListening ? 'Stop detection' : 'Start detection'}
          >
            {isListening ? (
              <MicOff className="w-12 h-12" />
            ) : (
              <Mic className="w-12 h-12" />
            )}
          </button>
          <p className="text-gray-600">
            {isListening ? 'Listening for threats...' : 'Tap to start detection'}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Threat Types Detected</h2>
          <div className="space-y-3">
            {threats.map((threat, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center p-4 rounded-lg border ${
                  threat.detected 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <span className="font-medium text-gray-800">{threat.type}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  threat.detected 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {threat.detected ? 'Threat detected' : 'No threats detected'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceThreatDetection;
