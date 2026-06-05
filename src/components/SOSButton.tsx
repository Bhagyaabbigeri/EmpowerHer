// src/components/SOSButton.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { sendEmergencyEmail } from '@/services/emailService';

export const SOSButton = () => {
  const [isSending, setIsSending] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleSOS = async () => {
    if (isSending || isActivated) return;
    
    try {
      setIsSending(true);
      
      // Get current position
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;

      // Send emergency email
      await sendEmergencyEmail({
        user_name: "EmpowerHer User",
        time: new Date().toLocaleString(),
        location: locationLink,
        source: "SOS Button",
      });

      setIsActivated(true);
      alert("✅ Emergency email sent successfully");
    } catch (error) {
      console.error('Error in handleSOS:', error);
      if (error instanceof Error) {
        if (error.message.includes('denied')) {
          alert("❌ Location permission denied. Please enable location services and try again.");
        } else {
          alert(`❌ Failed to send emergency alert: ${error.message}`);
        }
      } else {
        alert("❌ Failed to send emergency alert. Please try again.");
      }
    } finally {
      setIsSending(false);
      
      // Auto-reset the button after 5 seconds
      if (isActivated) {
        setTimeout(() => {
          setIsActivated(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleSOS}
        className={`h-16 w-16 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
          isActivated ? 'bg-red-600 hover:bg-red-700 scale-110' : 'bg-red-500 hover:bg-red-600'
        }`}
        size="icon"
        disabled={isSending}
      >
        {isSending ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isActivated ? (
          <AlertCircle className="h-6 w-6" />
        ) : (
          'SOS'
        )}
      </Button>
    </div>
  );
};
  );
};