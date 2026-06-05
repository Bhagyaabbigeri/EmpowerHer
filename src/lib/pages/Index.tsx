// src/lib/pages/Index.tsx
import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FeatureCard } from "@/components/FeatureCard";
import { 
  MapPin, 
  Shield, 
  AlertTriangle,
  Swords,
  Compass,
  ShieldAlert,
  Scale,
  Home,
  Phone,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export default function Index() {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="EmpowerHer" />
      
      <main className="container mx-auto px-4 py-8 space-y-8 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Women, Building Futures</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">Join a community dedicated to women's safety, empowerment, and success. Together, we rise.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => alert('Welcome to EmpowerHer! We\'re here to help you stay safe and empowered.')}
                variant="outline" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                Get Started
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* SOS Emergency Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">SOS Emergency</h2>
            <p className="text-red-600 mt-2">Quick access to emergency assistance when you need it most</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🆘</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Emergency Alert</h3>
                  <p className="text-red-100 mt-1">One press to alert emergency contacts with live location</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/sos-setup" className="flex items-center">
                    Set Up Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

                    {/* AI Safety Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">AI Safety</h2>
            <p className="text-red-600 mt-2">Advanced protection through artificial intelligence</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">AI Threat Detection</h3>
                  <p className="text-red-100 mt-1">Advanced AI monitoring for potential safety threats in real-time</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/ai-threat-detection" className="flex items-center">
                    Enable Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Emergency Contacts</h2>
            <p className="text-red-600 mt-2">Quick access to important emergency numbers and support</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Emergency Numbers</h3>
                  <p className="text-red-100 mt-1">Quick access to important emergency contacts and support services</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/emergency-contacts" className="flex items-center">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Find Help Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Find Nearby Help</h2>
            <p className="text-red-600 mt-2">Locate essential services and safe spaces near you</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Nearby Services</h3>
                  <p className="text-red-100 mt-1">Find police stations, hospitals, and safe places in your area</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/find-nearby-help" className="flex items-center">
                    Find Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Safe Accommodation</h2>
            <p className="text-red-600 mt-2">Find secure and comfortable places to stay</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Working Women Hostel/PG</h3>
                  <p className="text-red-100 mt-1">Discover safe, secure, and comfortable accommodation options</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/working-women-hostel" className="flex items-center">
                    Find Stay <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Safety Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Travel Safety</h2>
            <p className="text-red-600 mt-2">Essential tips and tools for safe journeys</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">✈️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Safe Travel Guide</h3>
                  <p className="text-red-100 mt-1">Essential safety tips and tools for worry-free travels</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/travel-safety" className="flex items-center">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Safety Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Digital Safety</h2>
            <p className="text-red-600 mt-2">Protect your online presence and personal information</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Online Safety</h3>
                  <p className="text-red-100 mt-1">Essential tools and tips to protect your digital identity and privacy</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/online-safety" className="flex items-center">
                    Secure Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Women's Laws Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Women's Laws</h2>
            <p className="text-red-600 mt-2">Know your legal rights and protections</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Know Your Rights</h3>
                  <p className="text-red-100 mt-1">Understand your legal protections and rights as a woman</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/safety-laws" className="flex items-center">
                    Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Self-Defense Section */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900">Self-Defense</h2>
            <p className="text-red-600 mt-2">Learn essential self-defense techniques</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-red-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-400">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🥋</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">Self-Defense Training</h3>
                  <p className="text-red-100 mt-1">Master essential techniques to protect yourself</p>
                </div>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <Link to="/self-defense/videos" className="flex items-center">
                    Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Forum Preview */}
        <section className="space-y-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Discussions</h2>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg border p-4 max-w-4xl mx-auto">
            <Tabs defaultValue="trending" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-medium">How do you handle workplace discrimination?</h4>
                    <p className="text-sm text-muted-foreground mt-1">24 comments • 5.2k views</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-medium">Best practices for salary negotiation</h4>
                    <p className="text-sm text-muted-foreground mt-1">18 comments • 3.8k views</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <BottomNav />
      </main>
    </div>
  );
}