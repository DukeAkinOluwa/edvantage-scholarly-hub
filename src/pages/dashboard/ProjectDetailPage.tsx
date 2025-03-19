
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  PlusCircle, 
  CheckCircle, 
  Circle, 
  Edit, 
  Trash2, 
  UserPlus,
  MessageSquare 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Import the mock data
import { mockProjects } from '@/pages/dashboard/ProjectsPage';

type ProjectStatus = 'in-progress' | 'completed' | 'overdue' | 'planned';
type ProjectPriority = 'high' | 'medium' | 'low';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
  description?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate: string;
  dueDate: string;
  team: TeamMember[];
  tasks: ProjectTask[];
}

// Status display helpers
const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'planned':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getStatusText = (status: ProjectStatus): string => {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'overdue':
      return 'Overdue';
    case 'planned':
      return 'Planned';
    default:
      return status;
  }
};

const getPriorityColor = (priority: ProjectPriority): string => {
  switch (priority) {
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'low':
      return 'text-green-500 dark:text-green-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assigneeId: ''
  });
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    avatar: 'https://i.pravatar.cc/150?img=60'
  });
  const [editedProject, setEditedProject] = useState<Partial<Project>>({});
  
  // Fetch project data
  useEffect(() => {
    setLoading(true);
    
    // Fetch the project from mock data
    const foundProject = mockProjects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
      setEditedProject({
        title: foundProject.title,
        description: foundProject.description,
        priority: foundProject.priority,
        dueDate: foundProject.dueDate
      });
    }
    
    setLoading(false);
  }, [projectId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edvantage-blue"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="mb-6 text-muted-foreground">The project you are looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/dashboard/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }
  
  const handleGoBack = () => {
    navigate('/dashboard/projects');
  };
  
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a task title",
        variant: "destructive"
      });
      return;
    }
    
    const taskId = `task-${Date.now()}`;
    const assignee = newTask.assigneeId 
      ? project.team.find(member => member.id === newTask.assigneeId)?.name 
      : undefined;
    
    const updatedTasks = [
      ...project.tasks,
      {
        id: taskId,
        title: newTask.title,
        description: newTask.description,
        completed: false,
        assignee: assignee,
        dueDate: newTask.dueDate
      }
    ];
    
    // Update tasks and recalculate progress
    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      progress: Math.round((updatedTasks.filter(t => t.completed).length / updatedTasks.length) * 100)
    };
    
    setProject(updatedProject);
    setNewTask({ title: '', description: '', dueDate: '', assigneeId: '' });
    setIsTaskDialogOpen(false);
    
    toast({
      title: "Task added",
      description: "The new task has been added to this project"
    });
  };
  
  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const updatedTasks = project.tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    );
    
    // Update tasks and recalculate progress
    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      progress: Math.round((updatedTasks.filter(t => t.completed).length / updatedTasks.length) * 100)
    };
    
    setProject(updatedProject);
    
    toast({
      title: completed ? "Task completed" : "Task reopened",
      description: completed 
        ? "Great job! The task has been marked as complete" 
        : "The task has been reopened"
    });
  };
  
  const handleAddTeamMember = () => {
    if (!newMember.name.trim() || !newMember.role.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both name and role for the team member",
        variant: "destructive"
      });
      return;
    }
    
    const memberId = `user-${Date.now()}`;
    const updatedTeam = [
      ...project.team,
      {
        id: memberId,
        name: newMember.name,
        role: newMember.role,
        avatar: newMember.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      }
    ];
    
    setProject({
      ...project,
      team: updatedTeam
    });
    
    setNewMember({ name: '', role: '', avatar: 'https://i.pravatar.cc/150?img=60' });
    setIsMemberDialogOpen(false);
    
    toast({
      title: "Team member added",
      description: `${newMember.name} has been added to the project team`
    });
  };
  
  const handleEditProject = () => {
    if (!editedProject.title?.trim() || !editedProject.description?.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both title and description for the project",
        variant: "destructive"
      });
      return;
    }
    
    const updatedProject = {
      ...project,
      ...editedProject
    };
    
    setProject(updatedProject);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Project updated",
      description: "The project details have been updated successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <Badge className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogDescription>
                  Update the project details and settings.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Project Title</Label>
                  <Input 
                    id="edit-title" 
                    value={editedProject.title || ''}
                    onChange={(e) => setEditedProject({...editedProject, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    value={editedProject.description || ''}
                    onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select 
                      value={editedProject.priority || project.priority}
                      onValueChange={(value: ProjectPriority) => setEditedProject({...editedProject, priority: value})}
                    >
                      <SelectTrigger id="edit-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-due-date">Due Date</Label>
                    <Input 
                      id="edit-due-date" 
                      type="date"
                      value={editedProject.dueDate || ''}
                      onChange={(e) => setEditedProject({...editedProject, dueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleEditProject}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Member</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new member to collaborate on this project.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="member-name">Name</Label>
                  <Input 
                    id="member-name" 
                    placeholder="Enter team member's name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="member-role">Role</Label>
                  <Input 
                    id="member-role" 
                    placeholder="e.g. Developer, Designer, Researcher"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMemberDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTeamMember}>Add Team Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-edvantage-blue hover:bg-edvantage-dark-blue">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Add Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to this project. You can assign it to a team member and set a deadline.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input 
                    id="task-title" 
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="task-description">Description (Optional)</Label>
                  <Textarea 
                    id="task-description" 
                    placeholder="Describe what needs to be done"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-assignee">Assign To (Optional)</Label>
                    <Select 
                      value={newTask.assigneeId}
                      onValueChange={(value) => setNewTask({...newTask, assigneeId: value})}
                    >
                      <SelectTrigger id="task-assignee">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {project.team.map(member => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="task-due-date">Due Date (Optional)</Label>
                    <Input 
                      id="task-due-date" 
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    {format(new Date(project.startDate), 'MMM dd, yyyy')}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    {format(new Date(project.dueDate), 'MMM dd, yyyy')}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground">Priority</p>
                  <p className={`font-medium flex items-center ${getPriorityColor(project.priority)}`}>
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="capitalize">{project.priority}</span>
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground">Tasks</p>
                  <p className="font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{project.tasks.filter(t => t.completed).length}/{project.tasks.length} completed</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Communication
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Project Tasks</h3>
                <Button size="sm" onClick={() => setIsTaskDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
              
              {project.tasks.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No tasks have been added to this project yet</p>
                    <Button className="mt-4" onClick={() => setIsTaskDialogOpen(true)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add First Task
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {project.tasks.map(task => (
                    <Card key={task.id} className={task.completed ? "border-green-200 bg-green-50/30 dark:bg-green-900/10" : ""}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="mt-1">
                          <Checkbox 
                            checked={task.completed}
                            onCheckedChange={(checked) => handleTaskComplete(task.id, checked as boolean)}
                            className={task.completed ? "bg-green-500 text-white border-green-500" : ""}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {task.dueDate && (
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                                </div>
                              )}
                              {task.assignee && (
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {task.assignee}
                                </div>
                              )}
                            </div>
                          </div>
                          {task.description && (
                            <p className={`mt-1 text-sm ${task.completed ? "text-muted-foreground" : ""}`}>
                              {task.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="team" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Project Team</h3>
                <Button size="sm" onClick={() => setIsMemberDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.team.map(member => (
                  <Card key={member.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="communication" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Communication</CardTitle>
                  <CardDescription>
                    Chat with your team members about this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Project chat will be available soon</p>
                    <Button className="mt-4" variant="outline">
                      Create Group Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.team.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full" onClick={() => setIsMemberDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </CardContent>
            
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge className={`mt-1 ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </Badge>
              </div>
              
              <div>
                <p className="text-muted-foreground">Priority</p>
                <p className={`font-medium ${getPriorityColor(project.priority)}`}>
                  <span className="capitalize">{project.priority}</span>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {format(new Date(project.dueDate), 'MMM dd, yyyy')}
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Progress</p>
                <div className="mt-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>
                      {project.tasks.filter(t => t.completed).length}/{project.tasks.length} tasks
                    </span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
