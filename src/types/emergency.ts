// backend/src/routes/emergency.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// MSG91 Configuration
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'EMPWRH';

// In-memory storage for contacts (replace with database in production)
let emergencyContacts: string[] = [];

// Save emergency contacts
router.post('/contacts', (req, res) => {
  try {
    const { contacts } = req.body;
    
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ error: 'Contacts must be an array' });
    }

    // Validate and format phone numbers
    emergencyContacts = contacts.map(contact => {
      // Remove any non-digit characters
      const digits = contact.replace(/\D/g, '');
      
      // Add country code if missing (assuming India +91 as default)
      return digits.startsWith('91') ? `+${digits}` : `+91${digits}`;
    });

    // Remove duplicates
    emergencyContacts = [...new Set(emergencyContacts)];

    res.status(200).json({ 
      success: true, 
      contacts: emergencyContacts 
    });
  } catch (error) {
    console.error('Error saving contacts:', error);
    res.status(500).json({ 
      error: 'Failed to save contacts',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get emergency contacts
router.get('/contacts', (req, res) => {
  try {
    res.status(200).json({ 
      success: true,
      contacts: emergencyContacts 
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contacts',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Send emergency alert
router.post('/send-sos', async (req, res) => {
  try {
    const { latitude, longitude, userName = 'User', message = 'I need help!' } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        error: 'Missing location data',
        details: 'Both latitude and longitude are required'
      });
    }

    if (emergencyContacts.length === 0) {
      return res.status(400).json({ 
        error: 'No emergency contacts',
        details: 'Please add emergency contacts first'
      });
    }

    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const fullMessage = `🚨 ${userName} needs help! 🚨\n\n${message}\n\n📍 Location: ${locationUrl}\n\nSent via EmpowerHer Safety App`;

    // Send messages to all emergency contacts
    const results = await Promise.all(
      emergencyContacts.map(async (contact) => {
        try {
          const response = await axios.get('https://api.msg91.com/api/sendhttp.php', {
            params: {
              authkey: MSG91_AUTH_KEY,
              mobiles: contact.replace(/\D/g, ''),
              message: encodeURIComponent(fullMessage),
              sender: MSG91_SENDER_ID,
              route: 4, // Transactional route
              country: '91' // India country code
            }
          });
          return { contact, success: true, response: response.data };
        } catch (error) {
          console.error(`Failed to send to ${contact}:`, error);
          return { 
            contact, 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to send message'
          };
        }
      })
    );

    const successfulSends = results.filter(r => r.success).length;
    const failedSends = results.filter(r => !r.success);

    res.status(200).json({
      success: true,
      message: `Sent ${successfulSends} messages successfully${failedSends > 0 ? `, failed to send ${failedSends}` : ''}`,
      results
    });

  } catch (error) {
    console.error('Error sending emergency alert:', error);
    res.status(500).json({ 
      error: 'Failed to send emergency alert',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;