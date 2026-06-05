import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// MSG91 Configuration
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'TESTIN';

// In-memory storage for contacts (replace with database in production)
let emergencyContacts: string[] = [];

// Save emergency contacts
router.post('/contacts', (req, res) => {
  try {
    const { contacts } = req.body;
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ error: 'Contacts must be an array' });
    }
    emergencyContacts = [...new Set(contacts)]; // Remove duplicates
    res.status(200).json({ success: true, contacts: emergencyContacts });
  } catch (error) {
    console.error('Error saving contacts:', error);
    res.status(500).json({ error: 'Failed to save contacts' });
  }
});

// Get emergency contacts
router.get('/contacts', (req, res) => {
  try {
    res.status(200).json({ contacts: emergencyContacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Send emergency SMS
router.post('/send-sos', async (req, res) => {
  try {
    const { latitude, longitude, message = 'EMERGENCY: I need help!', userName = 'User' } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Location data is required' });
    }

    if (emergencyContacts.length === 0) {
      return res.status(400).json({ error: 'No emergency contacts found' });
    }

    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const fullMessage = `🚨 ${userName} needs help! 🚨\n\n${message}\n\n📍 Location: ${locationUrl}\n\nSent via EmpowerHer Safety App`;

    // Send SMS to all emergency contacts using MSG91
    for (const contact of emergencyContacts) {
      try {
        await axios.get('https://api.msg91.com/api/sendhttp.php', {
          params: {
            authkey: MSG91_AUTH_KEY,
            mobiles: contact.replace(/\D/g, ''), // Remove non-numeric characters
            message: fullMessage,
            sender: MSG91_SENDER_ID,
            route: 4, // Transactional route
            country: '91' // India country code
          }
        });
      } catch (error) {
        console.error(`Failed to send to ${contact}:`, error);
        // Continue to next contact even if one fails
      }
    }

    res.status(200).json({ success: true, message: 'SOS messages sent successfully' });
  } catch (error) {
    console.error('Error sending SOS:', error);
    res.status(500).json({ error: 'Failed to send SOS messages' });
  }
});

export default router;
