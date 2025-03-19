
import React from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle, 
  ExternalLink,
  MoreHorizontal,
  Edit,
  UserPlus,
  Plus,
  FolderOpen,
  Trash2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  Project, 
  getStatusColor, 
  getStatusText,
  getPriorityColor 
} from '@/types/project';

interface ProjectListProps {
  projects: Project[];
  onOpenProject: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onOpenProject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(project => (
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
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onOpenProject(project.id)}>
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Add Team Member</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add Task</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle 
              className="text-lg mt-2 cursor-pointer hover:text-edvantage-blue transition-colors"
              onClick={() => onOpenProject(project.id)}
            >
              {project.title}
            </CardTitle>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-500 hover:text-blue-700 p-0"
                  onClick={() => onOpenProject(project.id)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  <span>Details</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
