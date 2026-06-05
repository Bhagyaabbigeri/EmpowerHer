import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, BookOpen, Gavel, Shield, AlertTriangle, Phone } from "lucide-react";

export default function WomensLawsAwareness() {
  const laws = [
    {
      title: "Protection of Women from Domestic Violence Act, 2005",
      description: "Protects women from domestic violence including physical, emotional, verbal, sexual, and economic abuse.",
      keyProvisions: [
        "Right to reside in the shared household",
        "Protection orders against the abuser",
        "Monetary relief and compensation",
        "Custody orders for children"
      ],
      icon: <Shield className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Sexual Harassment of Women at Workplace Act, 2013",
      description: "Prevents, prohibits and provides redressal for sexual harassment at workplaces.",
      keyProvisions: [
        "Mandates Internal Complaints Committee (ICC) in organizations",
        "Defines sexual harassment broadly",
        "Provides for conciliation and inquiry process",
        "Protects against victimization"
      ],
      icon: <Scale className="w-5 h-5 text-purple-500" />
    },
    {
      title: "Dowry Prohibition Act, 1961",
      description: "Prohibits the giving or taking of dowry in connection with marriage.",
      keyProvisions: [
        "Dowry is illegal and punishable",
        "Penalties for demanding dowry",
        "Dowry received must be transferred to the woman",
        "Burden of proof lies on the accused"
      ],
      icon: <Gavel className="w-5 h-5 text-red-500" />
    },
    {
      title: "Indecent Representation of Women Act, 1986",
      description: "Prohibits indecent representation of women through advertisements, publications, writings, paintings, figures or in any other manner.",
      keyProvisions: [
        "Bans offensive material degrading women",
        "Applies to print, digital and other media",
        "Penalties for violations"
      ],
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Maternity Benefit Act, 1961 (Amended 2017)",
      description: "Regulates employment of women in certain establishments for certain periods before and after childbirth.",
      keyProvisions: [
        "26 weeks paid maternity leave",
        "Work from home option",
        "Creche facility for organizations with 50+ employees",
        "No dismissal during pregnancy"
      ],
      icon: <BookOpen className="w-5 h-5 text-green-500" />
    },
    {
      title: "Equal Remuneration Act, 1976",
      description: "Ensures equal pay for equal work for both men and women.",
      keyProvisions: [
        "No discrimination in recruitment",
        "Equal pay for same or similar work",
        "No discrimination in promotions or training"
      ],
      icon: <Scale className="w-5 h-5 text-teal-500" />
    }
  ];

  const legalRights = [
    "Right to equal pay for equal work",
    "Right against workplace harassment",
    "Right to dignity and decency",
    "Right against domestic violence",
    "Right to maintenance",
    "Right to property and inheritance",
    "Right to register complaints without fear",
    "Right to free legal aid"
  ];

  const emergencyContacts = [
    { name: "Women's Helpline (All India)", number: "181" },
    { name: "Police", number: "100" },
    { name: "National Commission for Women", number: "7827170170" },
    { name: "Child Helpline", number: "1098" },
    { name: "Medical Emergency", number: "108" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Women's Laws & Rights</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Knowledge is power. Understand your legal rights and the laws that protect you in various aspects of life.
        </p>
      </div>

      {/* Key Laws Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Gavel className="w-6 h-6 text-primary" />
          Key Laws Protecting Women in India
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {laws.map((law, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {law.icon}
                  <CardTitle className="text-lg">{law.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{law.description}</p>
                <h4 className="font-medium mb-2">Key Provisions:</h4>
                <ul className="space-y-1 text-sm">
                  {law.keyProvisions.map((provision, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{provision}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Know Your Rights Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Scale className="w-6 h-6 text-primary" />
          Know Your Rights
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Your Fundamental Rights</h3>
                <ul className="space-y-3">
                  {legalRights.slice(0, 4).map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">More Rights</h3>
                <ul className="space-y-3">
                  {legalRights.slice(4).map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-red-50 p-6 rounded-lg border border-red-100">
        <h2 className="text-2xl font-semibold mb-6 text-red-700 flex items-center gap-2">
          <Phone className="w-6 h-6" />
          Emergency Contacts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
              <h4 className="font-medium text-red-700">{contact.name}</h4>
              <a 
                href={`tel:${contact.number}`} 
                className="text-lg font-semibold text-red-600 hover:underline"
              >
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Resources */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Legal Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How to File a Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Visit the nearest police station or women's help desk</li>
                <li>File a First Information Report (FIR)</li>
                <li>Provide all necessary details and evidence</li>
                <li>Request a copy of the FIR</li>
                <li>Follow up with the investigating officer</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Support Organizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">National Commission for Women</h4>
                <p className="text-sm text-muted-foreground">Helpline: 7827170170</p>
              </div>
              <div>
                <h4 className="font-medium">Women's Grievance Cell</h4>
                <p className="text-sm text-muted-foreground">Email: complaintcell-ncw@nic.in</p>
              </div>
              <div>
                <h4 className="font-medium">Legal Aid Services</h4>
                <p className="text-sm text-muted-foreground">Toll-free: 1800116678</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
