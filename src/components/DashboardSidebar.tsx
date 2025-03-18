
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, BookOpen, Users, Briefcase, 
  Brain, Award, Bell, Settings, LogOut,
  Menu, X, ChevronRight, Home, Download,
  Sun, Moon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type SidebarLink = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Add event listener for window resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links: SidebarLink[] = [
    { title: 'Dashboard', icon: Home, path: '/dashboard' },
    { title: 'Schedule & Tasks', icon: Calendar, path: '/dashboard/calendar' },
    { title: 'Resources', icon: BookOpen, path: '/dashboard/resources' },
    { title: 'Study Groups', icon: Users, path: '/dashboard/groups' },
    { title: 'Projects', icon: Briefcase, path: '/dashboard/projects' },
    { title: 'AI Study Support', icon: Brain, path: '/dashboard/ai-support' },
    { title: 'Achievements', icon: Award, path: '/dashboard/achievements' },
    { title: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const downloadUserData = () => {
    toast({
      title: "Data Export",
      description: "Your data is being prepared for download. This may take a moment.",
    });
    
    // Simulate PDF generation with timeout
    setTimeout(() => {
      toast({
        title: "Data Ready",
        description: "Your data has been prepared and is downloading now.",
      });
      
      // This would normally generate and provide a real PDF, we're just simulating for now
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'user-data-export.pdf';
      link.click();
    }, 2000);
  };

  // Render a sidebar link
  const renderLink = (link: SidebarLink) => {
    const isActive = location.pathname === link.path;
    const Icon = link.icon;
    
    return (
      <TooltipProvider key={link.path}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-edvantage-blue dark:bg-edvantage-blue/80 text-white' 
                  : 'hover:bg-edvantage-light-blue dark:hover:bg-gray-800 text-edvantage-dark-gray dark:text-gray-300'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon size={20} className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
              {!isCollapsed && <span>{link.title}</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              {link.title}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Main content of the sidebar
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 py-5">
        {!isCollapsed && (
          <Link to="/dashboard" className="text-xl font-bold text-edvantage-blue dark:text-edvantage-light-blue flex items-center">
            Edvantage
          </Link>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="md:flex hidden"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden flex"
          onClick={toggleMobileSidebar}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-edvantage-blue dark:bg-edvantage-blue/80 flex items-center justify-center text-white font-medium">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{user?.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-1 px-2 mt-2">
        {links.map(renderLink)}
      </div>
      
      <div className="mt-auto px-2 pb-2 space-y-1">
        {/* Dark Mode Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start hover:bg-edvantage-light-blue dark:hover:bg-gray-800 ${
                  isCollapsed ? 'px-0 justify-center' : 'px-4'
                }`}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <Sun size={20} className={`text-yellow-400 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                ) : (
                  <Moon size={20} className={`text-gray-500 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                )}
                {!isCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {/* Download User Data */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start hover:bg-edvantage-light-blue dark:hover:bg-gray-800 ${
                  isCollapsed ? 'px-0 justify-center' : 'px-4'
                }`}
                onClick={downloadUserData}
              >
                <Download size={20} className={`text-edvantage-blue dark:text-edvantage-light-blue ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && <span>Export My Data</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                Export My Data
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {/* Logout button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 ${
                  isCollapsed ? 'px-0 justify-center' : 'px-4'
                }`}
                onClick={handleLogout}
              >
                <LogOut size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                {!isCollapsed && <span>Log Out</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                Log Out
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );

  // Mobile sidebar toggle button (visible when sidebar is closed)
  const mobileToggle = (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 z-20 md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-full h-12 w-12"
      onClick={toggleMobileSidebar}
      aria-label="Open sidebar"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-30 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all md:translate-x-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {sidebarContent}
      </div>
      
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Mobile toggle button */}
      {!isMobileOpen && mobileToggle}
    </>
  );
};

export default DashboardSidebar;
