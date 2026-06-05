import { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Mic, MicOff, AlertTriangle, Shield, AlertCircle, ShieldAlert, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

// Mock emergency contacts for demo
const mockEmergencyContacts = [
  { id: '1', name: 'Emergency Contact', phone: '+1234567890' },
];

interface ThreatLevel {
  type: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
}

const AIThreatDetection: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'User';
  
  // State for threat detection
  const [isSending, setIsSending] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [threatText, setThreatText] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [threatLevel, setThreatLevel] = useState<ThreatLevel | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [browserError, setBrowserError] = useState<string | null>(null);
  const [emergencyContacts] = useState(mockEmergencyContacts);
  
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
      return;
    }
    
    setIsSpeechSupported(true);

    try {
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

      // In a real app, you would send this to your backend
      console.log('Emergency alert triggered:', {
        user_name: userName,
        time: new Date().toISOString(),
        location: locationLink,
        threat_type: threatType,
        transcript: detectedText
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsActivated(true);
      setShowTextArea(false);
      setThreatLevel(null);
      setTranscript('');
      setIsListening(false);
      
      toast.success(`⚠️ ${threatType.toUpperCase()} detected! Emergency alert sent.`);
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
  
  // Check browser support for speech recognition on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    setIsSpeechSupported(true);
    
    try {
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
      
      // Request microphone permission
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log('Microphone access granted');
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Threat Detection</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Monitor conversations in real-time for potential threats and get instant alerts.
          </p>
          
          {/* Two circular buttons for microphone and emergency alert */}
          <div className="flex justify-center space-x-8 mb-8">
            {/* Microphone Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={toggleVoiceRecognition}
                className={`h-20 w-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : isActivated 
                      ? 'bg-amber-600 hover:bg-amber-700 scale-110' 
                      : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={isSending || !isSpeechSupported}
                title={!isSpeechSupported 
                  ? browserError || 'Speech recognition not available' 
                  : isListening ? 'Stop listening' : 'Start voice detection'}
              >
                {isSending ? (
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                ) : isListening ? (
                  <Mic className="h-8 w-8 text-white" />
                ) : isActivated ? (
                  <AlertCircle className="h-8 w-8 text-white" />
                ) : (
                  <MicOff className="h-8 w-8 text-white" />
                )}
              </button>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {isListening ? 'Listening...' : 'Voice Detection'}
              </span>
            </div>
            
            {/* Emergency Alert Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => showTextArea ? handleAIDetection() : setShowTextArea(true)}
                className={`h-20 w-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isActivated 
                    ? 'bg-amber-600 hover:bg-amber-700 scale-110' 
                    : 'bg-amber-500 hover:bg-amber-600'
                }`}
                disabled={isSending}
                title={showTextArea ? 'Send alert' : 'Report a threat'}
              >
                <ShieldAlert className="h-8 w-8 text-white" />
              </button>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {showTextArea ? 'Send Alert' : 'Emergency Alert'}
              </span>
            </div>
          </div>

          {/* Text Input Panel */}
          {showTextArea && !isListening && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-3">
                {isActivated ? 'Help is on the way!' : 'Describe the situation'}
              </h3>
              
              {!isActivated && (
                <>
                  <textarea
                    value={threatText}
                    onChange={(e) => setThreatText(e.target.value)}
                    placeholder="What's happening? The AI will analyze for threats..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md mb-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setShowTextArea(false);
                        setThreatText('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAIDetection}
                      disabled={!threatText.trim()}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                        !threatText.trim() 
                          ? 'bg-amber-400 cursor-not-allowed' 
                          : 'bg-amber-500 hover:bg-amber-600'
                      }`}
                    >
                      {isSending ? 'Sending...' : 'Send Alert'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Voice Detection Panel */}
          {isListening && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-amber-600 dark:text-amber-400">
                  {isActivated ? 'Help is on the way!' : 'Listening for threats...'}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-gray-500">{isListening ? 'Listening' : 'Paused'}</span>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md min-h-[100px] max-h-40 overflow-y-auto mb-3">
                {transcript || <span className="text-gray-400">Speak now...</span>}
              </div>
              
              {threatLevel && (
                <div className={`p-3 rounded-md mb-3 ${
                  threatLevel.level === 'HIGH' 
                    ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200' :
                  threatLevel.level === 'MEDIUM' 
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200' :
                    'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{threatLevel.type}</span>
                    <span className="text-sm font-semibold">{threatLevel.level} THREAT</span>
                  </div>
                  {threatLevel.level === 'HIGH' && (
                    <p className="text-xs mt-1">Emergency alert has been sent with your location.</p>
                  )}
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setIsListening(false);
                    setTranscript('');
                    setThreatLevel(null);
                    if (recognitionRef.current) {
                      recognitionRef.current.stop();
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Stop Listening
                </button>
              </div>
            </div>
          )}
          
          {/* Threat Detection Information */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white mb-3">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">1. Voice Detection</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Our system continuously monitors for potential threats in your surroundings.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mb-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">2. AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Our AI analyzes conversations for potential threats and harassment.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-3">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">3. Instant Alerts</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get instant notifications if a potential threat is detected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default AIThreatDetection;