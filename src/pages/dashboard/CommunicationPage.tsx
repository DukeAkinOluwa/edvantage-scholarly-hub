
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ChatsPage from './ChatsPage';
import GroupsPage from './GroupsPage';
import { MessageCircle, Users } from 'lucide-react';

const CommunicationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="chats" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Communication</h1>
          <TabsList>
            <TabsTrigger value="chats" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chats</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Study Groups</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chats" className="m-0">
          <ChatsPage />
        </TabsContent>
        
        <TabsContent value="groups" className="m-0">
          <GroupsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationPage;
