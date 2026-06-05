# Twilio Service API Documentation

## Overview

The `twilioService` provides a complete emergency response system with SMS, voice calls, and location sharing capabilities.

## Installation

The Twilio SDK is already installed. If you need to reinstall:

```bash
npm install twilio
```

## Service Location

```
src/services/twilioService.ts
```

## Configuration

### Environment Variables Required

```env
# .env.local or .env
VITE_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
VITE_TWILIO_PHONE_NUMBER=+1234567890
VITE_BACKEND_URL=http://localhost:3000
```

## API Reference

### Types

#### `EmergencyContact`
```typescript
interface EmergencyContact {
  name: string;          // Contact name
  phone: string;         // Phone number with country code
  email?: string;        // Optional email address
}
```

#### `LocationData`
```typescript
interface LocationData {
  latitude: number;      // GPS latitude
  longitude: number;     // GPS longitude
  accuracy?: number;     // Accuracy in meters (optional)
}
```

### Core Methods

#### `sendEmergencySMS(contacts, location, userName)`

Send emergency SMS to multiple contacts with location.

**Parameters:**
- `contacts: EmergencyContact[]` - Array of contacts
- `location: LocationData` - Current location
- `userName: string` - Sender's name

**Returns:** `Promise<void>`

**Example:**
```typescript
import { twilioService } from "@/services/twilioService";

const contacts = [
  { name: "Mom", phone: "+1-555-123-4567" }
];
const location = { latitude: 37.7749, longitude: -122.4194 };

await twilioService.sendEmergencySMS(contacts, location, "Sarah");
// Sends: "🚨 EMERGENCY ALERT FROM SARAH..."
```

---

#### `initiateEmergencyCalls(contacts, location, userName)`

Make voice calls to emergency contacts with automated message.

**Parameters:**
- `contacts: EmergencyContact[]` - Array of contacts
- `location: LocationData` - Current location
- `userName: string` - Sender's name

**Returns:** `Promise<void>`

**Example:**
```typescript
await twilioService.initiateEmergencyCalls(contacts, location, "Sarah");
// Calls each contact with automated message
// Plays: "Emergency alert from Sarah..."
// Waits for confirmation (press 1)
```

---

#### `shareLocation(contact, location, userName)`

Share location with a single contact via SMS.

**Parameters:**
- `contact: EmergencyContact` - Single contact
- `location: LocationData` - Current location
- `userName: string` - Sender's name

**Returns:** `Promise<void>`

**Example:**
```typescript
const friend = { name: "Jessica", phone: "+1-555-234-5678" };
const location = await twilioService.getCurrentLocation();

await twilioService.shareLocation(friend, location, "Sarah");
// Sends location link via SMS
```

---

#### `getCurrentLocation()`

Get user's current GPS location using browser Geolocation API.

**Returns:** `Promise<LocationData>`

**Example:**
```typescript
try {
  const location = await twilioService.getCurrentLocation();
  console.log(`Latitude: ${location.latitude}`);
  console.log(`Longitude: ${location.longitude}`);
  console.log(`Accuracy: ${location.accuracy}m`);
} catch (error) {
  console.error("Location error:", error.message);
  // "Geolocation is not supported by this browser"
  // "Geolocation error: User denied geolocation"
}
```

---

#### `watchLocation(onLocationUpdate, onError)`

Continuously monitor and update user's location.

**Parameters:**
- `onLocationUpdate: (location: LocationData) => void` - Callback for updates
- `onError: (error: Error) => void` - Error callback

**Returns:** `number` - Watch ID (needed to stop watching)

**Example:**
```typescript
const watchId = twilioService.watchLocation(
  (location) => {
    console.log("Location updated:", location);
    // Update UI or send to server
  },
  (error) => {
    console.error("Watch error:", error.message);
  }
);

// Stop watching after 5 minutes
setTimeout(() => {
  twilioService.clearLocationWatch(watchId);
}, 300000);
```

---

#### `clearLocationWatch(watchId)`

Stop monitoring location.

**Parameters:**
- `watchId: number` - Watch ID from `watchLocation()`

**Returns:** `void`

**Example:**
```typescript
twilioService.clearLocationWatch(watchId);
```

---

### Usage in React Components

#### In `SOSButton.tsx`:
```typescript
import { twilioService } from "@/services/twilioService";
import { useState } from "react";

export const SOSButton = () => {
  const [isSending, setIsSending] = useState(false);

  const handleEmergency = async () => {
    setIsSending(true);
    try {
      const contacts = JSON.parse(
        localStorage.getItem("trustedContacts") || "[]"
      );
      const location = await twilioService.getCurrentLocation();
      const userName = localStorage.getItem("userName") || "User";

      // Send SMS
      await twilioService.sendEmergencySMS(contacts, location, userName);

      // Make calls
      await twilioService.initiateEmergencyCalls(
        contacts,
        location,
        userName
      );

      console.log("Emergency alert sent!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return <button onClick={handleEmergency}>SOS</button>;
};
```

#### In `TrustedContacts.tsx`:
```typescript
import { twilioService } from "@/services/twilioService";

// Share location with one contact
const handleShareLocation = async (contact) => {
  try {
    const location = await twilioService.getCurrentLocation();
    await twilioService.shareLocation(contact, location, "User Name");
  } catch (error) {
    console.error("Error sharing location:", error);
  }
};
```

---

## Error Handling

### Common Errors and Solutions

#### Geolocation Errors

```typescript
try {
  const location = await twilioService.getCurrentLocation();
} catch (error) {
  if (error.message.includes("not supported")) {
    // Browser doesn't support geolocation
  } else if (error.message.includes("denied")) {
    // User denied location permission
  } else if (error.message.includes("timeout")) {
    // Location request timed out
  }
}
```

#### SMS Sending Errors

```typescript
try {
  await twilioService.sendEmergencySMS(contacts, location, "User");
} catch (error) {
  // Possible causes:
  // - Backend server not running
  // - Invalid phone number format
  // - Twilio credentials invalid
  // - Network/CORS issues
  console.error("SMS Error:", error.message);
}
```

#### Call Initiation Errors

```typescript
try {
  await twilioService.initiateEmergencyCalls(contacts, location, "User");
} catch (error) {
  // Possible causes:
  // - Phone number not verified (free account)
  // - Twilio credits exhausted
  // - Backend error
  console.error("Call Error:", error.message);
}
```

---

## Backend Integration

### Required Endpoints

Your backend must implement these endpoints:

#### POST `/api/twilio/send-sms`

**Request:**
```json
{
  "to": "+1-555-123-4567",
  "message": "Emergency message text",
  "from": "+1-111-111-1111"
}
```

**Response:**
```json
{
  "success": true,
  "sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "queued"
}
```

#### POST `/api/twilio/make-call`

**Request:**
```json
{
  "to": "+1-555-123-4567",
  "from": "+1-111-111-1111",
  "userName": "User Name",
  "locationUrl": "https://maps.google.com/maps?q=37.7749,-122.4194"
}
```

**Response:**
```json
{
  "success": true,
  "sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "queued"
}
```

See `TWILIO_BACKEND_EXAMPLE.js` for full implementation.

---

## Data Storage

### localStorage Keys

The service uses localStorage for contact management:

```typescript
// Stored as JSON string
localStorage.setItem(
  "trustedContacts",
  JSON.stringify([
    { name: "Mom", phone: "+1-555-123-4567", email: "mom@email.com" }
  ])
);

// Retrieve
const contacts = JSON.parse(
  localStorage.getItem("trustedContacts") || "[]"
);
```

---

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 5+
- ✅ Firefox 3.5+
- ✅ Safari 5+
- ✅ Edge 12+
- ⚠️ Internet Explorer (partial)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Required Permissions

- 📍 **Geolocation** - For location sharing
- 🔊 **Microphone** - For voice calls (backend/Twilio)
- 📱 **Phone Access** - For tel: links

---

## Performance Considerations

### Location Accuracy

```typescript
// High accuracy (slower, higher battery usage)
navigator.geolocation.getCurrentPosition(callback, error, {
  enableHighAccuracy: true,  // Default in service
  timeout: 10000,            // 10 seconds
  maximumAge: 0              // Always fresh
});

// Balanced (recommended)
{
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 5000
}
```

### Continuous Location Tracking

For real-time updates, use `watchLocation()`:

```typescript
const watchId = twilioService.watchLocation(
  (location) => {
    // Called every time location changes
    // Updates every ~1-5 seconds
  }
);
```

---

## Testing

### Manual Testing Steps

1. **Add Contacts**
   ```typescript
   localStorage.setItem("trustedContacts", JSON.stringify([
     { name: "Test", phone: "+1-555-123-4567" }
   ]));
   ```

2. **Get Location**
   ```typescript
   const loc = await twilioService.getCurrentLocation();
   console.log(loc);
   ```

3. **Send SMS**
   ```typescript
   await twilioService.sendEmergencySMS(
     JSON.parse(localStorage.getItem("trustedContacts")),
     await twilioService.getCurrentLocation(),
     "Test User"
   );
   ```

4. **Check Twilio Dashboard**
   - Go to https://www.twilio.com/console
   - Check Message Logs
   - Check Call Logs

---

## Deployment

### Environment Setup

**Production (.env):**
```env
VITE_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_TWILIO_AUTH_TOKEN=your_auth_token
VITE_TWILIO_PHONE_NUMBER=+1234567890
VITE_BACKEND_URL=https://api.yourdomain.com
```

### HTTPS Requirement

Geolocation API requires HTTPS in production:

```typescript
// This will fail on HTTP in production
if (window.location.protocol !== "https:" && !localhost) {
  throw new Error("HTTPS required for geolocation");
}
```

---

## Advanced Features

### Custom SMS Messages

Edit in `twilioService.ts`:

```typescript
const message = `Custom alert message...`;
```

### Extend Service

Add custom methods:

```typescript
export class TwilioEmergencyService {
  async customMethod() {
    // Your custom logic
  }
}
```

### Integrate with Other APIs

Combine with other services:

```typescript
// Firebase for persistent storage
// Maps API for routing
// SendGrid for email alerts
// Slack for team notifications
```

---

## Support & Resources

- **Twilio Docs**: https://www.twilio.com/docs
- **SMS API**: https://www.twilio.com/docs/sms
- **Voice API**: https://www.twilio.com/docs/voice
- **Geolocation**: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

---

**Last Updated**: December 2024
**Status**: Production Ready
