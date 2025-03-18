
import React, { useState, useEffect } from 'react';
import { Trophy, Award, Star, Sparkles } from 'lucide-react';
import { Achievement } from '@/contexts/AchievementContext';

interface AchievementAnimationProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementAnimation: React.FC<AchievementAnimationProps> = ({ achievement, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Create confetti elements
  const confettiElements = Array.from({ length: 50 }).map((_, index) => {
    const color = ['#FFD700', '#FF6B00', '#2A52BE', '#ff4757', '#2ed573'][
      Math.floor(Math.random() * 5)
    ];
    
    const size = Math.floor(Math.random() * 10) + 5;
    const left = `${Math.random() * 100}%`;
    const animationDuration = `${Math.random() * 2 + 1}s`;
    const animationDelay = `${Math.random() * 0.5}s`;
    
    return (
      <div
        key={index}
        className="confetti absolute animate-confetti"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          left,
          top: '-20px',
          animationDuration,
          animationDelay,
        }}
      />
    );
  });
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {showConfetti && <div className="confetti-container">{confettiElements}</div>}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm w-full animate-bounce-in">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-yellow-500" />
              </div>
              <div className="absolute -top-2 -right-2 animate-rotate-star">
                <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              </div>
              <div className="absolute -bottom-2 -left-2 animate-rotate-star" style={{ animationDelay: '0.2s' }}>
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-edvantage-blue dark:text-edvantage-light-blue">
            Achievement Unlocked!
          </h3>
          
          <div className="achievement-card p-4 border border-edvantage-blue/20 dark:border-edvantage-blue/40 rounded-lg bg-edvantage-light-blue dark:bg-edvantage-blue/10 mb-4">
            <div className="flex items-center mb-2">
              <div className="text-3xl mr-3 text-yellow-500">
                {achievement.icon || <Award />}
              </div>
              <div>
                <h4 className="font-bold">{achievement.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Completed just now
              </div>
              <div className="text-edvantage-blue dark:text-edvantage-light-blue font-bold">
                +{achievement.points} pts
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-sm text-edvantage-blue dark:text-edvantage-light-blue hover:underline pointer-events-auto"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementAnimation;
