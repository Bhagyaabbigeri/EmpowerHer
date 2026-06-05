// src/lib/pages/Mentors.tsx
import { useState } from 'react';
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Search, Filter, MessageCircle, Star, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Sample mentor data
  const mentors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Senior Software Engineer",
      company: "TechCorp",
      location: "Bangalore",
      expertise: ["Career Growth", "Tech Leadership", "Interview Prep"],
      rating: 4.9,
      sessions: 245,
      available: true,
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      category: "technology"
    },
    {
      id: 2,
      name: "Ananya Patel",
      role: "Startup Founder",
      company: "SheLeads",
      location: "Mumbai",
      expertise: ["Entrepreneurship", "Funding", "Startup Growth"],
      rating: 4.8,
      sessions: 189,
      available: true,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      category: "business"
    },
    {
      id: 3,
      name: "Dr. Meera Krishnan",
      role: "Clinical Psychologist",
      company: "MindWell Clinic",
      location: "Delhi",
      expertise: ["Mental Health", "Work-Life Balance", "Stress Management"],
      rating: 4.9,
      sessions: 312,
      available: false,
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      category: "wellness"
    },
    {
      id: 4,
      name: "Neha Gupta",
      role: "VP of Engineering",
      company: "FinTech Solutions",
      location: "Bangalore",
      expertise: ["Engineering Management", "Career Transitions", "Negotiation"],
      rating: 4.7,
      sessions: 198,
      available: true,
      image: "https://randomuser.me/api/portraits/women/31.jpg",
      category: "technology"
    },
    {
      id: 5,
      name: "Shreya Malhotra",
      role: "Financial Advisor",
      company: "WealthWise",
      location: "Mumbai",
      expertise: ["Investment", "Financial Planning", "Wealth Management"],
      rating: 4.8,
      sessions: 176,
      available: true,
      image: "https://randomuser.me/api/portraits/women/54.jpg",
      category: "finance"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Mentors' },
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'finance', label: 'Finance' },
    { id: 'wellness', label: 'Wellness' }
  ];

  const filteredMentors = mentors
    .filter(mentor => 
      (mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (activeTab === 'all' || mentor.category === activeTab)
    );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Find a Mentor" />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors or expertise..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeTab === category.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setActiveTab(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Mentors List */}
        <div className="space-y-4">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <Link 
                to={`/mentors/${mentor.id}`} 
                key={mentor.id} 
                className="block"
              >
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border hover:border-primary/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-gray-100 overflow-hidden">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground truncate">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{mentor.role} • {mentor.company}</p>
                        </div>
                        <div className="flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mentor.location}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {mentor.expertise.slice(0, 2).map((skill, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                        {mentor.expertise.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            +{mentor.expertise.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{mentor.sessions} sessions</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="gap-1.5" 
                          disabled={!mentor.available}
                          onClick={(e) => e.preventDefault()}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 text-muted-foreground mb-4">
                <Search className="h-full w-full" />
              </div>
              <h3 className="font-medium text-foreground">No mentors found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Mentors;