import { useState, useEffect, useRef } from 'react';
import { AlertCircle, ShieldAlert, Loader2, Mic, MicOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendEmergencyEmail } from '@/services/emailService';

const AIThreatButton = () => {
  const [isSending, setIsSending] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [threatText, setThreatText] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [threatLevel, setThreatLevel] = useState<{type: string; level: string} | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // AI Threat Detection Logic
  const detectThreatAI = (inputText: string): { isThreat: boolean; type?: string; level?: string } => {
    const threatCategories = {
      harassment: {
        keywords: ["harass", "harassment", "stalking", "follow", "unwanted attention", "creepy", "weirdo"],
        level: "MEDIUM"
      },
      threat: {
        keywords: ["kill", "hurt", "attack", "assault", "rape", "murder", "harm", "danger", "threat"],
        level: "HIGH"
      },
      emergency: {
        keywords: ["help", "emergency", "911", "police", "ambulance", "save me", "help me"],
        level: "HIGH"
      },
      fear: {
        keywords: ["scared", "afraid", "fear", "terrified", "frightened", "unsafe"],
        level: "LOW"
      }
    };

    inputText = inputText.toLowerCase();
    
    for (const [type, { keywords, level }] of Object.entries(threatCategories)) {
      if (keywords.some(word => inputText.includes(word))) {
        return { isThreat: true, type, level };
      }
    }
    
    return { isThreat: false };
  };

  // Check browser support for speech recognition
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [browserError, setBrowserError] = useState<string | null>(null);
  
  // Debug log for speech recognition support
  useEffect(() => {
    console.log('=== DEBUG ===');
    console.log('SpeechRecognition in window:', 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    console.log('isSpeechSupported:', isSpeechSupported);
    console.log('browserError:', browserError);
    console.log('isSending:', isSending);
    console.log('isListening:', isListening);
    console.log('recognitionRef.current:', recognitionRef.current ? 'Exists' : 'Null');
    
    // Check microphone permission state if possible
    if (navigator.permissions) {
      navigator.permissions.query({name: 'microphone' as PermissionName})
        .then(permissionStatus => {
          console.log('Microphone permission state:', permissionStatus.state);
          permissionStatus.onchange = () => {
            console.log('Microphone permission changed to:', permissionStatus.state);
          };
        })
        .catch(err => console.log('Could not check microphone permission:', err));
    }
    console.log('=============');
  }, [isSpeechSupported, browserError, isSending, isListening]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') {
      console.warn('Window object not available - running in SSR mode');
      return;
    }

    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const errorMsg = 'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.';
      console.error(errorMsg);
      setBrowserError(errorMsg);
      
      // Additional debug info
      console.log('User agent:', navigator.userAgent);
      console.log('Is secure context:', window.isSecureContext);
      return;
    }
    
    setIsSpeechSupported(true);

    try {
      console.log('Initializing speech recognition...');
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };
      
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      recognitionRef.current.onresult = (event) => {
        console.log('Speech recognition result:', event);
        try {
          const transcript = Array.from(event.results)
            .map(result => result[0]?.transcript || '')
            .join('');
          
          console.log('Transcript:', transcript);
          setTranscript(transcript);
          
          // Check for threats in real-time
          const { isThreat, type, level } = detectThreatAI(transcript);
          if (isThreat && type && level) {
            console.log(`Threat detected: ${type} (${level})`);
            setThreatLevel({ type, level });
            if (level === 'HIGH') {
              handleThreatDetected(transcript, type);
            }
          } else {
            setThreatLevel(null);
          }
        } catch (error) {
          console.error('Error processing speech result:', error);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event);
        const errorMessage = event.error === 'not-allowed' 
          ? 'Microphone access was denied. Please allow microphone access in your browser settings.'
          : `Error: ${event.error}`;
        
        toast.error(errorMessage);
        setIsListening(false);
      };
      
      // Request microphone permission immediately
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log('Microphone access granted');
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(error => {
          console.error('Microphone access denied:', error);
          toast.error('Microphone access is required for voice detection. Please enable it in your browser settings.');
        });
        
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      toast.error('Failed to initialize speech recognition. Please refresh the page.');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Toggle voice recognition with better error handling
  const toggleVoiceRecognition = async () => {
    // If speech recognition is not supported, show error and return
    if (!isSpeechSupported) {
      toast.error(browserError || 'Speech recognition is not available in your browser.');
      return;
    }

    // If recognition is not initialized, try to initialize it
    if (!recognitionRef.current) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) throw new Error('Speech recognition not available');
        
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onstart = () => {
          console.log('Speech recognition started');
          setIsListening(true);
        };
        
        recognitionRef.current.onend = () => {
          console.log('Speech recognition ended');
          setIsListening(false);
        };
        
        recognitionRef.current.onresult = (event) => {
          try {
            const transcript = Array.from(event.results)
              .map(result => result[0]?.transcript || '')
              .join('');
            
            console.log('Transcript:', transcript);
            setTranscript(transcript);
            
            // Check for threats in real-time
            const { isThreat, type, level } = detectThreatAI(transcript);
            if (isThreat && type && level) {
              console.log(`Threat detected: ${type} (${level})`);
              setThreatLevel({ type, level });
              if (level === 'HIGH') {
                handleThreatDetected(transcript, type);
              }
            } else {
              setThreatLevel(null);
            }
          } catch (error) {
            console.error('Error processing speech result:', error);
          }
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event);
          const errorMessage = event.error === 'not-allowed' 
            ? 'Microphone access was denied. Please allow microphone access in your browser settings.'
            : `Error: ${event.error}`;
          
          toast.error(errorMessage);
          setIsListening(false);
        };
        
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
        toast.error('Failed to initialize speech recognition. Please refresh the page.');
        return;
      }
    }
    
    try {
      if (isListening) {
        console.log('Stopping speech recognition...');
        recognitionRef.current?.stop();
        setIsListening(false);
        
        // If we have a transcript but no threat was detected, analyze it
        if (transcript && !threatLevel) {
          const { isThreat } = detectThreatAI(transcript);
          if (!isThreat) {
            toast.success("✅ No threats detected in your message");
          }
        }
      } else {
        console.log('Starting speech recognition...');
        
        // Reset state
        setTranscript('');
        setThreatLevel(null);
        
        try {
          // Request microphone permission first
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Stop the stream immediately since we just needed permission
          stream.getTracks().forEach(track => track.stop());
          
          // Start recognition
          recognitionRef.current?.start();
          toast.info("Listening for threats... Speak clearly.");
        } catch (error) {
          console.error('Error accessing microphone:', error);
          if (error instanceof Error) {
            if (error.name === 'NotAllowedError') {
              toast.error('Microphone access was denied. Please allow microphone access in your browser settings.');
            } else if (error.name === 'NotFoundError') {
              toast.error('No microphone found. Please connect a microphone and try again.');
            } else {
              toast.error(`Error accessing microphone: ${error.message}`);
            }
          } else {
            toast.error('An unknown error occurred while accessing the microphone.');
          }
          setIsListening(false);
        }
      }
    } catch (error) {
      console.error('Error toggling voice recognition:', error);
      toast.error('Failed to toggle voice recognition. Please try again.');
      setIsListening(false);
    }
  };

  // Handle AI Threat Detection from text input
  const handleAIDetection = async () => {
    if (!threatText.trim()) {
      toast.warning("Please describe what's happening");
      return;
    }

    const { isThreat, type, level } = detectThreatAI(threatText);
    
    if (!isThreat) {
      toast.success("✅ No immediate threat detected. Stay safe!");
      setShowTextArea(false);
      return;
    }

    // If threat is detected, send emergency email
    await handleThreatDetected(threatText, type || 'unknown');
  };

  const handleThreatDetected = async (detectedText: string, threatType: string) => {
    if (isSending || isActivated) return;
    
    try {
      setIsSending(true);
      
      // Get current position
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;

      // Send emergency email with threat details
      await sendEmergencyEmail({
        user_name: "EmpowerHer User",
        time: new Date().toLocaleString(),
        location: locationLink,
        source: "AI Voice Threat Detection",
        threat_type: threatType,
        transcript: detectedText
      });

      setIsActivated(true);
      setShowTextArea(false);
      setThreatLevel(null);
      setTranscript('');
      setIsListening(false);
      
      toast.success(`⚠️ ${threatType.toUpperCase()} detected! Emergency email sent.`);
    } catch (error) {
      console.error('Error in handleThreatDetected:', error);
      toast.error("❌ Failed to send emergency alert. Please try again.");
    } finally {
      setIsSending(false);
      if (isActivated) {
        setTimeout(() => {
          setIsActivated(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={toggleVoiceRecognition}
          className={`h-16 w-16 rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : isActivated 
                ? 'bg-amber-600 hover:bg-amber-700 scale-110' 
                : 'bg-blue-500 hover:bg-blue-600'
          }`}
          size="icon"
          disabled={isSending || !isSpeechSupported}
          style={{ opacity: isSending || !isSpeechSupported ? 0.5 : 1 }}
          title={!isSpeechSupported 
            ? browserError || 'Speech recognition not available' 
            : isListening ? 'Stop listening' : 'Start voice detection'}
        >
          {isSending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isListening ? (
            <Mic className="h-6 w-6" />
          ) : isActivated ? (
            <AlertCircle className="h-6 w-6" />
          ) : (
            <MicOff className="h-6 w-6" />
          )}
        </Button>

        <Button
          onClick={() => showTextArea ? handleAIDetection() : setShowTextArea(true)}
          className={`h-16 w-16 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
            isActivated ? 'bg-amber-600 hover:bg-amber-700 scale-110' : 
            showTextArea ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-400 hover:bg-amber-500'
          }`}
          size="icon"
          disabled={isSending}
        >
          <ShieldAlert className="h-6 w-6" />
        </Button>
      </div>

      {/* Voice Threat Detection Panel */}
      {isListening && (
        <div className="absolute bottom-full right-0 mb-4 w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-50">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-amber-600 dark:text-amber-400">
                {isActivated ? 'Help is on the way!' : 'Listening for threats...'}
              </h4>
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-500">{isListening ? 'Listening' : 'Paused'}</span>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md min-h-[100px] max-h-40 overflow-y-auto">
              {transcript || <span className="text-gray-400">Speak now...</span>}
            </div>
            
            {threatLevel && (
              <div className={`p-2 rounded-md ${
                threatLevel.level === 'HIGH' ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200' :
                threatLevel.level === 'MEDIUM' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200' :
                'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{threatLevel.type}</span>
                  <span className="text-sm">{threatLevel.level} THREAT</span>
                </div>
                {threatLevel.level === 'HIGH' && (
                  <p className="text-xs mt-1">Emergency alert has been sent with your location.</p>
                )}
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsListening(false);
                  setTranscript('');
                  setThreatLevel(null);
                  if (recognitionRef.current) {
                    recognitionRef.current.stop();
                  }
                }}
              >
                Stop Listening
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Text Input Panel */}
      {showTextArea && !isListening && (
        <div className="absolute bottom-full right-0 mb-4 w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-50">
          <div className="space-y-3">
            <h4 className="font-semibold text-amber-600 dark:text-amber-400">
              {isActivated ? 'Help is on the way!' : 'Describe the situation'}
            </h4>
            
            {!isActivated && (
              <>
                <Textarea
                  value={threatText}
                  onChange={(e) => setThreatText(e.target.value)}
                  placeholder="What's happening? The AI will analyze for threats..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowTextArea(false);
                      setThreatText('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAIDetection}
                    disabled={!threatText.trim()}
                  >
                    Analyze
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIThreatButton;