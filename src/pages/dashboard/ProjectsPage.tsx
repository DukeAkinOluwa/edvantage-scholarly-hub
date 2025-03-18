
import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  MoreHorizontal,
  Search,
  Filter,
  SortAsc,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Define project types
type ProjectStatus = 'in-progress' | 'completed' | 'overdue' | 'planned';
type ProjectPriority = 'high' | 'medium' | 'low';

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
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Research',
    description: 'Research project on implementing advanced ML algorithms for educational pattern recognition',
    status: 'in-progress',
    priority: 'high',
    progress: 45,
    startDate: '2025-02-15',
    dueDate: '2025-06-30',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Team Lead', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-2', name: 'Sarah Johnson', role: 'ML Specialist', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-3', name: 'Miguel Rodriguez', role: 'Data Analyst', avatar: 'https://i.pravatar.cc/150?img=12' }
    ],
    tasks: [
      { id: 'task-1', title: 'Literature review', completed: true },
      { id: 'task-2', title: 'Data collection', completed: true },
      { id: 'task-3', title: 'Algorithm implementation', completed: false },
      { id: 'task-4', title: 'Testing and validation', completed: false },
      { id: 'task-5', title: 'Documentation', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Interactive Learning Platform',
    description: 'Developing an interactive platform for collaborative learning experiences',
    status: 'in-progress',
    priority: 'medium',
    progress: 70,
    startDate: '2025-01-10',
    dueDate: '2025-05-15',
    team: [
      { id: 'user-2', name: 'Sarah Johnson', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-4', name: 'David Chen', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=8' }
    ],
    tasks: [
      { id: 'task-1', title: 'UI/UX design', completed: true },
      { id: 'task-2', title: 'Frontend implementation', completed: true },
      { id: 'task-3', title: 'Backend integration', completed: true },
      { id: 'task-4', title: 'User testing', completed: false },
      { id: 'task-5', title: 'Launch preparation', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Quantum Computing Study Group',
    description: 'Organizing a study group to explore quantum computing principles and applications',
    status: 'planned',
    priority: 'medium',
    progress: 10,
    startDate: '2025-08-01',
    dueDate: '2025-12-15',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-6', name: 'Lisa Wang', role: 'Physics Specialist', avatar: 'https://i.pravatar.cc/150?img=9' }
    ],
    tasks: [
      { id: 'task-1', title: 'Create curriculum', completed: true },
      { id: 'task-2', title: 'Recruit participants', completed: false },
      { id: 'task-3', title: 'Schedule meetings', completed: false },
      { id: 'task-4', title: 'Prepare materials', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Capstone Project: Smart Education',
    description: 'Final year project developing AI-powered education tools for personalized learning',
    status: 'overdue',
    priority: 'high',
    progress: 60,
    startDate: '2024-09-01',
    dueDate: '2025-03-01',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-2', name: 'Sarah Johnson', role: 'AI Developer', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-5', name: 'James Wilson', role: 'Education Specialist', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    tasks: [
      { id: 'task-1', title: 'Project proposal', completed: true },
      { id: 'task-2', title: 'Research and planning', completed: true },
      { id: 'task-3', title: 'Development phase 1', completed: true },
      { id: 'task-4', title: 'Development phase 2', completed: false },
      { id: 'task-5', title: 'Testing phase', completed: false },
      { id: 'task-6', title: 'Final presentation', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Academic Research Paper',
    description: 'Collaborative research paper on the impact of digital tools in modern education',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    startDate: '2024-12-01',
    dueDate: '2025-02-28',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Lead Author', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-7', name: 'Emily Taylor', role: 'Co-Author', avatar: 'https://i.pravatar.cc/150?img=7' }
    ],
    tasks: [
      { id: 'task-1', title: 'Literature review', completed: true },
      { id: 'task-2', title: 'Outline creation', completed: true },
      { id: 'task-3', title: 'Draft writing', completed: true },
      { id: 'task-4', title: 'Peer review', completed: true },
      { id: 'task-5', title: 'Final submission', completed: true }
    ]
  },
  {
    id: '6',
    title: 'Educational App Development',
    description: 'Developing a mobile app for vocabulary enhancement through gamification',
    status: 'in-progress',
    priority: 'high',
    progress: 35,
    startDate: '2025-01-15',
    dueDate: '2025-07-30',
    team: [
      { id: 'user-4', name: 'David Chen', role: 'Mobile Developer', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 'user-8', name: 'Rachel Green', role: 'Game Designer', avatar: 'https://i.pravatar.cc/150?img=10' }
    ],
    tasks: [
      { id: 'task-1', title: 'Concept development', completed: true },
      { id: 'task-2', title: 'UI/UX design', completed: true },
      { id: 'task-3', title: 'Frontend development', completed: false },
      { id: 'task-4', title: 'Backend integration', completed: false },
      { id: 'task-5', title: 'Content creation', completed: false },
      { id: 'task-6', title: 'Testing and deployment', completed: false }
    ]
  }
];

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

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const { toast } = useToast();

  // Filter projects based on search and tab
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'in-progress') return matchesSearch && project.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && project.status === 'completed';
    if (activeTab === 'overdue') return matchesSearch && project.status === 'overdue';
    if (activeTab === 'planned') return matchesSearch && project.status === 'planned';
    
    return matchesSearch;
  });

  const handleCreateProject = () => {
    if (!newProject.title || !newProject.description || !newProject.dueDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const id = `project-${Date.now()}`;
    const startDate = new Date().toISOString().split('T')[0];
    
    const createdProject: Project = {
      id,
      title: newProject.title,
      description: newProject.description,
      status: 'planned',
      priority: 'medium',
      progress: 0,
      startDate,
      dueDate: newProject.dueDate,
      team: [
        { id: 'user-1', name: 'John Doe', role: 'Creator', avatar: 'https://i.pravatar.cc/150?img=1' }
      ],
      tasks: []
    };
    
    setProjects([createdProject, ...projects]);
    
    toast({
      title: "Project created",
      description: "Your new project has been created successfully."
    });
    
    setNewProject({
      title: '',
      description: '',
      dueDate: ''
    });
    
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        
        <div className="flex items-center gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-edvantage-blue hover:bg-edvantage-dark-blue">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new project. You can add team members and tasks later.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input 
                    id="project-title" 
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Input 
                    id="project-description" 
                    placeholder="Brief description of your project"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="project-due-date">Due Date</Label>
                  <Input 
                    id="project-due-date" 
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <SortAsc className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="planned">Planned</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map(project => (
                <Card key={project.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Add Team Member</DropdownMenuItem>
                          <DropdownMenuItem>Add Task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{project.tasks.length} tasks</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className={`h-4 w-4 mr-1 ${getPriorityColor(project.priority)}`} />
                          <span className="capitalize">{project.priority}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center -space-x-2">
                        {project.team.slice(0, 3).map(member => (
                          <Avatar key={member.id} className="border-2 border-white dark:border-gray-900 h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs border-2 border-white dark:border-gray-900">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span>
                            {project.tasks.filter(task => task.completed).length}/{project.tasks.length} tasks
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 p-0">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          <span>Details</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery ? "Try changing your search query" : "Create your first project to get started"}
              </p>
              {!searchQuery && (
                <Button 
                  className="mt-4" 
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  Create New Project
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectsPage;
