import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Home, 
  Wallet,
  Baby,
  Shield,
  ExternalLink
} from "lucide-react";

const schemes = [
  {
    title: "Beti Bachao, Beti Padhao",
    description: "Empowering girls through education and awareness. This scheme aims to improve the child sex ratio and promote the value of the girl child in society.",
    icon: GraduationCap,
    category: "Education",
    url: "https://wcd.nic.in/bbbp-schemes"
  },
  {
    title: "One Stop Centre",
    description: "Providing integrated support and assistance to women affected by violence, including medical, legal, and psychological help under one roof.",
    icon: Heart,
    category: "Support",
    url: "https://wcd.nic.in/schemes/one-stop-centre-scheme-1"
  },
  {
    title: "Mahila Shakti Kendra",
    description: "Community engagement through student volunteers to empower rural women with information on government schemes.",
    icon: Shield,
    category: "Empowerment",
    url: "https://wcd.nic.in/schemes/mahila-shakti-kendra"
  },
  {
    title: "Pradhan Mantri Matru Vandana Yojana",
    description: "Cash incentive of ₹5,000 for pregnant women and lactating mothers for the first live birth.",
    icon: Baby,
    category: "Maternity",
    url: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  },
  {
    title: "Stand Up India",
    description: "Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs.",
    icon: Briefcase,
    category: "Business",
    url: "https://www.standupmitra.in/"
  },
  {
    title: "Sukanya Samriddhi Yojana",
    description: "High-interest savings scheme for girl children to secure their future education and marriage expenses.",
    icon: Wallet,
    category: "Savings",
    url: "https://www.india.gov.in/sukanya-samriddhi-yojna"
  },
  {
    title: "UJJAWALA",
    description: "Comprehensive scheme for prevention of trafficking, rescue and rehabilitation of victims.",
    icon: Shield,
    category: "Protection",
    url: "https://wcd.nic.in/schemes/ujjawala-comprehensive-scheme-prevention-trafficking-and-rescue-rehabilitation-and-re"
  }
];

const WomenSchemes = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-gold rounded-full mb-4">
            <h1 className="font-display text-xl font-bold text-foreground">
              Women Schemes
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Government initiatives empowering women across India
          </p>
        </section>

        {/* Schemes Grid */}
        <section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {schemes.map((scheme, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all group"
            >
              <CardContent className="p-0">
                <div className="p-4 bg-gradient-to-r from-coral-light to-purple-light">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white/80">
                      <scheme.icon className="h-5 w-5 text-coral" />
                    </div>
                    <span className="text-xs font-medium text-coral bg-white/60 px-2 py-0.5 rounded-full">
                      {scheme.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {scheme.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {scheme.description}
                  </p>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-coral text-coral hover:bg-coral hover:text-white"
                    onClick={() => window.open(scheme.url, '_blank')}
                  >
                    Learn More
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default WomenSchemes;
