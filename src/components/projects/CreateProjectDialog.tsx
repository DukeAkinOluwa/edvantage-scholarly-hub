
import React, { useState } from 'react';
import { Plus, AlertCircle, CalendarDays, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ProjectPriority } from '@/types/project';

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: any) => void;
}

export const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  isOpen,
  onClose,
  onCreateProject
}) => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as ProjectPriority,
    tasks: [] as { title: string; dueDate?: string }[]
  });
  
  const { toast } = useToast();

  const handleAddTaskToNewProject = () => {
    setNewProject({
      ...newProject,
      tasks: [
        ...newProject.tasks,
        { title: '', dueDate: '' }
      ]
    });
  };

  const handleUpdateNewProjectTask = (index: number, field: string, value: string) => {
    const updatedTasks = [...newProject.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value
    };
    
    setNewProject({
      ...newProject,
      tasks: updatedTasks
    });
  };

  const handleRemoveNewProjectTask = (index: number) => {
    const updatedTasks = [...newProject.tasks];
    updatedTasks.splice(index, 1);
    
    setNewProject({
      ...newProject,
      tasks: updatedTasks
    });
  };

  const handleCreateProject = () => {
    if (!newProject.title || !newProject.description || !newProject.dueDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields for the project.",
        variant: "destructive"
      });
      return;
    }

    const hasEmptyTasks = newProject.tasks.some(task => !task.title);
    if (hasEmptyTasks) {
      toast({
        title: "Empty tasks",
        description: "Please provide a title for all tasks or remove empty ones.",
        variant: "destructive"
      });
      return;
    }

    onCreateProject(newProject);
    
    setNewProject({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      tasks: []
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project. You can add tasks with deadlines now or later.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-2">
            <Label htmlFor="project-title">Project Title <span className="text-red-500">*</span></Label>
            <Input 
              id="project-title" 
              placeholder="Enter project title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="project-description">Description <span className="text-red-500">*</span></Label>
            <Textarea 
              id="project-description" 
              placeholder="Brief description of your project"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project-due-date">Due Date <span className="text-red-500">*</span></Label>
              <Input 
                id="project-due-date" 
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project-priority">Priority</Label>
              <Select 
                value={newProject.priority}
                onValueChange={(value: ProjectPriority) => setNewProject({...newProject, priority: value})}
              >
                <SelectTrigger id="project-priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-medium">Tasks</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddTaskToNewProject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            {newProject.tasks.length === 0 ? (
              <div className="text-center py-6 bg-muted/30 rounded-md">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">No tasks added yet</p>
                <Button variant="outline" size="sm" onClick={handleAddTaskToNewProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Task
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {newProject.tasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-md bg-muted/30">
                    <div className="flex-1 grid gap-2">
                      <Input 
                        placeholder="Task title"
                        value={task.title}
                        onChange={(e) => handleUpdateNewProjectTask(index, 'title', e.target.value)}
                      />
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => handleUpdateNewProjectTask(index, 'dueDate', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveNewProjectTask(index)}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
