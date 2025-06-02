'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIContentAssistant from '@/components/AIContentAssistant';
import AISubjectLineOptimizer from '@/components/AISubjectLineOptimizer';
import AISendTimeOptimizer from '@/components/AISendTimeOptimizer';
import {
  Bot,
  Brain,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
  Zap,
  BarChart3,
  Mail,
  Share2,
  Users,
  Globe,
  Award,
  Lightbulb,
  Star,
  Eye,
  MessageSquare
} from 'lucide-react';

const AIMarketingPage = () => {
  const [aiMetrics] = useState({
    contentGenerated: 1247,
    averageImprovement: 34,
    timesSaved: 156,
    campaignsOptimized: 89,
    accuracyRate: 94,
    userSatisfaction: 96
  });

  const AIOverview = () => (
    <div className="space-y-6">
      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Content Pieces Generated</p>
                <p className="text-2xl font-bold">{aiMetrics.contentGenerated}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% this month
                </p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Performance Improvement</p>
                <p className="text-2xl font-bold">{aiMetrics.averageImprovement}%</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  Over baseline
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Saved (Hours)</p>
                <p className="text-2xl font-bold">{aiMetrics.timesSaved}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  This quarter
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Campaigns Optimized</p>
                <p className="text-2xl font-bold">{aiMetrics.campaignsOptimized}</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Auto-optimized
                </p>
              </div>
              <Bot className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Accuracy Rate</p>
                <p className="text-2xl font-bold">{aiMetrics.accuracyRate}%</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  Industry leading
                </p>
              </div>
              <Brain className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">User Satisfaction</p>
                <p className="text-2xl font-bold">{aiMetrics.userSatisfaction}%</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  Highly rated
                </p>
              </div>
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Tools Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI Content Generator</h3>
            <p className="text-sm text-gray-600 mb-4">
              Generate high-performing email content, social posts, and marketing copy
            </p>
            <Button className="w-full">
              Start Creating
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Subject Line Optimizer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Optimize email subject lines for maximum open rates with AI analysis
            </p>
            <Button className="w-full">
              Optimize Now
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Send Time Optimizer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Find the perfect send times for your audience with behavioral analysis
            </p>
            <Button className="w-full">
              Analyze Timing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent AI Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'content',
                action: 'Generated welcome email series',
                performance: '+42% open rate',
                time: '2 hours ago',
                icon: Mail,
                color: 'text-blue-600'
              },
              {
                type: 'subject',
                action: 'Optimized subject line for product launch',
                performance: '+28% improvement predicted',
                time: '4 hours ago',
                icon: Target,
                color: 'text-green-600'
              },
              {
                type: 'timing',
                action: 'Identified optimal send time for team segment',
                performance: 'Tuesday 7PM EST recommended',
                time: '6 hours ago',
                icon: Clock,
                color: 'text-purple-600'
              },
              {
                type: 'social',
                action: 'Created social media campaign content',
                performance: '+67% engagement predicted',
                time: '1 day ago',
                icon: Share2,
                color: 'text-orange-600'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                <div className="flex-1">
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.performance}</div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="font-medium text-blue-900">Content Optimization</div>
                <div className="text-sm text-blue-800">
                  Your success story content performs 34% better than product-focused emails.
                  Consider increasing success story content ratio.
                </div>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="font-medium text-green-900">Timing Insight</div>
                <div className="text-sm text-green-800">
                  Evening sends (7-9 PM) yield 23% higher engagement for your primary audience.
                  Schedule more campaigns during this window.
                </div>
              </div>
              <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                <div className="font-medium text-purple-900">Subject Line Pattern</div>
                <div className="text-sm text-purple-800">
                  Subject lines with emojis and questions perform 41% better.
                  AI can automatically optimize future campaigns.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI-Generated Content</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-[85%]" />
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Manual Content</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full w-[63%]" />
                  </div>
                  <span className="text-sm font-medium">63%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI-Optimized Subject Lines</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-[78%]" />
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Standard Subject Lines</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full w-[54%]" />
                  </div>
                  <span className="text-sm font-medium">54%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="h-8 w-8 mr-3 text-blue-600" />
              AI Marketing Suite
            </h1>
            <p className="text-gray-600">Supercharge your marketing with artificial intelligence</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800 flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            <Button>
              <Sparkles className="h-4 w-4 mr-2" />
              Quick AI Generate
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">AI Overview</TabsTrigger>
            <TabsTrigger value="content">Content Generator</TabsTrigger>
            <TabsTrigger value="subject">Subject Optimizer</TabsTrigger>
            <TabsTrigger value="timing">Send Time AI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AIOverview />
          </TabsContent>

          <TabsContent value="content">
            <AIContentAssistant />
          </TabsContent>

          <TabsContent value="subject">
            <AISubjectLineOptimizer />
          </TabsContent>

          <TabsContent value="timing">
            <AISendTimeOptimizer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIMarketingPage;
