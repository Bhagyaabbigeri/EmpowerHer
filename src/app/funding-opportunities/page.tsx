import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const fundingOpportunities = [
  {
    name: "NASSCOM Foundation",
    url: "https://www.nasscomfoundation.org/",
    description: "NASSCOM Foundation focuses on leveraging technology to drive social change and development."
  },
  {
    name: "WomenTech Network",
    url: "https://www.womentech.net/en-ie/how-to/grants-women-in-technology",
    description: "WomenTech Network provides resources and grants for women in technology."
  },
  {
    name: "Women in Tech",
    url: "https://women-in-tech.org/",
    description: "A global organization focused on empowering women in technology through various programs and initiatives."
  },
  {
    name: "Founder Shield - Women in Tech Startups",
    url: "https://foundershield.com/blog/women-in-tech-startups/",
    description: "Resources and support for women-led tech startups."
  },
  {
    name: "Women Who Tech",
    url: "https://womenwhotech.org/",
    description: "Dedicated to closing the funding gap for women-led startups."
  },
  {
    name: "Startup India - Women Entrepreneurs",
    url: "https://www.startupindia.gov.in/content/sih/en/women_entrepreneurs.html",
    description: "Government initiatives and support for women entrepreneurs in India."
  }
];

export default function FundingOpportunities() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/mentors/funding-opportunities" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Funding Opportunities
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Women in Tech Funding Resources</h1>
          <p className="text-gray-600">Explore these valuable resources and funding opportunities for women in technology.</p>
        </div>

        <div className="space-y-6">
          {fundingOpportunities.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Visit Website <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
