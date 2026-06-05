/**
 * Backend API for Twilio Emergency Services
 * This example uses Express.js and the Twilio Node.js SDK
 * 
 * Installation:
 * npm install express dotenv twilio cors
 * 
 * Usage:
 * 1. Create a .env file with:
 *    TWILIO_ACCOUNT_SID=your_account_sid
 *    TWILIO_AUTH_TOKEN=your_auth_token
 *    TWILIO_PHONE_NUMBER=your_phone_number
 * 
 * 2. Run: node server.js
 */

const express = require("express");
const twilio = require("twilio");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Twilio Client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * POST /api/twilio/send-sms
 * Send an SMS message via Twilio
 */
app.post("/api/twilio/send-sms", async (req, res) => {
  try {
    const { to, message, from } = req.body;

    if (!to || !message || !from) {
      return res.status(400).json({
        error: "Missing required fields: to, message, from",
      });
    }

    // Send SMS
    const messageResponse = await client.messages.create({
      body: message,
      from: from,
      to: to,
    });

    res.json({
      success: true,
      sid: messageResponse.sid,
      status: messageResponse.status,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to send SMS",
    });
  }
});

/**
 * POST /api/twilio/make-call
 * Initiate a voice call with TwiML instructions
 */
app.post("/api/twilio/make-call", async (req, res) => {
  try {
    const { to, from, userName, locationUrl } = req.body;

    if (!to || !from || !userName) {
      return res.status(400).json({
        error: "Missing required fields: to, from, userName",
      });
    }

    // Create TwiML for the call
    const twiml = new twilio.twiml.VoiceResponse();
    
    // Add speech introduction
    const gather = twiml.gather({
      numDigits: 1,
      timeout: 5,
    });
    
    gather.say({
      voice: "alice",
    }, 
    `Emergency alert from ${userName}. They are in need of immediate assistance. 
    Press 1 to acknowledge and help locate them.`
    );

    // If no input, play message again
    twiml.redirect("/api/twilio/handle-call");

    // Make the call
    const call = await client.calls.create({
      url: `${process.env.SERVER_URL || "http://localhost:3000"}/api/twilio/voice-response`,
      to: to,
      from: from,
      record: false,
    });

    // Send follow-up SMS with location
    if (locationUrl) {
      await client.messages.create({
        body: `Emergency location: ${locationUrl}`,
        from: from,
        to: to,
      });
    }

    res.json({
      success: true,
      sid: call.sid,
      status: call.status,
    });
  } catch (error) {
    console.error("Error making call:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to make call",
    });
  }
});

/**
 * POST /api/twilio/voice-response
 * Handle incoming voice call responses with TwiML
 */
app.post("/api/twilio/voice-response", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  const gather = twiml.gather({
    numDigits: 1,
    timeout: 5,
    action: "/api/twilio/handle-response",
  });

  gather.say(
    {
      voice: "alice",
    },
    "Emergency alert from EmpowerHer. Someone is in danger and needs your help. Press 1 to confirm you received this message."
  );

  // Fallback
  twiml.say(
    {
      voice: "alice",
    },
    "Thank you. Emergency services and contacts have been notified."
  );

  res.type("text/xml");
  res.send(twiml.toString());
});

/**
 * POST /api/twilio/handle-response
 * Handle the response from the called contact
 */
app.post("/api/twilio/handle-response", (req, res) => {
  const digits = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digits === "1") {
    twiml.say(
      {
        voice: "alice",
      },
      "Thank you for confirming. Please check on the person immediately and contact emergency services if needed."
    );
  } else {
    twiml.say(
      {
        voice: "alice",
      },
      "No response received. Emergency services have been notified of this alert."
    );
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

/**
 * Health check endpoint
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Twilio API server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Twilio Emergency API server running on port ${PORT}`);
});

/**
 * Example .env file:
 * 
 * TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * TWILIO_AUTH_TOKEN=your_auth_token_here
 * TWILIO_PHONE_NUMBER=+1234567890
 * SERVER_URL=http://your-server-url.com
 * PORT=3000
 */
