import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const PUBLIC_KEY = "uR7K2mRUy0bgaOMaJ";
const SERVICE_ID = "service_odvizaj";
const TEMPLATE_ID = "template_e4dkh2p";

// Initialize EmailJS with public key
emailjs.init(PUBLIC_KEY);

interface EmailParams {
  user_name: string;
  time: string;
  location: string;
  source: string;
  threat_type?: string;
  transcript?: string;
}

export const sendEmergencyEmail = async (params: EmailParams) => {
  console.log('Sending emergency email with params:', params);
  
  try {
    // Validate required fields
    if (!params.user_name || !params.time || !params.location || !params.source) {
      throw new Error('Missing required email parameters');
    }

    // Add default values for optional fields
    const emailParams = {
      ...params,
      threat_type: params.threat_type || 'Unknown',
      transcript: params.transcript || 'No transcript available'
    };

    console.log('Sending email with data:', {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: emailParams
    });

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams);
    
    console.log('Email sent successfully:', response);
    toast.success('Emergency alert sent successfully!');
    
    return response;
  } catch (error) {
    console.error('Failed to send emergency email:', error);
    
    let errorMessage = 'Failed to send emergency alert. ';
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      if (error.message.includes('Invalid login')) {
        errorMessage += 'Invalid email service credentials.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Network error. Please check your internet connection.';
      } else {
        errorMessage += error.message;
      }
    }
    
    toast.error(errorMessage);
    throw error; // Re-throw to allow calling code to handle if needed
  }
};
