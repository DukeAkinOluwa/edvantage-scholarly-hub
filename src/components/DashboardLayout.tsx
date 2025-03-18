
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Function to check if sidebar is collapsed
    const checkSidebarState = () => {
      const sidebarElement = document.querySelector('[class*="fixed top-0 left-0 bottom-0 z-30"]');
      if (sidebarElement) {
        const classes = sidebarElement.className;
        setIsSidebarCollapsed(classes.includes('w-16'));
      }
    };

    // Initial check
    checkSidebarState();

    // Set up a mutation observer to detect changes to the sidebar
    const observer = new MutationObserver(checkSidebarState);
    const targetNode = document.body;
    
    if (targetNode) {
      observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <DashboardSidebar />
      
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
