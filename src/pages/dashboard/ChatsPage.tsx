
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  MessageSquare,
  Plus,
  MoreVertical,
  Send,
  Paperclip,
  Image,
  Smile,
  ChevronLeft,
  Phone,
  Video,
  Info,
  ArrowUpFromLine,
  PenSquare
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type ChatType = 'direct' | 'group';

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

interface Chat {
  id: string;
  type: ChatType;
  participants: ChatParticipant[];
  lastMessage?: {
    text: string;
    timestamp: string;
    senderId: string;
    unread: boolean;
  };
  messages: ChatMessage[];
  name?: string; // For group chats
  description?: string; // For group chats
}

// Mock user (current user)
const currentUser: ChatParticipant = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
  status: 'online'
};

// Mock chat data
const mockChats: Chat[] = [
  {
    id: 'chat-1',
    type: 'direct',
    participants: [
      currentUser,
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5',
        status: 'online'
      }
    ],
    lastMessage: {
      text: 'Did you finish the assignment?',
      timestamp: '2025-06-15T14:30:00Z',
      senderId: 'user-2',
      unread: true
    },
    messages: [
      {
        id: 'msg-1-1',
        senderId: 'user-1',
        text: 'Hey Sarah, how are you doing with the project?',
        timestamp: '2025-06-15T14:20:00Z',
        status: 'read'
      },
      {
        id: 'msg-1-2',
        senderId: 'user-2',
        text: 'I\'m making good progress! Just working on the final part.',
        timestamp: '2025-06-15T14:25:00Z',
        status: 'read'
      },
      {
        id: 'msg-1-3',
        senderId: 'user-2',
        text: 'Did you finish the assignment?',
        timestamp: '2025-06-15T14:30:00Z',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'chat-2',
    type: 'direct',
    participants: [
      currentUser,
      {
        id: 'user-3',
        name: 'Miguel Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=12',
        status: 'offline',
        lastSeen: '2025-06-15T10:45:00Z'
      }
    ],
    lastMessage: {
      text: 'Let\'s meet tomorrow to discuss the research.',
      timestamp: '2025-06-14T18:15:00Z',
      senderId: 'user-1',
      unread: false
    },
    messages: [
      {
        id: 'msg-2-1',
        senderId: 'user-3',
        text: 'Hi John, I found some interesting research papers for our project.',
        timestamp: '2025-06-14T17:50:00Z',
        status: 'read'
      },
      {
        id: 'msg-2-2',
        senderId: 'user-1',
        text: 'That\'s great! Can you share them with me?',
        timestamp: '2025-06-14T18:00:00Z',
        status: 'read'
      },
      {
        id: 'msg-2-3',
        senderId: 'user-1',
        text: 'Let\'s meet tomorrow to discuss the research.',
        timestamp: '2025-06-14T18:15:00Z',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-3',
    type: 'group',
    name: 'ML Research Team',
    description: 'Group for discussing machine learning research and projects',
    participants: [
      currentUser,
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5',
        status: 'online'
      },
      {
        id: 'user-3',
        name: 'Miguel Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=12',
        status: 'offline'
      },
      {
        id: 'user-4',
        name: 'Lisa Chen',
        avatar: 'https://i.pravatar.cc/150?img=9',
        status: 'away'
      }
    ],
    lastMessage: {
      text: 'I\'ll send the revised proposal tomorrow.',
      timestamp: '2025-06-15T12:10:00Z',
      senderId: 'user-4',
      unread: true
    },
    messages: [
      {
        id: 'msg-3-1',
        senderId: 'user-2',
        text: 'Has everyone reviewed the proposal?',
        timestamp: '2025-06-15T11:50:00Z',
        status: 'read'
      },
      {
        id: 'msg-3-2',
        senderId: 'user-3',
        text: 'Yes, I have a few suggestions for section 3.',
        timestamp: '2025-06-15T12:00:00Z',
        status: 'read'
      },
      {
        id: 'msg-3-3',
        senderId: 'user-4',
        text: 'I\'ll send the revised proposal tomorrow.',
        timestamp: '2025-06-15T12:10:00Z',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'chat-4',
    type: 'group',
    name: 'Capstone Project Group',
    description: 'Official group for our final year project',
    participants: [
      currentUser,
      {
        id: 'user-5',
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        status: 'online'
      },
      {
        id: 'user-6',
        name: 'Emily Taylor',
        avatar: 'https://i.pravatar.cc/150?img=7',
        status: 'offline'
      }
    ],
    lastMessage: {
      text: 'Meeting at 3PM tomorrow in Room 302',
      timestamp: '2025-06-14T16:20:00Z',
      senderId: 'user-5',
      unread: false
    },
    messages: [
      {
        id: 'msg-4-1',
        senderId: 'user-1',
        text: 'When are we meeting next?',
        timestamp: '2025-06-14T15:40:00Z',
        status: 'read'
      },
      {
        id: 'msg-4-2',
        senderId: 'user-6',
        text: 'I\'m free tomorrow afternoon.',
        timestamp: '2025-06-14T16:00:00Z',
        status: 'read'
      },
      {
        id: 'msg-4-3',
        senderId: 'user-5',
        text: 'Meeting at 3PM tomorrow in Room 302',
        timestamp: '2025-06-14T16:20:00Z',
        status: 'read'
      }
    ]
  }
];

const ChatsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeTab, setActiveTab] = useState<'all' | 'direct' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Filter chats based on search query and active tab
  const filteredChats = chats.filter(chat => {
    // Filter by search query
    const isMatch = chat.type === 'group' 
      ? chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
      : chat.participants.find(p => p.id !== currentUser.id)?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'direct' && chat.type === 'direct') ||
      (activeTab === 'groups' && chat.type === 'group');
    
    return isMatch && matchesTab;
  });
  
  // Get chat recipient or group name
  const getChatName = (chat: Chat): string => {
    if (chat.type === 'group') return chat.name || 'Group';
    
    const recipient = chat.participants.find(p => p.id !== currentUser.id);
    return recipient ? recipient.name : 'Unknown';
  };
  
  // Get chat avatar
  const getChatAvatar = (chat: Chat): string => {
    if (chat.type === 'group') return ''; // Could return a group avatar if available
    
    const recipient = chat.participants.find(p => p.id !== currentUser.id);
    return recipient ? recipient.avatar : '';
  };
  
  // Format timestamp
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return format(date, 'h:mm a');
    } else {
      return format(date, 'MMM d');
    }
  };
  
  // Send message handler
  const handleSendMessage = () => {
    if (!activeChat || !newMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    // Update the active chat with the new message
    const updatedActiveChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
      lastMessage: {
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
        senderId: currentUser.id,
        unread: false
      }
    };
    
    // Update the chats array
    const updatedChats = chats.map(chat => 
      chat.id === activeChat.id ? updatedActiveChat : chat
    );
    
    setChats(updatedChats);
    setActiveChat(updatedActiveChat);
    setNewMessage('');
  };
  
  // Create a new direct chat
  const createNewChat = (userId: string, userName: string, userAvatar: string) => {
    // Check if chat already exists
    const existingChat = chats.find(chat => 
      chat.type === 'direct' && 
      chat.participants.some(p => p.id === userId)
    );
    
    if (existingChat) {
      setActiveChat(existingChat);
      return;
    }
    
    // Create new chat
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      type: 'direct',
      participants: [
        currentUser,
        {
          id: userId,
          name: userName,
          avatar: userAvatar,
          status: 'offline'
        }
      ],
      messages: []
    };
    
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat);
    
    toast({
      title: "New chat created",
      description: `Chat with ${userName} has been created.`
    });
  };
  
  // Close active chat
  const closeActiveChat = () => {
    setActiveChat(null);
  };

  // Navigate to chat from group
  const navigateToGroupMemberChat = (memberId: string) => {
    if (memberId === currentUser.id) return;
    
    const member = activeChat?.participants.find(p => p.id === memberId);
    if (!member) return;
    
    // Find existing chat or create new one
    const existingChat = chats.find(chat => 
      chat.type === 'direct' && 
      chat.participants.some(p => p.id === memberId)
    );
    
    if (existingChat) {
      setActiveChat(existingChat);
    } else {
      createNewChat(memberId, member.name, member.avatar);
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="flex flex-col flex-1 overflow-hidden border rounded-md bg-background shadow-sm">
        <div className="flex h-full">
          {/* Chat list sidebar */}
          <div className={`border-r w-full md:w-80 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search chats..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No chats found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery ? 'Try a different search term' : 'Start a new conversation'}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>New Message</DialogTitle>
                        <DialogDescription>
                          Start a conversation with a classmate or create a group.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <h3 className="font-medium mb-2">Suggested Contacts</h3>
                        <div className="space-y-2">
                          {[
                            { id: 'user-7', name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=8' },
                            { id: 'user-8', name: 'Rachel Green', avatar: 'https://i.pravatar.cc/150?img=10' },
                            { id: 'user-9', name: 'Michael Scott', avatar: 'https://i.pravatar.cc/150?img=11' }
                          ].map(user => (
                            <div 
                              key={user.id}
                              className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                              onClick={() => {
                                createNewChat(user.id, user.name, user.avatar);
                              }}
                            >
                              <Avatar className="h-9 w-9 mr-3">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium">{user.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Create Group
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <ul className="divide-y">
                  {filteredChats.map(chat => (
                    <li 
                      key={chat.id}
                      className={`hover:bg-muted cursor-pointer ${activeChat?.id === chat.id ? 'bg-muted' : ''}`}
                      onClick={() => setActiveChat(chat)}
                    >
                      <div className="flex items-start p-3 relative">
                        {chat.type === 'direct' ? (
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={getChatAvatar(chat)} alt={getChatName(chat)} />
                            <AvatarFallback>{getChatName(chat).charAt(0)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="relative h-10 w-10 mr-3 bg-edvantage-blue rounded-md flex items-center justify-center text-white">
                            <Users className="h-5 w-5" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between">
                            <h3 className="font-medium truncate">{getChatName(chat)}</h3>
                            {chat.lastMessage && (
                              <p className="text-xs text-muted-foreground flex-shrink-0">
                                {formatTime(chat.lastMessage.timestamp)}
                              </p>
                            )}
                          </div>
                          
                          {chat.lastMessage ? (
                            <p className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage.senderId === currentUser.id ? (
                                <span className="text-muted-foreground">You: </span>
                              ) : (
                                chat.type === 'group' && (
                                  <span className="text-muted-foreground">
                                    {chat.participants.find(p => p.id === chat.lastMessage?.senderId)?.name.split(' ')[0]}: 
                                  </span>
                                )
                              )}
                              {chat.lastMessage.text}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">No messages yet</p>
                          )}
                        </div>
                        
                        {chat.lastMessage?.unread && chat.lastMessage.senderId !== currentUser.id && (
                          <Badge className="absolute top-3 right-3 h-2 w-2 p-0 bg-edvantage-blue rounded-full" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="p-3 border-t">
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
          
          {/* Chat content area */}
          <div className={`flex-1 flex flex-col ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
            {activeChat ? (
              <>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 mr-2 md:hidden"
                      onClick={closeActiveChat}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    {activeChat.type === 'direct' ? (
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src={getChatAvatar(activeChat)} alt={getChatName(activeChat)} />
                        <AvatarFallback>{getChatName(activeChat).charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="relative h-9 w-9 mr-3 bg-edvantage-blue rounded-md flex items-center justify-center text-white">
                        <Users className="h-5 w-5" />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium leading-none">{getChatName(activeChat)}</h3>
                      {activeChat.type === 'direct' && (
                        <p className="text-xs text-muted-foreground">
                          {activeChat.participants.find(p => p.id !== currentUser.id)?.status === 'online' ? 
                            'Online' : 'Offline'}
                        </p>
                      )}
                      {activeChat.type === 'group' && (
                        <p className="text-xs text-muted-foreground">
                          {activeChat.participants.length} members
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex">
                    {activeChat.type === 'direct' && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Video className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Info className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Chat options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {activeChat.type === 'group' && (
                          <>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              <span>View Members</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PenSquare className="h-4 w-4 mr-2" />
                              <span>Edit Group</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem>
                          <ArrowUpFromLine className="h-4 w-4 mr-2" />
                          <span>Search in Chat</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <span>Delete Chat</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeChat.messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="font-medium">No messages yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Send a message to start the conversation
                      </p>
                    </div>
                  ) : (
                    activeChat.messages.map(message => {
                      const isCurrentUser = message.senderId === currentUser.id;
                      const sender = activeChat.participants.find(p => p.id === message.senderId);
                      
                      return (
                        <div 
                          key={message.id} 
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex items-start gap-2 max-w-[80%]">
                            {!isCurrentUser && activeChat.type === 'group' && (
                              <div 
                                className="flex-shrink-0 cursor-pointer"
                                onClick={() => navigateToGroupMemberChat(message.senderId)}
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={sender?.avatar} alt={sender?.name} />
                                  <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                            )}
                            
                            <div>
                              {!isCurrentUser && activeChat.type === 'group' && (
                                <p 
                                  className="text-xs font-medium mb-1 hover:underline cursor-pointer"
                                  onClick={() => navigateToGroupMemberChat(message.senderId)}
                                >
                                  {sender?.name}
                                </p>
                              )}
                              
                              <div className={`rounded-2xl px-4 py-2 ${
                                isCurrentUser 
                                  ? 'bg-edvantage-blue text-white'
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatTime(message.timestamp)}
                                {isCurrentUser && (
                                  <span className="ml-1">
                                    {message.status === 'read' ? '✓✓' : '✓'}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
                      <Image className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <div className="relative flex-1">
                      <Input 
                        placeholder="Type a message..." 
                        className="pr-10"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 absolute right-0 top-0"
                      >
                        <Smile className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>
                    <Button 
                      className="h-9 w-9 rounded-full flex-shrink-0"
                      disabled={!newMessage.trim()}
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold mb-2">Your Messages</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Select a chat from the sidebar or start a new conversation to begin messaging
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>New Message</DialogTitle>
                      <DialogDescription>
                        Start a conversation with a classmate or create a group.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <h3 className="font-medium mb-2">Suggested Contacts</h3>
                      <div className="space-y-2">
                        {[
                          { id: 'user-7', name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=8' },
                          { id: 'user-8', name: 'Rachel Green', avatar: 'https://i.pravatar.cc/150?img=10' },
                          { id: 'user-9', name: 'Michael Scott', avatar: 'https://i.pravatar.cc/150?img=11' }
                        ].map(user => (
                          <div 
                            key={user.id}
                            className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => {
                              createNewChat(user.id, user.name, user.avatar);
                            }}
                          >
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{user.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Create Group
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
