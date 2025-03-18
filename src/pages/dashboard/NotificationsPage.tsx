
import React, { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { notifications, Notification } from '@/data/dummyData';

const NotificationsPage = () => {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);
  const { toast } = useToast();
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "You've cleared all your unread notifications.",
    });
  };
  
  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotificationsList(prev => 
      prev.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };
  
  // Clear all notifications
  const clearAll = () => {
    setNotificationsList([]);
    
    toast({
      title: "All notifications cleared",
      description: "Your notifications list has been cleared.",
    });
  };
  
  // Get unread notifications count
  const unreadCount = notificationsList.filter(notification => !notification.read).length;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Get notification type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task':
        return 'bg-blue-100 text-blue-600';
      case 'event':
        return 'bg-purple-100 text-purple-600';
      case 'group':
        return 'bg-green-100 text-green-600';
      case 'message':
        return 'bg-indigo-100 text-indigo-600';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  // Notification item component
  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div className={`p-4 border-b last:border-b-0 ${notification.read ? 'bg-white' : 'bg-edvantage-light-blue'}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
          <Bell className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h4 className="font-medium text-base">{notification.title}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDate(notification.time)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          
          <div className="flex mt-3 gap-2">
            {notification.actionUrl && (
              <Button size="sm" variant="outline" className="h-8" asChild>
                <a href={notification.actionUrl}>View</a>
              </Button>
            )}
            {!notification.read && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 text-blue-600 hover:text-blue-700"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Mark as read
              </Button>
            )}
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 text-red-600 hover:text-red-700 ml-auto"
              onClick={() => deleteNotification(notification.id)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
          {notificationsList.length > 0 && (
            <Button variant="outline" className="text-red-600" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all">
            <div className="px-4 pt-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="all">
                  All ({notificationsList.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              {notificationsList.length > 0 ? (
                <div>
                  {notificationsList.map(notification => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Bell className="h-10 w-10 mx-auto mb-3 text-muted" />
                  <p>No notifications to display</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-0">
              {unreadCount > 0 ? (
                <div>
                  {notificationsList
                    .filter(notification => !notification.read)
                    .map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Check className="h-10 w-10 mx-auto mb-3 text-green-500" />
                  <p>You're all caught up!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
