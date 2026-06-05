# Twilio Emergency Services - Quick Start Guide

## What Was Added?

Your EmpowerHer app now has full Twilio integration for emergency response:

### 🎯 Features Implemented

1. **Emergency SOS Button** - Red button sends alerts to all contacts
2. **Contact Management** - Add/edit/delete trusted emergency contacts
3. **SMS Alerts** - Send emergency text with location to contacts
4. **Voice Calls** - Automated calls to contacts with text-to-speech
5. **Location Sharing** - Share live GPS location with contacts
6. **Call 112 Button** - Direct call to emergency services
7. **Share Location Button** - Quick location share option

### 📁 Files Added/Modified

**New Files:**
- `src/services/twilioService.ts` - Twilio integration service
- `TWILIO_SETUP_GUIDE.md` - Complete setup guide
- `TWILIO_BACKEND_EXAMPLE.js` - Backend server example
- `.env.example` - Environment variables template

**Modified Files:**
- `src/components/SOSButton.tsx` - Added Twilio integration
- `src/components/TrustedContacts.tsx` - Full contact management
- `src/index.css` - Added animation styles
- `package.json` - Twilio SDK installed

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get Twilio Credentials (2 min)

1. Go to https://www.twilio.com/console
2. Sign up (free account works)
3. Copy: **Account SID**, **Auth Token**, **Phone Number**
4. Verify your contacts (free account only)

### Step 2: Configure Environment (1 min)

Create `.env.local` in project root:

```env
VITE_TWILIO_ACCOUNT_SID=ACxxxxx...
VITE_TWILIO_AUTH_TOKEN=your_token_here
VITE_TWILIO_PHONE_NUMBER=+1234567890
VITE_BACKEND_URL=http://localhost:3000
```

### Step 3: Setup Backend (2 min)

```bash
# Create backend folder
mkdir ../empowerher-backend && cd ../empowerher-backend

# Setup
npm init -y
npm install express dotenv twilio cors

# Copy backend file
cp ../empowerher-app-main/TWILIO_BACKEND_EXAMPLE.js server.js

# Create .env
echo "TWILIO_ACCOUNT_SID=ACxxxxx..." > .env
echo "TWILIO_AUTH_TOKEN=your_token_here" >> .env
echo "TWILIO_PHONE_NUMBER=+1234567890" >> .env

# Run server
node server.js
```

### Step 4: Test It

1. Add contacts in the app (Trusted Contacts section)
2. Click red SOS button
3. Wait 3 seconds
4. Check your phone for SMS and call! ✅

---

## 🧪 Testing Checklist

- [ ] Added emergency contacts
- [ ] SOS button countdown works
- [ ] Received SMS alert with location link
- [ ] Received voice call
- [ ] Can edit/delete contacts
- [ ] Call 112 button works
- [ ] Share Location button works

---

## 🔌 How It Works

```
User presses SOS button
    ↓
Gets current GPS location
    ↓
Sends SMS to all contacts + location link
    ↓
Makes voice calls to all contacts
    ↓
Shows "Help is on the way"
    ↓
Continuously tracks location (if active)
```

---

## 📱 User Experience Flow

### Adding a Contact
1. Click "Add" button next to Trusted Contacts
2. Enter name, phone, optional email
3. Click "Add Contact"
4. Contact saved locally ✅

### Emergency Alert
1. See red SOS button: "Press for Emergency"
2. Click button → 3 second countdown appears
3. Countdown reaches 0 → Alert sends automatically
4. Contacts receive SMS + get called
5. App shows "Help is on the way"
6. Tap again to cancel (if needed)

### Managing Contacts
- **Edit**: Click pencil icon → modify → click ✓
- **Delete**: Click trash icon → removed
- **Call Directly**: Click phone icon → calls immediately
- **Share Location**: Click "Share Location" button

---

## 🚨 Important Notes

### Free Twilio Account Limits:
- ✅ 100 SMS credits/month
- ✅ Calling works
- ⚠️ Must verify all contact numbers first
- ⚠️ Test mode (can't add unverified numbers)

### Production Checklist:
- [ ] Use paid Twilio account (or verify all contacts)
- [ ] Deploy backend server
- [ ] Update `VITE_BACKEND_URL` to production
- [ ] Enable HTTPS (required for geolocation)
- [ ] Set up rate limiting
- [ ] Add error logging/monitoring

---

## 🐛 Troubleshooting

**Q: SMS not sending?**
- Check phone number format: `+1-555-123-4567`
- Verify backend is running: `http://localhost:3000/api/health`
- Check Twilio verified numbers (free account)

**Q: Location not working?**
- Browser must have location permission
- Only works on HTTPS in production
- Check browser console for errors

**Q: Call not connecting?**
- Verify phone numbers are correct
- Check backend logs for errors
- Ensure backend server is running

**Q: Backend connection failed?**
- Ensure backend server is running
- Check `VITE_BACKEND_URL` matches
- Try `curl http://localhost:3000/api/health`

---

## 📚 Documentation Files

1. **TWILIO_SETUP_GUIDE.md** - Complete detailed setup guide
2. **TWILIO_BACKEND_EXAMPLE.js** - Full backend code example
3. **.env.example** - Environment variables template

---

## 🎓 Code Examples

### Adding Contacts Programmatically
```typescript
const contacts = [
  { name: "Mom", phone: "+91-98765-43210" },
  { name: "Sister", phone: "+91-87654-32109" }
];
localStorage.setItem("trustedContacts", JSON.stringify(contacts));
```

### Manual SOS Trigger
```typescript
// In components, get service and call manually
import { twilioService } from "@/services/twilioService";

const location = await twilioService.getCurrentLocation();
const contacts = JSON.parse(localStorage.getItem("trustedContacts") || "[]");
await twilioService.sendEmergencySMS(contacts, location, "User Name");
```

### Get Current Location
```typescript
const location = await twilioService.getCurrentLocation();
console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
```

---

## 🔐 Security Tips

1. **Never commit `.env` files**
   ```bash
   # These are already in .gitignore, keep them safe!
   ```

2. **Rotate Auth Token regularly**
   - Go to Twilio Dashboard
   - Regenerate Auth Token monthly

3. **Use Environment Variables**
   - Frontend: `import.meta.env.VITE_*`
   - Backend: `process.env.*`

4. **Rate Limiting**
   - Add to backend to prevent spam
   - Limit 1 SOS per minute

5. **Validate Phone Numbers**
   - Server-side validation
   - Format with country codes

---

## 📊 Next Steps

1. ✅ Setup Twilio account
2. ✅ Configure `.env.local`
3. ✅ Run backend server
4. ✅ Test with contacts
5. 📱 Add more features:
   - [ ] Email alerts (nodemailer)
   - [ ] WhatsApp integration
   - [ ] Real-time location tracking
   - [ ] Emergency responder map
   - [ ] Alert history/logs
   - [ ] Offline mode

---

## 💬 Support

For issues or questions:
1. Check `TWILIO_SETUP_GUIDE.md` for detailed help
2. Visit https://www.twilio.com/docs
3. Check browser console for errors
4. Check backend server logs

---

## 🎉 You're Ready!

Your app now has professional emergency response capabilities. Users can:
- ✅ Quickly alert trusted contacts
- ✅ Share their location
- ✅ Get immediate voice confirmation
- ✅ Contact emergency services

**Happy coding! 🚀**
