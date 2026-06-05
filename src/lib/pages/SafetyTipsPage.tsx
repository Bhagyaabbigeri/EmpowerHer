// src/lib/pages/SafetyTipsPage.tsx
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Shield, Lock, Bell, Users, Phone, MapPin, Search, ChevronDown, ChevronUp, AlertTriangle, ShieldAlert, Share2, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const safetyTips = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Personal Safety",
    items: [
      "Always be aware of your surroundings",
      "Trust your instincts - if something feels wrong, remove yourself from the situation",
      "Avoid walking alone at night in poorly lit areas",
      "Keep your phone charged and with you at all times",
      "Share your live location with trusted contacts when traveling"
    ]
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Online Safety",
    items: [
      "Use strong, unique passwords for all accounts",
      "Be cautious about sharing personal information online",
      "Adjust privacy settings on social media",
      "Be wary of suspicious messages or links",
      "Use two-factor authentication when available"
    ]
  },
  {
    icon: <Bell className="w-6 h-6 text-primary" />,
    title: "Emergency Preparedness",
    items: [
      "Save emergency contacts in your phone",
      "Know the emergency numbers for your area",
      "Have a safety plan for different situations",
      "Keep emergency supplies in an accessible location",
      "Know the nearest safe locations and exits"
    ]
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Social Situations",
    items: [
      "Meet first dates in public places",
      "Let someone know where you're going and when to expect you back",
      "Don't leave your drink unattended",
      "Have a code word with friends to signal for help",
      "Know how to get home safely if plans change"
    ]
  },
  {
    icon: <Phone className="w-6 h-6 text-primary" />,
    title: "Using Safety Apps",
    items: [
      "Download and set up safety apps with emergency features",
      "Enable emergency SOS on your phone",
      "Keep important medical information accessible on your lock screen",
      "Use location-sharing features with trusted contacts",
      "Test emergency features before you need them"
    ]
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Travel Safety",
    items: [
      "Research safe routes before traveling",
      "Keep your belongings secure and in sight",
      "Have local emergency numbers saved",
      "Avoid displaying expensive items",
      "Know how to use local transportation safely"
    ]
  }
];

const QuickActions = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5">
      <PhoneCall className="w-5 h-5 text-red-500" />
      <span>Emergency Call</span>
    </Button>
    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5">
      <Share2 className="w-5 h-5 text-blue-500" />
      <span>Share Location</span>
    </Button>
    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5">
      <ShieldAlert className="w-5 h-5 text-amber-500" />
      <span>Safety Check-in</span>
    </Button>
    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5">
      <AlertTriangle className="w-5 h-5 text-purple-500" />
      <span>Report Incident</span>
    </Button>
  </div>
);

export default function SafetyTipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const filteredTips = useMemo(() => {
    if (!searchTerm) return safetyTips;
    const term = searchTerm.toLowerCase();
    return safetyTips.map(category => ({
      ...category,
      items: category.items.filter(item => item.toLowerCase().includes(term))
    })).filter(category => category.items.length > 0);
  }, [searchTerm]);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
          Safety First
        </Badge>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
          Safety & Security Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Essential safety information and practical tips to help you stay protected in any situation.
        </p>
      </div>

      <QuickActions />

      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search safety tips..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredTips.length > 0 ? (
          filteredTips.map((category, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleCard(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {expandedCard === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {(expandedCard === index || filteredTips.length === 1) && (
                <>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="flex items-start p-3 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-1 mr-3 text-primary">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-muted/20 py-3 px-6 text-sm text-muted-foreground">
                    {category.items.length} tips • Tap to {expandedCard === index ? 'collapse' : 'expand'}
                  </CardFooter>
                </>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No safety tips found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or check back later for more tips.</p>
          </div>
        )}
      </div>

<div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <ShieldAlert className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground">
              Your Safety Matters
            </h3>
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="mb-3">
                These tips are general guidelines to help you stay safe. Remember to always trust your instincts and use your best judgment in any situation.
              </p>
              <div className="space-y-2">
                <p className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium mr-2">1</span>
                  In case of emergency, contact local authorities immediately.
                </p>
                <p className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium mr-2">2</span>
                  Save important contacts in your phone's emergency contacts.
                </p>
                <p className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium mr-2">3</span>
                  Share your live location with trusted contacts when traveling alone.
                </p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <PhoneCall className="mr-2 h-4 w-4" />
            Emergency Contacts
          </Button>
        </div>
      </div>
    </div>
  );
}
