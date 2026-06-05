import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import React from 'react';
import { 
  Search, BookOpen, Briefcase, ChevronRight, HeartPulse, 
  ShieldCheck, PiggyBank, Stethoscope, CalendarCheck, 
  FileText, Award, HandCoins, Users, Scale, Home, 
  Baby, Utensils, Hospital, GraduationCap, UserCheck, 
  TrendingUp 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const handleViewResource = (resourceTitle: string, category: string) => {
    // Map of resources to their corresponding URLs or actions
    const resourceMap: Record<string, string> = {
      // Career Development
      'Resume Building Guide': 'https://www.indeed.com/career-advice/resumes-cover-letters/resume-building-guide',
      'Interview Preparation': 'https://www.themuse.com/advice/interviewing',
      'Career Counseling': 'https://www.careercontessa.com/career-advice/',
      'Skill Development': 'https://www.coursera.org/courses?query=skill%20development',
      'Job Portal': 'https://www.linkedin.com/jobs/women-in-tech-jobs/',
      
      // Health & Wellness
      'Mental Health Support': 'https://www.mentalhealth.gov/get-help',
      'Preventive Care': 'https://www.cdc.gov/prevention/index.html',
      'Wellness Programs': 'https://www.wellsteps.com/blog/employee-wellness-programs',
      'Maternal Health': 'https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what',
      'Nutrition Guide': 'https://www.choosemyplate.gov/eathealthy',
      "Women's Health Clinics": 'https://www.plannedparenthood.org/health-center',
      
      // Women's Schemes
      'Government Schemes': 'https://wcd.nic.in/schemes-listing/2405',
      'Scholarships': 'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/scholarships-for-women/',
      'Legal Rights': 'https://www.unwomen.org/en/what-we-do/ending-violence-against-women/faqs/womens-human-rights',
      'Housing Schemes': 'https://pmaymis.gov.in/',
      'Entrepreneurship': 'https://www.womenwhotech.com/',
      'Skill Training': 'https://www.nationalskillsnetwork.in/skill-development-courses-for-women-in-india/',
      
      // Funding Opportunities
      'Startup Grants': 'https://www.grants.gov/learn-grants/grant-programs/women-entrepreneurs.html',
      'Business Loans': 'https://www.sba.gov/funding-programs/loans/women-owned-businesses',
      'Awards & Recognition': 'https://www.forbes.com/sites/forbesbusinesscouncil/2021/03/05/15-awards-and-grants-for-women-entrepreneurs/?sh=1a1e5c0b5f9a',
      'Angel Investors': 'https://www.goldenseeds.com/',
      'Crowdfunding': 'https://www.ifundwomen.com/',
      'Venture Capital': 'https://www.fundera.com/business-loans/guides/venture-capital-for-women'
    };

    const url = resourceMap[resourceTitle];
    if (url) {
      window.open(url, '_blank');
    } else {
      // Fallback action if resource URL is not defined
      alert(`Opening ${resourceTitle} in a new tab...`);
      // You can add more specific handling or navigation logic here
    }
  };
  const careerResources = [
    {
      title: "Resume Building Guide",
      description: "Step-by-step guide to create an impressive resume",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Interview Preparation",
      description: "Common interview questions and how to answer them",
      icon: <Briefcase className="h-6 w-6 text-green-500" />
    },
    {
      title: "Career Counseling",
      description: "Personalized guidance for career growth",
      icon: <Users className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Skill Development",
      description: "Courses and workshops to enhance your skills",
      icon: <Award className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Job Portal",
      description: "Exclusive job listings for women professionals",
      icon: <Briefcase className="h-6 w-6 text-teal-500" />
    }
  ];

  const healthWellnessResources = [
    {
      title: "Mental Health Support",
      description: "Resources and helplines for mental well-being",
      icon: <HeartPulse className="h-6 w-6 text-pink-500" />
    },
    {
      title: "Preventive Care",
      description: "Essential health check-ups and screenings",
      icon: <Stethoscope className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Wellness Programs",
      description: "Fitness and nutrition programs for women",
      icon: <CalendarCheck className="h-6 w-6 text-teal-500" />
    },
    {
      title: "Maternal Health",
      description: "Prenatal and postnatal care resources",
      icon: <Baby className="h-6 w-6 text-rose-400" />
    },
    {
      title: "Nutrition Guide",
      description: "Balanced diet plans and nutritional advice",
      icon: <Utensils className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Women's Health Clinics",
      description: "Find specialized healthcare providers",
      icon: <Hospital className="h-6 w-6 text-red-500" />
    }
  ];

  const womensSchemes = [
    {
      title: "Government Schemes",
      description: "List of government schemes for women empowerment",
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Scholarships",
      description: "Educational scholarships for women and girls",
      icon: <FileText className="h-6 w-6 text-indigo-500" />
    },
    {
      title: "Legal Rights",
      description: "Know your legal rights and protections",
      icon: <Scale className="h-6 w-6 text-red-500" />
    },
    {
      title: "Housing Schemes",
      description: "Affordable housing programs for women",
      icon: <Home className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Entrepreneurship",
      description: "Support for women-led startups",
      icon: <Briefcase className="h-6 w-6 text-green-500" />
    },
    {
      title: "Skill Training",
      description: "Vocational training programs",
      icon: <GraduationCap className="h-6 w-6 text-purple-500" />
    }
  ];

  const fundingOpportunities = [
    {
      title: "Startup Grants",
      description: "Funding options for women entrepreneurs",
      icon: <PiggyBank className="h-6 w-6 text-green-600" />
    },
    {
      title: "Business Loans",
      description: "Low-interest loans for women-owned businesses",
      icon: <HandCoins className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Awards & Recognition",
      description: "Awards and grants for women achievers",
      icon: <Award className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Angel Investors",
      description: "Connect with women-focused investors",
      icon: <UserCheck className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Crowdfunding",
      description: "Raise funds for your business ideas",
      icon: <Users className="h-6 w-6 text-pink-600" />
    },
    {
      title: "Venture Capital",
      description: "VC firms supporting women entrepreneurs",
      icon: <TrendingUp className="h-6 w-6 text-indigo-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-center">
      <Header title="Resources" />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Search Bar */}
        <div className="relative mb-10 max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-10 py-4 text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
          />
        </div>

        {/* Career Development Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Career Development</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-transparent p-0">
              See all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 flex flex-col items-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    {React.cloneElement(resource.icon, { className: "h-8 w-8" })}
                  </div>
                  <CardTitle className="text-xl font-bold text-center">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-center text-gray-600">{resource.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => handleViewResource(resource.title, 'career')}
                  >
                    View Resource
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Health & Wellness Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Health & Wellness</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-transparent p-0">
              See all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthWellnessResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 flex flex-col items-center">
                  <div className="p-3 bg-pink-50 rounded-full mb-4">
                    {React.cloneElement(resource.icon, { className: "h-8 w-8" })}
                  </div>
                  <CardTitle className="text-xl font-bold text-center">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-center text-gray-600">{resource.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => handleViewResource(resource.title, 'health')}
                  >
                    View Resource
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Women's Schemes Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Women's Schemes</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-transparent p-0">
              See all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {womensSchemes.map((scheme, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 flex flex-col items-center">
                  <div className="p-3 bg-amber-50 rounded-full mb-4">
                    {React.cloneElement(scheme.icon, { className: "h-8 w-8" })}
                  </div>
                  <CardTitle className="text-xl font-bold text-center">{scheme.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-center text-gray-600">{scheme.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => handleViewResource(scheme.title, 'schemes')}
                  >
                    View Scheme
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Funding Opportunities Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Funding Opportunities</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-transparent p-0">
              See all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundingOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 flex flex-col items-center">
                  <div className="p-3 bg-green-50 rounded-full mb-4">
                    {React.cloneElement(opportunity.icon, { className: "h-8 w-8" })}
                  </div>
                  <CardTitle className="text-xl font-bold text-center">{opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-center text-gray-600">{opportunity.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => handleViewResource(opportunity.title, 'funding')}
                  >
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Resources;
