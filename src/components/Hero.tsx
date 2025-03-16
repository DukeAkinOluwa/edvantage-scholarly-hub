
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl?: string;
}

const Hero = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageUrl,
}: HeroProps) => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl animate-slide-in-left">
            <div className="inline-block py-1 px-3 rounded-full bg-edvantage-light-blue text-edvantage-blue text-sm font-medium mb-2">
              Student Productivity Platform
            </div>
            <h1 className="heading-xl">{title}</h1>
            <p className="text-lg text-edvantage-dark-gray">{subtitle}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={ctaLink} className="btn-primary flex items-center">
                {ctaText}
                <ArrowRight size={18} className="ml-2" />
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link to={secondaryCtaLink} className="btn-secondary">
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
          <div className="relative lg:h-[500px] animate-slide-in-right">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Edvantage App"
                className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-edvantage-blue via-edvantage-blue/80 to-edvantage-dark-blue flex items-center justify-center text-white font-display text-2xl">
                Edvantage
              </div>
            )}
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-edvantage-accent/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-edvantage-blue/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
