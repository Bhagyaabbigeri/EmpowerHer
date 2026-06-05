import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const fundingOpportunities = [
  {
    name: "NASSCOM Foundation",
    url: "https://www.nasscomfoundation.org/",
    description: "NASSCOM Foundation focuses on leveraging technology to drive social change and development.",
    type: "Grant"
  },
  {
    name: "WomenTech Network",
    url: "https://www.womentech.net/en-ie/how-to/grants-women-in-technology",
    description: "WomenTech Network provides resources and grants for women in technology.",
    type: "Grant"
  },
  {
    name: "Women in Tech",
    url: "https://women-in-tech.org/",
    description: "A global organization focused on empowering women in technology.",
    type: "Scholarship"
  },
  {
    name: "Founder Shield - Women in Tech Startups",
    url: "https://foundershield.com/blog/women-in-tech-startups/",
    description: "Resources and support for women-led tech startups.",
    type: "Funding"
  }
];

const womensSchemes = [
  {
    name: "Beti Bachao Beti Padhao",
    description: "A government initiative for the welfare of girl children and their education.",
    url: "https://wcd.nic.in/bbbp-schemes",
    type: "Government Scheme"
  },
  {
    name: "Ujjwala Yojana",
    description: "Pradhan Mantri Ujjwala Yojana for providing LPG connections to women from BPL households.",
    url: "https://pmuy.gov.in/",
    type: "Government Scheme"
  },
  {
    name: "Mahila E-Haat",
    description: "An online marketing platform for women entrepreneurs to sell their products.",
    url: "https://mahilaehaat-rmk.gov.in/",
    type: "Entrepreneurship"
  },
  {
    name: "Sukanya Samriddhi Yojana",
    description: "A small deposit scheme for girl children with tax benefits and high interest rates.",
    url: "https://www.indiapost.gov.in/Financial/pages/content/post-office/sukanya-samriddhi-account.aspx",
    type: "Financial Scheme"
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
          <p className="text-gray-600">Explore various resources, funding opportunities, and schemes for women.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Funding Opportunities Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Funding Opportunities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundingOpportunities.map((item, index) => (
              <div key={`funding-${index}`} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                <div className="mt-auto">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Women's Schemes Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Women's Schemes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensSchemes.map((scheme, index) => (
              <div key={`scheme-${index}`} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                    {scheme.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{scheme.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{scheme.description}</p>
                <div className="mt-auto">
                  <a 
                    href={scheme.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Development Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Career Development</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resume Building Guide</h3>
              <p className="text-gray-600 mb-4">Learn how to create an impressive resume that stands out to employers.</p>
              <button className="text-primary hover:underline font-medium flex items-center">
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interview Preparation</h3>
              <p className="text-gray-600 mb-4">Prepare for your next job interview with our comprehensive guide.</p>
              <button className="text-primary hover:underline font-medium flex items-center">
                Start Preparing <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
