
import React, { useState } from 'react';
import { 
  Search, Plus, Download, ExternalLink, 
  FileText, Film, Link as LinkIcon, Notebook, Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
import { resources, Resource, ResourceType } from '@/data/dummyData';

const ResourcesPage = () => {
  const [resourcesList, setResourcesList] = useState<Resource[]>(resources);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingResource, setIsAddingResource] = useState(false);
  const { toast } = useToast();
  
  // New resource form state
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'pdf' as ResourceType,
    url: '',
    category: '',
  });
  
  // Filter resources based on search query
  const filteredResources = resourcesList.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get resources by type
  const pdfResources = filteredResources.filter(resource => resource.type === 'pdf');
  const videoResources = filteredResources.filter(resource => resource.type === 'video');
  const linkResources = filteredResources.filter(resource => resource.type === 'link');
  const noteResources = filteredResources.filter(resource => resource.type === 'note');
  
  // Handle new resource form change
  const handleNewResourceChange = (field: string, value: string) => {
    setNewResource({
      ...newResource,
      [field]: value,
    });
  };
  
  // Add new resource
  const addResource = () => {
    const newResourceItem: Resource = {
      id: `resource-${Date.now()}`,
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      url: newResource.url,
      uploadedBy: 'John Doe',
      uploadedAt: new Date().toISOString(),
      category: newResource.category,
      likes: 0,
      downloads: 0,
    };
    
    setResourcesList(prev => [...prev, newResourceItem]);
    
    toast({
      title: "Resource added",
      description: `"${newResource.title}" has been added to your resources.`,
    });
    
    setNewResource({
      title: '',
      description: '',
      type: 'pdf',
      url: '',
      category: '',
    });
    
    setIsAddingResource(false);
  };
  
  // Download or open resource
  const accessResource = (resource: Resource) => {
    if (resource.type === 'link') {
      toast({
        title: "Opening link",
        description: `Opening "${resource.title}" in a new tab.`,
      });
      window.open(resource.url, '_blank');
    } else {
      toast({
        title: "Downloading resource",
        description: `Downloading "${resource.title}".`,
      });
      
      // Increment downloads count
      setResourcesList(prev => 
        prev.map(r => 
          r.id === resource.id 
            ? { ...r, downloads: r.downloads + 1 } 
            : r
        )
      );
    }
  };
  
  // Like resource
  const likeResource = (resource: Resource) => {
    setResourcesList(prev => 
      prev.map(r => 
        r.id === resource.id 
          ? { ...r, likes: r.likes + 1 } 
          : r
      )
    );
    
    toast({
      title: "Resource liked",
      description: `You liked "${resource.title}".`,
    });
  };
  
  // Get resource icon based on type
  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Film className="h-5 w-5 text-blue-500" />;
      case 'link':
        return <LinkIcon className="h-5 w-5 text-green-500" />;
      case 'note':
        return <Notebook className="h-5 w-5 text-amber-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Resource card component
  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start">
          <div className="p-2 rounded-md bg-muted mr-3">
            {getResourceIcon(resource.type)}
          </div>
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <div className="text-xs text-muted-foreground mt-1">
              Uploaded by {resource.uploadedBy} on {formatDate(resource.uploadedAt)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {resource.description}
        </p>
        {resource.category && (
          <div className="mt-3">
            <span className="px-2 py-1 rounded-full text-xs bg-muted">
              {resource.category}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={() => likeResource(resource)}
          >
            👍 {resource.likes}
          </Button>
          <div className="flex items-center">
            <Download className="h-3.5 w-3.5 mr-1" />
            {resource.downloads}
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => accessResource(resource)}
        >
          {resource.type === 'link' ? (
            <>
              <ExternalLink className="h-4 w-4 mr-1" />
              Open
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-1" />
              Download
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
  
  // Empty state component
  const EmptyState = ({ type, onAddClick }: { type: string, onAddClick: () => void }) => (
    <div className="text-center py-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
        {type === 'All' ? (
          <FileText className="h-6 w-6 text-muted-foreground" />
        ) : type === 'PDFs' ? (
          <FileText className="h-6 w-6 text-red-500" />
        ) : type === 'Videos' ? (
          <Film className="h-6 w-6 text-blue-500" />
        ) : type === 'Links' ? (
          <LinkIcon className="h-6 w-6 text-green-500" />
        ) : (
          <Notebook className="h-6 w-6 text-amber-500" />
        )}
      </div>
      <h3 className="text-lg font-medium">No {type} Resources</h3>
      <p className="text-sm text-muted-foreground mt-2 mb-4">
        {searchQuery 
          ? `No ${type.toLowerCase()} resources match your search criteria.` 
          : `You don't have any ${type.toLowerCase()} resources yet.`
        }
      </p>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        Add a Resource
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Resource Library</h1>
        <div className="flex flex-wrap gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search resources..." 
              className="pl-8 w-full md:w-64" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddingResource(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="pdfs">PDFs</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <EmptyState type="All" onAddClick={() => setIsAddingResource(true)} />
          )}
        </TabsContent>
        
        <TabsContent value="pdfs" className="mt-6">
          {pdfResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pdfResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <EmptyState type="PDFs" onAddClick={() => {
              setNewResource({...newResource, type: 'pdf'});
              setIsAddingResource(true);
            }} />
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          {videoResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videoResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <EmptyState type="Videos" onAddClick={() => {
              setNewResource({...newResource, type: 'video'});
              setIsAddingResource(true);
            }} />
          )}
        </TabsContent>
        
        <TabsContent value="links" className="mt-6">
          {linkResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {linkResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <EmptyState type="Links" onAddClick={() => {
              setNewResource({...newResource, type: 'link'});
              setIsAddingResource(true);
            }} />
          )}
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          {noteResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {noteResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <EmptyState type="Notes" onAddClick={() => {
              setNewResource({...newResource, type: 'note'});
              setIsAddingResource(true);
            }} />
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Resource Dialog */}
      <Dialog open={isAddingResource} onOpenChange={setIsAddingResource}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>
              Add a resource to your library.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resource-title">Resource Title</Label>
              <Input 
                id="resource-title" 
                value={newResource.title} 
                onChange={(e) => handleNewResourceChange('title', e.target.value)}
                placeholder="E.g., Data Structures Cheat Sheet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-description">Description</Label>
              <Textarea 
                id="resource-description" 
                value={newResource.description} 
                onChange={(e) => handleNewResourceChange('description', e.target.value)}
                placeholder="Briefly describe this resource"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resource-type">Resource Type</Label>
                <Select 
                  value={newResource.type}
                  onValueChange={(value) => handleNewResourceChange('type', value as ResourceType)}
                >
                  <SelectTrigger id="resource-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource-category">Category</Label>
                <Input 
                  id="resource-category" 
                  value={newResource.category} 
                  onChange={(e) => handleNewResourceChange('category', e.target.value)}
                  placeholder="E.g., Math, Computer Science"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-url">
                {newResource.type === 'link' ? 'URL' : 'File URL/Path'}
              </Label>
              <Input 
                id="resource-url" 
                value={newResource.url} 
                onChange={(e) => handleNewResourceChange('url', e.target.value)}
                placeholder={newResource.type === 'link' ? 'https://example.com/resource' : 'Upload or enter URL'}
              />
              {newResource.type !== 'link' && (
                <div className="flex justify-center mt-2">
                  <Button variant="outline" type="button" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    {`Upload ${newResource.type.toUpperCase()} File`}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingResource(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-edvantage-blue hover:bg-edvantage-dark-blue" 
              onClick={addResource}
              disabled={!newResource.title || !newResource.url}
            >
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourcesPage;
