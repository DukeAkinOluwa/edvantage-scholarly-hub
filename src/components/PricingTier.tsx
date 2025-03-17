
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingTierProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

const PricingTier = ({
  name,
  price,
  period,
  description,
  features,
  isPopular = false,
  ctaText,
  ctaLink,
}: PricingTierProps) => {
  return (
    <div className={`rounded-2xl p-8 h-full flex flex-col ${
      isPopular 
        ? 'bg-edvantage-blue text-white shadow-lg scale-105 border-4 border-edvantage-light-blue' 
        : 'bg-white border border-gray-200'
    }`}>
      {isPopular && (
        <div className="py-1 px-4 bg-edvantage-light-blue text-edvantage-blue text-sm font-medium rounded-full w-fit mb-4">
          Most Popular
        </div>
      )}
      
      <h3 className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-edvantage-blue'}`}>
        {name}
      </h3>
      
      <div className="mt-4 mb-4">
        <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-edvantage-blue'}`}>
          {price}
        </span>
        <span className={`text-sm ${isPopular ? 'text-white/70' : 'text-gray-600'}`}>
          /{period}
        </span>
      </div>
      
      <p className={`mb-6 ${isPopular ? 'text-white/80' : 'text-gray-600'}`}>
        {description}
      </p>
      
      <div className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className={`mr-3 mt-1 rounded-full p-1 ${
              isPopular ? 'bg-white/20' : 'bg-edvantage-light-blue/30'
            }`}>
              <Check size={16} className={isPopular ? 'text-white' : 'text-edvantage-blue'} />
            </div>
            <span className={isPopular ? 'text-white/90' : 'text-gray-700'}>
              {feature}
            </span>
          </div>
        ))}
      </div>
      
      <Button 
        className={`w-full mt-auto ${
          isPopular 
            ? 'bg-white hover:bg-gray-100 text-edvantage-blue' 
            : 'bg-edvantage-blue hover:bg-edvantage-dark-blue text-white'
        }`}
        asChild
      >
        <a href={ctaLink}>{ctaText}</a>
      </Button>
    </div>
  );
};

export default PricingTier;
