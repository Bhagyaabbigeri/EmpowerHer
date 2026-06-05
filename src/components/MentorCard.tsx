// src/components/MentorCard.tsx
import { Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export interface MentorCardProps {
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
  compact?: boolean;
}

export const MentorCard = ({
  id,
  name,
  role,
  company,
  location,
  expertise,
  rating,
  sessions,
  available,
  image,
  compact = false
}: MentorCardProps) => {
  return (
    <div className={`bg-card rounded-xl ${compact ? 'p-3' : 'p-4'} shadow-sm border border-border hover:shadow-md transition-shadow`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className={`${compact ? 'h-12 w-12' : 'h-16 w-16'} rounded-full bg-gray-100 overflow-hidden`}>
            <img 
              src={image} 
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-foreground truncate`}>
                {name}
              </h3>
              <p className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                {role} • {company}
              </p>
            </div>
            {!compact && (
              <div className="flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                {location}
              </div>
            )}
          </div>
          
          {!compact && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {expertise.slice(0, 2).map((skill, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {skill}
                </span>
              ))}
              {expertise.length > 2 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  +{expertise.length - 2} more
                </span>
              )}
            </div>
          )}

          <div className={`${compact ? 'mt-1' : 'mt-2'} flex items-center justify-between`}>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              <span className="mx-1 text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{sessions} sessions</span>
            </div>
            <Button 
              size={compact ? "sm" : "default"} 
              className={`gap-1.5 ${compact ? 'h-8' : ''}`} 
              disabled={!available}
              asChild
            >
              <Link to={`/mentors/${id}`} className="flex items-center">
                <MessageCircle className="h-4 w-4" />
                {!compact && <span className="ml-1">Message</span>}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};