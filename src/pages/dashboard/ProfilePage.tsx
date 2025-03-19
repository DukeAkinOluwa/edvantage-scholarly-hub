
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Edit2, Save, Calendar, Mail, Building, BookOpen, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    department: user?.department || '',
    level: user?.level || '',
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Please login to view your profile</p>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profilePic} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.accountType === 'student' ? 'Student' : 'Organization'}</p>
            
            <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            {isEditing ? (
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button onClick={handleEdit} variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <Input 
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-sm p-2 bg-muted rounded-md">{user.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                {isEditing ? (
                  <Input 
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled
                  />
                ) : (
                  <p className="text-sm p-2 bg-muted rounded-md">{user.email}</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  University
                </label>
                {isEditing ? (
                  <Input 
                    name="university"
                    value={profileData.university}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-sm p-2 bg-muted rounded-md">{user.university}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Department
                </label>
                {isEditing ? (
                  <Input 
                    name="department"
                    value={profileData.department}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-sm p-2 bg-muted rounded-md">{user.department}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              {isEditing ? (
                <Input 
                  name="level"
                  value={profileData.level}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded-md">{user.level}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
