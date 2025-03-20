
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
  const { toast } = useToast();

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Recovery email sent",
        description: "If an account exists with this email, you'll receive instructions to reset your password.",
      });
      
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-edvantage-light-blue dark:bg-gray-900 px-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 rounded-full" 
        onClick={toggleDarkMode}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
      
      <Link to="/login" className="absolute top-4 left-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      
      <Card className="w-full max-w-md shadow-lg animate-fade-in dark:bg-gray-800 dark:text-gray-100">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <Mail className="h-12 w-12 text-edvantage-blue dark:text-edvantage-light-blue" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">Reset your password</CardTitle>
          <CardDescription className="text-center">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-edvantage-blue hover:bg-edvantage-dark-blue dark:bg-edvantage-blue/80 dark:hover:bg-edvantage-blue" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg">
                Reset link sent successfully!
              </div>
              <p className="text-sm text-muted-foreground">
                Please check your email inbox and follow the instructions to reset your password.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link to="/login" className="text-edvantage-blue dark:text-edvantage-light-blue hover:underline">
              Return to sign in
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>Demo mode: No actual email will be sent</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
