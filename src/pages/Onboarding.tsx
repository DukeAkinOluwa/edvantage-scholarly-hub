
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, Calendar, Users, BookOpen, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const OnboardingStep = ({ 
  title, 
  description, 
  icon, 
  children 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  children?: React.ReactNode 
}) => (
  <div className="text-center space-y-4">
    <div className="flex justify-center">{icon}</div>
    <h2 className="text-2xl font-bold">{title}</h2>
    <p className="text-muted-foreground">{description}</p>
    {children}
  </div>
);

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const steps = [
    {
      title: "Welcome to Edvantage",
      description: "Let's get started with a quick tour of your productivity and collaboration platform.",
      icon: <CheckCircle className="h-12 w-12 text-edvantage-blue" />,
    },
    {
      title: "Schedule & Task Management",
      description: "Keep track of all your academic deadlines, classes, and personal tasks in one place.",
      icon: <Calendar className="h-12 w-12 text-edvantage-blue" />,
    },
    {
      title: "Collaboration & Study Groups",
      description: "Create or join study groups to collaborate with peers, share resources, and learn together.",
      icon: <Users className="h-12 w-12 text-edvantage-blue" />,
    },
    {
      title: "Academic Resources",
      description: "Access a library of resources to enhance your learning and stay ahead in your studies.",
      icon: <BookOpen className="h-12 w-12 text-edvantage-blue" />,
    },
    {
      title: "Gamification & Rewards",
      description: "Earn points, unlock achievements, and compare your progress with peers on the leaderboard.",
      icon: <Award className="h-12 w-12 text-edvantage-blue" />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Onboarding complete!",
        description: "You're all set to start using Edvantage.",
      });
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    toast({
      title: "Onboarding skipped",
      description: "You can always revisit the tutorial from your profile settings.",
    });
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-edvantage-light-blue flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tutorial
            </Button>
          </div>
          
          <div className="py-6">
            <OnboardingStep
              title={steps[currentStep].title}
              description={steps[currentStep].description}
              icon={steps[currentStep].icon}
            />
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} className="bg-edvantage-blue hover:bg-edvantage-dark-blue flex items-center">
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        <p>Hello, {user?.name || 'New User'}!</p>
        <p>We're excited to have you on board.</p>
      </div>
    </div>
  );
};

export default Onboarding;
