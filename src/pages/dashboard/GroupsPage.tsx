
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Plus, Users, BookOpen, Briefcase, 
  UserPlus, Copy, Settings, Calendar, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { groups, Group, GroupType } from '@/data/dummyData';

const GroupsPage = () => {
  const [groupsList, setGroupsList] = useState<Group[]>(groups);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { toast } = useToast();
  
  // New group form state
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    type: 'study' as GroupType,
  });
  
  // Filter groups based on search query
  const filteredGroups = groupsList.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get groups by type
  const studyGroups = filteredGroups.filter(group => group.type === 'study');
  const classGroups = filteredGroups.filter(group => group.type === 'class');
  const projectGroups = filteredGroups.filter(group => group.type === 'project');
  
  // Handle new group form change
  const handleNewGroupChange = (field: string, value: string) => {
    setNewGroup({
      ...newGroup,
      [field]: value,
    });
  };
  
  // Create new group
  const createGroup = () => {
    const newGroupItem: Group = {
      id: `group-${Date.now()}`,
      name: newGroup.name,
      description: newGroup.description,
      type: newGroup.type,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: 'user-1',
          name: 'John Doe',
          profilePic: 'https://i.pravatar.cc/150?img=1',
          role: 'admin'
        }
      ],
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
    };
    
    setGroupsList(prev => [...prev, newGroupItem]);
    
    toast({
      title: "Group created",
      description: `"${newGroup.name}" has been created successfully.`,
    });
    
    setNewGroup({
      name: '',
      description: '',
      type: 'study',
    });
    
    setIsCreatingGroup(false);
  };
  
  // Open invite dialog
  const openInviteDialog = (group: Group) => {
    setSelectedGroup(group);
    setIsInviteDialogOpen(true);
  };
  
  // Copy invite link
  const copyInviteLink = () => {
    const link = `https://edvantage.app/join/${selectedGroup?.id}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link copied",
      description: "Invite link has been copied to clipboard.",
    });
  };
  
  // Send invites
  const sendInvites = (emails: string) => {
    toast({
      title: "Invitations sent",
      description: `Invitations have been sent to ${emails.split(',').length} email addresses.`,
    });
    
    setIsInviteDialogOpen(false);
  };
  
  // Group card component
  const GroupCard = ({ group }: { group: Group }) => (
    <Card className="h-full">
      <div 
        className="h-32 bg-cover bg-center rounded-t-lg" 
        style={{ 
          backgroundImage: `url(${group.coverImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'})`,
        }}
      >
        <div className="h-full w-full bg-black/30 rounded-t-lg flex items-end p-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
            group.type === 'study' 
              ? 'bg-green-500' 
              : group.type === 'class' 
                ? 'bg-blue-500' 
                : 'bg-orange-500'
          }`}>
            {group.type === 'study' 
              ? <Users size={20} /> 
              : group.type === 'class' 
                ? <BookOpen size={20} /> 
                : <Briefcase size={20} />
            }
          </div>
        </div>
      </div>
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="flex justify-between items-start">
          <span className="text-lg truncate">{group.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {group.description}
        </p>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{group.members.length} Members</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/dashboard/groups/${group.id}`}>View</Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => openInviteDialog(group)}>
          <UserPlus className="h-4 w-4 mr-1" />
          Invite
        </Button>
      </CardFooter>
    </Card>
  );
  
  // Empty state component
  const EmptyState = ({ type, onCreateClick }: { type: string, onCreateClick: () => void }) => (
    <div className="text-center py-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No {type} Groups</h3>
      <p className="text-sm text-muted-foreground mt-2 mb-4">
        You don't have any {type.toLowerCase()} groups yet.
      </p>
      <Button onClick={onCreateClick}>
        <Plus className="h-4 w-4 mr-2" />
        Create a {type} Group
      </Button>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Study Groups</h1>
        <div className="flex flex-wrap gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search groups..." 
              className="pl-8 w-full md:w-64" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsCreatingGroup(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="class">Class</TabsTrigger>
          <TabsTrigger value="project">Project</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredGroups.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <EmptyState type="All" onCreateClick={() => setIsCreatingGroup(true)} />
          )}
        </TabsContent>
        
        <TabsContent value="study" className="mt-6">
          {studyGroups.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studyGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <EmptyState type="Study" onCreateClick={() => {
              setNewGroup({...newGroup, type: 'study'});
              setIsCreatingGroup(true);
            }} />
          )}
        </TabsContent>
        
        <TabsContent value="class" className="mt-6">
          {classGroups.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {classGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <EmptyState type="Class" onCreateClick={() => {
              setNewGroup({...newGroup, type: 'class'});
              setIsCreatingGroup(true);
            }} />
          )}
        </TabsContent>
        
        <TabsContent value="project" className="mt-6">
          {projectGroups.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <EmptyState type="Project" onCreateClick={() => {
              setNewGroup({...newGroup, type: 'project'});
              setIsCreatingGroup(true);
            }} />
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create Group Dialog */}
      <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Create a new group to collaborate with other students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input 
                id="group-name" 
                value={newGroup.name} 
                onChange={(e) => handleNewGroupChange('name', e.target.value)}
                placeholder="E.g., CS 301 Study Group"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-description">Description</Label>
              <Textarea 
                id="group-description" 
                value={newGroup.description} 
                onChange={(e) => handleNewGroupChange('description', e.target.value)}
                placeholder="Describe the purpose of this group"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-type">Group Type</Label>
              <Select 
                value={newGroup.type}
                onValueChange={(value) => handleNewGroupChange('type', value as GroupType)}
              >
                <SelectTrigger id="group-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study Group</SelectItem>
                  <SelectItem value="class">Class Group</SelectItem>
                  <SelectItem value="project">Project Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingGroup(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-edvantage-blue hover:bg-edvantage-dark-blue" 
              onClick={createGroup}
              disabled={!newGroup.name}
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Members Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogDescription>
              Invite others to join "{selectedGroup?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted rounded-md flex items-center justify-between">
              <div className="text-sm break-all">
                https://edvantage.app/join/{selectedGroup?.id}
              </div>
              <Button variant="ghost" size="sm" onClick={copyInviteLink}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-emails">Invite by Email</Label>
              <Textarea 
                id="invite-emails" 
                placeholder="Enter email addresses separated by commas"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple email addresses separated by commas.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-edvantage-blue hover:bg-edvantage-dark-blue" 
              onClick={() => sendInvites("example1@example.com, example2@example.com")}
            >
              Send Invites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupsPage;
