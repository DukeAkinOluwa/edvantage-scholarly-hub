
import React from 'react';
import { Search, Filter, SortAsc, Calendar, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterPriority: string | null;
  setFilterPriority: (priority: string | null) => void;
  sortBy: string | null;
  applySort: (sort: string) => void;
  clearFilters: () => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  sortBy,
  applySort,
  clearFilters
}) => {
  return (
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Filter className="h-4 w-4" />
              {filterPriority && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-edvantage-blue rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Projects</h4>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select 
                  value={filterPriority || ''}
                  onValueChange={(value) => setFilterPriority(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All priorities</SelectItem>
                    <SelectItem value="high">High priority</SelectItem>
                    <SelectItem value="medium">Medium priority</SelectItem>
                    <SelectItem value="low">Low priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
                <Button size="sm">Apply</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <SortAsc className="h-4 w-4" />
              {sortBy && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-edvantage-blue rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Sort Projects</h4>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-2"
                  onClick={() => applySort(sortBy === 'title-asc' ? 'title-desc' : 'title-asc')}
                >
                  <span className="w-full flex items-center justify-between">
                    Sort by title
                    <SortAsc className={`h-4 w-4 ${sortBy?.includes('title') ? 'text-edvantage-blue' : ''}`} />
                  </span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-2"
                  onClick={() => applySort(sortBy === 'due-date-asc' ? 'due-date-desc' : 'due-date-asc')}
                >
                  <span className="w-full flex items-center justify-between">
                    Sort by due date
                    <Calendar className={`h-4 w-4 ${sortBy?.includes('due-date') ? 'text-edvantage-blue' : ''}`} />
                  </span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-2"
                  onClick={() => applySort(sortBy === 'progress-asc' ? 'progress-desc' : 'progress-asc')}
                >
                  <span className="w-full flex items-center justify-between">
                    Sort by progress
                    <Progress className={`h-2 w-12 ${sortBy?.includes('progress') ? 'bg-edvantage-blue' : ''}`} value={50} />
                  </span>
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="w-full" onClick={() => clearFilters()}>
                Clear Sort
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
