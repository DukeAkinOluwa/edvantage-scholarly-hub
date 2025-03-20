import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { dashboardFeatures, tasks, events } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { useAchievements } from '@/contexts/AchievementContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Award, 
  Star, 
  TrendingUp,
  Book,
  Users
} from 'lucide-react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Dashboard = () => {
  const { user } = useAuth();
  const { userPoints, earnedAchievements } = useAchievements();
  const isMobile = useIsMobile();
  
  // Get today's date in a readable format
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Filter tasks for today and upcoming
  const todayTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
    const nowDate = new Date().setHours(0, 0, 0, 0);
    return dueDate === nowDate && task.status !== 'completed';
  });
  
  // Filter upcoming events
  const upcomingEvents = events
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);
  
  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Calculate user level based on points
  const calculateLevel = (points: number) => {
    // Simple level calculation (adjust as needed)
    return Math.floor(points / 100) + 1;
  };

  const userLevel = calculateLevel(userPoints);
  const pointsToNextLevel = (userLevel * 100) - userPoints;
  const levelProgress = (userPoints % 100);

  // Focus areas for mobile view
  const topFocusAreas = dashboardFeatures.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section with Achievement Level */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, {user?.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground">{today}</p>
        
        {/* User Achievement Level - Visible on all devices */}
        <div className="flex flex-col mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Level {userLevel}</span>
            </div>
            <Link to="/dashboard/achievements" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-2">
            <Progress value={levelProgress} className="h-2" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">{userPoints} XP</span>
            <span className="text-xs text-muted-foreground">{pointsToNextLevel} XP to Level {userLevel + 1}</span>
          </div>
        </div>
      </section>
      
      {/* Mobile Layout Optimization */}
      {isMobile ? (
        <>
          {/* Priority Cards for Mobile */}
          <section className="space-y-4">
            {/* Today's Tasks Preview Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    Today's Tasks
                  </div>
                  <span className="text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 py-1 px-2 rounded-full">
                    {todayTasks.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {todayTasks.length > 0 ? (
                  <ul className="space-y-2">
                    {todayTasks.slice(0, 2).map(task => (
                      <li key={task.id} className="flex items-start">
                        <div className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 border ${
                          task.priority === 'high' 
                            ? 'border-red-500' 
                            : task.priority === 'medium'
                              ? 'border-yellow-500'
                              : 'border-blue-500'
                        }`} />
                        <p className="text-sm font-medium truncate flex-1">{task.title}</p>
                      </li>
                    ))}
                    {todayTasks.length > 2 && (
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            View {todayTasks.length - 2} more
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Today's Tasks</DrawerTitle>
                          </DrawerHeader>
                          <div className="px-4 py-2">
                            <ul className="space-y-3">
                              {todayTasks.map(task => (
                                <li key={task.id} className="flex items-start">
                                  <div className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 border ${
                                    task.priority === 'high' 
                                      ? 'border-red-500' 
                                      : task.priority === 'medium'
                                        ? 'border-yellow-500'
                                        : 'border-blue-500'
                                  }`} />
                                  <div>
                                    <p className="text-sm font-medium">{task.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(task.dueDate).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <DrawerFooter>
                            <Button asChild>
                              <Link to="/dashboard/calendar">Go to Calendar</Link>
                            </Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No tasks for today</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/dashboard/calendar">View All Tasks</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Actions Card */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-auto py-3 px-2 justify-start" asChild>
                <Link to="/dashboard/calendar/new-task" className="flex flex-col items-center">
                  <CheckCircle className="h-5 w-5 mb-1 text-green-500" />
                  <span>Add Task</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-3 px-2 justify-start" asChild>
                <Link to="/dashboard/calendar/new-event" className="flex flex-col items-center">
                  <Calendar className="h-5 w-5 mb-1 text-blue-500" />
                  <span>Add Event</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-3 px-2 justify-start" asChild>
                <Link to="/dashboard/groups/create" className="flex flex-col items-center">
                  <Users className="h-5 w-5 mb-1 text-purple-500" />
                  <span>Study Group</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-3 px-2 justify-start" asChild>
                <Link to="/dashboard/ai-support" className="flex flex-col items-center">
                  <Star className="h-5 w-5 mb-1 text-yellow-500" />
                  <span>AI Help</span>
                </Link>
              </Button>
            </div>
            
            {/* Recent Achievements */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {earnedAchievements.length > 0 ? (
                  <div className="space-y-2">
                    {earnedAchievements.slice(0, 2).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                          <Star className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">+{achievement.points} points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No achievements yet</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/dashboard/achievements">All Achievements</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
          
          {/* Focus Areas Grid - Mobile Optimized */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Focus Areas</h2>
            <div className="grid grid-cols-1 gap-3">
              {topFocusAreas.map((feature) => (
                <Link key={feature.id} to={feature.path}>
                  <Card className="h-auto transition-all hover:shadow-md hover:border-edvantage-blue">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <div className={`p-2 mr-3 rounded-lg w-fit ${feature.color}`}>
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full">View All Features</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>All Features</DrawerTitle>
                    <DrawerDescription>Explore all available features</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2 overflow-auto max-h-[60vh]">
                    <div className="grid grid-cols-1 gap-3">
                      {dashboardFeatures.slice(3).map((feature) => (
                        <Link key={feature.id} to={feature.path}>
                          <Card className="h-auto transition-all hover:shadow-md hover:border-edvantage-blue">
                            <CardHeader className="pb-2">
                              <div className="flex items-center">
                                <div className={`p-2 mr-3 rounded-lg w-fit ${feature.color}`}>
                                  <feature.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                                  <CardDescription className="line-clamp-2">{feature.description}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </section>
        </>
      ) : (
        // Desktop Layout - Keep existing code
        <>
          {/* Quick Actions - Desktop */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Today's Tasks */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todayTasks.length > 0 ? (
                    <ul className="space-y-2">
                      {todayTasks.map(task => (
                        <li key={task.id} className="flex items-start">
                          <div className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 border ${
                            task.priority === 'high' 
                              ? 'border-red-500' 
                              : task.priority === 'medium'
                                ? 'border-yellow-500'
                                : 'border-blue-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tasks for today</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/dashboard/calendar">View All Tasks</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <ul className="space-y-2">
                      {upcomingEvents.map(event => (
                        <li key={event.id} className="flex items-start">
                          <div className={`h-6 w-6 rounded mr-2 flex-shrink-0 text-white flex items-center justify-center text-xs ${
                            event.type === 'class' 
                              ? 'bg-blue-500' 
                              : event.type === 'exam'
                                ? 'bg-red-500'
                                : event.type === 'study'
                                  ? 'bg-green-500'
                                  : event.type === 'group'
                                    ? 'bg-purple-500'
                                    : 'bg-gray-500'
                          }`}>
                            {event.type.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No upcoming events</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/dashboard/calendar">View Calendar</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Quick Access */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-purple-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/dashboard/calendar/new-task">+ Add New Task</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/dashboard/calendar/new-event">+ Add Event</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/dashboard/groups/create">+ Create Study Group</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/dashboard/ai-support">Get AI Study Help</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Desktop Achievement Level Section */}
          <section>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                    <span className="text-xl font-bold">{userLevel}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Level {userLevel}</span>
                      <span className="text-sm text-muted-foreground">{userPoints} / {userLevel * 100} XP</span>
                    </div>
                    <Progress value={levelProgress} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {pointsToNextLevel} XP needed for Level {userLevel + 1}
                    </p>
                  </div>
                </div>
                
                {earnedAchievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Recent Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {earnedAchievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full pl-1 pr-3 py-1">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                            <Star className="h-3 w-3" />
                          </div>
                          <span className="text-xs font-medium">{achievement.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/dashboard/achievements">View All Achievements</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
          
          {/* Features Grid */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Explore Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardFeatures.map((feature) => (
                <Link key={feature.id} to={feature.path}>
                  <Card className="h-full transition-all hover:shadow-md hover:border-edvantage-blue">
                    <CardHeader className="pb-2">
                      <div className={`p-2 rounded-lg w-fit ${feature.color}`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg mt-2">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
