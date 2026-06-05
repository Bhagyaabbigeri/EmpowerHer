import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Swords, ExternalLink, ShieldCheck, Zap, Target, Users } from "lucide-react";

const resources = [
  {
    title: "Self Defense Tutorials",
    description: "Comprehensive video tutorials covering basic to advanced self-defense techniques.",
    url: "https://www.youtube.com/results?search_query=self+defense+tutorials+for+women",
    icon: Swords
  },
  {
    title: "Simple Self Defence",
    description: "Easy-to-learn techniques that can be practiced at home without equipment.",
    url: "https://www.youtube.com/results?search_query=simple+self+defense+for+women",
    icon: Zap
  },
  {
    title: "Guardian Girls International",
    description: "Global organization dedicated to teaching self-defense to women and girls.",
    url: "https://www.youtube.com/results?search_query=guardian+girls+self+defense",
    icon: Users
  },
  {
    title: "Just Yell Fire",
    description: "Free self-defense education program focused on escape strategies.",
    url: "https://www.youtube.com/results?search_query=just+yell+fire+self+defense",
    icon: Target
  }
];

const tips = [
  "Always be aware of your surroundings",
  "Trust your instincts - if something feels wrong, leave",
  "Keep your phone charged and accessible",
  "Learn to use your voice - a loud yell can deter attackers",
  "Practice basic moves until they become muscle memory",
  "Take a self-defense class in your community"
];

const SelfDefense = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <Swords className="h-6 w-6" />
            <h1 className="font-display text-2xl font-bold text-gradient">
              Self-Defense Resources
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Empower yourself with knowledge and skills to stay safe.
          </p>
        </section>

        {/* Resource Links */}
        <section className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {resources.map((resource, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => window.open(resource.url, '_blank')}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary group-hover:underline">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Safety Tips */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Card className="bg-teal-light border-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-teal" />
                <h2 className="font-display font-semibold text-foreground">
                  Quick Safety Tips
                </h2>
              </div>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="text-teal mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default SelfDefense;
