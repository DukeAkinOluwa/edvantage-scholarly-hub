
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, BookOpen, Users, Briefcase, 
  Brain, Award, Bell, Settings, LogOut,
  Menu, X, ChevronRight, Home, Download,
  Sun, Moon, User, MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { collectUserData, generateUserDataPDF } from '@/utils/pdfExport';
import { DashboardSidebarLink } from './sidebar/DashboardSidebarLink';
import { DashboardSidebarAction } from './sidebar/DashboardSidebarAction';
import { DashboardSidebarMobileToggle } from './sidebar/DashboardSidebarMobileToggle';
import { DashboardSidebarProfile } from './sidebar/DashboardSidebarProfile';

type SidebarLink = {
  title: string;
  icon: React.ElementType;
  path: string;
};

interface DashboardSidebarProps {
  onToggleCollapse?: (collapsed: boolean) => void;
}

const DashboardSidebar = ({ onToggleCollapse }: DashboardSidebarProps) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
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
    { title: 'Chats', icon: MessageCircle, path: '/dashboard/chats' },
    { title: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
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

  const downloadUserData = async () => {
    if (!user || isExporting) return;
    
    setIsExporting(true);
    toast({
      title: "Data Export",
      description: "Your data is being prepared for download. This may take a moment.",
    });
    
    try {
      const userData = await collectUserData(user.id);
      const pdfUrl = await generateUserDataPDF(userData);
      
      toast({
        title: "Data Ready",
        description: "Your data has been prepared and is downloading now.",
      });
      
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'user-data-export.pdf';
      link.click();
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive"
      });
      console.error('Data export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const viewProfile = () => {
    navigate('/dashboard/profile');
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

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
            className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
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
        <DashboardSidebarProfile user={user} onClick={viewProfile} />
      )}
      
      <div className="space-y-1 px-2 mt-2">
        {links.map(link => (
          <DashboardSidebarLink
            key={link.path}
            link={link}
            isActive={location.pathname === link.path}
            isCollapsed={isCollapsed}
            onClick={() => setIsMobileOpen(false)}
          />
        ))}
      </div>
      
      <div className="mt-auto px-2 pb-4 pt-4 space-y-1">
        {isCollapsed && (
          <DashboardSidebarAction
            icon={User}
            label="View Profile"
            isCollapsed={isCollapsed}
            onClick={viewProfile}
            className="text-edvantage-blue dark:text-edvantage-light-blue"
          />
        )}
        
        <DashboardSidebarAction
          icon={isDarkMode ? Sun : Moon}
          label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          isCollapsed={isCollapsed}
          onClick={toggleDarkMode}
          className={isDarkMode ? "text-yellow-400" : "text-gray-500"}
        />
        
        <DashboardSidebarAction
          icon={Download}
          label={isExporting ? 'Exporting...' : 'Export My Data'}
          isCollapsed={isCollapsed}
          onClick={downloadUserData}
          disabled={isExporting}
          className="text-edvantage-blue dark:text-edvantage-light-blue"
        />
        
        <DashboardSidebarAction
          icon={LogOut}
          label="Log Out"
          isCollapsed={isCollapsed}
          onClick={handleLogout}
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
        />
      </div>
    </>
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 bottom-0 z-30 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out md:translate-x-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {sidebarContent}
      </div>
      
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {!isMobileOpen && <DashboardSidebarMobileToggle onClick={toggleMobileSidebar} />}
    </>
  );
};

export default DashboardSidebar;
