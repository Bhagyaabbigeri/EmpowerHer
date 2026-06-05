import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const laws = [
  {
    title: "Working Women Hostel",
    description: "Safe and affordable accommodation for working women, with day care facility for children. Ensures safe housing for working women across India.",
    url: "https://wcd.nic.in/schemes/working-women-hostel"
  },
  {
    title: "Section 354",
    description: "Assault or criminal force to woman with intent to outrage her modesty."
  },
  {
    title: "Section 509",
    description: "Word, gesture or act intended to insult the modesty of a woman."
  },
  {
    title: "Domestic Violence Act 2005",
    description: "Protection against domestic abuse."
  },
  {
    title: "Sexual Harassment of Women at Workplace Act, 2013",
    description: "Protection against workplace harassment."
  },
  {
    title: "Dowry Prohibition Act 1961",
    description: "Prevents dowry-related violence and harassment."
  },
  {
    title: "POCSO Act",
    description: "Protection of Children from Sexual Offences Act."
  },
  {
    title: "Section 375 IPC",
    description: "Defines and criminalizes rape."
  },
  {
    title: "Section 376 IPC",
    description: "Punishment for rape."
  },
  {
    title: "Section 498A",
    description: "Cruelty by husband or relatives of husband."
  },
  {
    title: "Maternity Benefit Act",
    description: "Provides maternity leave and protection for women."
  },
  {
    title: "Equal Remuneration Act",
    description: "Prohibits discrimination in salary between men and women."
  },
  {
    title: "Indecent Representation of Women Act",
    description: "Bans indecent representation of women in media."
  },
  {
    title: "Immoral Traffic (Prevention) Act",
    description: "Prevents trafficking and sexual exploitation."
  },
  {
    title: "Medical Termination of Pregnancy Act",
    description: "Legalizes abortion under certain conditions."
  },
  {
    title: "Hindu Succession Act",
    description: "Provides equal inheritance rights to daughters."
  },
  {
    title: "Right to Education Act",
    description: "Mandates education for girls up to age 14."
  },
  {
    title: "Prohibition of Child Marriage Act",
    description: "Declares child marriage voidable and punishable."
  },
  {
    title: "Juvenile Justice Act",
    description: "Protection of children including girls in conflict with law."
  }
];

const SafetyLaws = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <Shield className="h-6 w-6" />
            <h1 className="font-display text-2xl font-bold text-gradient">
              Women Safety Laws in India
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Know your rights. Stay protected.
          </p>
        </section>

        {/* Laws Grid */}
        <section className="grid gap-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {laws.map((law, index) => (
            <Card 
              key={index} 
              className="bg-coral-light/50 border-l-4 border-l-coral hover:shadow-md transition-all"
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-coral text-sm mb-1">
                  {law.title}
                </h3>
                <p className="text-sm text-foreground/80">
                  {law.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default SafetyLaws;
