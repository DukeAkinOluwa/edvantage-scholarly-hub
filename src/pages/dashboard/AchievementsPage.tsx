
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAchievements, Achievement } from '@/contexts/AchievementContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Award, 
  Share2, 
  Trophy, 
  Star, 
  Zap, 
  BookOpen, 
  Users, 
  FileCheck, 
  MessageSquare,
  Clock,
  Calendar,
  Filter
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const getAchievementIcon = (achievement: Achievement) => {
  const iconMap: Record<string, JSX.Element> = {
    'task-master': <FileCheck className="h-5 w-5" />,
    'attendance': <Calendar className="h-5 w-5" />,
    'social': <Users className="h-5 w-5" />,
    'learning': <BookOpen className="h-5 w-5" />,
    'communication': <MessageSquare className="h-5 w-5" />,
    'streak': <Zap className="h-5 w-5" />,
    'time': <Clock className="h-5 w-5" />,
  };
  
  // Extract the category from the achievement id if possible
  const parts = achievement.id.split('-');
  if (parts.length > 1 && iconMap[parts[0]]) {
    return iconMap[parts[0]];
  }
  
  // Default icon
  return <Star className="h-5 w-5" />;
};

const getAchievementColor = (achievement: Achievement) => {
  const colorMap: Record<string, string> = {
    'task-master': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    'attendance': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    'social': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    'learning': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    'communication': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    'streak': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    'time': 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
  };
  
  // Extract the category from the achievement id if possible
  const parts = achievement.id.split('-');
  if (parts.length > 1 && colorMap[parts[0]]) {
    return colorMap[parts[0]];
  }
  
  // Default color
  return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
};

const mockAchievements: Achievement[] = [
  {
    id: 'task-master-1',
    title: 'Task Master',
    description: 'Complete 10 tasks',
    icon: <FileCheck />,
    points: 100,
    progress: 10,
    maxProgress: 10,
    earnedAt: '2025-04-15T10:30:00Z'
  },
  {
    id: 'attendance-1',
    title: 'Perfect Attendance',
    description: 'Attend 5 consecutive classes',
    icon: <Calendar />,
    points: 50,
    progress: 5,
    maxProgress: 5,
    earnedAt: '2025-04-10T14:20:00Z'
  },
  {
    id: 'social-1',
    title: 'Social Butterfly',
    description: 'Join 3 study groups',
    icon: <Users />,
    points: 75,
    progress: 2,
    maxProgress: 3
  },
  {
    id: 'learning-1',
    title: 'Knowledge Seeker',
    description: 'Access learning resources 15 times',
    icon: <BookOpen />,
    points: 150,
    progress: 8,
    maxProgress: 15
  },
  {
    id: 'communication-1',
    title: 'Active Communicator',
    description: 'Send 20 messages in group chats',
    icon: <MessageSquare />,
    points: 80,
    progress: 12,
    maxProgress: 20
  },
  {
    id: 'streak-1',
    title: 'On a Roll',
    description: 'Login for 7 consecutive days',
    icon: <Zap />,
    points: 70,
    progress: 4,
    maxProgress: 7
  },
  {
    id: 'time-1',
    title: 'Time Manager',
    description: 'Create 5 scheduled events',
    icon: <Clock />,
    points: 60,
    progress: 3,
    maxProgress: 5
  }
];

const AchievementsPage = () => {
  const { 
    achievements: contextAchievements, 
    userPoints, 
    getShareableLink, 
    updateAchievementProgress 
  } = useAchievements();
  
  const [achievements, setAchievements] = useState<Achievement[]>(
    contextAchievements.length > 0 ? contextAchievements : mockAchievements
  );
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const handleShare = () => {
    try {
      const shareableLink = getShareableLink();
      navigator.clipboard.writeText(shareableLink);
      
      toast({
        title: "Link copied to clipboard",
        description: "Share this link with others to show off your achievements!",
      });
      
      setIsShareDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error creating shareable link",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const calculateLevel = (points: number) => {
    // Simple level calculation
    return Math.floor(points / 100) + 1;
  };

  const userLevel = calculateLevel(userPoints);
  const pointsToNextLevel = (userLevel * 100) - userPoints;
  const levelProgress = (userPoints % 100);
  
  // Simulate progress update
  const handleIncrementProgress = (achievement: Achievement) => {
    if (achievement.progress < achievement.maxProgress) {
      updateAchievementProgress(achievement.id, achievement.progress + 1);
    }
  };

  // Filter achievements by category
  const filteredAchievements = activeFilter 
    ? achievements.filter(achievement => achievement.id.startsWith(activeFilter))
    : achievements;
  
  // Split achievements into earned and in-progress
  const earnedAchievements = filteredAchievements.filter(achievement => achievement.earnedAt);
  const inProgressAchievements = filteredAchievements.filter(achievement => !achievement.earnedAt);
  
  // Achievement categories
  const categories = [
    { id: 'task-master', name: 'Tasks', icon: <FileCheck className="h-4 w-4" /> },
    { id: 'attendance', name: 'Attendance', icon: <Calendar className="h-4 w-4" /> },
    { id: 'social', name: 'Social', icon: <Users className="h-4 w-4" /> },
    { id: 'learning', name: 'Learning', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'communication', name: 'Communication', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'streak', name: 'Streaks', icon: <Zap className="h-4 w-4" /> },
    { id: 'time', name: 'Time', icon: <Clock className="h-4 w-4" /> },
  ];

  const AchievementItem = ({ achievement }: { achievement: Achievement }) => (
    <Card 
      key={achievement.id} 
      className={`transition-all ${achievement.earnedAt ? 'border-yellow-200 dark:border-yellow-900/50' : ''}`}
      onClick={() => setSelectedAchievement(achievement)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-full ${getAchievementColor(achievement)} flex items-center justify-center`}>
            {getAchievementIcon(achievement)}
          </div>
          
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-semibold px-2 py-1 rounded text-xs flex items-center">
              <Trophy className="h-3 w-3 mr-1" />
              {achievement.points} pts
            </div>
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{achievement.title}</CardTitle>
        <CardDescription>{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{achievement.progress}/{achievement.maxProgress}</span>
          </div>
          <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
          
          {achievement.earnedAt && (
            <p className="text-xs text-muted-foreground mt-2">
              Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Achievement Level Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center">
              <Award className="mr-2 h-6 w-6 text-yellow-500" />
              My Achievements
            </CardTitle>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-2xl font-bold border-4 border-yellow-200 dark:border-yellow-800/50">
                {userLevel}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Level {userLevel}</h3>
                <p className="text-sm text-muted-foreground">
                  {pointsToNextLevel} points to next level
                </p>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{userPoints} points</span>
                <span>{userLevel * 100} points</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
              <h4 className="text-sm text-muted-foreground mb-1">Total Points</h4>
              <p className="text-2xl font-semibold">{userPoints}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
              <h4 className="text-sm text-muted-foreground mb-1">Earned</h4>
              <p className="text-2xl font-semibold">{earnedAchievements.length}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg">
              <h4 className="text-sm text-muted-foreground mb-1">In Progress</h4>
              <p className="text-2xl font-semibold">{inProgressAchievements.length}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg">
              <h4 className="text-sm text-muted-foreground mb-1">Completion</h4>
              <p className="text-2xl font-semibold">
                {achievements.length > 0
                  ? `${Math.round((earnedAchievements.length / achievements.length) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Filters and Achievements Content */}
      {isMobile ? (
        <div className="space-y-4">
          {/* Mobile Filters - Dropdown */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {activeFilter ? 
                    categories.find(c => c.id === activeFilter)?.name : 
                    'Filter'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveFilter(null)}>
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className="flex items-center"
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Tabs */}
          <Tabs defaultValue="earned">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="earned" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Earned ({earnedAchievements.length})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                In Progress ({inProgressAchievements.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="earned" className="mt-4">
              <div className="space-y-4">
                {earnedAchievements.length > 0 ? (
                  earnedAchievements.map(achievement => (
                    <AchievementItem key={achievement.id} achievement={achievement} />
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-1">No achievements yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete tasks and activities to earn achievements
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-4">
              <div className="space-y-4">
                {inProgressAchievements.length > 0 ? (
                  inProgressAchievements.map(achievement => (
                    <AchievementItem key={achievement.id} achievement={achievement} />
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-1">All achievements completed!</h3>
                    <p className="text-sm text-muted-foreground">
                      You've earned all available achievements
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        // Desktop view
        <div className="grid grid-cols-4 gap-6">
          {/* Desktop Categories/Filters Sidebar */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-1">
                <Button 
                  variant={activeFilter === null ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFilter(null)}
                >
                  <Award className="h-4 w-4 mr-2" />
                  All Categories
                </Button>
                
                {categories.map((category) => (
                  <Button 
                    key={category.id}
                    variant={activeFilter === category.id ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Desktop Achievements Content */}
          <div className="col-span-3 space-y-6">
            <Tabs defaultValue="earned">
              <TabsList>
                <TabsTrigger value="earned" className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  Earned ({earnedAchievements.length})
                </TabsTrigger>
                <TabsTrigger value="in-progress" className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  In Progress ({inProgressAchievements.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="earned" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {earnedAchievements.length > 0 ? (
                    earnedAchievements.map(achievement => (
                      <AchievementItem key={achievement.id} achievement={achievement} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No achievements earned yet</h3>
                      <p className="text-muted-foreground">
                        Complete tasks and activities to earn achievements
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="in-progress" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inProgressAchievements.length > 0 ? (
                    inProgressAchievements.map(achievement => (
                      <AchievementItem key={achievement.id} achievement={achievement} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">All achievements completed!</h3>
                      <p className="text-muted-foreground">
                        You've earned all available achievements
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
      
      {/* Share Dialog */}
      <AlertDialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Your Achievements</AlertDialogTitle>
            <AlertDialogDescription>
              Share your achievements with friends and classmates. A unique link will be generated that shows your progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleShare}>Generate Link</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AchievementsPage;
