// src/app/mentors/page.tsx
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnhancedMentorCard } from '@/components/mentor/EnhancedMentorCard'
import { Search, Filter, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Find Mentors - EmpowerHer',
  description: 'Connect with experienced mentors to guide your journey',
}

const MENTORS = [
  // Existing mentors plus new ones
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer',
    company: 'TechCorp',
    experience: '8+ years',
    expertise: ['Career Growth', 'Tech Leadership', 'Negotiation'],
    rating: 4.8,
    imageUrl: '/mentors/sarah.jpg',
    sessions: 245,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'Product Manager',
    company: 'InnovateX',
    experience: '6+ years',
    expertise: ['Product Strategy', 'User Research', 'Agile'],
    rating: 4.7,
    imageUrl: '/mentors/maria.jpg',
    sessions: 189,
  },
  // Add more mentors...
]

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 text-center text-white">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Find Your Perfect Mentor
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Connect with experienced professionals who can guide you in your career and personal growth.
          </p>
          
          {/* Search and Filter */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search mentors by name, skills, or company..."
                    className="h-12 w-full rounded-lg border-none bg-white/10 pl-10 pr-4 text-white placeholder:text-white/70 focus-visible:ring-2 focus-visible:ring-white/20"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="h-12 border-none bg-white/10 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Mentors</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended Mentors</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="sessions">Most Sessions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MENTORS.map((mentor) => (
            <EnhancedMentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="group">
            Load More Mentors
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to accelerate your growth?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Join thousands of professionals who have found their perfect mentor on EmpowerHer.
          </p>
          <Button size="lg" className="mt-6">
            Become a Mentee
          </Button>
        </div>
      </div>
    </div>
  )
}