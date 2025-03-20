
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SharedResources from '@/components/chats/SharedResources';
import { 
  Search, 
  Send, 
  ArrowLeft, 
  Plus, 
  MoreVertical, 
  Image, 
  File, 
  ThumbsUp, 
  UserRound,
  PanelRight
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'system';
  reactionCount?: number;
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp: string;
  unread: number;
  online?: boolean;
  userId?: string;
  messages: Message[];
  typing?: boolean;
}

// Mock data for chats
const mockChats: Chat[] = [
  {
    id: 'chat-1',
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg',
    lastMessage: 'Can you share the notes from yesterday?',
    timestamp: '2025-05-14T09:32:00Z',
    unread: 2,
    online: true,
    userId: 'user-1',
    messages: [
      {
        id: 'msg-1',
        content: 'Hello, can you help me with the assignment?',
        senderId: 'user-1',
        senderName: 'Sarah Johnson',
        timestamp: '2025-05-14T09:30:00Z',
        status: 'read'
      },
      {
        id: 'msg-2',
        content: 'Sure, which part are you stuck on?',
        senderId: 'current-user',
        senderName: 'You',
        timestamp: '2025-05-14T09:31:00Z',
        status: 'read'
      },
      {
        id: 'msg-3',
        content: 'Can you share the notes from yesterday?',
        senderId: 'user-1',
        senderName: 'Sarah Johnson',
        timestamp: '2025-05-14T09:32:00Z',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'chat-2',
    name: 'David Chen',
    avatar: '/placeholder.svg',
    lastMessage: 'Are we meeting for the group project today?',
    timestamp: '2025-05-13T16:45:00Z',
    unread: 0,
    online: false,
    userId: 'user-2',
    messages: [
      {
        id: 'msg-4',
        content: 'Hey, did you finish your part of the presentation?',
        senderId: 'user-2',
        senderName: 'David Chen',
        timestamp: '2025-05-13T16:40:00Z',
        status: 'read'
      },
      {
        id: 'msg-5',
        content: 'Yes, I just uploaded it to the shared folder',
        senderId: 'current-user',
        senderName: 'You',
        timestamp: '2025-05-13T16:42:00Z',
        status: 'read'
      },
      {
        id: 'msg-6',
        content: 'Are we meeting for the group project today?',
        senderId: 'user-2',
        senderName: 'David Chen',
        timestamp: '2025-05-13T16:45:00Z',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-3',
    name: 'Team Physics Study Group',
    avatar: '/placeholder.svg',
    lastMessage: 'Miguel: I found a great resource for the lab',
    timestamp: '2025-05-12T14:20:00Z',
    unread: 5,
    userId: 'group-1',
    messages: [
      {
        id: 'msg-7',
        content: 'Has everyone reviewed the experiment requirements?',
        senderId: 'user-3',
        senderName: 'Ava Williams',
        timestamp: '2025-05-12T14:10:00Z',
        status: 'read'
      },
      {
        id: 'msg-8',
        content: 'Yes, I have questions about the procedure section',
        senderId: 'current-user',
        senderName: 'You',
        timestamp: '2025-05-12T14:15:00Z',
        status: 'read'
      },
      {
        id: 'msg-9',
        content: 'I found a great resource for the lab',
        senderId: 'user-4',
        senderName: 'Miguel Rodriguez',
        timestamp: '2025-05-12T14:20:00Z',
        status: 'delivered'
      }
    ]
  }
];

const ChatsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showSharedResources, setShowSharedResources] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Filter chats based on search query
  const filteredChats = mockChats.filter(
    chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: message,
      senderId: 'current-user',
      senderName: 'You',
      timestamp: new Date().toISOString(),
      status: 'sending'
    };
    
    // Update the selected chat with the new message
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: message,
      timestamp: new Date().toISOString()
    });
    
    setMessage('');
    
    // Simulate message being sent
    setTimeout(() => {
      toast({
        description: "Message sent",
      });
    }, 500);
  };
  
  // Format timestamps for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Handle user profile click to view shared resources
  const handleProfileClick = (userId: string) => {
    if (!userId) return;
    setShowSharedResources(true);
  };
  
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {isMobile ? (
        // Mobile layout
        <>
          {selectedChat ? (
            // Chat conversation view when chat is selected
            <div className="flex flex-col h-full">
              {/* Mobile chat header */}
              <div className="flex items-center p-3 border-b">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedChat(null)}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-9 w-9 mr-2">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{selectedChat.name}</h3>
                  {selectedChat.online && (
                    <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                  )}
                </div>
                <div className="flex items-center">
                  {selectedChat.userId && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleProfileClick(selectedChat.userId || '')}
                    >
                      <UserRound className="h-5 w-5" />
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Block user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Mobile chat messages */}
              <div className="flex-1 overflow-auto p-3 space-y-4">
                {selectedChat.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] p-3 rounded-lg ${
                        msg.senderId === 'current-user' 
                          ? 'bg-edvantage-blue text-white rounded-br-none' 
                          : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className={`text-xs mt-1 flex items-center ${
                        msg.senderId === 'current-user' 
                          ? 'text-blue-100' 
                          : 'text-gray-500'
                      }`}>
                        {formatTimestamp(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile message input */}
              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={!message.trim()}
                    onClick={handleSendMessage}
                  >
                    <Send 
                      className={`h-5 w-5 ${message.trim() ? 'text-edvantage-blue' : 'text-gray-400'}`} 
                    />
                  </Button>
                </div>
              </div>
            </div>
          ) : showSharedResources ? (
            // Shared resources view
            <SharedResources 
              userId="user-1" 
              onClose={() => setShowSharedResources(false)} 
            />
          ) : (
            // Chat list view when no chat is selected
            <div className="flex flex-col h-full">
              <div className="p-3 border-b">
                <h1 className="text-xl font-bold mb-3">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                {filteredChats.map((chat) => (
                  <div 
                    key={chat.id}
                    className="flex items-center p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <span className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(chat.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="ml-2 bg-edvantage-blue text-white text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredChats.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No conversations found</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Conversation
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        // Desktop layout
        <div className="grid grid-cols-3 h-full border rounded-lg overflow-hidden">
          {/* Chat list sidebar */}
          <div className="col-span-1 border-r overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id}
                  className={`flex items-center p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                    selectedChat?.id === chat.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(chat.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 bg-edvantage-blue text-white text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
              
              {filteredChats.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
          </div>
          
          {/* Chat conversation area */}
          <div className={`col-span-2 flex flex-col ${showSharedResources ? 'hidden md:flex' : ''}`}>
            {selectedChat ? (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedChat.name}</h3>
                      {selectedChat.online && (
                        <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedChat.userId && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleProfileClick(selectedChat.userId || '')}
                      >
                        <UserRound className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    )}
                    {selectedChat.userId && (
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setShowSharedResources(!showSharedResources)}
                      >
                        <PanelRight className="h-4 w-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                        <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          Block user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {selectedChat.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.senderId !== 'current-user' && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.senderId === 'current-user' 
                            ? 'bg-edvantage-blue text-white rounded-br-none' 
                            : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                        }`}
                      >
                        {msg.senderId !== 'current-user' && msg.type !== 'system' && (
                          <p className="text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                            {msg.senderName}
                          </p>
                        )}
                        <p>{msg.content}</p>
                        <div className={`text-xs mt-1 flex items-center justify-end ${
                          msg.senderId === 'current-user' 
                            ? 'text-blue-100' 
                            : 'text-gray-500'
                        }`}>
                          {formatTimestamp(msg.timestamp)}
                          {msg.senderId === 'current-user' && msg.status && (
                            <span className="ml-1">
                              {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                      {msg.senderId === 'current-user' && (
                        <Avatar className="h-8 w-8 ml-2 mt-1">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {selectedChat.typing && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Plus className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Image className="h-4 w-4 mr-2" />
                          Send Image
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <File className="h-4 w-4 mr-2" />
                          Send File
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
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
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send 
                        className={`h-5 w-5 ${message.trim() ? 'text-edvantage-blue' : 'text-gray-400'}`} 
                      />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="text-center max-w-md">
                  <h3 className="text-2xl font-bold mb-2">Select a Conversation</h3>
                  <p className="text-muted-foreground mb-6">
                    Choose a conversation from the list to start chatting or create a new one.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Shared resources panel (desktop only) */}
          {showSharedResources && selectedChat && (
            <div className="md:col-span-2 lg:col-span-1 border-l h-full">
              <SharedResources 
                userId={selectedChat.userId || ''} 
                onClose={() => setShowSharedResources(false)} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
