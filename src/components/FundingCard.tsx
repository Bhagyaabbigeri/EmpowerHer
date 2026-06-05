import { DollarSign, Clock, ChevronRight, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FundingCardProps {
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
  isNew?: boolean;
}

export const FundingCard = ({
  title,
  organization,
  amount,
  deadline,
  category,
  isNew,
}: FundingCardProps) => {
  return (
    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {isNew && (
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm">
          New
        </span>
      )}

      {/* Category */}
      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary mb-4">
        {category}
      </span>

      <div className="relative z-10">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Building2 className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{organization}</span>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            <span>{amount}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Due {deadline}</span>
          </div>
        </div>

        {/* CTA */}
        <Link to="/mentors/funding-opportunities" className="w-full">
          <Button 
            variant="outline" 
            className="w-full group/button bg-white hover:bg-gray-50 border-gray-200 hover:border-primary/30 transition-all duration-300"
          >
            <span className="mr-2 font-medium">Apply Now</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
