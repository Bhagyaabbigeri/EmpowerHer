// src/components/FeaturedMentors.tsx
import { ArrowRight } from 'lucide-react';
import { MentorCard } from './MentorCard';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  expertise: string[];
  rating: number;
  sessions: number;
  available: boolean;
  image: string;
}

const featuredMentors: Mentor[] = [
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
    image: "https://randomuser.me/api/portraits/women/43.jpg"
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
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export const FeaturedMentors = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Featured Mentors</h2>
        <Button variant="ghost" size="sm" className="text-primary" asChild>
          <Link to="/mentors" className="flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {featuredMentors.map((mentor) => (
          <MentorCard key={mentor.id} {...mentor} compact />
        ))}
      </div>
    </section>
  );
};