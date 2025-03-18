
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboardFeatures, tasks, events } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, {user?.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground">{today}</p>
      </section>
      
      {/* Quick Actions */}
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
    </div>
  );
};

export default Dashboard;
