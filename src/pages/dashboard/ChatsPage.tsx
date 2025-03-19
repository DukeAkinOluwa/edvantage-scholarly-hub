
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Send, Users, User, Plus, Phone, Video, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

interface Group {
  id: string;
  name: string;
  avatar: string;
  members: { id: string; name: string; avatar: string }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participantId: 'user-2',
    participantName: 'Sarah Johnson',
    participantAvatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Did you complete the assignment?',
    lastMessageTime: '10:45 AM',
    unreadCount: 2,
    messages: [
      {
        id: 'msg-1',
        content: 'Hey, how are you doing?',
        senderId: 'user-2',
        timestamp: '2025-05-10T10:30:00Z',
        isRead: true
      },
      {
        id: 'msg-2',
        content: 'I\'m good, thanks! Working on the project.',
        senderId: 'user-123',
        timestamp: '2025-05-10T10:35:00Z',
        isRead: true
      },
      {
        id: 'msg-3',
        content: 'Did you complete the assignment?',
        senderId: 'user-2',
        timestamp: '2025-05-10T10:45:00Z',
        isRead: false
      }
    ]
  },
  {
    id: 'chat-2',
    participantId: 'user-4',
    participantName: 'David Chen',
    participantAvatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Let\'s meet at the library tomorrow',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-1',
        content: 'Hi David, are you free tomorrow?',
        senderId: 'user-123',
        timestamp: '2025-05-09T14:20:00Z',
        isRead: true
      },
      {
        id: 'msg-2',
        content: 'Yes, I am. What\'s up?',
        senderId: 'user-4',
        timestamp: '2025-05-09T14:25:00Z',
        isRead: true
      },
      {
        id: 'msg-3',
        content: 'Let\'s meet at the library tomorrow',
        senderId: 'user-123',
        timestamp: '2025-05-09T14:30:00Z',
        isRead: true
      }
    ]
  }
];

const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Advanced ML Study Group',
    avatar: '',
    members: [
      { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-3', name: 'Miguel Rodriguez', avatar: 'https://i.pravatar.cc/150?img=12' }
    ],
    lastMessage: 'Let\'s review the gradient descent algorithm',
    lastMessageTime: '3:20 PM',
    unreadCount: 5
  },
  {
    id: 'group-2',
    name: 'Quantum Computing Group',
    avatar: '',
    members: [
      { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-6', name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/150?img=9' }
    ],
    lastMessage: 'Meeting scheduled for Friday',
    lastMessageTime: 'Tuesday',
    unreadCount: 0
  }
];

const ChatsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [activeTab, setActiveTab] = useState('direct');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: message,
      senderId: user?.id || '',
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    if (activeChat) {
      const updatedChats = chats.map(chat => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            lastMessage: message,
            lastMessageTime: 'Just now',
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      });
      
      setChats(updatedChats);
      setActiveChat(prev => prev ? {
        ...prev,
        lastMessage: message,
        lastMessageTime: 'Just now',
        messages: [...prev.messages, newMessage]
      } : null);
    }
    
    setMessage('');
  };

  const startChatWithGroupMember = (groupId: string, memberId: string) => {
    // Find the group
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    // Find the member
    const member = group.members.find(m => m.id === memberId);
    if (!member) return;
    
    // Check if chat already exists
    const existingChat = chats.find(chat => chat.participantId === memberId);
    
    if (existingChat) {
      setActiveChat(existingChat);
      setActiveGroup(null);
      setActiveTab('direct');
    } else {
      // Create new chat
      const newChat: Chat = {
        id: `chat-${Date.now()}`,
        participantId: memberId,
        participantName: member.name,
        participantAvatar: member.avatar,
        lastMessage: '',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: []
      };
      
      setChats([newChat, ...chats]);
      setActiveChat(newChat);
      setActiveGroup(null);
      setActiveTab('direct');
      
      toast({
        title: "New chat created",
        description: `You started a conversation with ${member.name}`
      });
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
        {/* Chat List Sidebar */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col h-full">
          <CardHeader className="pb-3">
            <CardTitle>Messages</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-8" 
                placeholder="Search chats..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 mx-4">
              <TabsTrigger value="direct" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Direct</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Groups</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="direct" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-3">
                {filteredChats.length > 0 ? (
                  <div className="space-y-2">
                    {filteredChats.map(chat => (
                      <div 
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${activeChat?.id === chat.id ? 'bg-muted' : ''}`}
                        onClick={() => { setActiveChat(chat); setActiveGroup(null); }}
                      >
                        <Avatar>
                          <AvatarImage src={chat.participantAvatar} />
                          <AvatarFallback>{chat.participantName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">{chat.participantName}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                            {chat.unreadCount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <User className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-1">No conversations yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Start a new conversation with another user</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Chat
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="groups" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-3">
                {filteredGroups.length > 0 ? (
                  <div className="space-y-2">
                    {filteredGroups.map(group => (
                      <div 
                        key={group.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${activeGroup?.id === group.id ? 'bg-muted' : ''}`}
                        onClick={() => { setActiveGroup(group); setActiveChat(null); }}
                      >
                        <Avatar>
                          {group.avatar ? (
                            <AvatarImage src={group.avatar} />
                          ) : (
                            <AvatarFallback className="bg-blue-500">
                              <Users className="h-4 w-4 text-white" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">{group.name}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{group.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                        </div>
                        {group.unreadCount > 0 && (
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                            {group.unreadCount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-1">No groups yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Join or create a study group</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Group
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Chat Area */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col h-full">
          {(activeChat || activeGroup) ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {activeChat ? (
                      <>
                        <AvatarImage src={activeChat.participantAvatar} />
                        <AvatarFallback>{activeChat.participantName.charAt(0)}</AvatarFallback>
                      </>
                    ) : activeGroup ? (
                      <>
                        {activeGroup.avatar ? (
                          <AvatarImage src={activeGroup.avatar} />
                        ) : (
                          <AvatarFallback className="bg-blue-500">
                            <Users className="h-4 w-4 text-white" />
                          </AvatarFallback>
                        )}
                      </>
                    ) : null}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {activeChat ? activeChat.participantName : activeGroup?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {activeChat ? 'Online' : activeGroup ? `${activeGroup.members.length} members` : ''}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                {activeChat ? (
                  <div className="space-y-4">
                    {activeChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.senderId === user?.id
                              ? 'bg-blue-500 text-white rounded-br-none'
                              : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderId === user?.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activeGroup ? (
                  <div>
                    <div className="mb-6 text-center">
                      <h4 className="text-lg font-medium mb-2">{activeGroup.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">Group created for collaborative study</p>
                      
                      <div className="flex justify-center mb-4">
                        <div className="flex -space-x-2">
                          {activeGroup.members.slice(0, 5).map(member => (
                            <Avatar key={member.id} className="border-2 border-background">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {activeGroup.members.length > 5 && (
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border-2 border-background">
                              <span className="text-xs font-medium">+{activeGroup.members.length - 5}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center mb-8">
                        <h5 className="font-medium mb-2">Group Members</h5>
                        <div className="flex flex-wrap justify-center gap-2">
                          {activeGroup.members.map(member => (
                            <Button
                              key={member.id}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              onClick={() => startChatWithGroupMember(activeGroup.id, member.id)}
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <p className="text-sm text-muted-foreground">Group messages coming soon!</p>
                    </div>
                  </div>
                ) : null}
              </ScrollArea>
              
              {/* Message Input */}
              {activeChat && (
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} className="flex-shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="max-w-md text-center p-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-medium mb-2">Your Messages</h2>
                <p className="text-muted-foreground mb-6">
                  Select a conversation from the sidebar or start a new one
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Conversation
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatsPage;
