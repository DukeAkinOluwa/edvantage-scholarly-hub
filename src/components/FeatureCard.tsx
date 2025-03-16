
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  const animationStyle = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div 
      className="glass-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in"
      style={animationStyle}
    >
      <div className="w-12 h-12 rounded-lg bg-edvantage-light-blue flex items-center justify-center text-edvantage-blue mb-6">
        {icon}
      </div>
      <h3 className="heading-sm mb-3">{title}</h3>
      <p className="text-edvantage-dark-gray">{description}</p>
    </div>
  );
};

export default FeatureCard;
