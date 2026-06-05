import { emergencyService } from './emergencyService';
import { sendEmergencyEmail } from './emailService';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EmergencyContact {
  name: string;
  phone: string;
  email?: string;
}

class ThreatDetectionService {
  private recognition: any;
  private isListening: boolean = false;
  private userName: string = 'User';
  private contacts: EmergencyContact[] = [];
  private currentLocation: LocationData | null = null;
  
  // List of threatening words/phrases to detect
  private readonly THREAT_WORDS = [
    'help', 'danger', 'attack', 'threat', 'emergency',
    'harassment', 'abuse', 'violence', 'assault', 'dangerous',
    'scared', 'afraid', 'help me', 'call police', 'police', 'danger',
    'intruder', 'stalker', 'threaten', 'harass', 'abusive'
  ];

  constructor() {
    this.initializeRecognition();
    this.getCurrentLocation();
  }

  private initializeRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                            (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      this.processTranscript(finalTranscript || interimTranscript);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      this.stopListening();
    };
  }

  private async getCurrentLocation() {
    try {
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  private async processTranscript(transcript: string) {
    if (!transcript) return;

    const lowerTranscript = transcript.toLowerCase();
    const detectedThreats = this.THREAT_WORDS.filter(word => 
      lowerTranscript.includes(word.toLowerCase())
    );

    if (detectedThreats.length > 0 && this.contacts.length > 0) {
      // Get current time
      const currentTime = new Date().toLocaleString();
      
      // Get location string
      const locationString = this.currentLocation
        ? `https://www.google.com/maps?q=${this.currentLocation.latitude},${this.currentLocation.longitude}`
        : 'Location unavailable';
      
      // Send email to all trusted contacts
      try {
        await sendEmergencyEmail({
          user_name: this.userName,
          time: currentTime,
          location: locationString,
          source: 'AI Threat Detection',
          threat_type: detectedThreats.join(', '),
          transcript: transcript
        });
        console.log('Threat alert email sent successfully');
      } catch (error) {
        console.error('Failed to send threat alert email:', error);
      }
      
      // Trigger other emergency actions
      this.triggerEmergencyAlert(transcript);
    }
  }

  private async triggerEmergencyAlert(transcript: string) {
    if (!this.currentLocation) return;

    const locationUrl = `https://maps.google.com/?q=${this.currentLocation.latitude},${this.currentLocation.longitude}`;
    
    const message = `🚨 THREAT DETECTED 🚨\n\n` +
      `User: ${this.userName}\n` +
      `Threatening words detected: "${transcript}"\n` +
      `📍 Location: ${locationUrl}\n\n` +
      `Please check on them immediately!`;

    try {
      // Use the existing emergency service to send SMS
      await emergencyService.sendEmergencySMS(
        this.contacts,
        this.currentLocation,
        this.userName
      );
      
      console.log('Threat alert sent successfully');
      this.stopListening();
    } catch (error) {
      console.error('Failed to send threat alert:', error);
    }
  }

  public setUserInfo(userName: string, contacts: EmergencyContact[]) {
    this.userName = userName;
    this.contacts = contacts;
  }

  public startListening() {
    if (!this.recognition) {
      console.error('Speech recognition not initialized');
      return;
    }

    try {
      this.recognition.start();
      this.isListening = true;
      console.log('Threat detection started');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      console.log('Threat detection stopped');
    }
  }

  public toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }
}

export const threatDetectionService = new ThreatDetectionService();
