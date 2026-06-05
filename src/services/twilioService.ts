/**
 * Twilio Emergency Services
 * Handles SMS notifications, voice calls, and location sharing to emergency contacts
 */

interface EmergencyContact {
  name: string;
  phone: string;
  email?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  twilioPhoneNumber: string;
  backendUrl: string; // Your backend server URL for Twilio API calls
}

class TwilioEmergencyService {
  private config: TwilioConfig;

  constructor(config: TwilioConfig) {
    this.config = config;
  }

  /**
   * Send emergency SMS to all trusted contacts
   */
  async sendEmergencySMS(
    contacts: EmergencyContact[],
    userLocation: LocationData,
    userName: string
  ): Promise<void> {
    try {
      const locationUrl = `https://maps.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;
      const message = `🚨 EMERGENCY ALERT FROM ${userName.toUpperCase()}\n\nI need immediate help!\n\nMy Location:\n${locationUrl}\n\nPlease contact authorities or come to my location immediately.\n\nThis is an automated emergency message.`;

      for (const contact of contacts) {
        await this.sendSMS(contact.phone, message);
      }

      console.log(`Emergency SMS sent to ${contacts.length} contacts`);
    } catch (error) {
      console.error("Error sending emergency SMS:", error);
      throw new Error("Failed to send emergency SMS");
    }
  }

  /**
   * Send individual SMS message
   */
  private async sendSMS(phoneNumber: string, message: string): Promise<void> {
    try {
      const response = await fetch(`${this.config.backendUrl}/api/twilio/send-sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
          from: this.config.twilioPhoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send SMS: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("SMS sent successfully:", data.sid);
    } catch (error) {
      console.error("Error in sendSMS:", error);
      throw error;
    }
  }

  /**
   * Initiate emergency voice calls to trusted contacts
   */
  async initiateEmergencyCalls(
    contacts: EmergencyContact[],
    userLocation: LocationData,
    userName: string
  ): Promise<void> {
    try {
      const locationUrl = `https://maps.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;

      for (const contact of contacts) {
        await this.initiateCall(contact.phone, userName, locationUrl);
      }

      console.log(`Emergency calls initiated to ${contacts.length} contacts`);
    } catch (error) {
      console.error("Error initiating emergency calls:", error);
      throw new Error("Failed to initiate emergency calls");
    }
  }

  /**
   * Initiate a single call
   */
  private async initiateCall(
    phoneNumber: string,
    userName: string,
    locationUrl: string
  ): Promise<void> {
    try {
      const response = await fetch(`${this.config.backendUrl}/api/twilio/make-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          from: this.config.twilioPhoneNumber,
          userName: userName,
          locationUrl: locationUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to initiate call: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Call initiated successfully:", data.sid);
    } catch (error) {
      console.error("Error in initiateCall:", error);
      throw error;
    }
  }

  /**
   * Send location URL via SMS
   */
  async shareLocation(
    contact: EmergencyContact,
    userLocation: LocationData,
    userName: string
  ): Promise<void> {
    try {
      const locationUrl = `https://maps.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;
      const message = `📍 Location from ${userName}:\n${locationUrl}\n\nPlease check on me if you don't hear from me soon.`;

      await this.sendSMS(contact.phone, message);
      console.log(`Location shared with ${contact.name}`);
    } catch (error) {
      console.error("Error sharing location:", error);
      throw new Error("Failed to share location");
    }
  }

  /**
   * Get user's current location using Geolocation API
   */
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }

  /**
   * Start watching user's location (for continuous updates)
   */
  watchLocation(
    onLocationUpdate: (location: LocationData) => void,
    onError: (error: Error) => void
  ): number {
    if (!navigator.geolocation) {
      onError(new Error("Geolocation is not supported by this browser"));
      return -1;
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        onLocationUpdate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        onError(new Error(`Location watch error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }

  /**
   * Clear location watch
   */
  clearLocationWatch(watchId: number): void {
    if (watchId > 0) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
}

// Initialize service with config from environment variables
const getTwilioService = (): TwilioEmergencyService => {
  const config: TwilioConfig = {
    accountSid: import.meta.env.VITE_TWILIO_ACCOUNT_SID || "",
    authToken: import.meta.env.VITE_TWILIO_AUTH_TOKEN || "",
    twilioPhoneNumber: import.meta.env.VITE_TWILIO_PHONE_NUMBER || "",
    backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  };

  if (!config.accountSid || !config.authToken || !config.twilioPhoneNumber) {
    console.warn("Twilio configuration is incomplete. Some features may not work.");
  }

  return new TwilioEmergencyService(config);
};

export const twilioService = getTwilioService();
export type { EmergencyContact, LocationData };
