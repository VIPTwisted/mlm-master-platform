'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailCampaignBuilder from './EmailCampaignBuilder';
import SocialMediaManager from './SocialMediaManager';
import AIFollowUpSystem from './AIFollowUpSystem';
import {
  Zap,
  Mail,
  Share2,
  BarChart3,
  Users,
  Target,
  Calendar,
  TrendingUp,
  Clock,
  Send,
  Workflow,
  Bot,
  Settings,
  PlayCircle,
  PauseCircle,
  Eye,
  Edit,
  Copy,
  Trash2,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Globe,
  Brain
} from 'lucide-react';

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'new_member' | 'rank_achievement' | 'volume_milestone' | 'date_scheduled' | 'manual';
    condition: string;
  };
  actions: {
    id: string;
    type: 'email' | 'social_post' | 'notification' | 'tag_assignment';
    delay?: number; // minutes
    config: any;
  }[];
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
  lastRun?: string;
  stats: {
    triggered: number;
    completed: number;
    emailsSent: number;
    postsPublished: number;
  };
}

interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email_sequence' | 'social_campaign' | 'multi_channel' | 'product_launch';
  status: 'draft' | 'active' | 'scheduled' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  budget?: number;
  targetAudience: string;
  channels: ('email' | 'facebook' | 'instagram' | 'twitter' | 'linkedin')[];
  performance: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
  };
}

interface MarketingMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  emailsSent: number;
  socialPosts: number;
  totalReach: number;
  avgEngagement: number;
  conversions: number;
  roi: number;
}

const MarketingAutomationHub = () => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [metrics, setMetrics] = useState<MarketingMetrics | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null);

  useEffect(() => {
    // Sample automation workflows
    const sampleWorkflows: AutomationWorkflow[] = [
      {
        id: '1',
        name: 'New Member Welcome Journey',
        description: 'Automated welcome sequence for new team members with emails and social mentions',
        trigger: {
          type: 'new_member',
          condition: 'When new member joins team'
        },
        actions: [
          {
            id: '1',
            type: 'email',
            delay: 0,
            config: {
              template: 'welcome_email',
              subject: 'Welcome to Our Amazing Team!'
            }
          },
          {
            id: '2',
            type: 'social_post',
            delay: 60,
            config: {
              platforms: ['facebook', 'instagram'],
              content: 'Welcome our newest team member! 🎉 #NewTeamMember #MLMFamily'
            }
          },
          {
            id: '3',
            type: 'email',
            delay: 1440, // 24 hours
            config: {
              template: 'getting_started_guide',
              subject: 'Your First Steps to Success'
            }
          }
        ],
        status: 'active',
        createdAt: '2024-06-01',
        lastRun: '2024-06-01T10:30:00Z',
        stats: {
          triggered: 23,
          completed: 21,
          emailsSent: 46,
          postsPublished: 23
        }
      },
      {
        id: '2',
        name: 'Rank Achievement Celebration',
        description: 'Celebrate team member rank achievements across all channels',
        trigger: {
          type: 'rank_achievement',
          condition: 'When member achieves new rank'
        },
        actions: [
          {
            id: '1',
            type: 'email',
            delay: 0,
            config: {
              template: 'congratulations_email',
              subject: 'Congratulations on Your New Rank!'
            }
          },
          {
            id: '2',
            type: 'social_post',
            delay: 30,
            config: {
              platforms: ['facebook', 'instagram', 'linkedin'],
              content: '🏆 Congratulations to [Member Name] on achieving [Rank]! #Success #TeamAchievement'
            }
          },
          {
            id: '3',
            type: 'notification',
            delay: 0,
            config: {
              type: 'team_announcement',
              message: 'Team member achieved new rank!'
            }
          }
        ],
        status: 'active',
        createdAt: '2024-05-28',
        lastRun: '2024-05-31T14:20:00Z',
        stats: {
          triggered: 8,
          completed: 8,
          emailsSent: 8,
          postsPublished: 8
        }
      },
      {
        id: '3',
        name: 'Monthly Product Spotlight',
        description: 'Monthly automated product promotion across email and social media',
        trigger: {
          type: 'date_scheduled',
          condition: 'First day of each month'
        },
        actions: [
          {
            id: '1',
            type: 'email',
            delay: 0,
            config: {
              template: 'product_spotlight',
              subject: 'This Month\'s Featured Products'
            }
          },
          {
            id: '2',
            type: 'social_post',
            delay: 120,
            config: {
              platforms: ['facebook', 'instagram'],
              content: '✨ Product Spotlight: Check out our amazing featured products this month!'
            }
          },
          {
            id: '3',
            type: 'social_post',
            delay: 2880, // 2 days
            config: {
              platforms: ['twitter', 'linkedin'],
              content: 'Limited time offer on our best products! Don\'t miss out! #Products #LimitedOffer'
            }
          }
        ],
        status: 'scheduled',
        createdAt: '2024-05-20',
        stats: {
          triggered: 1,
          completed: 1,
          emailsSent: 1250,
          postsPublished: 2
        }
      }
    ];

    const sampleCampaigns: MarketingCampaign[] = [
      {
        id: '1',
        name: 'Summer Product Launch',
        type: 'product_launch',
        status: 'active',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        budget: 5000,
        targetAudience: 'All team members and prospects',
        channels: ['email', 'facebook', 'instagram', 'twitter'],
        performance: {
          reach: 25000,
          engagement: 1850,
          conversions: 142,
          roi: 3.2
        }
      },
      {
        id: '2',
        name: 'Team Building Challenge',
        type: 'multi_channel',
        status: 'scheduled',
        startDate: '2024-07-01',
        endDate: '2024-07-15',
        targetAudience: 'Active team members',
        channels: ['email', 'facebook', 'instagram'],
        performance: {
          reach: 0,
          engagement: 0,
          conversions: 0,
          roi: 0
        }
      }
    ];

    const sampleMetrics: MarketingMetrics = {
      totalCampaigns: 12,
      activeCampaigns: 3,
      emailsSent: 28547,
      socialPosts: 156,
      totalReach: 125000,
      avgEngagement: 6.8,
      conversions: 892,
      roi: 4.2
    };

    setWorkflows(sampleWorkflows);
    setCampaigns(sampleCampaigns);
    setMetrics(sampleMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'draft':
        return 'bg-gray-500';
      case 'completed':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const MarketingOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">{metrics?.activeCampaigns}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 this month
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold">{metrics?.totalReach.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Globe className="h-3 w-3 mr-1" />
                  Cross-platform
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold">{metrics?.avgEngagement}%</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Above average
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ROI</p>
                <p className="text-2xl font-bold">{metrics?.roi}x</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Strong performance
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Active Marketing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'active').map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{campaign.name}</h4>
                  <p className="text-sm text-gray-600">{campaign.targetAudience}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {campaign.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{campaign.performance.reach.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Reach</div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Create Email Campaign</h3>
            <p className="text-sm text-gray-600 mb-4">Design and send targeted email campaigns</p>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Email Campaign
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI Follow-up Emails</h3>
            <p className="text-sm text-gray-600 mb-4">Generate personalized follow-ups from chatbot conversations</p>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Generate AI Emails
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Share2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Schedule Social Posts</h3>
            <p className="text-sm text-gray-600 mb-4">Plan and schedule social media content</p>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Social Campaign
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Workflow className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Create Automation</h3>
            <p className="text-sm text-gray-600 mb-4">Set up automated marketing workflows</p>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Automation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AutomationWorkflows = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Automation Workflows</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{workflow.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(workflow.status)}>
                    {workflow.status}
                  </Badge>
                  {workflow.status === 'active' ? (
                    <PlayCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <PauseCircle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Trigger</span>
                  <span className="font-medium">{workflow.trigger.type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Actions</span>
                  <span className="font-medium">{workflow.actions.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Triggered</span>
                  <span className="font-medium">{workflow.stats.triggered} times</span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Details */}
      {selectedWorkflow && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {selectedWorkflow.name}
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(selectedWorkflow.status)}>
                  {selectedWorkflow.status}
                </Badge>
                <Button size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Workflow Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      T
                    </div>
                    <div>
                      <div className="font-medium">Trigger: {selectedWorkflow.trigger.type.replace('_', ' ')}</div>
                      <div className="text-sm text-gray-600">{selectedWorkflow.trigger.condition}</div>
                    </div>
                  </div>

                  {selectedWorkflow.actions.map((action, index) => (
                    <div key={action.id} className="flex items-center space-x-3">
                      <div className="flex flex-col items-center">
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        {action.delay && action.delay > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {action.delay < 60 ? `${action.delay}m` : `${Math.floor(action.delay / 60)}h`}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          {action.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                          {action.type === 'social_post' && <Share2 className="h-4 w-4 text-green-600" />}
                          {action.type === 'notification' && <Bell className="h-4 w-4 text-purple-600" />}
                          <span className="font-medium capitalize">{action.type.replace('_', ' ')}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {action.type === 'email' && action.config.subject}
                          {action.type === 'social_post' && action.config.content}
                          {action.type === 'notification' && action.config.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedWorkflow.stats.triggered}</div>
                  <div className="text-sm text-gray-600">Times Triggered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedWorkflow.stats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedWorkflow.stats.emailsSent}</div>
                  <div className="text-sm text-gray-600">Emails Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{selectedWorkflow.stats.postsPublished}</div>
                  <div className="text-sm text-gray-600">Posts Published</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Automation Hub</h1>
          <p className="text-gray-600">Streamline your marketing with automated campaigns and workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Quick Setup
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-suite">AI Suite</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="email">Email Campaigns</TabsTrigger>
          <TabsTrigger value="ai-followup">AI Follow-up</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MarketingOverview />
        </TabsContent>

        <TabsContent value="ai-suite">
          <div className="text-center py-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <Bot className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">AI Marketing Suite</h3>
              <p className="text-gray-600 mb-6">
                Access powerful AI tools for content generation, optimization, and automation
              </p>
              <a
                href="/ai-marketing"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Brain className="h-5 w-5 mr-2" />
                Open AI Marketing Suite
              </a>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <AutomationWorkflows />
        </TabsContent>

        <TabsContent value="email">
          <EmailCampaignBuilder />
        </TabsContent>

        <TabsContent value="ai-followup">
          <AIFollowUpSystem />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaManager />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comprehensive Analytics</h3>
            <p className="text-gray-600 mb-6">Detailed analytics and reporting for all your marketing efforts</p>
            <Button>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Full Analytics
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingAutomationHub;
