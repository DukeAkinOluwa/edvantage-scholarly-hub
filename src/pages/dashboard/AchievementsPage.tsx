
import React, { useState } from 'react';
import { Award, Trophy, Shield, Target, Crown, Clock, Share2, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  achievements, 
  leaderboard, 
  Achievement, 
  LeaderboardEntry,
  tasks
} from '@/data/dummyData';

const AchievementsPage = () => {
  const [userPoints, setUserPoints] = useState(820); // Mock user points
  const { toast } = useToast();
  
  // Sort achievements by earned first, then by progress percentage
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (!!a.earnedAt !== !!b.earnedAt) {
      return a.earnedAt ? -1 : 1;
    }
    
    const aProgress = (a.progress / a.maxProgress) * 100;
    const bProgress = (b.progress / b.maxProgress) * 100;
    
    return bProgress - aProgress;
  });
  
  // Get total earned achievements
  const earnedAchievements = achievements.filter(a => a.earnedAt).length;
  
  // Get total achievement points
  const totalPoints = achievements.reduce((sum, achievement) => {
    return achievement.earnedAt ? sum + achievement.points : sum;
  }, 0);
  
  // Get completed tasks count
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  
  // Mock sharing functionality
  const shareAchievements = () => {
    toast({
      title: "Sharing achievements",
      description: "Your achievements have been shared to your profile.",
    });
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Achievement card component
  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
    const isCompleted = !!achievement.earnedAt;
    
    return (
      <Card className={`${isCompleted ? 'border-green-200 bg-green-50' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className={`text-3xl mr-3 ${isCompleted ? 'animate-pulse' : ''}`}>
                {achievement.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription>
                  {achievement.description}
                </CardDescription>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{achievement.points}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div>Progress</div>
              <div>
                {achievement.progress}/{achievement.maxProgress}
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            {isCompleted && (
              <div className="text-xs text-green-600 font-medium">
                Completed on {formatDate(achievement.earnedAt)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Leaderboard entry component
  const LeaderboardEntryCard = ({ entry, position }: { entry: LeaderboardEntry; position: number }) => {
    const isCurrentUser = entry.id === 'user-1';
    
    return (
      <div 
        className={`flex items-center p-3 rounded-lg ${
          isCurrentUser 
            ? 'bg-edvantage-light-blue border border-edvantage-blue' 
            : position <= 3 
              ? 'bg-amber-50 border border-amber-200' 
              : 'bg-gray-50 border border-gray-200'
        }`}
      >
        <div 
          className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-white ${
            position === 1 
              ? 'bg-yellow-500' 
              : position === 2 
                ? 'bg-gray-400' 
                : position === 3 
                  ? 'bg-amber-700' 
                  : 'bg-gray-600'
          }`}
        >
          {position}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <div className="font-medium">{entry.name}</div>
            {isCurrentUser && (
              <div className="ml-2 text-xs bg-edvantage-blue text-white px-1.5 py-0.5 rounded-full">
                You
              </div>
            )}
            <div className="ml-auto font-semibold">{entry.points} pts</div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center mt-1">
            <span>{entry.level}</span>
            <span className="mx-1.5">•</span>
            <span>{entry.achievements} achievements</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Achievements & Rewards</h1>
        <Button onClick={shareAchievements}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Achievements
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Award className="h-10 w-10 text-edvantage-blue mb-2" />
              <h3 className="text-3xl font-bold">{userPoints}</h3>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
              <h3 className="text-3xl font-bold">{earnedAchievements}</h3>
              <p className="text-sm text-muted-foreground">Achievements Earned</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Target className="h-10 w-10 text-green-500 mb-2" />
              <h3 className="text-3xl font-bold">{completedTasks}</h3>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Crown className="h-10 w-10 text-purple-500 mb-2" />
              <h3 className="text-3xl font-bold">
                {leaderboard.findIndex(entry => entry.id === 'user-1') + 1}
              </h3>
              <p className="text-sm text-muted-foreground">Current Rank</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="achievements">
        <TabsList className="mb-6">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 space-y-3">
              <h2 className="text-lg font-semibold mb-3">Global Leaderboard</h2>
              {leaderboard.map((entry, index) => (
                <LeaderboardEntryCard 
                  key={entry.id} 
                  entry={entry} 
                  position={index + 1} 
                />
              ))}
              <Button variant="outline" className="w-full mt-4">
                View Full Leaderboard
              </Button>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Position</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="font-medium">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Computer Science, 300 Level</p>
                      <div className="flex items-center mt-1">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{userPoints} points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-edvantage-light-blue rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Next milestone:</span>
                      <span className="text-sm font-medium">1000 points</span>
                    </div>
                    <Progress value={userPoints / 10} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {1000 - userPoints} more points to reach the next milestone
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Leaderboard Stats</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Your department rank:</span>
                      <span className="font-medium">3rd of 145</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level rank:</span>
                      <span className="font-medium">12th of 240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekly gain:</span>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span className="font-medium">+120 points</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weekly Challenges</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Complete 5 tasks</span>
                        <span className="text-sm font-medium">3/5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Reward: 50 points
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Join a study group</span>
                        <span className="text-sm font-medium">0/1</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Reward: 30 points
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Upload a resource</span>
                        <span className="text-sm font-medium">0/1</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Reward: 40 points
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 mr-1" />
                    Challenges reset in 3 days, 5 hours
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rewards">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Premium Features</CardTitle>
                  <CardDescription>
                    Unlock enhanced app functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Shield className="h-16 w-16 text-edvantage-blue mx-auto mb-4" />
                    <div className="text-lg font-medium mb-1">Advanced AI Support</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Get unlimited access to enhanced AI study support and analysis
                    </div>
                    <div className="text-2xl font-bold text-edvantage-blue mb-2">
                      1,500 points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={userPoints < 1500}
                    onClick={() => {
                      toast({
                        title: "Insufficient points",
                        description: "You need 1,500 points to unlock this reward.",
                      });
                    }}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Digital Badge</CardTitle>
                  <CardDescription>
                    Show off your achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <div className="text-lg font-medium mb-1">"Productivity Master"</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Display this exclusive badge on your profile and in groups
                    </div>
                    <div className="text-2xl font-bold text-edvantage-blue mb-2">
                      800 points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Badge claimed",
                        description: "The 'Productivity Master' badge has been added to your profile.",
                      });
                      setUserPoints(prev => prev - 800);
                    }}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Study Resources</CardTitle>
                  <CardDescription>
                    Access premium study guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <BookOpen className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <div className="text-lg font-medium mb-1">Premium Study Materials</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Unlock exclusive study guides and practice materials
                    </div>
                    <div className="text-2xl font-bold text-edvantage-blue mb-2">
                      500 points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Resources unlocked",
                        description: "You now have access to premium study materials.",
                      });
                      setUserPoints(prev => prev - 500);
                    }}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Custom Theme</CardTitle>
                  <CardDescription>
                    Personalize your Edvantage experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Palette className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                    <div className="text-lg font-medium mb-1">Custom App Theme</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Choose from exclusive color schemes and personalization options
                    </div>
                    <div className="text-2xl font-bold text-edvantage-blue mb-2">
                      300 points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Custom themes unlocked",
                        description: "You can now customize your app's appearance in Settings.",
                      });
                      setUserPoints(prev => prev - 300);
                    }}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Priority Support</CardTitle>
                  <CardDescription>
                    Get faster responses to your questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Headset className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <div className="text-lg font-medium mb-1">Premium Support</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Get priority support and responses for your questions and issues
                    </div>
                    <div className="text-2xl font-bold text-edvantage-blue mb-2">
                      1,000 points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    disabled={userPoints < 1000}
                    onClick={() => {
                      toast({
                        title: "Insufficient points",
                        description: "You need 1,000 points to unlock this reward.",
                      });
                    }}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Group Creation</CardTitle>
                  <CardDescription>
                    Create advanced study groups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <div className="text-lg font-medium mb-1">Advanced Group Features</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Create groups with enhanced tools and larger member limits
                    </div>
                    <div className="text-2xl font-bold text-edvantage-blue mb-2">
                      700 points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Advanced groups unlocked",
                        description: "You can now create groups with enhanced features.",
                      });
                      setUserPoints(prev => prev - 700);
                    }}
                  >
                    Claim Reward
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsPage;

// Adding these imports that we used but weren't defined
import { BookOpen, Palette, Headset } from 'lucide-react';
