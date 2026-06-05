import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, AlertCircle, MessageCircle, Smartphone } from "lucide-react";

export default function OnlineSafety() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Online Safety</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-blue-500" />
              <CardTitle>Privacy Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage your privacy settings across social media and other online platforms.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Review social media privacy settings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Enable two-factor authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Manage location sharing</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Cyberbullying Prevention */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <CardTitle>Cyberbullying Prevention</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Learn how to recognize, prevent, and report cyberbullying.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>How to report abusive content</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Block and report users</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Get support resources</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Safe Browsing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              <CardTitle>Safe Browsing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Tips for safe and secure internet browsing.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Verify website security (HTTPS)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Avoid suspicious links</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Use strong, unique passwords</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Safety */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-purple-500" />
          Social Media Safety
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-3">Sharing Responsibly</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Think before you post personal information</li>
                <li>• Be cautious with location sharing</li>
                <li>• Review privacy settings regularly</li>
                <li>• Be mindful of what you share in photos</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-3">Online Harassment</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• How to recognize online harassment</li>
                <li>• Steps to take if you're being harassed</li>
                <li>• How to collect evidence</li>
                <li>• Where to report incidents</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Security */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-amber-500" />
          Mobile Security
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Device Security</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use strong passcodes/biometrics</li>
                  <li>• Keep your OS and apps updated</li>
                  <li>• Install apps only from trusted sources</li>
                  <li>• Enable remote wipe capabilities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">Public Wi-Fi Safety</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Avoid accessing sensitive information on public Wi-Fi</li>
                  <li>• Use a VPN for secure browsing</li>
                  <li>• Turn off auto-connect to open networks</li>
                  <li>• Forget networks after use</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Resources */}
      <div className="mt-12 bg-red-50 p-6 rounded-lg border border-red-100">
        <h2 className="text-2xl font-semibold mb-4 text-red-700">Emergency Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-red-700 mb-2">If you're in immediate danger:</h3>
            <ul className="space-y-2">
              <li>• Call emergency services: <strong>100</strong> (Police) or <strong>112</strong> (Emergency)</li>
              <li>• Women's Helpline: <strong>181</strong> (All India)</li>
              <li>• Cyber Crime Helpline: <strong>1930</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-700 mb-2">Online Harassment Support</h3>
            <ul className="space-y-2">
              <li>• Report to platform's safety team</li>
              <li>• Document all evidence (screenshots, messages)</li>
              <li>• Contact local authorities if threatened</li>
              <li>• Seek support from trusted friends/family</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
