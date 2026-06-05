import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Building2, 
  Siren,
  Navigation,
  Globe,
  Compass,
  Shield,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FindNearbyHelp = () => {
  const { toast } = useToast();

  const findLocation = (type: 'police' | 'hospital') => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = type === 'police' ? 'police+station' : 'hospital';
          const mapsUrl = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},14z`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location services to find nearby help.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive"
      });
    }
  };

  const features = [
    {
      icon: Globe,
      text: "Uses your live GPS to search for nearby police stations or hospitals."
    },
    {
      icon: MapPin,
      text: "Opens Google Maps with your current location pre-filled."
    },
    {
      icon: Siren,
      text: 'Choose the type of help: "police" or "hospital".'
    },
    {
      icon: Navigation,
      text: "Fast self-navigation—no need to ask others."
    },
    {
      icon: Compass,
      text: "Ideal for public places, cities, or unfamiliar areas."
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-coral mb-2">
            <MapPin className="h-6 w-6" />
            <h1 className="font-display text-2xl font-bold">Find Nearby Help</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Locate help instantly: Find the nearest police station, hospital, or support center with one tap.
          </p>
          <p className="text-primary font-medium text-sm mt-1">
            Your safety, just a click away!
          </p>
        </section>

        {/* Action Buttons */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Button 
            onClick={() => findLocation('police')}
            className="w-full mb-3 bg-coral hover:bg-coral/90 text-white gap-2 h-14 text-base"
          >
            <MapPin className="h-5 w-5" />
            Locate Police or Hospital
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">NEW</span>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Tap to find help near you!
          </p>
        </section>

        {/* Quick Access Cards */}
        <section className="grid grid-cols-1 gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Card 
            className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-teal"
            onClick={() => findLocation('police')}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-full bg-teal/10">
                <Siren className="h-6 w-6 text-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Find Police</h3>
                <p className="text-sm text-muted-foreground">Locate nearest police station</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-coral"
            onClick={() => findLocation('hospital')}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-full bg-coral/10">
                <Building2 className="h-6 w-6 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Find Hospital</h3>
                <p className="text-sm text-muted-foreground">Locate nearest hospital</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-purple"
            onClick={() => findLocation('police')}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-full bg-purple/10">
                <Navigation className="h-6 w-6 text-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Navigate Safely</h3>
                <p className="text-sm text-muted-foreground">Get directions to safety</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How It Works */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            How it works
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tip Section */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Card className="bg-coral-light border-none">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-coral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Tip:</span> Use this when you're lost, need help quickly, or want to find the closest safety zone.
                  </p>
                  <p className="text-sm text-coral font-medium mt-2 flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    Help is always closer than you think.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Let WSafe guide you to safety, anytime, anywhere.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default FindNearbyHelp;
