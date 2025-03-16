
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  imageUrl: string;
  delay?: number;
}

const BlogCard = ({ title, excerpt, slug, date, category, imageUrl, delay = 0 }: BlogCardProps) => {
  const animationStyle = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div 
      className="glass-card overflow-hidden group animate-scale-in"
      style={animationStyle}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-edvantage-blue text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-edvantage-dark-gray mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{date}</span>
        </div>
        
        <Link to={`/blog/${slug}`}>
          <h3 className="heading-sm mb-3 group-hover:text-edvantage-blue transition-colors duration-300">
            {title}
          </h3>
        </Link>
        
        <p className="text-edvantage-dark-gray mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <Link 
          to={`/blog/${slug}`} 
          className="text-edvantage-blue font-medium inline-flex items-center group-hover:underline"
        >
          Read More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
