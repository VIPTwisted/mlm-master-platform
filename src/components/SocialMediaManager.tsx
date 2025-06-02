'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Calendar,
  Clock,
  Send,
  Image,
  Video,
  BarChart3,
  Users,
  Heart,
  MessageCircle,
  Share,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  Globe,
  Zap,
  Target,
  Camera
} from 'lucide-react';

interface SocialAccount {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  username: string;
  followers: number;
  isConnected: boolean;
  lastPost: string;
}

interface SocialPost {
  id: string;
  platform: string[];
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }[];
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
  hashtags: string[];
}

interface ContentTemplate {
  id: string;
  name: string;
  category: 'motivation' | 'product' | 'success' | 'team' | 'education';
  content: string;
  hashtags: string[];
  mediaType?: 'image' | 'video';
}

const SocialMediaManager = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    platform: [],
    content: '',
    hashtags: [],
    status: 'draft'
  });
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Sample data
    const sampleAccounts: SocialAccount[] = [
      {
        id: '1',
        platform: 'facebook',
        username: '@AmazingMLMTeam',
        followers: 12543,
        isConnected: true,
        lastPost: '2024-06-01T10:30:00Z'
      },
      {
        id: '2',
        platform: 'instagram',
        username: '@amazing_mlm_team',
        followers: 8976,
        isConnected: true,
        lastPost: '2024-06-01T14:20:00Z'
      },
      {
        id: '3',
        platform: 'twitter',
        username: '@AmazingMLM',
        followers: 5432,
        isConnected: false,
        lastPost: '2024-05-28T09:15:00Z'
      },
      {
        id: '4',
        platform: 'linkedin',
        username: 'Amazing MLM Team',
        followers: 3821,
        isConnected: true,
        lastPost: '2024-05-30T16:45:00Z'
      }
    ];

    const samplePosts: SocialPost[] = [
      {
        id: '1',
        platform: ['facebook', 'instagram'],
        content: '🎉 Exciting news! We just launched our new product line. Check it out and let us know what you think!',
        scheduledDate: '2024-06-02T10:00:00Z',
        status: 'scheduled',
        createdAt: '2024-06-01T15:30:00Z',
        hashtags: ['#NewProduct', '#MLM', '#Success', '#TeamWork'],
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
            caption: 'Our amazing new product!'
          }
        ]
      },
      {
        id: '2',
        platform: ['twitter', 'linkedin'],
        content: 'Success tip of the day: Consistency is key! Small daily actions lead to big results. 💪',
        status: 'published',
        createdAt: '2024-06-01T09:00:00Z',
        hashtags: ['#SuccessTip', '#Motivation', '#MLM'],
        engagement: {
          likes: 156,
          comments: 23,
          shares: 45,
          reach: 2340
        }
      },
      {
        id: '3',
        platform: ['instagram'],
        content: 'Behind the scenes at our team meeting! Love this amazing group of people. 📸',
        status: 'published',
        createdAt: '2024-05-31T18:30:00Z',
        hashtags: ['#TeamMeeting', '#BehindTheScenes', '#TeamWork'],
        engagement: {
          likes: 298,
          comments: 67,
          shares: 12,
          reach: 1890
        },
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
            caption: 'Team meeting vibes!'
          }
        ]
      }
    ];

    const sampleTemplates: ContentTemplate[] = [
      {
        id: '1',
        name: 'Success Monday',
        category: 'motivation',
        content: 'Monday motivation: Success is not final, failure is not fatal. It\'s the courage to continue that counts! 💪',
        hashtags: ['#MondayMotivation', '#Success', '#MLM', '#NeverGiveUp']
      },
      {
        id: '2',
        name: 'Product Spotlight',
        category: 'product',
        content: '✨ Product Spotlight: [Product Name] - Transform your [benefit] with our amazing [product type]!',
        hashtags: ['#ProductSpotlight', '#Quality', '#Results', '#MLM'],
        mediaType: 'image'
      },
      {
        id: '3',
        name: 'Team Achievement',
        category: 'success',
        content: '🎉 Celebrating our team\'s incredible achievement! Proud of everyone who made this possible!',
        hashtags: ['#TeamSuccess', '#Achievement', '#Proud', '#MLMLife']
      }
    ];

    setAccounts(sampleAccounts);
    setPosts(samplePosts);
    setTemplates(sampleTemplates);
  }, []);

  const platformIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin
  };

  const platformColors = {
    facebook: 'bg-blue-600',
    twitter: 'bg-sky-500',
    instagram: 'bg-pink-600',
    linkedin: 'bg-blue-700'
  };

  const handleCreatePost = () => {
    if (newPost.content) {
      const post: SocialPost = {
        id: Math.random().toString(36).substr(2, 9),
        platform: newPost.platform || [],
        content: newPost.content,
        media: newPost.media,
        scheduledDate: newPost.scheduledDate,
        status: newPost.status || 'draft',
        createdAt: new Date().toISOString(),
        hashtags: newPost.hashtags || []
      };
      setPosts(prev => [post, ...prev]);
      setNewPost({
        platform: [],
        content: '',
        hashtags: [],
        status: 'draft'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'draft':
        return 'bg-gray-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const ConnectedAccounts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {accounts.map((account) => {
        const Icon = platformIcons[account.platform];
        return (
          <Card key={account.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${platformColors[account.platform]}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <Badge className={account.isConnected ? 'bg-green-500' : 'bg-red-500'}>
                  {account.isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              <h3 className="font-semibold capitalize">{account.platform}</h3>
              <p className="text-sm text-gray-600 mb-2">{account.username}</p>
              <div className="text-2xl font-bold text-blue-600">{account.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">followers</div>
              <Button size="sm" className="w-full mt-4" variant={account.isConnected ? 'outline' : 'default'}>
                {account.isConnected ? 'Manage' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const PostComposer = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Platforms</label>
          <div className="flex items-center space-x-3">
            {accounts.filter(acc => acc.isConnected).map((account) => {
              const Icon = platformIcons[account.platform];
              const isSelected = newPost.platform?.includes(account.platform);
              return (
                <Button
                  key={account.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const currentPlatforms = newPost.platform || [];
                    const newPlatforms = isSelected
                      ? currentPlatforms.filter(p => p !== account.platform)
                      : [...currentPlatforms, account.platform];
                    setNewPost(prev => ({ ...prev, platform: newPlatforms }));
                  }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {account.platform}
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Post Content</label>
          <Textarea
            value={newPost.content || ''}
            onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            placeholder="What's happening?"
            rows={4}
          />
          <div className="text-xs text-gray-500 mt-1">
            {newPost.content?.length || 0}/280 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Hashtags</label>
          <Input
            placeholder="#hashtag1 #hashtag2 #hashtag3"
            onChange={(e) => {
              const hashtags = e.target.value.split(' ').filter(tag => tag.startsWith('#'));
              setNewPost(prev => ({ ...prev, hashtags }));
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Schedule Date</label>
            <Input
              type="datetime-local"
              onChange={(e) => setNewPost(prev => ({
                ...prev,
                scheduledDate: e.target.value ? new Date(e.target.value).toISOString() : undefined
              }))}
            />
          </div>
          <div className="flex items-end space-x-2">
            <Button variant="outline" className="flex-1">
              <Image className="h-4 w-4 mr-2" />
              Add Media
            </Button>
            <Button variant="outline">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button onClick={handleCreatePost} disabled={!newPost.content || !newPost.platform?.length}>
            {newPost.scheduledDate ? (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Post
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </>
            )}
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PostsList = () => (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {post.platform.map((platform) => {
                    const Icon = platformIcons[platform as keyof typeof platformIcons];
                    return (
                      <div key={platform} className={`p-1 rounded ${platformColors[platform as keyof typeof platformColors]}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    );
                  })}
                </div>
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-gray-900 mb-3">{post.content}</p>

            {post.media && post.media.length > 0 && (
              <div className="mb-3">
                <img
                  src={post.media[0].url}
                  alt={post.media[0].caption}
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {post.hashtags.length > 0 && (
              <div className="mb-3">
                {post.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-1">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                {post.scheduledDate ? (
                  <span>Scheduled for {new Date(post.scheduledDate).toLocaleString()}</span>
                ) : (
                  <span>Created {new Date(post.createdAt).toLocaleDateString()}</span>
                )}
              </div>
              {post.engagement && (
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.engagement.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.engagement.comments}
                  </span>
                  <span className="flex items-center">
                    <Share className="h-4 w-4 mr-1" />
                    {post.engagement.shares}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ContentTemplates = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <Badge variant="outline">{template.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{template.content}</p>
            <div className="mb-4">
              {template.hashtags.map((hashtag, index) => (
                <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                  {hashtag}
                </Badge>
              ))}
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={() => setNewPost(prev => ({
                ...prev,
                content: template.content,
                hashtags: template.hashtags
              }))}
            >
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const SocialAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold">30,772</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2% this month
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
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold">6.8%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1.2% this week
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Posts This Month</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  On schedule
                </p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Time</p>
                <p className="text-2xl font-bold">2 PM</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Optimal posting
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.filter(acc => acc.isConnected).map((account) => {
                const Icon = platformIcons[account.platform];
                const engagement = Math.random() * 10; // Mock data
                return (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${platformColors[account.platform]}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium capitalize">{account.platform}</div>
                        <div className="text-sm text-gray-600">{account.followers.toLocaleString()} followers</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{engagement.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.filter(post => post.engagement).slice(0, 3).map((post) => (
                <div key={post.id} className="p-3 border rounded-lg">
                  <p className="text-sm mb-2">{post.content.substring(0, 100)}...</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{post.engagement?.likes} likes</span>
                    <span>{post.engagement?.comments} comments</span>
                    <span>{post.engagement?.shares} shares</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Media Manager</h1>
          <p className="text-gray-600">Manage all your social media accounts and campaigns</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Connect Account
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Auto-Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="composer">Create Post</TabsTrigger>
          <TabsTrigger value="posts">All Posts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          <ConnectedAccounts />
        </TabsContent>

        <TabsContent value="composer" className="space-y-6">
          <PostComposer />
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <PostsList />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <ContentTemplates />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SocialAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaManager;
