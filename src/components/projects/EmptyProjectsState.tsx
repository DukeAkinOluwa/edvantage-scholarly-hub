
import React from 'react';
import { AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyProjectsStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onCreateProject: () => void;
}

export const EmptyProjectsState: React.FC<EmptyProjectsStateProps> = ({
  hasFilters,
  onClearFilters,
  onCreateProject
}) => {
  return (
    <div className="text-center py-10">
      <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium">No projects found</h3>
      <p className="text-muted-foreground mt-1">
        {hasFilters ? 
          "Try changing your search or filter criteria" : 
          "Create your first project to get started"}
      </p>
      
      {hasFilters ? (
        <Button 
          className="mt-4" 
          variant="outline"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      ) : (
        <Button 
          className="mt-4" 
          onClick={onCreateProject}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Project
        </Button>
      )}
    </div>
  );
};
