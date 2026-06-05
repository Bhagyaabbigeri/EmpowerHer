// src/components/features/AIThreatDetection.tsx
import { useState, useRef } from 'react';
import { Mic, MicOff, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '../ui/button';

const AIThreatDetection = () => {
  const [isListening, setIsListening] = useState(false);
  const [threatDetected, setThreatDetected] = useState(false);
  const [threatType, setThreatType] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const audioRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
          // Simulate threat detection
          simulateThreatDetection();
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsListening(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopListening = () => {
    if (audioRef.current) {
      audioRef.current.stream.getTracks().forEach(track => track.stop());
      audioRef.current.stop();
      audioRef.current = null;
    }
    setIsListening(false);
    setAudioChunks([]);
  };

  const simulateThreatDetection = () => {
    // In a real app, this would be an API call to your backend
    const threats = ['Harassment', 'Threat', 'Abuse'];
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%
    
    if (Math.random() > 0.7) { // 30% chance to detect a threat
      setThreatDetected(true);
      setThreatType(randomThreat);
      setConfidence(randomConfidence);
    } else {
      setThreatDetected(false);
      setThreatType(null);
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">AI Threat Detection</h3>
        <p className="text-sm text-muted-foreground">
          {isListening 
            ? 'Listening for potential threats...' 
            : 'Enable to detect threats in real-time'}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleToggleListening}
          className={`h-20 w-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isListening
              ? 'bg-red-100 text-red-600 animate-pulse'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          {isListening ? (
            <MicOff className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </button>
      </div>

      {threatDetected && threatType && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Potential Threat Detected!</p>
            <p className="text-sm mt-1">
              Type: {threatType} ({confidence}% confidence)
            </p>
            <div className="mt-2 flex gap-2">
              <Button variant="destructive" size="sm">
                Report
              </Button>
              <Button variant="outline" size="sm" className="border-red-200 text-red-800">
                Get Help
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-3 bg-muted/30 rounded-lg">
          <Shield className="h-5 w-5 mx-auto mb-1 text-blue-600" />
          <p>Harassment</p>
          <p className="text-muted-foreground text-xs">Detection</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <Shield className="h-5 w-5 mx-auto mb-1 text-amber-600" />
          <p>Threat</p>
          <p className="text-muted-foreground text-xs">Detection</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <Shield className="h-5 w-5 mx-auto mb-1 text-red-600" />
          <p>Abuse</p>
          <p className="text-muted-foreground text-xs">Detection</p>
        </div>
      </div>
    </div>
  );
};

export default AIThreatDetection;