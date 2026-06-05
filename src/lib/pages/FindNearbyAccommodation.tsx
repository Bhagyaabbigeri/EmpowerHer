import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Home, 
  BedDouble,
  Navigation,
  Globe,
  Compass,
  Shield,
  Heart,
  Building2,
  Wifi,
  Utensils,
  Dumbbell,
  WashingMachine
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FindNearbyAccommodation = () => {
  const { toast } = useToast();

  const findNearbyAccommodation = (type: 'hostel' | 'pg' | 'coliving') => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let query = '';
          
          switch(type) {
            case 'hostel':
              query = 'working+women+hostel';
              break;
            case 'pg':
              query = 'women+pg+accommodation';
              break;
            case 'coliving':
              query = 'women+coliving+space';
              break;
            default:
              query = 'women+hostel+pg+accommodation';
          }
          
          const mapsUrl = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},14z`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location services to find nearby accommodation.",
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
      text: "Uses your live GPS to search for nearby women's hostels and PGs."
    },
    {
      icon: MapPin,
      text: "Opens Google Maps with your current location and nearby options."
    },
    {
      icon: Home,
      text: 'Find safe and secure accommodation options for working women.'
    },
    {
      icon: Navigation,
      text: "Quickly locate the nearest available accommodation."
    },
    {
      icon: Compass,
      text: "Ideal for when you're new to a city or looking for a safer place to stay."
    }
  ];

  const accommodationTypes = [
    {
      type: 'hostel',
      title: 'Find Hostel',
      description: 'Locate nearby working women hostels',
      icon: Home,
      color: 'text-teal-500',
      bgColor: 'bg-teal-100'
    },
    {
      type: 'pg',
      title: 'Find PG',
      description: 'Find safe paying guest accommodations',
      icon: BedDouble,
      color: 'text-coral',
      bgColor: 'bg-coral/10'
    },
    {
      type: 'coliving',
      title: 'Coliving Spaces',
      description: 'Discover women-only coliving communities',
      icon: Building2,
      color: 'text-purple',
      bgColor: 'bg-purple/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-coral mb-2">
            <Home className="h-6 w-6" />
            <h1 className="font-display text-2xl font-bold">Find Nearby Accommodation</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Locate safe and secure accommodation options for working women near you.
          </p>
          <p className="text-primary font-medium text-sm mt-1">
            Your safety and comfort, just a click away!
          </p>
        </section>

        {/* Action Buttons */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Button 
            onClick={() => findNearbyAccommodation('hostel')}
            className="w-full mb-3 bg-coral hover:bg-coral/90 text-white gap-2 h-14 text-base"
          >
            <Home className="h-5 w-5" />
            Locate Nearby Accommodation
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">NEW</span>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Tap to find safe accommodation near you!
          </p>
        </section>

        {/* Quick Access Cards */}
        <section className="grid grid-cols-1 gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {accommodationTypes.map((item, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-teal"
              onClick={() => findNearbyAccommodation(item.type as any)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-full ${item.bgColor}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Features */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Features to look for
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

        {/* Amenities */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Common Amenities
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Wifi, text: 'Free WiFi' },
              { icon: Utensils, text: 'Food Available' },
              { icon: WashingMachine, text: 'Laundry' },
              { icon: Dumbbell, text: 'Gym' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tip */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <Card className="bg-coral-light border-none">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-coral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Safety First:</span> Always verify the accommodation in person and check for security measures before finalizing.
                  </p>
                  <p className="text-sm text-coral font-medium mt-2 flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    Your safety is our priority.
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

export default FindNearbyAccommodation;
