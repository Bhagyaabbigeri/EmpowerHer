import { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { formatTime } from '@/lib/utils';

type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export function SafetyTimer({ onClose }: { onClose: () => void }) {
  const [duration, setDuration] = useState(30); // in minutes
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Mock emergency contacts (in a real app, these would come from the user's profile)
  useEffect(() => {
    // In a real app, you would fetch these from your backend
    const mockContacts: EmergencyContact[] = [
      { id: '1', name: 'Mom', phone: '+1234567890', email: 'mom@example.com' },
      { id: '2', name: 'Friend', phone: '+1987654321', email: 'friend@example.com' },
    ];
    setEmergencyContacts(mockContacts);
  }, []);

  const startTimer = () => {
    if (duration <= 0) {
      toast({
        title: 'Invalid Duration',
        description: 'Please enter a valid duration in minutes.',
        variant: 'destructive',
      });
      return;
    }

    setIsActive(true);
    setTimeLeft(duration * 60); // Convert minutes to seconds
    
    // In a real app, you would send a request to your backend to handle the timer
    // and send notifications if the user doesn't check in
    toast({
      title: 'Safety Timer Started',
      description: `We'll alert your emergency contacts if you don't check in within ${duration} minutes.`,
    });
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    toast({
      title: 'Safety Timer Stopped',
      description: 'Your emergency contacts will not be notified.',
    });
  };

  const checkIn = () => {
    stopTimer();
    toast({
      title: 'Check-in Successful',
      description: 'Your emergency contacts have been notified that you are safe.',
    });
  };

  // Countdown effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          timerRef.current = null;
          setIsActive(false);
          
          // In a real app, this would trigger notifications to emergency contacts
          console.log('Time is up! Notifying emergency contacts...');
          
          // Simulate sending notifications
          setTimeout(() => {
            toast({
              title: 'Emergency Alert Sent',
              description: 'Your emergency contacts have been notified with your location.',
              variant: 'destructive',
            });
          }, 1000);
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, timeLeft]);

  // Format time as MM:SS
  const formattedTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Safety Timer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          {!isActive ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Set Timer Duration (minutes)</label>
                <Input
                  type="number"
                  min="1"
                  max="240"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center text-lg font-mono"
                />
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      If you don't check in within the specified time, your emergency contacts will be notified.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startTimer}
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                <Clock className="mr-2 h-4 w-4" />
                Start Safety Timer
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Time Remaining</p>
                <div className="text-5xl font-bold font-mono">
                  {formattedTime()}
                </div>
                <p className="text-sm text-gray-500">
                  Check in before the timer runs out
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={checkIn}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  I'm Safe - Check In
                </Button>
                
                <Button 
                  onClick={stopTimer}
                  variant="outline" 
                  className="w-full"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Timer
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Will notify in case of emergency:
                </h3>
                <div className="space-y-2">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.phone}</p>
                      </div>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
