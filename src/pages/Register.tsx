
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Building2, Moon, Sun } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const [accountType, setAccountType] = useState<'student' | 'organization'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    department: '',
    level: '100 Level',
    organizationId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await register({
        ...formData,
        accountType,
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
      
      // Direct to different pages based on account type
      if (accountType === 'organization') {
        navigate('/school-admin');
      } else {
        navigate('/onboarding');
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-edvantage-light-blue dark:bg-gray-900 px-4 py-12">
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
              <CardTitle className="text-2xl text-center font-bold">Create Student Account</CardTitle>
              <CardDescription className="text-center">
                Enter your details to register as a student with Edvantage
              </CardDescription>
            </TabsContent>
            
            <TabsContent value="organization">
              <div className="flex justify-center mb-4">
                <Building2 className="h-10 w-10 text-edvantage-blue dark:text-edvantage-light-blue" />
              </div>
              <CardTitle className="text-2xl text-center font-bold">Create Organization Account</CardTitle>
              <CardDescription className="text-center">
                Register your school or organization with Edvantage
              </CardDescription>
            </TabsContent>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {accountType === 'student' ? 'Full Name' : 'Organization Name'}
              </Label>
              <Input 
                id="name" 
                placeholder={accountType === 'student' ? "John Doe" : "University of Lagos"} 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder={accountType === 'student' ? "john@example.com" : "admin@university.edu"} 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            {accountType === 'organization' && (
              <div className="space-y-2">
                <Label htmlFor="organizationId">Organization ID</Label>
                <Input 
                  id="organizationId" 
                  placeholder="Create a unique ID for your organization" 
                  value={formData.organizationId}
                  onChange={handleChange}
                  required={accountType === 'organization'}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="university">
                {accountType === 'student' ? 'University/Institution' : 'Organization Location'}
              </Label>
              <Input 
                id="university" 
                placeholder={accountType === 'student' ? "University of Lagos" : "Lagos, Nigeria"} 
                value={formData.university}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">
                {accountType === 'student' ? 'Department' : 'Organization Type'}
              </Label>
              <Input 
                id="department" 
                placeholder={accountType === 'student' ? "Computer Science" : "Higher Education"} 
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            
            {accountType === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select defaultValue="100 Level" onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100 Level">100 Level</SelectItem>
                    <SelectItem value="200 Level">200 Level</SelectItem>
                    <SelectItem value="300 Level">300 Level</SelectItem>
                    <SelectItem value="400 Level">400 Level</SelectItem>
                    <SelectItem value="500 Level">500 Level</SelectItem>
                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="pt-2">
              <Button type="submit" className="w-full bg-edvantage-blue hover:bg-edvantage-dark-blue" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-edvantage-blue hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
