
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardSidebarActionProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const DashboardSidebarAction: React.FC<DashboardSidebarActionProps> = ({
  icon: Icon,
  label,
  isCollapsed,
  onClick,
  className = '',
  disabled = false
}) => {
  const buttonContent = (
    <Button
      variant="ghost"
      className={`w-full justify-start hover:bg-edvantage-light-blue dark:hover:bg-gray-800 ${
        isCollapsed ? 'px-0 justify-center' : 'px-4'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
      {!isCollapsed && <span>{label}</span>}
    </Button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
};
