/**
 * Emergency Services
 * Frontend service for SOS, SMS alerts, and location sharing
 * Backend handles MSG91 integration
 */

export interface EmergencyContact {
  name: string;
  phone: string;
  email?: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface SendSMSResponse {
  success: boolean;
  message: string;
}

class EmergencyService {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  /**
   * Save emergency contacts to backend
   */
  async saveEmergencyContacts(contacts: EmergencyContact[]): Promise<boolean> {
    try {
      const phoneNumbers = contacts.map(contact => 
        contact.phone.startsWith('+') ? contact.phone : `+91${contact.phone}`
      );
      
      const response = await fetch(`${this.backendUrl}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contacts: phoneNumbers }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save contacts');
      }

      return true;
    } catch (error) {
      console.error('Error saving emergency contacts:', error);
      throw error;
    }
  }

  /**
   * Get saved emergency contacts from backend
   */
  async getEmergencyContacts(): Promise<string[]> {
    try {
      const response = await fetch(`${this.backendUrl}/api/contacts`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      return data.contacts || [];
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
      return [];
    }
  }

  /**
   * Send emergency SMS to all trusted contacts
   */
  async sendEmergencySMS(
    contacts: EmergencyContact[],
    userLocation: LocationData,
    userName: string
  ): Promise<SendSMSResponse> {
    try {
      // Save contacts first
      await this.saveEmergencyContacts(contacts);

      // Send emergency alert
      const response = await fetch(`${this.backendUrl}/api/send-sos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          userName: userName,
          message: 'I need immediate help!',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send emergency alert');
      }

      return { 
        success: true, 
        message: `Emergency alert sent to ${contacts.length} contacts` 
      };
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send emergency alert' 
      };
    }
  }

  /**
   * Share live location with a contact
   */
  async shareLocation(
    contact: EmergencyContact,
    userLocation: LocationData,
    userName: string
  ): Promise<void> {
    try {
      const locationUrl = `https://maps.google.com/?q=${userLocation.latitude},${userLocation.longitude}`;
      const message = `📍 Location update from ${userName}\n${locationUrl}`;

      await fetch(`${this.backendUrl}/api/sos/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contact,
          message,
          location: userLocation
        })
      });

      console.log(`Location shared with ${contact.name}`);
    } catch (error) {
      console.error("Error sharing location:", error);
      throw new Error("Failed to share location");
    }
  }

  /**
   * Get user's current location
   */
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(new Error(error.message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  /**
   * Watch live location
   */
  watchLocation(
    onUpdate: (location: LocationData) => void,
    onError: (error: Error) => void
  ): number {
    if (!navigator.geolocation) {
      onError(new Error("Geolocation not supported"));
      return -1;
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        onUpdate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => onError(new Error(error.message)),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      }
    );
  }

  clearLocationWatch(watchId: number): void {
    if (watchId > 0) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
}

/**
 * Initialize service (NO secrets here)
 */
const emergencyService = new EmergencyService(
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
);

export { emergencyService };
