import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Shield, Bell, MapPin, Users, AlertCircle } from "lucide-react";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import { Link } from "react-router-dom";

export default function Emergency() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Main Emergency Alert Card */}
        <Card className="border-red-200 hover:border-red-300 transition-colors">
          <CardContent className="pt-6">
            <EmergencyAlert />
          </CardContent>
        </Card>

        {/* Dedicated Emergency Alert Page Link */}
        <Link to="/emergency-alert" className="block h-full">
          <Card className="border-blue-200 hover:border-blue-400 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Dedicated Emergency Alert</h3>
                  <p className="text-sm text-gray-500">Go to the full-screen emergency alert page</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Emergency Contacts */}
        <Card id="contacts" className="border-blue-200 hover:border-blue-300 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Emergency Contacts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Quick access to important emergency numbers.
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Police</p>
                <a href="tel:100" className="text-blue-600 hover:underline">100</a>
              </div>
              <div>
                <p className="font-medium">Women's Helpline</p>
                <a href="tel:1091" className="text-blue-600 hover:underline">1091</a>
              </div>
              <div>
                <p className="font-medium">Ambulance</p>
                <a href="tel:108" className="text-blue-600 hover:underline">108</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Alerts */}
        <Card className="border-amber-200 hover:border-amber-300 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Bell className="w-6 h-6 text-amber-600" />
              </div>
              <CardTitle>Emergency Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Stay informed about local emergencies and safety alerts.
            </p>
            <div className="space-y-2">
              <p className="text-sm">• Real-time safety alerts</p>
              <p className="text-sm">• Weather warnings</p>
              <p className="text-sm">• Local safety updates</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Emergency Resources */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Additional Emergency Resources</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card id="nearby">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Find Safe Locations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Locate nearby safe spaces and emergency shelters.
              </p>
              <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors">
                View Safe Locations
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Emergency Support Groups</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with support groups and counseling services.
              </p>
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition-colors">
                Find Support
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
