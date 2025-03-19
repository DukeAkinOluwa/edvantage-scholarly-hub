
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  LogOut, 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  Settings, 
  Moon, 
  Sun, 
  HelpCircle, 
  Bell, 
  Home,
  User,
  ChevronRight,
  Search,
  BarChart3,
  Book,
  Briefcase,
  GraduationCap,
  ThumbsUp,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { nigerianDepartments } from '@/data/nigerianDepartments';

const SchoolDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>You need to log in to access the organization dashboard.</p>
            <Link to="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDarkMode(newMode);
  };

  // Filter departments based on search query
  const filteredDepartments = nigerianDepartments.filter(
    dept => dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-edvantage-blue rounded-md p-2">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">Edu Admin</h1>
        </div>
        
        <div className="p-4">
          <div 
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowProfile(true)}
          >
            <Avatar>
              <AvatarImage src={user.profilePic} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-xs text-muted-foreground">{user.accountType}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('overview')}
              >
                <Home className="h-5 w-5 text-edvantage-blue" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('students')}
              >
                <Users className="h-5 w-5 text-edvantage-blue" />
                <span>Students</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('departments')}
              >
                <Briefcase className="h-5 w-5 text-edvantage-blue" />
                <span>Departments</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('courses')}
              >
                <BookOpen className="h-5 w-5 text-edvantage-blue" />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('resources')}
              >
                <Book className="h-5 w-5 text-edvantage-blue" />
                <span>Resources</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('calendar')}
              >
                <Calendar className="h-5 w-5 text-edvantage-blue" />
                <span>Calendar</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="h-5 w-5 text-edvantage-blue" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('achievements')}
              >
                <Award className="h-5 w-5 text-edvantage-blue" />
                <span>Achievements</span>
              </Link>
            </li>
          </ul>
          
          <Separator className="my-4" />
          
          <ul className="space-y-1">
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="#" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </Link>
            </li>
            <li>
              <button
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6">
          <div className="flex items-center gap-6 w-full">
            <h2 className="text-lg font-semibold">{user.university} Admin Dashboard</h2>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 max-w-md bg-gray-50 dark:bg-gray-700" 
                placeholder="Search..." 
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setShowProfile(true)}>
                <AvatarImage src={user.profilePic} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        {/* Profile View Modal */}
        {showProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-[500px] max-h-[80vh] overflow-y-auto">
              <CardHeader className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4"
                  onClick={() => setShowProfile(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user.profilePic} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{user.accountType}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Email</label>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Institution</label>
                    <p className="text-sm font-medium">{user.university}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Department</label>
                    <p className="text-sm font-medium">{user.department}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Member Since</label>
                    <p className="text-sm font-medium">{new Date(user.joinedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">Complete your profile to get the most out of the platform.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold">3,254</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ChevronRight className="h-3 w-3 rotate-90" />
                        <span>+10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ChevronRight className="h-3 w-3 rotate-90" />
                        <span>+5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span>-</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Student Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <ChevronRight className="h-3 w-3 rotate-90" />
                        <span>+2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-start gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {String.fromCharCode(64 + i)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">Student {i}</span> 
                              {[
                                " completed a course",
                                " joined a new department",
                                " earned an achievement",
                                " uploaded a resource",
                                " submitted a project"
                              ][i-1]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {i} hour{i !== 1 ? 's' : ''} ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Computer Science", "Engineering", "Medicine", "Economics", "Law"].map((dept, i) => (
                        <div key={dept} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{dept}</span>
                            <span className="text-xs text-muted-foreground">{95 - i * 5}%</span>
                          </div>
                          <Progress value={95 - i * 5} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="departments" className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Departments</h1>
                <Button>Add Department</Button>
              </div>
              
              <Card>
                <CardHeader className="pb-1">
                  <div className="flex justify-between items-center">
                    <CardTitle>All Departments</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        className="pl-8" 
                        placeholder="Search departments..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDepartments.map((dept) => (
                      <Card key={dept} className="hover:shadow-md cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{dept}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm">
                            <span>Students: {Math.floor(Math.random() * 200) + 50}</span>
                            <ThumbsUp className="h-4 w-4 text-edvantage-blue" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students">
              <h1 className="text-2xl font-bold mb-6">Students</h1>
              <p>Student management coming soon...</p>
            </TabsContent>
            
            <TabsContent value="courses">
              <h1 className="text-2xl font-bold mb-6">Courses</h1>
              <p>Course management coming soon...</p>
            </TabsContent>
            
            <TabsContent value="resources">
              <h1 className="text-2xl font-bold mb-6">Resources</h1>
              <p>Resources management coming soon...</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;
