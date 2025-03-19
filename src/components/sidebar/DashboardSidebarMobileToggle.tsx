
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardSidebarMobileToggleProps {
  onClick: () => void;
}

export const DashboardSidebarMobileToggle: React.FC<DashboardSidebarMobileToggleProps> = ({
  onClick
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 z-40 md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-full h-12 w-12 transition-transform hover:scale-105"
      onClick={onClick}
      aria-label="Open sidebar"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};
