# Twilio Emergency Services Integration Guide

This guide will help you set up Twilio integration for emergency SMS, voice calls, and location sharing in the EmpowerHer app.

## Overview

The Twilio integration enables:
- 🚨 **Emergency SMS Alerts** - Send immediate SMS to all trusted contacts with location
- 📞 **Automated Voice Calls** - Make calls to emergency contacts with text-to-speech
- 📍 **Location Sharing** - Share live GPS location with contacts
- ✅ **Contact Management** - Add, edit, and manage emergency contacts

## Prerequisites

1. **Twilio Account** (free account available at https://www.twilio.com/console)
2. **Node.js** (for backend server)
3. **Your Phone Number** (Twilio will provide one)

## Step 1: Set Up Twilio Account

### 1.1 Create a Twilio Account
- Go to https://www.twilio.com/console
- Sign up for a free account
- Verify your email and phone number

### 1.2 Get Your Credentials
1. Navigate to **Dashboard** > **Account Info**
2. Copy your **Account SID**
3. Copy your **Auth Token** (keep this secret!)

### 1.3 Get a Twilio Phone Number
1. Go to **Phone Numbers** > **Manage** > **Buy a Number**
2. Select your country and choose a number
3. This is your `TWILIO_PHONE_NUMBER`

### 1.4 Verify Emergency Contacts (Free Account Only)
- Free Twilio accounts can only send SMS/calls to verified numbers
- Go to **Phone Numbers** > **Verified Caller IDs**
- Add each emergency contact's phone number and verify it

## Step 2: Frontend Setup

### 2.1 Update Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
VITE_TWILIO_PHONE_NUMBER=+1234567890
VITE_BACKEND_URL=http://localhost:3000
```

Replace with your actual Twilio credentials.

### 2.2 Files Already Updated
- ✅ `src/services/twilioService.ts` - Twilio service
- ✅ `src/components/SOSButton.tsx` - Emergency button
- ✅ `src/components/TrustedContacts.tsx` - Contact management
- ✅ `src/index.css` - Animation styles

## Step 3: Backend Setup

### 3.1 Create Backend Server

Use the provided `TWILIO_BACKEND_EXAMPLE.js` as a template:

```bash
# Create a new directory for your backend
mkdir empowerher-backend
cd empowerher-backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express dotenv twilio cors
```

### 3.2 Create Backend Server File

Copy the content from `TWILIO_BACKEND_EXAMPLE.js` to `server.js`:

```bash
cp ../TWILIO_BACKEND_EXAMPLE.js server.js
```

### 3.3 Create Backend .env File

Create `.env` in your backend directory:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
SERVER_URL=http://localhost:3000
PORT=3000
```

### 3.4 Run Backend Server

```bash
node server.js
```

You should see:
```
Twilio Emergency API server running on port 3000
```

## Step 4: Frontend Configuration

### 4.1 Update Backend URL

In your `.env.local`, make sure:

```env
VITE_BACKEND_URL=http://localhost:3000
```

If deploying, update this to your backend server URL:

```env
VITE_BACKEND_URL=https://your-backend-domain.com
```

### 4.2 Run Frontend

```bash
npm run dev
```

## Step 5: Test the Integration

### 5.1 Add Emergency Contacts

1. Open the app
2. Scroll to "Trusted Contacts" section
3. Click "Add" button
4. Fill in:
   - **Name**: Contact's name
   - **Phone**: Contact's phone number (with country code, e.g., +1-555-123-4567)
   - **Email** (optional): Contact's email
5. Click "Add Contact"

### 5.2 Test Emergency Button

1. Make sure you have at least one contact added
2. Click the red SOS button
3. Wait for the 3-second countdown
4. Check that:
   - SMS was sent to your contact
   - Voice call was made to your contact
   - Location was shared

### 5.3 Monitor Logs

Check your backend server logs for:
```
SMS Message SID: SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Voice Call SID: CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Features

### Emergency Alert (SOS Button)

```
1. User clicks SOS button
2. 3-second countdown starts (can cancel by tapping again)
3. On activation:
   - Gets user's current GPS location
   - Sends SMS to all contacts with location link
   - Makes voice calls to all contacts
   - Watches location for continuous updates
```

### Contact Management

- **Add**: Click "Add" to add new contacts
- **Edit**: Click the edit icon next to a contact
- **Delete**: Click the trash icon to remove
- **Call**: Click the phone icon to call a contact directly
- **Share Location**: One-time location share

### Location Sharing

```
📍 Location Link Format:
https://maps.google.com/maps?q=LATITUDE,LONGITUDE
```

Contacts receive:
- SMS with Google Maps link
- Direct location coordinates
- Option to see live location (if app tracks continuously)

## Troubleshooting

### Issue: "SMS not sending"

**Solution:**
- Verify phone number format (include country code: +1-555-123-4567)
- Check Twilio verified caller IDs (free account only)
- Check backend server is running: `http://localhost:3000/api/health`
- Check browser console for errors

### Issue: "Location permission denied"

**Solution:**
- Open browser settings
- Allow location access for your app
- Use HTTPS (required for production)
- Ensure geolocation is enabled

### Issue: "Backend connection failed"

**Solution:**
- Verify backend server is running
- Check `VITE_BACKEND_URL` matches your backend address
- Check CORS settings in backend
- Try: `curl http://localhost:3000/api/health`

### Issue: "Call not being made"

**Solution:**
- Verify `TWILIO_PHONE_NUMBER` is correct
- Check phone numbers are properly verified (free account)
- Monitor backend logs for errors
- Check call status in Twilio Console

## Production Deployment

### Frontend (Vercel/Netlify)

1. Update `.env` variables in deployment settings
2. Ensure `VITE_BACKEND_URL` points to your production backend
3. Deploy frontend

### Backend (Heroku/Railway/AWS)

1. Set environment variables in hosting platform
2. Deploy your backend server
3. Update frontend `VITE_BACKEND_URL` to production backend

### Important: Use HTTPS in Production

- Location API requires HTTPS
- Update WebSocket URLs if using secure endpoints

## Security Best Practices

1. **Never commit `.env` files**
   ```bash
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Protect Auth Token**
   - Use environment variables only
   - Rotate regularly
   - Don't share credentials

3. **Rate Limit Requests**
   - Add rate limiting to backend API
   - Prevent spam alerts

4. **Validate Phone Numbers**
   - Server-side validation
   - International format handling

5. **Encrypt Location Data**
   - Use HTTPS only
   - Consider end-to-end encryption

## Advanced Customization

### Custom Alert Message

Edit in `src/services/twilioService.ts`:

```typescript
const message = `🚨 EMERGENCY ALERT FROM ${userName.toUpperCase()}\n\nI need immediate help!\n\nMy Location:\n${locationUrl}\n\nPlease contact authorities or come to my location immediately.`;
```

### Add More Contacts Dynamically

```typescript
const contacts = getTrustedContacts(); // Gets from localStorage
```

### Custom Voice Settings

Edit in `TWILIO_BACKEND_EXAMPLE.js`:

```javascript
gather.say(
  { voice: "alice" },  // Change to "man", "woman", etc.
  "Your message here"
);
```

### SMS to Email Integration

Add to backend:

```javascript
const nodemailer = require("nodemailer");
// Send email along with SMS
```

## API Reference

### Frontend Service Methods

```typescript
// Get user location
await twilioService.getCurrentLocation()
// Returns: { latitude, longitude, accuracy }

// Send emergency SMS
await twilioService.sendEmergencySMS(contacts, location, userName)

// Make emergency calls
await twilioService.initiateEmergencyCalls(contacts, location, userName)

// Share location with one contact
await twilioService.shareLocation(contact, location, userName)

// Watch location updates
const watchId = twilioService.watchLocation(onUpdate, onError)

// Stop watching location
twilioService.clearLocationWatch(watchId)
```

### Backend API Endpoints

```bash
# Send SMS
POST /api/twilio/send-sms
{
  "to": "+1234567890",
  "message": "Emergency message",
  "from": "+1111111111"
}

# Make Call
POST /api/twilio/make-call
{
  "to": "+1234567890",
  "from": "+1111111111",
  "userName": "User Name",
  "locationUrl": "https://maps.google.com/..."
}

# Health Check
GET /api/health
```

## Support & Resources

- **Twilio Documentation**: https://www.twilio.com/docs
- **Twilio SMS API**: https://www.twilio.com/docs/sms/send-messages
- **Twilio Voice API**: https://www.twilio.com/docs/voice/api
- **Geolocation API**: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

## Cost Estimation

**Twilio Pricing (approximate):**
- SMS: $0.0075 - $0.008 per message
- Voice Calls: $0.01 - $0.045 per minute
- Free Account: 100 SMS credits monthly

**Example (10 alerts with 3 contacts each):**
- 30 SMS messages: ~$0.24
- 30 calls (1 min each): ~$0.30-$1.35
- **Total: ~$0.50-$1.60 per month** for 10 alerts

## Next Steps

1. ✅ Set up Twilio account
2. ✅ Configure environment variables
3. ✅ Run backend server
4. ✅ Add emergency contacts
5. ✅ Test SOS functionality
6. 🚀 Deploy to production
7. 📱 Share with users

---

**Last Updated**: December 2024
**Status**: Production Ready
