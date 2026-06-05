import { AlertTriangle, Compass, MapPin, Mic, Navigation, Zap } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';

export const SafetyFeaturesGrid = () => {
  const features = [
    {
      title: "Panic SOS",
      description: "Instantly send an emergency alert with your location.",
      icon: <AlertTriangle className="h-6 w-6" />,
      actionText: "Go to Feature",
      actionLink: "/panic-sos",
      className: "hover:shadow-md",
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Voice SOS",
      description: "Trigger SOS alert using your voice.",
      icon: <Mic className="h-6 w-6" />,
      actionText: "Go to Feature",
      actionLink: "/voice-sos",
      className: "hover:shadow-md",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      title: "AI Threat Detection",
      description: "Get alerts for threats using AI.",
      icon: <Zap className="h-6 w-6" />,
      actionText: "Go to Feature",
      actionLink: "/ai-threat-detection",
      className: "hover:shadow-md",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Nearby Help",
      description: "Find nearby police stations and safe locations.",
      icon: <MapPin className="h-6 w-6" />,
      actionText: "Go to Feature",
      actionLink: "/nearby-help",
      className: "hover:shadow-md",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Plan Safe Route",
      description: "Plan and share your safest route to destination.",
      icon: <Compass className="h-6 w-6" />,
      actionText: "Go to Feature",
      actionLink: "/safe-route",
      className: "hover:shadow-md",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      title: "Live Tracking",
      description: "Share your live location with trusted contacts.",
      icon: <Navigation className="h-6 w-6" />,
      actionText: "Go to Feature",
      actionLink: "/live-tracking",
      className: "hover:shadow-md",
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">SOS Emergency</h2>
        <p className="text-gray-600">Quick access to emergency assistance when you need it most</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            actionText="Set Up Now"
            actionLink={feature.actionLink}
            className={feature.className}
            iconBgColor={feature.iconBgColor}
            iconColor={feature.iconColor}
          />
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Safety</h2>
        <p className="text-gray-600 mb-6">Advanced protection through artificial intelligence</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="AI Threat Detection"
            description="Get alerts for potential threats using AI."
            icon={<Zap className="h-6 w-6" />}
            actionText="Set Up Now"
            actionLink="/ai-threat-detection"
            className="hover:shadow-md"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
};
