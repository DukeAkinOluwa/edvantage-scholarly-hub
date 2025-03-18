
import React, { useState } from 'react';
import { Bell, User, Lock, LogOut, Moon, Sun, Globe, Shield, Trash2, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // User profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    department: user?.department || '',
    level: user?.level || '',
    bio: 'Computer Science student passionate about software development and AI.',
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    eventAlerts: true,
    groupMessages: true,
    achievementAlerts: true,
  });
  
  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    theme: 'light',
    language: 'english',
  });
  
  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showProfileToGroups: true,
    allowFriendRequests: true,
    dataCollection: true,
  });
  
  // Handle profile data change
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // Handle notification setting toggle
  const handleNotificationToggle = (field: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof notificationSettings],
    }));
  };
  
  // Handle privacy setting toggle
  const handlePrivacyToggle = (field: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof privacySettings],
    }));
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  // Save notification settings
  const saveNotificationSettings = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  // Save theme settings
  const saveThemeSettings = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance preferences have been updated.",
    });
  };
  
  // Save privacy settings
  const savePrivacySettings = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated.",
    });
  };
  
  // Handle account deletion
  const handleDeleteAccount = () => {
    // In a real app, this would make an API call
    toast({
      title: "Account deletion requested",
      description: "Your account will be scheduled for deletion. You will receive a confirmation email shortly.",
      variant: "destructive",
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="w-full max-w-md grid grid-cols-4">
          <TabsTrigger value="profile" className="flex gap-1 items-center">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-1 items-center">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex gap-1 items-center">
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex gap-1 items-center">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and academic details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">University/Institution</Label>
                  <Input 
                    id="university"
                    value={profileData.university}
                    onChange={(e) => handleProfileChange('university', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department"
                    value={profileData.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select 
                    value={profileData.level}
                    onValueChange={(value) => handleProfileChange('level', value)}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100 Level">100 Level</SelectItem>
                      <SelectItem value="200 Level">200 Level</SelectItem>
                      <SelectItem value="300 Level">300 Level</SelectItem>
                      <SelectItem value="400 Level">400 Level</SelectItem>
                      <SelectItem value="500 Level">500 Level</SelectItem>
                      <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  A brief description about yourself, visible to group members.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <Button onClick={saveProfileChanges} disabled={isUpdating}>
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions related to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Log Out</h4>
                  <p className="text-sm text-muted-foreground">
                    Sign out from your account on this device.
                  </p>
                </div>
                <Button variant="outline" className="text-red-600" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control which notifications you receive and how they are delivered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email.
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices.
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="task-reminders" className="cursor-pointer">Task Reminders</Label>
                      <Switch 
                        id="task-reminders"
                        checked={notificationSettings.taskReminders}
                        onCheckedChange={() => handleNotificationToggle('taskReminders')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="event-alerts" className="cursor-pointer">Event Alerts</Label>
                      <Switch 
                        id="event-alerts"
                        checked={notificationSettings.eventAlerts}
                        onCheckedChange={() => handleNotificationToggle('eventAlerts')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="group-messages" className="cursor-pointer">Group Messages</Label>
                      <Switch 
                        id="group-messages"
                        checked={notificationSettings.groupMessages}
                        onCheckedChange={() => handleNotificationToggle('groupMessages')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="achievement-alerts" className="cursor-pointer">Achievement Alerts</Label>
                      <Switch 
                        id="achievement-alerts"
                        checked={notificationSettings.achievementAlerts}
                        onCheckedChange={() => handleNotificationToggle('achievementAlerts')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={saveNotificationSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how Edvantage looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme" className="mb-2 inline-block">Theme</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                        themeSettings.theme === 'light' ? 'border-edvantage-blue bg-edvantage-light-blue' : ''
                      }`}
                      onClick={() => setThemeSettings(prev => ({ ...prev, theme: 'light' }))}
                    >
                      <Sun className="h-5 w-5 mr-2" />
                      <span>Light</span>
                    </div>
                    <div
                      className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                        themeSettings.theme === 'dark' ? 'border-edvantage-blue bg-edvantage-light-blue' : ''
                      }`}
                      onClick={() => setThemeSettings(prev => ({ ...prev, theme: 'dark' }))}
                    >
                      <Moon className="h-5 w-5 mr-2" />
                      <span>Dark</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="language" className="mb-2 inline-block">Language</Label>
                  <Select 
                    value={themeSettings.language}
                    onValueChange={(value) => setThemeSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="yoruba">Yoruba</SelectItem>
                      <SelectItem value="hausa">Hausa</SelectItem>
                      <SelectItem value="igbo">Igbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={saveThemeSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="online-status">Show Online Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see when you're active on the platform.
                    </p>
                  </div>
                  <Switch 
                    id="online-status"
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={() => handlePrivacyToggle('showOnlineStatus')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-visibility">Profile Visibility to Groups</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow group members to view your profile details.
                    </p>
                  </div>
                  <Switch 
                    id="profile-visibility"
                    checked={privacySettings.showProfileToGroups}
                    onCheckedChange={() => handlePrivacyToggle('showProfileToGroups')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="friend-requests">Allow Friend Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to send you friend or connection requests.
                    </p>
                  </div>
                  <Switch 
                    id="friend-requests"
                    checked={privacySettings.allowFriendRequests}
                    onCheckedChange={() => handlePrivacyToggle('allowFriendRequests')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect anonymized usage data to improve the platform.
                    </p>
                  </div>
                  <Switch 
                    id="data-collection"
                    checked={privacySettings.dataCollection}
                    onCheckedChange={() => handlePrivacyToggle('dataCollection')}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium">Data Export</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    Download a copy of all your data stored on Edvantage.
                  </p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Request Data Export
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={savePrivacySettings}>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
