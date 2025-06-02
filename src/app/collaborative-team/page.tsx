'use client';

import { useState } from 'react';
import { CollaborationProvider } from '@/contexts/CollaborationContext';
import CollaborativeGenealogyTree from '@/components/CollaborativeGenealogyTree';
import RealTimeTeamChat from '@/components/RealTimeTeamChat';
import RealTimeActivityFeed from '@/components/RealTimeActivityFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  MessageSquare,
  Activity,
  Share2,
  Zap,
  Globe,
  Settings,
  Bell,
  Shield,
  Eye,
  UserCheck
} from 'lucide-react';

const CollaborativeTeamPage = () => {
  const [chatMinimized, setChatMinimized] = useState(false);
  const [activityMinimized, setActivityMinimized] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(true);

  const CollaborationStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Online Now</p>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Globe className="h-3 w-3 mr-1" />
                Real-time
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Chat</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <MessageSquare className="h-3 w-3 mr-1" />
                Messages
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Live Updates</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <Zap className="h-3 w-3 mr-1" />
                Recent
              </p>
            </div>
            <Activity className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collaboration</p>
              <p className="text-2xl font-bold">95%</p>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <Share2 className="h-3 w-3 mr-1" />
                Engagement
              </p>
            </div>
            <Share2 className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const OnlineUsersList = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Team Members Online
            <Badge className="ml-2 bg-green-500">3 active</Badge>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOnlineUsers(!showOnlineUsers)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showOnlineUsers ? 'Hide' : 'Show'}
          </Button>
        </div>
      </CardHeader>
      {showOnlineUsers && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Sarah Johnson',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
                role: 'Diamond Director',
                status: 'Viewing Tree',
                lastActivity: 'Active now'
              },
              {
                name: 'Mike Chen',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
                role: 'Gold Manager',
                status: 'In Chat',
                lastActivity: '2 min ago'
              },
              {
                name: 'You',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
                role: 'Team Leader',
                status: 'Collaborating',
                lastActivity: 'Active now'
              }
            ].map((user, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.role}</div>
                  <div className="text-xs text-blue-600">{user.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );

  const CollaborationFeatures = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Collaboration Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium">Live Cursors</div>
            <div className="text-sm text-gray-600">See where others are looking</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium">Real-time Chat</div>
            <div className="text-sm text-gray-600">Instant team communication</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">Live Updates</div>
            <div className="text-sm text-gray-600">See changes as they happen</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Share2 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="font-medium">Annotations</div>
            <div className="text-sm text-gray-600">Add notes and highlights</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CollaborationProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Share2 className="h-8 w-8 mr-3 text-blue-600" />
                Collaborative Team Management
              </h1>
              <p className="text-gray-600">Real-time collaboration, live updates, and team communication</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Live Session Active
              </Badge>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Collaboration Stats */}
          <CollaborationStats />

          {/* Online Users */}
          <OnlineUsersList />

          {/* Collaboration Features */}
          <CollaborationFeatures />

          {/* Main Content */}
          <Tabs defaultValue="tree" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tree" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Collaborative Tree
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Live Activity
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Team Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tree">
              <CollaborativeGenealogyTree />
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Activity Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Activity feed is integrated in the floating panel</p>
                    <p className="text-sm text-gray-500">Click the activity button in the bottom left to open</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Team Communication Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Team chat is integrated in the floating panel</p>
                    <p className="text-sm text-gray-500">Click the chat button in the bottom right to open</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Floating Chat and Activity Feed */}
          <RealTimeTeamChat
            isMinimized={chatMinimized}
            onToggleMinimize={() => setChatMinimized(!chatMinimized)}
          />
          <RealTimeActivityFeed
            isMinimized={activityMinimized}
            onToggleMinimize={() => setActivityMinimized(!activityMinimized)}
          />
        </div>
      </div>
    </CollaborationProvider>
  );
};

export default CollaborativeTeamPage;
