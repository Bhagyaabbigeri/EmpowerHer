import { Button } from "@/components/ui/button";
import { Shield, UserPlus, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SOSSetupPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SOS Emergency Setup</h1>
        <p className="text-gray-600">Set up your emergency contacts and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold">Emergency Contacts</h2>
          </div>
          <p className="text-gray-600 mb-4">Add trusted contacts who will be notified in case of an emergency.</p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/emergency-contacts')}
          >
            Manage Contacts
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-100 rounded-lg mr-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold">Emergency Alert Settings</h2>
          </div>
          <p className="text-gray-600 mb-4">Configure what happens when you trigger the SOS alert.</p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/profile?tab=settings')}
          >
            Configure Alerts
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="font-medium text-lg text-blue-800 mb-3">How It Works</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Press the SOS Button</h4>
              <p className="text-gray-600 text-sm">In an emergency, press and hold the SOS button in the app.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Alert Your Contacts</h4>
              <p className="text-gray-600 text-sm">Your emergency contacts will receive your location and a message.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Get Help</h4>
              <p className="text-gray-600 text-sm">Your contacts and local authorities will be notified to assist you.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          size="lg" 
          className="px-8"
          onClick={() => navigate('/emergency-alert')}
        >
          Go to Emergency Alert
        </Button>
      </div>
    </div>
  );
}
