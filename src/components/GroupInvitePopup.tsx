import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, User, Mail, Link2, Check, UserPlus, Users, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GroupInvitePopupProps {
  groupId: string;
  groupName: string;
  trigger?: React.ReactNode;
}

const GroupInvitePopup: React.FC<GroupInvitePopupProps> = ({ 
  groupId, 
  groupName,
  trigger 
}) => {
  const [usernameSearch, setUsernameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [inviteLink, setInviteLink] = useState(`https://edvantage.example.com/groups/join/${groupId}`);
  const [copied, setCopied] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock users for search results
  const mockUsers: User[] = [
    { id: 'user1', name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 'user3', name: 'Robert Johnson', email: 'robert@example.com', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 'user4', name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 'user5', name: 'Michael Brown', email: 'michael@example.com', avatar: 'https://i.pravatar.cc/150?img=12' },
  ];

  const handleSearchByUsername = () => {
    if (!usernameSearch.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockUsers.filter(user => 
        user.name.toLowerCase().includes(usernameSearch.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  const handleSearchByEmail = () => {
    if (!emailSearch.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockUsers.filter(user => 
        user.email.toLowerCase().includes(emailSearch.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    
    toast({
      title: "Invite link copied",
      description: "The invite link has been copied to your clipboard"
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const inviteUser = (user: User) => {
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${user.name}`
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Members
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite to {groupName}</DialogTitle>
          <DialogDescription>
            Invite members to join your group via username, email, or sharing a link.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="username" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="username" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Username
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center">
              <Link2 className="h-4 w-4 mr-2" />
              Link
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="username" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Search by username</Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter username..."
                    className="pl-9"
                    value={usernameSearch}
                    onChange={(e) => setUsernameSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchByUsername()}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleSearchByUsername}
                  disabled={isLoading || !usernameSearch.trim()}
                >
                  Search
                </Button>
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
                {searchResults.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => inviteUser(user)}>
                      Invite
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div className="text-center p-4">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            )}
            
            {!isLoading && searchResults.length === 0 && usernameSearch.trim() && (
              <div className="text-center p-4">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No users found with that username</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Invite by email</Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address..."
                    className="pl-9"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchByEmail()}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleSearchByEmail}
                  disabled={isLoading || !emailSearch.trim()}
                >
                  Search
                </Button>
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
                {searchResults.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => inviteUser(user)}>
                      Invite
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div className="text-center p-4">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            )}
            
            {!isLoading && searchResults.length === 0 && emailSearch.trim() && (
              <div className="text-center p-4">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No users found with that email</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    toast({
                      title: "Invitation sent",
                      description: `An invitation email has been sent to ${emailSearch}`
                    });
                    setEmailSearch('');
                  }}
                >
                  Send invitation anyway
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="invite-link">Invite link</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="invite-link"
                  value={inviteLink}
                  readOnly
                  className="flex-grow"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={copyInviteLink}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This link expires in 7 days. Anyone with this link can join your group.
              </p>
            </div>
            
            <div className="mt-4">
              <Button
                className="w-full"
                onClick={() => {
                  // Generate a new link
                  setInviteLink(`https://edvantage.example.com/groups/join/${groupId}?t=${Date.now()}`);
                  
                  toast({
                    title: "New link generated",
                    description: "A new invite link has been generated"
                  });
                }}
              >
                Generate New Link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" type="button">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInvitePopup;
