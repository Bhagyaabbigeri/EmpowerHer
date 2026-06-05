// src/components/FeatureCard.tsx
import { ReactNode } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  actionText: string;
  actionLink: string;
  className?: string;
  iconBgColor?: string;
  iconColor?: string;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  actionText,
  actionLink,
  className = '',
  iconBgColor = 'bg-pink-100',
  iconColor = 'text-pink-600'
}: FeatureCardProps) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full ${iconBgColor} ${iconColor} flex-shrink-0`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
        </div>
        <div className="mt-4">
          <Link 
            to={actionLink} 
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
          >
            Set Up Now <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
  );
};