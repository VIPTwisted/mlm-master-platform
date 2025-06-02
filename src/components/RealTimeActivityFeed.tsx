'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCollaboration } from '@/contexts/CollaborationContext';
import {
  Activity,
  UserPlus,
  TrendingUp,
  Award,
  DollarSign,
  Users,
  Eye,
  MessageSquare,
  Target,
  Zap,
  Bell,
  X,
  Minimize2,
  Filter
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'member_update' | 'rank_change' | 'volume_update' | 'new_member' | 'status_change' | 'user_action' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  nodeId?: string;
  data?: any;
  priority: 'low' | 'medium' | 'high';
}

interface RealTimeActivityFeedProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  className?: string;
}

const RealTimeActivityFeed = ({ isMinimized = false, onToggleMinimize, className = '' }: RealTimeActivityFeedProps) => {
  const { treeUpdates, activeUsers, currentUser } = useCollaboration();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showNotifications, setShowNotifications] = useState(true);

  useEffect(() => {
    // Convert tree updates to activity items
    const newActivities = treeUpdates.map(update => {
      const activity: ActivityItem = {
        id: update.id,
        type: update.type,
        title: getActivityTitle(update),
        description: getActivityDescription(update),
        timestamp: update.timestamp,
        userId: update.userId,
        userName: update.userName,
        nodeId: update.nodeId,
        data: update.data,
        priority: getActivityPriority(update.type)
      };
      return activity;
    });

    // Add user activity updates
    const userActivities = generateUserActivities();

    const allActivities = [...newActivities, ...userActivities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50); // Keep last 50 activities

    setActivities(allActivities);
  }, [treeUpdates, activeUsers]);

  const generateUserActivities = (): ActivityItem[] => {
    const userActivities: ActivityItem[] = [];

    // Generate some demo activities
    if (Math.random() > 0.7) {
      userActivities.push({
        id: `user-activity-${Date.now()}`,
        type: 'user_action',
        title: 'Team Member Viewing',
        description: `${activeUsers.filter(u => u.isViewing).length} members are currently viewing the genealogy tree`,
        timestamp: new Date().toISOString(),
        userId: 'system',
        userName: 'System',
        priority: 'low'
      });
    }

    return userActivities;
  };

  const getActivityTitle = (update: any): string => {
    switch (update.type) {
      case 'rank_change':
        return 'Rank Achievement!';
      case 'volume_update':
        return 'Volume Update';
      case 'new_member':
        return 'New Team Member';
      case 'status_change':
        return 'Status Change';
      case 'member_update':
        return 'Member Information Updated';
      default:
        return 'Tree Update';
    }
  };

  const getActivityDescription = (update: any): string => {
    switch (update.type) {
      case 'rank_change':
        return `${update.userName} achieved ${update.data?.newRank || 'new rank'}!`;
      case 'volume_update':
        return `Volume updated to $${update.data?.volume?.toLocaleString() || '0'}`;
      case 'new_member':
        return `${update.data?.memberName || 'New member'} joined the team`;
      case 'status_change':
        return `Status changed to ${update.data?.status || 'updated'}`;
      case 'member_update':
        return `Profile information updated`;
      default:
        return 'Tree structure updated';
    }
  };

  const getActivityPriority = (type: string): 'low' | 'medium' | 'high' => {
    switch (type) {
      case 'rank_change':
      case 'new_member':
        return 'high';
      case 'volume_update':
      case 'status_change':
        return 'medium';
      default:
        return 'low';
    }
  };

  const getActivityIcon = (type: string, priority: string) => {
    const iconClass = `h-4 w-4 ${
      priority === 'high' ? 'text-red-500' :
      priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
    }`;

    switch (type) {
      case 'rank_change':
        return <Award className={iconClass} />;
      case 'volume_update':
        return <DollarSign className={iconClass} />;
      case 'new_member':
        return <UserPlus className={iconClass} />;
      case 'status_change':
        return <Target className={iconClass} />;
      case 'user_action':
        return <Eye className={iconClass} />;
      case 'achievement':
        return <Trophy className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const filteredActivities = activities.filter(activity =>
    filter === 'all' || activity.priority === filter
  );

  const Trophy = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 left-4 z-40 ${className}`}>
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 relative"
        >
          <Activity className="h-6 w-6" />
          {activities.filter(a => a.priority === 'high').length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full p-0 flex items-center justify-center">
              <Zap className="h-3 w-3" />
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className={`fixed bottom-4 left-4 w-80 h-[500px] flex flex-col z-40 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Activity className="h-5 w-5 mr-2" />
            Live Activity
            <Badge className="ml-2 bg-green-500">
              {activities.filter(a => new Date().getTime() - new Date(a.timestamp).getTime() < 300000).length} recent
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className={`h-4 w-4 ${showNotifications ? 'text-blue-500' : 'text-gray-400'}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 mt-2">
          <Filter className="h-4 w-4 text-gray-500" />
          {['all', 'high', 'medium', 'low'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType as any)}
              className="text-xs"
            >
              {filterType}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity</p>
              <p className="text-sm">Activity will appear here as it happens</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`p-3 rounded-lg border-l-4 bg-gray-50 transition-all hover:bg-gray-100 ${
                  activity.priority === 'high' ? 'border-red-500' :
                  activity.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type, activity.priority)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </h4>
                      <Badge
                        className={`text-xs ${
                          activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                          activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {activity.userName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeActivityFeed;
