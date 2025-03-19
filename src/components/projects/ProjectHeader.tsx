
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectHeaderProps {
  onCreateProject: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onCreateProject }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-1">
      <h1 className="text-2xl font-bold">Projects</h1>
      
      <div className="flex items-center gap-2">
        <Button 
          className="bg-edvantage-blue hover:bg-edvantage-dark-blue transition-colors" 
          onClick={onCreateProject}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
    </div>
  );
};
