
import React from 'react';

interface DashboardSidebarProfileProps {
  user: any;
  onClick: () => void;
}

export const DashboardSidebarProfile: React.FC<DashboardSidebarProfileProps> = ({
  user,
  onClick
}) => {
  if (!user) return null;
  
  return (
    <div className="px-4 pb-4">
      <div 
        className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={onClick}
      >
        <div className="h-10 w-10 rounded-full bg-edvantage-blue dark:bg-edvantage-blue/80 flex items-center justify-center text-white font-medium">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{user.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
