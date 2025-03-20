
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { File, FileText, FileImage, FileAudio, FileCog, Download, Search, SortDesc, Filter } from 'lucide-react';

// Mock shared resources data
const mockSharedResources = [
  {
    id: 'file-1',
    name: 'Project Planning.pdf',
    type: 'pdf',
    size: '2.4 MB',
    sharedBy: 'Sarah Johnson',
    sharedOn: '2025-05-10T14:30:00Z'
  },
  {
    id: 'file-2',
    name: 'Study Notes.docx',
    type: 'docx',
    size: '1.2 MB',
    sharedBy: 'David Chen',
    sharedOn: '2025-05-09T11:20:00Z'
  },
  {
    id: 'file-3',
    name: 'Lecture Slides.pptx',
    type: 'pptx',
    size: '5.8 MB',
    sharedBy: 'Sarah Johnson',
    sharedOn: '2025-05-08T09:45:00Z'
  },
  {
    id: 'file-4',
    name: 'Research Paper.pdf',
    type: 'pdf',
    size: '3.1 MB',
    sharedBy: 'Miguel Rodriguez',
    sharedOn: '2025-05-07T16:20:00Z'
  },
  {
    id: 'file-5',
    name: 'Assignment Instructions.pdf',
    type: 'pdf',
    size: '1.5 MB',
    sharedBy: 'David Chen',
    sharedOn: '2025-05-06T10:15:00Z'
  }
];

interface SharedResourcesProps {
  userId: string;
  onClose: () => void;
}

const SharedResources: React.FC<SharedResourcesProps> = ({ userId, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'name'>('newest');
  
  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'pptx':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'jpg':
      case 'png':
        return <FileImage className="h-5 w-5 text-green-500" />;
      case 'mp3':
      case 'wav':
        return <FileAudio className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Filter and sort resources
  const filteredResources = mockSharedResources
    .filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !fileTypeFilter || resource.type === fileTypeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.sharedOn).getTime() - new Date(a.sharedOn).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.sharedOn).getTime() - new Date(b.sharedOn).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Shared Resources</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-8" 
                placeholder="Search files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Select 
                  value={fileTypeFilter || ""} 
                  onValueChange={(value) => setFileTypeFilter(value || null)}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="File type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">Word</SelectItem>
                    <SelectItem value="pptx">PowerPoint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select 
                  value={sortOrder} 
                  onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest' | 'name')}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="name">File name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* File List */}
          {filteredResources.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
              <div className="space-y-2">
                {filteredResources.map(resource => (
                  <div 
                    key={resource.id} 
                    className="p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {getFileIcon(resource.type)}
                      </div>
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                          <span>{resource.size}</span>
                          <span>•</span>
                          <span>Shared {new Date(resource.sharedOn).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-8 text-center">
              <FileCog className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No files found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedResources;
