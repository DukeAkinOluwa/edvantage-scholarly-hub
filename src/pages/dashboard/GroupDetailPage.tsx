
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, BookOpen, Briefcase, Settings, MessageSquare, 
  Calendar, FileText, PlusCircle, Send, Paperclip,
  Download, ExternalLink, UserPlus, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Group, groups, events, resources, Task } from '@/data/dummyData';

// Mock messages
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
}

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-2',
    senderName: 'Jane Smith',
    senderAvatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Hey everyone! I created a study schedule for our upcoming test. Check it out!',
    timestamp: '2025-06-08T10:30:00',
    attachments: [
      {
        name: 'study_schedule.pdf',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'msg-2',
    senderId: 'user-3',
    senderName: 'Michael Johnson',
    senderAvatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Thanks Jane! This is really helpful. Should we meet in the library tomorrow to go through the material together?',
    timestamp: '2025-06-08T10:45:00'
  },
  {
    id: 'msg-3',
    senderId: 'user-1',
    senderName: 'John Doe',
    senderAvatar: 'https://i.pravatar.cc/150?img=1',
    content: "That's a great idea Michael. I'm available after 2 PM. How about we meet at the main library, 2nd floor?",
    timestamp: '2025-06-08T11:15:00'
  },
  {
    id: 'msg-4',
    senderId: 'user-2',
    senderName: 'Jane Smith',
    senderAvatar: 'https://i.pravatar.cc/150?img=2',
    content: "2 PM works for me too! I've also found some helpful resources on binary trees that we should go through.",
    timestamp: '2025-06-08T11:30:00',
    attachments: [
      {
        name: 'binary_trees_explained.pdf',
        type: 'pdf',
        url: '#'
      },
      {
        name: 'algorithm_visualization.mp4',
        type: 'video',
        url: '#'
      }
    ]
  }
];

// Mock tasks for the group
const mockGroupTasks: Task[] = [
  {
    id: 'grouptask-1',
    title: 'Review Chapter 5',
    description: 'Everyone should read and take notes on Chapter 5 for discussion.',
    dueDate: '2025-06-12T23:59:59',
    priority: 'high',
    status: 'in-progress',
    category: 'Reading',
    points: 50
  },
  {
    id: 'grouptask-2',
    title: 'Solve Practice Problems',
    description: 'Complete the practice problems 1-10 from the textbook.',
    dueDate: '2025-06-15T23:59:59',
    priority: 'medium',
    status: 'pending',
    category: 'Homework',
    points: 30
  },
  {
    id: 'grouptask-3',
    title: 'Prepare Study Guide',
    description: 'Collaborate on creating a comprehensive study guide for the exam.',
    dueDate: '2025-06-18T23:59:59',
    priority: 'high',
    status: 'pending',
    category: 'Exam Prep',
    points: 70
  }
];

const GroupDetailPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [groupTasks, setGroupTasks] = useState<Task[]>(mockGroupTasks);
  const { toast } = useToast();
  
  // Find the group by id
  const group = groups.find(g => g.id === groupId);
  
  if (!group) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Group not found</h2>
        <p className="text-muted-foreground mt-2">
          The group you're looking for doesn't exist or you don't have access to it.
        </p>
        <Button asChild className="mt-4">
          <Link to="/dashboard/groups">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Groups
          </Link>
        </Button>
      </div>
    );
  }
  
  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user-1',
      senderName: 'John Doe',
      senderAvatar: 'https://i.pravatar.cc/150?img=1',
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get group type icon
  const getGroupTypeIcon = () => {
    switch (group.type) {
      case 'study':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'class':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'project':
        return <Briefcase className="h-5 w-5 text-orange-500" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };
  
  // Filter group-specific resources
  const groupResources = resources.filter(r => r.category === group.name.split(' ')[0]);
  
  // Filter group-specific events
  const groupEvents = events.filter(e => e.type === 'group');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 md:mr-4" 
            asChild
          >
            <Link to="/dashboard/groups">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center">
              {getGroupTypeIcon()}
              <h1 className="text-2xl font-bold ml-2">{group.name}</h1>
            </div>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
          {group.members.find(m => m.id === 'user-1' && m.role === 'admin') && (
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex -mx-2 overflow-x-auto pb-2">
        <div className="flex px-2 space-x-2">
          {group.members.map(member => (
            <div key={member.id} className="flex flex-col items-center space-y-1">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.profilePic} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs font-medium">{member.name.split(' ')[0]}</div>
              {member.role === 'admin' && (
                <div className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                  Admin
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="chat">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === 'user-1' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.senderId === 'user-1' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-start space-x-2">
                        {message.senderId !== 'user-1' && (
                          <Avatar className="h-8 w-8 mt-0.5">
                            <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                            <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div className="flex items-center space-x-2">
                            {message.senderId !== 'user-1' && (
                              <span className="text-sm font-medium">{message.senderName}</span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                          <div 
                            className={`p-3 rounded-lg mt-1 ${
                              message.senderId === 'user-1' 
                                ? 'bg-edvantage-blue text-white' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div 
                                  key={index} 
                                  className={`p-2 rounded flex items-center space-x-2 ${
                                    message.senderId === 'user-1' 
                                      ? 'bg-edvantage-dark-blue text-white' 
                                      : 'bg-gray-100'
                                  }`}
                                >
                                  <div className="bg-white/20 p-1.5 rounded">
                                    {attachment.type === 'pdf' ? (
                                      <FileText className="h-4 w-4" />
                                    ) : attachment.type === 'video' ? (
                                      <BookOpen className="h-4 w-4" />
                                    ) : (
                                      <Paperclip className="h-4 w-4" />
                                    )}
                                  </div>
                                  <div className="flex-1 overflow-hidden">
                                    <p className="text-xs font-medium truncate">
                                      {attachment.name}
                                    </p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 rounded-full"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="min-h-10 flex-1 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Group Tasks</h2>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          
          {groupTasks.length > 0 ? (
            <div className="space-y-3">
              {groupTasks.map(task => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <div 
                            className={`h-3 w-3 rounded-full mr-2 ${
                              task.priority === 'high' 
                                ? 'bg-red-500' 
                                : task.priority === 'medium' 
                                  ? 'bg-yellow-500' 
                                  : 'bg-blue-500'
                            }`} 
                          />
                          <h3 className="font-medium">{task.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                          <span className="flex items-center text-muted-foreground">
                            Due: {new Date(task.dueDate).toLocaleDateString()} at {
                              new Date(task.dueDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            }
                          </span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            task.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : task.status === 'in-progress' 
                                ? 'bg-blue-100 text-blue-800' 
                                : task.status === 'overdue' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                          </span>
                          {task.category && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                              {task.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="font-medium">No tasks yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a task to start collaborating with your group.
                </p>
                <Button className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add First Task
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Group Events</h2>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
          
          {groupEvents.length > 0 ? (
            <div className="space-y-3">
              {groupEvents.map(event => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                          <span className="flex items-center text-muted-foreground">
                            Start: {new Date(event.startDate).toLocaleDateString()} at {
                              new Date(event.startDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            }
                          </span>
                          <span className="flex items-center text-muted-foreground">
                            End: {new Date(event.endDate).toLocaleDateString()} at {
                              new Date(event.endDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            }
                          </span>
                          {event.location && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="font-medium">No events yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create an event to schedule group activities.
                </p>
                <Button className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add First Event
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Group Resources</h2>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </div>
          
          {groupResources.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupResources.map(resource => (
                <Card key={resource.id}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>Uploaded by {resource.uploadedBy}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-8"
                        onClick={() => {
                          toast({
                            title: "Resource opened",
                            description: `Now viewing "${resource.title}"`,
                          });
                        }}
                      >
                        {resource.type === 'link' ? (
                          <>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Open Link
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="font-medium">No resources yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Share resources with your group to enhance collaboration.
                </p>
                <Button className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add First Resource
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupDetailPage;
