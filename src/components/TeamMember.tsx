
import { Github, Linkedin, Twitter } from "lucide-react";

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github';
  url: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks?: SocialLink[];
  delay?: number;
}

const TeamMember = ({ name, role, bio, imageUrl, socialLinks = [], delay = 0 }: TeamMemberProps) => {
  const animationStyle = {
    animationDelay: `${delay}ms`,
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'github':
        return <Github size={18} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl group animate-scale-in"
      style={animationStyle}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {socialLinks.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-edvantage-blue hover:bg-edvantage-blue hover:text-white transition-colors duration-300"
                  aria-label={`${name}'s ${link.platform}`}
                >
                  {renderSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="heading-sm">{name}</h3>
        <p className="text-edvantage-blue font-medium mb-3">{role}</p>
        <p className="text-edvantage-dark-gray">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMember;
