// src/app/funding-opportunities/page.tsx
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, DollarSign, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Funding Opportunities - EmpowerHer',
  description: 'Discover funding opportunities for women entrepreneurs and professionals',
}

const FUNDING_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Women in Tech Grant',
    organization: 'Tech for Good Foundation',
    amount: '$10,000',
    deadline: '2024-03-15',
    type: 'Grant',
    category: 'Technology',
    description: 'Funding for women-led tech startups focusing on social impact and innovation.',
    eligibility: 'Women founders with at least 25% ownership in a tech startup.',
    status: 'Open',
    location: 'Global',
    duration: '1 year',
    website: 'https://techforgood.org/grants'
  },
  {
    id: 2,
    title: 'Women Entrepreneurs Scholarship',
    organization: 'Women Who Startup',
    amount: '$5,000',
    deadline: '2024-02-28',
    type: 'Scholarship',
    category: 'Education',
    description: 'Scholarship for women entrepreneurs pursuing business or technology degrees.',
    eligibility: 'Female students enrolled in accredited business or tech programs.',
    status: 'Open',
    location: 'United States',
    duration: 'One-time',
    website: 'https://womenwhostartup.org/scholarships'
  },
  {
    id: 3,
    title: 'Female Founders Fund',
    organization: 'Golden Seeds',
    amount: '$100,000',
    deadline: '2024-04-30',
    type: 'Investment',
    category: 'Startup',
    description: 'Early-stage funding for female-founded companies with high growth potential.',
    eligibility: 'Women-led startups with MVP and initial traction.',
    status: 'Open',
    location: 'North America',
    duration: 'Varies',
    website: 'https://goldenseeds.com/investment-criteria/'
  },
  {
    id: 4,
    title: 'Women in STEM Fellowship',
    organization: 'AnitaB.org',
    amount: '$15,000',
    deadline: '2024-03-01',
    type: 'Fellowship',
    category: 'STEM',
    description: 'One-year fellowship for women in STEM fields to advance their careers.',
    eligibility: 'Women with at least 2 years of experience in STEM fields.',
    status: 'Open',
    location: 'Global',
    duration: '1 year',
    website: 'https://anitab.org/programs/fellowships/'
  },
  {
    id: 5,
    title: 'SheEO Venture Program',
    organization: 'SheEO',
    amount: 'Up to $100,000',
    deadline: '2024-05-15',
    type: 'Grant',
    category: 'Business',
    description: '0% interest loans for women and non-binary entrepreneurs.',
    eligibility: 'Women/non-binary founders with revenue-generating businesses.',
    status: 'Open',
    location: 'Global',
    duration: '5 years',
    website: 'https://sheeo.world/venture/'
  },
  {
    id: 6,
    title: 'Cartier Women\'s Initiative',
    organization: 'Cartier',
    amount: '$100,000',
    deadline: '2024-06-30',
    type: 'Award',
    category: 'Social Enterprise',
    description: 'Annual international entrepreneurship program for women impact entrepreneurs.',
    eligibility: 'Women-led for-profit businesses with social/environmental impact.',
    status: 'Upcoming',
    location: 'Global',
    duration: 'One-time',
    website: 'https://www.cartierwomensinitiative.com/'
  },
  {
    id: 7,
    title: 'Amber Grant',
    organization: 'WomensNet',
    amount: '$10,000',
    deadline: 'Last day of each month',
    type: 'Grant',
    category: 'Business',
    description: 'Monthly grants awarded to women entrepreneurs to grow their business.',
    eligibility: 'Women business owners in any industry.',
    status: 'Open',
    location: 'United States, Canada',
    duration: 'Monthly',
    website: 'https://ambergrantsforwomen.com/'
  },
  {
    id: 8,
    title: 'Tory Burch Fellows Program',
    organization: 'Tory Burch Foundation',
    amount: '$5,000',
    deadline: '2024-09-15',
    type: 'Fellowship',
    category: 'Business',
    description: 'Year-long program providing education, funding, and support to women entrepreneurs.',
    eligibility: 'Women entrepreneurs with a for-profit business.',
    status: 'Upcoming',
    location: 'United States',
    duration: '1 year',
    website: 'https://www.toryburchfoundation.org/fellows-program/'
  },
  {
    id: 9,
    title: 'Women Founders Network',
    organization: 'WFN',
    amount: '$25,000',
    deadline: '2024-07-01',
    type: 'Competition',
    category: 'Startup',
    description: 'Annual competition for women-led startups with high growth potential.',
    eligibility: 'Women-led startups with at least $100K in revenue.',
    status: 'Open',
    location: 'United States',
    duration: 'One-time',
    website: 'https://www.womenfoundersnetwork.com/'
  }
]

export default function FundingOpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 text-center text-white">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Funding Opportunities
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            Discover grants, scholarships, and funding programs designed to support women in business and technology.
          </p>
          
          {/* Search and Filter */}
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="Search funding opportunities..."
                  className="h-12 w-full rounded-lg border-none bg-white/10 px-4 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <select className="h-12 rounded-lg border-none bg-white/10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                <option value="">All Categories</option>
                <option value="grant">Grants</option>
                <option value="scholarship">Scholarships</option>
                <option value="fellowship">Fellowships</option>
                <option value="competition">Competitions</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Funding</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="deadline">Deadline (Soonest)</option>
              <option value="amount">Amount (Highest)</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FUNDING_OPPORTUNITIES.map((opportunity) => (
            <Card key={opportunity.id} className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary">
                      {opportunity.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {opportunity.organization}
                    </p>
                  </div>
                  <Badge
                    variant={opportunity.status === 'Open' ? 'default' : 'secondary'}
                    className="whitespace-nowrap"
                  >
                    {opportunity.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                  {opportunity.description}
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium">Amount:</span>
                    <span className="ml-1">{opportunity.amount}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium">Deadline:</span>
                    <span className="ml-1">{opportunity.deadline}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-1">{opportunity.location}</span>
                  </div>
                  {opportunity.duration && (
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="font-medium">Duration:</span>
                      <span className="ml-1">{opportunity.duration}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full rounded-t-none"
                >
                  <a 
                    href={opportunity.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline">
            Load More Opportunities
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Looking for personalized funding recommendations?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Create a profile and get matched with funding opportunities that fit your needs.
          </p>
          <Button size="lg" className="mt-6">
            Get Matched
          </Button>
        </div>
      </div>
    </div>
  )
}