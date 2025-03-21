
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, User, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string,
  title: string,
  message: string,
  time: string,
  read: boolean,
  type: 'message' | 'group' | 'achievement' | 'system'
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'Sarah Johnson sent you a message',
    time: '5 min ago',
    read: false,
    type: 'message'
  },
  {
    id: '2',
    title: 'Group Invitation',
    message: 'You were invited to join "Physics Study Group"',
    time: '1 hour ago',
    read: false,
    type: 'group'
  },
  {
    id: '3',
    title: 'Achievement Unlocked',
    message: 'You earned the "Study Streak" badge',
    time: '3 hours ago',
    read: true,
    type: 'achievement'
  },
  {
    id: '4',
    title: 'System Update',
    message: 'New features have been added to the platform',
    time: '1 day ago',
    read: true,
    type: 'system'
  }
];

const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Get the current page title from the path
  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(Boolean);
    
    if (path.length === 1 && path[0] === 'dashboard') {
      return 'Dashboard';
    }
    
    if (path.length > 1) {
      const section = path[1];
      return section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
    }
    
    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.type === 'message') {
      navigate('/dashboard/communication');
    } else if (notification.type === 'group') {
      navigate('/dashboard/communication');
    } else if (notification.type === 'achievement') {
      navigate('/dashboard/achievements');
    }
    
    setNotificationOpen(false);
  };

  const viewAllNotifications = () => {
    setNotificationOpen(false);
    navigate('/dashboard/communication');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-gray-900 truncate">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="hidden md:flex items-center">
          <div className="relative max-w-xs w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 text-xs flex items-center justify-center px-1">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <ScrollArea className="h-[300px]">
                {notifications.length > 0 ? (
                  <div className="flex flex-col gap-1 px-1">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-2 rounded-md cursor-pointer hover:bg-muted ${
                          !notification.read ? 'bg-muted/50' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">{notification.title}</span>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">No notifications</p>
                  </div>
                )}
              </ScrollArea>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center" onClick={viewAllNotifications}>
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                <div className="h-8 w-8 rounded-full bg-edvantage-blue flex items-center justify-center text-white font-medium">
                  {user?.name.charAt(0)}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                <User className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
