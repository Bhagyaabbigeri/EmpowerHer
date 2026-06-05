// src/components/mentor/EnhancedMentorCard.tsx
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Mentor {
  id: string
  name: string
  role: string
  company: string
  experience: string
  expertise: string[]
  rating: number
  imageUrl?: string
  sessions: number
}

interface EnhancedMentorCardProps {
  mentor: Mentor
  variant?: 'default' | 'featured'
}

export function EnhancedMentorCard({ mentor, variant = 'default' }: EnhancedMentorCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md ${
      variant === 'featured' ? 'ring-2 ring-primary/20' : ''
    }`}>
      {variant === 'featured' && (
        <div className="absolute right-3 top-3 z-10">
          <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white">
            Featured
          </Badge>
        </div>
      )}
      
      <div className="relative h-40 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
            <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="mt-16 px-4 pb-6 text-center">
        <h3 className="text-lg font-semibold text-foreground">{mentor.name}</h3>
        <p className="text-sm text-muted-foreground">{mentor.role} at {mentor.company}</p>
        
        <div className="my-3 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(mentor.rating)
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">
            {mentor.rating.toFixed(1)}
          </span>
        </div>
        
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {mentor.expertise.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-muted/50 p-2">
            <div className="font-medium">{mentor.experience}</div>
            <div className="text-xs text-muted-foreground">Experience</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-2">
            <div className="font-medium">{mentor.sessions}+</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="mt-4 w-full">
          View Profile
        </Button>
      </div>
    </div>
  )
}