
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, School, ChevronDown, BarChart3, Book, User,
  GraduationCap, Settings, Calendar, LogOut, Bell, 
  Search, ChevronRight, PieChart, Activity, HelpCircle,
  Download, ArrowUpRight, FileText, CreditCard, Menu, Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Dummy data for the admin dashboard
const SCHOOL_STATS = {
  totalStudents: 5843,
  activeUsers: 3721,
  completedTasks: 28459,
  activeGroups: 217,
  averageTaskCompletionRate: 78,
  licensesUsed: 4000,
  licensesTotal: 5000,
  departments: 12,
  resourcesShared: 1423,
};

const DEPARTMENTS = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Medicine',
  'Pharmacy',
  'Business Administration',
  'Economics',
  'Law',
  'Statistics',
  'Biological Sciences',
  'Chemistry',
];

const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    action: 'New student registered',
    timestamp: '2 hours ago',
    details: 'John Okafor (300 Level, Computer Science)',
  },
  {
    id: 'act-2',
    action: 'Group created',
    timestamp: '5 hours ago',
    details: 'Medicine 200 Level Official Group',
  },
  {
    id: 'act-3',
    action: 'License allocation',
    timestamp: '1 day ago',
    details: '50 new licenses allocated to Department of Economics',
  },
  {
    id: 'act-4',
    action: 'System announcement',
    timestamp: '2 days ago',
    details: 'Scheduled maintenance notification sent to all users',
  },
  {
    id: 'act-5',
    action: 'Resource uploaded',
    timestamp: '3 days ago',
    details: 'University calendar for 2023/2024 academic session',
  },
];

const POPULAR_RESOURCES = [
  {
    id: 'res-1',
    title: 'Course Registration Guidelines',
    downloads: 1245,
    type: 'PDF',
  },
  {
    id: 'res-2',
    title: 'University Academic Calendar',
    downloads: 987,
    type: 'PDF',
  },
  {
    id: 'res-3',
    title: 'Exam Preparation Tips',
    downloads: 756,
    type: 'Video',
  },
  {
    id: 'res-4',
    title: 'Library Access Guide',
    downloads: 543,
    type: 'PDF',
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  
  // Functions to simulate dashboard actions
  const downloadReport = () => {
    toast({
      title: 'Generating Report',
      description: 'Your report is being generated and will download shortly.',
    });
  };
  
  const allocateLicenses = () => {
    toast({
      title: 'License Allocation',
      description: 'New licenses have been allocated successfully.',
    });
  };
  
  const sendAnnouncement = () => {
    toast({
      title: 'Announcement Sent',
      description: 'Your announcement has been sent to all users.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 min-h-screen">
        <div className="p-4 border-b">
          <div className="flex items-center justify-center">
            <School className="h-8 w-8 text-edvantage-blue mr-2" />
            <h1 className="text-xl font-bold text-edvantage-blue">Edvantage Admin</h1>
          </div>
          <div className="text-sm text-center text-muted-foreground mt-1">
            University of Lagos
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">ANALYTICS</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#" className="font-medium">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <Users className="h-5 w-5 mr-3" />
                  Students
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <Book className="h-5 w-5 mr-3" />
                  Resources
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <GraduationCap className="h-5 w-5 mr-3" />
                  Departments
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <CreditCard className="h-5 w-5 mr-3" />
                  Licensing
                </Link>
              </Button>
            </nav>
          </div>
          
          <div className="px-4 mb-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">ADMINISTRATION</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <User className="h-5 w-5 mr-3" />
                  Admin Users
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="#">
                  <HelpCircle className="h-5 w-5 mr-3" />
                  Help & Support
                </Link>
              </Button>
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?img=20" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">Dr. James Adeyemi</p>
              <p className="text-xs text-muted-foreground">IT Administrator</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
              <div className="ml-3">
                <School className="h-6 w-6 text-edvantage-blue" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-end">
              <div className="relative max-w-xs w-64 mr-4 hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  placeholder="Search..." 
                  className="pl-8 h-10"
                />
              </div>
              
              <div className="flex items-center gap-3 ml-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button size="sm" className="hidden md:flex">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center px-4 sm:px-6 py-2 bg-gray-50 text-sm">
            <Link to="#" className="text-muted-foreground hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <span className="font-medium">Dashboard</span>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Institution Dashboard</h1>
                <p className="text-muted-foreground">
                  Overview of student activity and platform usage
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={sendAnnouncement}>
                  <Bell className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
                <Button onClick={allocateLicenses}>
                  <Plus className="h-4 w-4 mr-2" />
                  Allocate Licenses
                </Button>
              </div>
            </div>
            
            {/* Department Selector */}
            <div className="flex items-center">
              <div className="relative w-full md:w-64">
                <select 
                  className="block w-full rounded-md border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-edvantage-blue"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option>All Departments</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept}>{dept}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                      <h3 className="text-3xl font-bold">{SCHOOL_STATS.totalStudents}</h3>
                    </div>
                    <Users className="h-12 w-12 text-edvantage-blue opacity-80" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>12%</span>
                    </div>
                    <span className="ml-1">vs. last semester</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                      <h3 className="text-3xl font-bold">{SCHOOL_STATS.activeUsers}</h3>
                    </div>
                    <Activity className="h-12 w-12 text-green-500 opacity-80" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span>{Math.round((SCHOOL_STATS.activeUsers / SCHOOL_STATS.totalStudents) * 100)}% of total students</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">License Usage</p>
                      <h3 className="text-3xl font-bold">{SCHOOL_STATS.licensesUsed}/{SCHOOL_STATS.licensesTotal}</h3>
                    </div>
                    <CreditCard className="h-12 w-12 text-amber-500 opacity-80" />
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-edvantage-blue h-2 rounded-full" 
                        style={{ width: `${(SCHOOL_STATS.licensesUsed / SCHOOL_STATS.licensesTotal) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((SCHOOL_STATS.licensesUsed / SCHOOL_STATS.licensesTotal) * 100)}% of available licenses used
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest activities across the institution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {RECENT_ACTIVITIES.map(activity => (
                      <div key={activity.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                        <div className="bg-edvantage-light-blue p-2 rounded-full">
                          <Activity className="h-5 w-5 text-edvantage-blue" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{activity.action}</h4>
                            <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="#">View All Activity</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Stats and Resources */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Tasks Completion Rate</span>
                          <span className="font-medium">{SCHOOL_STATS.averageTaskCompletionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${SCHOOL_STATS.averageTaskCompletionRate}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Resource Usage</span>
                          <span className="font-medium">63%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-edvantage-blue h-1.5 rounded-full" 
                            style={{ width: '63%' }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Group Participation</span>
                          <span className="font-medium">84%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full" 
                            style={{ width: '84%' }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-muted-foreground">Total Tasks:</p>
                          <p className="font-medium">{SCHOOL_STATS.completedTasks}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Active Groups:</p>
                          <p className="font-medium">{SCHOOL_STATS.activeGroups}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Departments:</p>
                          <p className="font-medium">{SCHOOL_STATS.departments}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Resources Shared:</p>
                          <p className="font-medium">{SCHOOL_STATS.resourcesShared}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Popular Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {POPULAR_RESOURCES.map(resource => (
                        <div key={resource.id} className="flex items-start">
                          <div className="p-1.5 bg-gray-100 rounded">
                            <FileText className="h-5 w-5 text-edvantage-blue" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{resource.title}</p>
                              <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                {resource.type}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {resource.downloads} downloads
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full text-sm" size="sm" asChild>
                      <Link to="#">Manage Institution Resources</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Department Performance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Comparative performance metrics by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="taskCompletion">
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="taskCompletion">Task Completion</TabsTrigger>
                    <TabsTrigger value="resourceUsage">Resource Usage</TabsTrigger>
                    <TabsTrigger value="userActivity">User Activity</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="taskCompletion" className="mt-4">
                    <div className="space-y-3">
                      {DEPARTMENTS.slice(0, 6).map((dept, index) => (
                        <div key={dept} className="flex items-center">
                          <div className="w-48 truncate font-medium text-sm">{dept}</div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-edvantage-blue h-2 rounded-full" 
                                style={{ width: `${90 - (index * 5)}%` }}
                              />
                            </div>
                          </div>
                          <div className="ml-3 w-12 text-right font-medium text-sm">
                            {90 - (index * 5)}%
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="link" className="mt-4 text-sm h-auto p-0" asChild>
                      <Link to="#">View all departments</Link>
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="resourceUsage" className="mt-4">
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                      Resource usage chart would be displayed here
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="userActivity" className="mt-4">
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                      User activity chart would be displayed here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
