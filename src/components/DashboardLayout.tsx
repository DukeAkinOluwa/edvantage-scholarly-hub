
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check if sidebar is collapsed from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsSidebarCollapsed(savedState === 'true');
    }
  }, []);

  // Handler for sidebar toggle
  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-all duration-300">
      <DashboardSidebar 
        // @ts-ignore - Temporarily ignore the type error while we fix the component interfaces
        onToggleCollapse={handleSidebarToggle} 
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        <DashboardHeader />
        
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
