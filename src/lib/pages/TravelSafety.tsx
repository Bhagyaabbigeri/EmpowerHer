import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertTriangle, Shield, Route as RouteIcon, Clock } from "lucide-react";
import { RoutePlanner } from "@/lib/components/RoutePlanner";
import { LiveTracking } from "@/lib/components/LiveTracking";
import { SafetyTimer } from "@/lib/components/SafetyTimer";

export default function TravelSafety() {
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [showSafetyTimer, setShowSafetyTimer] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Travel Safety</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Safe Route Planning */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <RouteIcon className="w-6 h-6 text-blue-500" />
              <CardTitle>Plan Your Route</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Plan the safest route to your destination with real-time safety updates and alerts.
            </p>
            <button 
              onClick={() => setShowRoutePlanner(true)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Plan Route
            </button>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              <CardTitle>Safety Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Share your live location with trusted contacts</li>
              <li>• Avoid poorly lit or deserted areas</li>
              <li>• Keep emergency numbers handy</li>
              <li>• Be aware of your surroundings</li>
            </ul>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <CardTitle>Emergency Contacts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span>Police</span>
              <a href="tel:100" className="text-red-600 font-medium">100</a>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span>Women's Helpline</span>
              <a href="tel:181" className="text-blue-600 font-medium">181</a>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <span>Ambulance</span>
              <a href="tel:108" className="text-green-600 font-medium">108</a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Tracking Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-purple-500" />
          Live Location Tracking
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Share your live location</h3>
                <p className="text-muted-foreground">
                  Let your trusted contacts know where you are in real-time for added safety.
                </p>
              </div>
              <button 
                onClick={() => setShowLiveTracking(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg whitespace-nowrap transition-colors"
              >
                Start Live Tracking
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Check-in */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-amber-500" />
          Safety Check-in
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Set a Safety Timer</h3>
                <p className="text-muted-foreground">
                  Set a timer for when you expect to reach your destination. If you don't check in, your emergency contacts will be notified.
                </p>
              </div>
              <button 
                onClick={() => setShowSafetyTimer(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg whitespace-nowrap transition-colors"
              >
                Set Safety Timer
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Route Planner Modal */}
      {showRoutePlanner && (
        <RoutePlanner onClose={() => setShowRoutePlanner(false)} />
      )}

      {/* Live Tracking Modal */}
      {showLiveTracking && (
        <LiveTracking onClose={() => setShowLiveTracking(false)} />
      )}

      {/* Safety Timer Modal */}
      {showSafetyTimer && (
        <SafetyTimer onClose={() => setShowSafetyTimer(false)} />
      )}
    </div>
  );
}
