
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ExternalLink,
  UserPlus,
  FolderOpen,
  CalendarDays,
  ChevronDown,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectHeader } from '@/components/projects/ProjectHeader';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectList } from '@/components/projects/ProjectList';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { EmptyProjectsState } from '@/components/projects/EmptyProjectsState';
import { Project, ProjectStatus, ProjectPriority, mockProjects } from '@/types/project';

const getStatusOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'planned', label: 'Planned' },
];

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = activeTab === 'all' || project.status === activeTab;
    
    const matchesPriority = !filterPriority || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortBy) return 0;
    
    switch (sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'due-date-asc':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'due-date-desc':
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      case 'progress-asc':
        return a.progress - b.progress;
      case 'progress-desc':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  const handleCreateProject = (newProject: any) => {
    const id = `project-${Date.now()}`;
    const startDate = new Date().toISOString().split('T')[0];
    
    const createdProject: Project = {
      id,
      title: newProject.title,
      description: newProject.description,
      status: 'planned',
      priority: newProject.priority,
      progress: 0,
      startDate,
      dueDate: newProject.dueDate,
      team: [
        { id: 'user-1', name: 'John Doe', role: 'Creator', avatar: 'https://i.pravatar.cc/150?img=1' }
      ],
      tasks: newProject.tasks.map((task: any, index: number) => ({
        id: `task-${Date.now()}-${index}`,
        title: task.title,
        completed: false,
        dueDate: task.dueDate
      }))
    };
    
    setProjects([createdProject, ...projects]);
    
    toast({
      title: "Project created",
      description: `Your new project "${createdProject.title}" has been created successfully.${
        createdProject.tasks.length ? ` Added ${createdProject.tasks.length} tasks.` : ''
      }`
    });
  };

  const handleOpenProject = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const clearFilters = () => {
    setFilterPriority(null);
    setSortBy(null);
    setSearchQuery('');
  };
  
  const applySort = (sortValue: string) => {
    setSortBy(sortValue);
    toast({
      title: "Sorting applied",
      description: `Projects are now sorted by ${sortValue.replace('-', ' ')}`
    });
  };

  return (
    <div className="space-y-6">
      <ProjectHeader 
        onCreateProject={() => setIsCreateDialogOpen(true)} 
      />
      
      <ProjectFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        sortBy={sortBy}
        applySort={applySort}
        clearFilters={clearFilters}
      />
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {getStatusOptions.map(option => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab}>
          {sortedProjects.length > 0 ? (
            <ProjectList 
              projects={sortedProjects}
              onOpenProject={handleOpenProject}
            />
          ) : (
            <EmptyProjectsState 
              hasFilters={!!(searchQuery || filterPriority || sortBy)}
              onClearFilters={clearFilters}
              onCreateProject={() => setIsCreateDialogOpen(true)}
            />
          )}
        </TabsContent>
      </Tabs>

      <CreateProjectDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default ProjectsPage;
