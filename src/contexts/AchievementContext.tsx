
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  progress: number;
  maxProgress: number;
  earnedAt?: string;
}

interface AchievementContextType {
  achievements: Achievement[];
  userPoints: number;
  earnedAchievements: Achievement[];
  updateAchievementProgress: (id: string, progress: number) => void;
  awardAchievement: (id: string) => void;
  getShareableLink: () => string;
  showAchievementAnimation: (achievementId: string) => void;
  isAnimationVisible: boolean;
  currentAnimatingAchievement: Achievement | null;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [isAnimationVisible, setIsAnimationVisible] = useState<boolean>(false);
  const [currentAnimatingAchievement, setCurrentAnimatingAchievement] = useState<Achievement | null>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load achievements from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedAchievements = localStorage.getItem(`edvantage-achievements-${user.id}`);
      const savedPoints = localStorage.getItem(`edvantage-points-${user.id}`);
      
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
      
      if (savedPoints) {
        setUserPoints(Number(savedPoints));
      }
    }
  }, [user]);
  
  // Save achievements to localStorage when they change
  useEffect(() => {
    if (user && achievements.length > 0) {
      localStorage.setItem(`edvantage-achievements-${user.id}`, JSON.stringify(achievements));
      localStorage.setItem(`edvantage-points-${user.id}`, String(userPoints));
    }
  }, [achievements, userPoints, user]);
  
  // Helper to filter earned achievements
  const earnedAchievements = achievements.filter(achievement => achievement.earnedAt);
  
  // Update achievement progress
  const updateAchievementProgress = (id: string, progress: number) => {
    setAchievements(prevAchievements => {
      return prevAchievements.map(achievement => {
        if (achievement.id === id) {
          const updatedAchievement = {
            ...achievement,
            progress: Math.min(progress, achievement.maxProgress)
          };
          
          // If progress is complete but achievement not earned yet, award it
          if (progress >= achievement.maxProgress && !achievement.earnedAt) {
            awardAchievement(id);
          }
          
          return updatedAchievement;
        }
        return achievement;
      });
    });
  };
  
  // Award an achievement
  const awardAchievement = (id: string) => {
    setAchievements(prevAchievements => {
      return prevAchievements.map(achievement => {
        if (achievement.id === id && !achievement.earnedAt) {
          const now = new Date().toISOString();
          
          // Add points to user
          setUserPoints(prev => prev + achievement.points);
          
          // Show achievement animation
          showAchievementAnimation({
            ...achievement,
            earnedAt: now
          });
          
          // Display toast
          toast({
            title: '🏆 Achievement Unlocked!',
            description: `You earned "${achievement.title}" and gained ${achievement.points} points!`,
          });
          
          return {
            ...achievement,
            progress: achievement.maxProgress,
            earnedAt: now
          };
        }
        return achievement;
      });
    });
  };
  
  // Generate a shareable link for achievements
  const getShareableLink = () => {
    if (!user) return '';
    
    const shareData = {
      userId: user.id,
      name: user.name,
      points: userPoints,
      achievements: earnedAchievements.map(a => ({
        id: a.id,
        title: a.title,
        points: a.points,
        earnedAt: a.earnedAt
      }))
    };
    
    // In a real app, we would create a proper sharable link
    // For demo purposes, create a shareable link with encoded data
    const shareableId = uuidv4().substring(0, 8);
    const baseUrl = window.location.origin;
    localStorage.setItem(`edvantage-share-${shareableId}`, JSON.stringify(shareData));
    
    return `${baseUrl}/achievements/shared/${shareableId}`;
  };
  
  // Show achievement animation
  const showAchievementAnimation = (achievement: Achievement) => {
    setCurrentAnimatingAchievement(achievement);
    setIsAnimationVisible(true);
    
    // Hide animation after 5 seconds
    setTimeout(() => {
      setIsAnimationVisible(false);
      setCurrentAnimatingAchievement(null);
    }, 5000);
  };
  
  return (
    <AchievementContext.Provider
      value={{
        achievements,
        userPoints,
        earnedAchievements,
        updateAchievementProgress,
        awardAchievement,
        getShareableLink,
        showAchievementAnimation,
        isAnimationVisible,
        currentAnimatingAchievement
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};
