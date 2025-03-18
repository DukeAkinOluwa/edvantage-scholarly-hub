
import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  Layers, 
  BookMarked, 
  Brain, 
  Clock, 
  UserPlus, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Search,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockStudents = [
  { id: 1, name: 'John Doe', department: 'Computer Science', level: '300', engagement: 85, achievements: 12, avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Sarah Johnson', department: 'Mathematics', level: '200', engagement: 92, achievements: 15, avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Michael Brown', department: 'Physics', level: '400', engagement: 78, achievements: 9, avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 4, name: 'Emily Davis', department: 'Computer Science', level: '300', engagement: 65, achievements: 7, avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, name: 'Daniel Wilson', department: 'Mathematics', level: '100', engagement: 88, achievements: 11, avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 6, name: 'Olivia Martinez', department: 'Biology', level: '200', engagement: 94, achievements: 16, avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 7, name: 'James Taylor', department: 'Chemistry', level: '300', engagement: 70, achievements: 8, avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 8, name: 'Sophia Anderson', department: 'Computer Science', level: '400', engagement: 81, achievements: 10, avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: 9, name: 'William Thomas', department: 'Physics', level: '100', engagement: 75, achievements: 9, avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 10, name: 'Ava Garcia', department: 'Mathematics', level: '200', engagement: 89, achievements: 13, avatar: 'https://i.pravatar.cc/150?img=25' },
];

const mockPerformanceData = {
  departments: [
    { name: 'Computer Science', students: 120, avgEngagement: 82, completedTasks: 876 },
    { name: 'Mathematics', students: 95, avgEngagement: 79, completedTasks: 620 },
    { name: 'Physics', students: 70, avgEngagement: 75, completedTasks: 512 },
    { name: 'Biology', students: 85, avgEngagement: 81, completedTasks: 698 },
    { name: 'Chemistry', students: 65, avgEngagement: 77, completedTasks: 543 },
    { name: 'Economics', students: 110, avgEngagement: 73, completedTasks: 731 },
  ],
  monthlyEngagement: [
    { month: 'Jan 2025', engagement: 65 },
    { month: 'Feb 2025', engagement: 70 },
    { month: 'Mar 2025', engagement: 75 },
    { month: 'Apr 2025', engagement: 85 },
    { month: 'May 2025', engagement: 80 },
    { month: 'Jun 2025', engagement: 90 },
  ]
};

const mockRecentActivities = [
  { id: 1, student: 'John Doe', activity: 'Completed 3 tasks', time: '2 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, student: 'Sarah Johnson', activity: 'Earned "Research Expert" achievement', time: '4 hours ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, student: 'Michael Brown', activity: 'Joined a new study group', time: '6 hours ago', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 4, student: 'Emily Davis', activity: 'Submitted a project', time: '1 day ago', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, student: 'Daniel Wilson', activity: 'Created a study schedule', time: '1 day ago', avatar: 'https://i.pravatar.cc/150?img=12' },
];

const getEngagementColor = (engagement: number): string => {
  if (engagement >= 85) return 'text-green-500';
  if (engagement >= 70) return 'text-yellow-500';
  return 'text-red-500';
};

const SchoolDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const { toast } = useToast();

  // Filter students based on search and filters
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    const matchesLevel = levelFilter === 'all' || student.level === levelFilter;
    
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your student performance data export is being prepared."
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "The data has been exported successfully."
      });
    }, 2000);
  };

  const handleInviteStudent = () => {
    toast({
      title: "Invitation Sent",
      description: "Student invitation has been sent successfully."
    });
  };

  // Calculate statistics
  const totalStudents = mockStudents.length;
  const avgEngagement = Math.round(mockStudents.reduce((sum, student) => sum + student.engagement, 0) / totalStudents);
  const topDepartment = mockPerformanceData.departments.reduce((prev, current) => 
    (prev.avgEngagement > current.avgEngagement) ? prev : current
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">School Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor student performance and engagement</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={handleInviteStudent}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Student
            </Button>
          </div>
        </header>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <h3 className="text-3xl font-bold">{totalStudents}</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5% since last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Engagement</p>
                  <h3 className="text-3xl font-bold">{avgEngagement}%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.3% since last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <h3 className="text-3xl font-bold">78</h3>
                  <p className="text-sm text-yellow-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +1.2% since last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <Layers className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                  <h3 className="text-3xl font-bold">3,254</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -0.8% since last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="students">
          <TabsList className="mb-6">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-10" 
                  placeholder="Search students..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full md:w-[120px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="100">100 Level</SelectItem>
                    <SelectItem value="200">200 Level</SelectItem>
                    <SelectItem value="300">300 Level</SelectItem>
                    <SelectItem value="400">400 Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Monitor engagement and achievement metrics for all students</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Achievements</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.level} Level</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-full max-w-[100px]">
                              <Progress value={student.engagement} className="h-2" />
                            </div>
                            <span className={getEngagementColor(student.engagement)}>
                              {student.engagement}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{student.achievements}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Profile</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Student Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={activity.avatar} alt={activity.student} />
                          <AvatarFallback>{activity.student.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{activity.student}</p>
                          <p className="text-sm text-muted-foreground">{activity.activity}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStudents
                      .sort((a, b) => b.engagement - a.engagement)
                      .slice(0, 5)
                      .map((student, index) => (
                        <div key={student.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="font-bold text-muted-foreground w-4">{index + 1}</div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.department}</p>
                            </div>
                          </div>
                          <div className={`text-sm font-bold ${getEngagementColor(student.engagement)}`}>
                            {student.engagement}%
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Overview</CardTitle>
                  <CardDescription>Performance across all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockPerformanceData.departments.map(dept => (
                      <div key={dept.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{dept.name}</div>
                          <div className="text-sm text-muted-foreground">{dept.students} students</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-full">
                            <Progress value={dept.avgEngagement} className="h-2" />
                          </div>
                          <div className={`text-sm font-medium ${getEngagementColor(dept.avgEngagement)}`}>
                            {dept.avgEngagement}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Statistics</CardTitle>
                  <CardDescription>Key metrics for each department</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Avg. Engagement</TableHead>
                        <TableHead>Tasks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPerformanceData.departments.map(dept => (
                        <TableRow key={dept.name}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.students}</TableCell>
                          <TableCell className={getEngagementColor(dept.avgEngagement)}>
                            {dept.avgEngagement}%
                          </TableCell>
                          <TableCell>{dept.completedTasks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Department Performance Breakdown</CardTitle>
                  <CardDescription>Detailed metrics and insights for all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockPerformanceData.departments.map(dept => (
                      <Card key={dept.name}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{dept.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Students</span>
                                <span className="font-medium">{dept.students}</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Engagement</span>
                                <span className={`font-medium ${getEngagementColor(dept.avgEngagement)}`}>
                                  {dept.avgEngagement}%
                                </span>
                              </div>
                              <Progress value={dept.avgEngagement} className="h-2 mt-1" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Completed Tasks</span>
                                <span className="font-medium">{dept.completedTasks}</span>
                              </div>
                            </div>
                            
                            <div className="pt-2 border-t">
                              <Button variant="outline" size="sm" className="w-full">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Engagement Trends (2025)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground opacity-50" />
                  <div className="ml-4 text-muted-foreground">
                    Chart visualization will appear here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievements Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground opacity-50" />
                  <div className="ml-4 text-muted-foreground">
                    Chart visualization will appear here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-muted-foreground">Completed Tasks</p>
                        <p className="text-3xl font-bold">3,254</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Tasks</p>
                        <p className="text-3xl font-bold">4,126</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        <p className="text-3xl font-bold text-green-500">78.9%</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>78.9%</span>
                      </div>
                      <Progress value={78.9} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center space-y-1">
                        <div className="text-sm text-muted-foreground">Assigned</div>
                        <div className="text-lg font-semibold">4,126</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-sm text-muted-foreground">In Progress</div>
                        <div className="text-lg font-semibold">872</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-sm text-muted-foreground">Overdue</div>
                        <div className="text-lg font-semibold">137</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                          <span className="font-medium">Study Consistency</span>
                        </div>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="font-medium">Group Participation</span>
                        </div>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="font-medium">Resource Utilization</span>
                        </div>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                          <span className="font-medium">Project Completion</span>
                        </div>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                          <span className="font-medium">Assessment Scores</span>
                        </div>
                        <span className="font-medium">81%</span>
                      </div>
                      <Progress value={81} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Comparative analysis of key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-blue-100 dark:bg-blue-900">
                      <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">Academic Performance</h3>
                      <p className="text-muted-foreground">Overall performance across all academic activities</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">82%</span>
                        <span className="text-sm text-green-500 ml-2">↑ 3.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-green-100 dark:bg-green-900">
                      <Award className="h-12 w-12 text-green-600 dark:text-green-300" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">Achievement Rate</h3>
                      <p className="text-muted-foreground">Average achievements earned per student</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">10.4</span>
                        <span className="text-sm text-green-500 ml-2">↑ 1.7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-purple-100 dark:bg-purple-900">
                      <Brain className="h-12 w-12 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">Study Consistency</h3>
                      <p className="text-muted-foreground">Regular study pattern adherence</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">75%</span>
                        <span className="text-sm text-yellow-500 ml-2">↑ 0.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchoolDashboard;
