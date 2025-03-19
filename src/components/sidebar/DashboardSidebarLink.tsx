
import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardSidebarLinkProps {
  link: {
    title: string;
    icon: React.ElementType;
    path: string;
  };
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

export const DashboardSidebarLink: React.FC<DashboardSidebarLinkProps> = ({
  link,
  isActive,
  isCollapsed,
  onClick
}) => {
  const Icon = link.icon;
  
  const linkContent = (
    <Link
      to={link.path}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-edvantage-blue dark:bg-edvantage-blue/80 text-white' 
          : 'hover:bg-edvantage-light-blue dark:hover:bg-gray-800 text-edvantage-dark-gray dark:text-gray-300'
      }`}
      onClick={onClick}
    >
      <Icon size={20} className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
      {!isCollapsed && <span>{link.title}</span>}
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            {link.title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return linkContent;
};
