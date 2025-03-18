
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Building2, Moon, Sun } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Login = () => {
  const [accountType, setAccountType] = useState<'student' | 'organization'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || 
               (accountType === 'organization' ? '/school-admin' : '/dashboard');

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
      await login(email, password, accountType);
      
      toast({
        title: "Login successful",
        description: `Welcome back to Edvantage${accountType === 'organization' ? ' (Organization account)' : ''}!`,
      });
      
      // Redirect based on account type
      const redirectPath = accountType === 'organization' ? '/school-admin' : from;
      navigate(redirectPath, { replace: true });
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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
      
      <Card className="w-full max-w-md shadow-lg animate-fade-in dark:bg-gray-800 dark:text-gray-100">
        <CardHeader className="space-y-1">
          <Tabs defaultValue="student" onValueChange={(value) => setAccountType(value as 'student' | 'organization')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="student" className="flex items-center justify-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="organization" className="flex items-center justify-center gap-2">
                <Building2 className="h-4 w-4" />
                Organization
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <div className="flex justify-center mb-4">
                <GraduationCap className="h-10 w-10 text-edvantage-blue dark:text-edvantage-light-blue" />
              </div>
              <CardTitle className="text-2xl text-center font-bold">Student Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your student account
              </CardDescription>
            </TabsContent>
            
            <TabsContent value="organization">
              <div className="flex justify-center mb-4">
                <Building2 className="h-10 w-10 text-edvantage-blue dark:text-edvantage-light-blue" />
              </div>
              <CardTitle className="text-2xl text-center font-bold">Organization Sign In</CardTitle>
              <CardDescription className="text-center">
                Access your school or organization admin dashboard
              </CardDescription>
            </TabsContent>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {accountType === 'organization' && (
              <div className="space-y-2">
                <Label htmlFor="organizationId">Organization ID</Label>
                <Input 
                  id="organizationId" 
                  placeholder="Enter your organization ID" 
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  required={accountType === 'organization'}
                />
              </div>
            )}
            
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
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-edvantage-blue dark:text-edvantage-light-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rememberMe" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-edvantage-blue hover:bg-edvantage-dark-blue dark:bg-edvantage-blue/80 dark:hover:bg-edvantage-blue" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">New to Edvantage? </span>
            <Link to="/register" className="text-edvantage-blue dark:text-edvantage-light-blue hover:underline">
              Create an account
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>Demo credentials:</p>
            <p>Email: johndoe@example.com</p>
            <p>Password: any non-empty string</p>
            {accountType === 'organization' && <p>Organization ID: org123</p>}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
