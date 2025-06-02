'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  Sparkles,
  Wand2,
  Target,
  TrendingUp,
  Brain,
  Zap,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  MessageSquare,
  Mail,
  Share2,
  Lightbulb,
  Star,
  Eye,
  Clock,
  Users,
  Globe,
  Filter,
  Settings
} from 'lucide-react';

interface ContentSuggestion {
  id: string;
  type: 'email_subject' | 'email_body' | 'social_post' | 'hashtags' | 'call_to_action';
  content: string;
  confidence: number;
  reasoning: string;
  metrics: {
    predictedEngagement: number;
    sentimentScore: number;
    readabilityScore: number;
    urgencyLevel: number;
  };
  alternatives: string[];
}

interface ContentAnalysis {
  overallScore: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  readability: 'easy' | 'medium' | 'hard';
  engagement: 'low' | 'medium' | 'high';
  compliance: 'compliant' | 'warning' | 'violation';
  suggestions: string[];
  keywords: string[];
  tone: string[];
}

interface AITemplate {
  id: string;
  name: string;
  category: 'welcome' | 'promotion' | 'follow-up' | 'social' | 'announcement';
  description: string;
  prompt: string;
  variables: string[];
  successRate: number;
  avgEngagement: number;
}

const AIContentAssistant = () => {
  const [contentInput, setContentInput] = useState('');
  const [contentType, setContentType] = useState<'email' | 'social' | 'sms'>('email');
  const [targetAudience, setTargetAudience] = useState('new_members');
  const [contentGoal, setContentGoal] = useState('engagement');
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [aiTemplates, setAiTemplates] = useState<AITemplate[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplate | null>(null);

  useEffect(() => {
    // Sample AI templates
    const sampleTemplates: AITemplate[] = [
      {
        id: '1',
        name: 'Welcome Series Optimizer',
        category: 'welcome',
        description: 'AI-optimized welcome emails with personalization',
        prompt: 'Create a warm, engaging welcome email for new MLM team members',
        variables: ['member_name', 'sponsor_name', 'team_name', 'first_step'],
        successRate: 87,
        avgEngagement: 12.5
      },
      {
        id: '2',
        name: 'Social Engagement Booster',
        category: 'social',
        description: 'High-engagement social media posts with optimal hashtags',
        prompt: 'Generate engaging social media content for MLM success stories',
        variables: ['achievement', 'member_name', 'timeframe', 'inspiration'],
        successRate: 92,
        avgEngagement: 8.7
      },
      {
        id: '3',
        name: 'Product Promotion Master',
        category: 'promotion',
        description: 'Compelling product promotions with urgency and benefits',
        prompt: 'Create persuasive product promotion content with compelling benefits',
        variables: ['product_name', 'key_benefit', 'price_point', 'deadline'],
        successRate: 85,
        avgEngagement: 15.2
      },
      {
        id: '4',
        name: 'Follow-up Sequence Pro',
        category: 'follow-up',
        description: 'Nurturing follow-up messages that drive action',
        prompt: 'Generate effective follow-up sequences for prospects and inactive members',
        variables: ['last_interaction', 'interest_level', 'next_step', 'value_proposition'],
        successRate: 78,
        avgEngagement: 9.8
      }
    ];
    setAiTemplates(sampleTemplates);
  }, []);

  const generateContent = async () => {
    setIsGenerating(true);

    // Simulate AI content generation
    setTimeout(() => {
      const mockSuggestions: ContentSuggestion[] = [
        {
          id: '1',
          type: 'email_subject',
          content: '🎉 Your Success Journey Starts Here - Welcome to Our Amazing Team!',
          confidence: 94,
          reasoning: 'Combines celebration emoji, personal touch, and team belonging for high open rates',
          metrics: {
            predictedEngagement: 87,
            sentimentScore: 92,
            readabilityScore: 89,
            urgencyLevel: 65
          },
          alternatives: [
            'Welcome to Your New Chapter of Success! 🚀',
            'Ready to Transform Your Life? Welcome Aboard!',
            'Your Team is Excited to Welcome You! Let\'s Start...'
          ]
        },
        {
          id: '2',
          type: 'email_body',
          content: `Hi [Name],

Welcome to our incredible team! I'm absolutely thrilled that you've decided to join us on this amazing journey.

Your success is our success, and we're here to support you every step of the way. Here's what happens next:

✅ Access your back office and explore your new dashboard
✅ Join our private team group for daily tips and motivation
✅ Schedule your one-on-one success strategy call with me
✅ Download your starter pack with everything you need

I've seen countless people transform their lives with our system, and I know you have what it takes to achieve extraordinary results.

Your journey to financial freedom starts now!

[Sponsor Name]
P.S. Check your email tomorrow for your first success tip!`,
          confidence: 91,
          reasoning: 'Personal tone, clear next steps, social proof, and urgency create strong engagement',
          metrics: {
            predictedEngagement: 83,
            sentimentScore: 88,
            readabilityScore: 92,
            urgencyLevel: 78
          },
          alternatives: []
        },
        {
          id: '3',
          type: 'social_post',
          content: '🌟 TEAM SPOTLIGHT 🌟\n\nHuge congratulations to Sarah M. who just achieved Gold Manager in her first 60 days! 🏆\n\nSarah\'s dedication and consistent action prove that success is possible for anyone willing to work for it.\n\n"I never thought I could achieve this so quickly, but with the right team and system, dreams become reality!" - Sarah\n\nWho\'s ready to write their own success story? 💪\n\n#SuccessStory #TeamWork #MLMSuccess #DreamsComeTrue #Motivation',
          confidence: 89,
          reasoning: 'Success story format with social proof, quotes, and engaging call-to-action',
          metrics: {
            predictedEngagement: 76,
            sentimentScore: 95,
            readabilityScore: 88,
            urgencyLevel: 82
          },
          alternatives: [
            '🎯 SUCCESS ALERT! Another team member crushing their goals...',
            '💫 From skeptic to believer in 60 days - Sarah\'s incredible journey...',
            '🔥 PROOF that our system works: Sarah\'s amazing transformation...'
          ]
        },
        {
          id: '4',
          type: 'hashtags',
          content: '#MLMSuccess #TeamAchievement #FinancialFreedom #SuccessStory #Motivation #DreamTeam #MLMLife #Entrepreneur #GoalCrusher #Inspiration',
          confidence: 86,
          reasoning: 'Mix of popular MLM hashtags, motivational terms, and trending business keywords',
          metrics: {
            predictedEngagement: 72,
            sentimentScore: 90,
            readabilityScore: 95,
            urgencyLevel: 60
          },
          alternatives: [
            '#Success #Achievement #MLM #Business #Motivation #Team #Goals #Freedom #Entrepreneur #Growth',
            '#TeamSuccess #MLMWin #AchievementUnlocked #BusinessSuccess #FinancialGoals #DreamBig #SuccessJourney #Motivation #TeamWork #MLMLife'
          ]
        }
      ];

      setSuggestions(mockSuggestions);
      setIsGenerating(false);
    }, 2000);
  };

  const analyzeContent = (content: string) => {
    // Simulate AI content analysis
    const mockAnalysis: ContentAnalysis = {
      overallScore: 85,
      sentiment: 'positive',
      readability: 'easy',
      engagement: 'high',
      compliance: 'compliant',
      suggestions: [
        'Add more emotional triggers to increase engagement',
        'Include a clearer call-to-action',
        'Consider adding social proof elements',
        'Optimize for mobile reading experience'
      ],
      keywords: ['success', 'team', 'achievement', 'journey', 'support'],
      tone: ['enthusiastic', 'supportive', 'professional', 'motivational']
    };
    setAnalysis(mockAnalysis);
  };

  const ContentGenerator = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Generate high-performing content with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={contentType}
                onChange={(e) => setContentType(e.target.value as any)}
              >
                <option value="email">Email Campaign</option>
                <option value="social">Social Media Post</option>
                <option value="sms">SMS Message</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Audience</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              >
                <option value="new_members">New Members</option>
                <option value="prospects">Prospects</option>
                <option value="active_team">Active Team</option>
                <option value="inactive_members">Inactive Members</option>
                <option value="top_performers">Top Performers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content Goal</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={contentGoal}
                onChange={(e) => setContentGoal(e.target.value)}
              >
                <option value="engagement">Increase Engagement</option>
                <option value="conversion">Drive Conversions</option>
                <option value="retention">Improve Retention</option>
                <option value="awareness">Build Awareness</option>
                <option value="education">Educate Audience</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content Brief (Optional)</label>
            <Textarea
              placeholder="Describe what you want to communicate, key points to include, or specific requirements..."
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            onClick={generateContent}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    {suggestion.type === 'email_subject' && <Mail className="h-4 w-4 mr-2" />}
                    {suggestion.type === 'email_body' && <MessageSquare className="h-4 w-4 mr-2" />}
                    {suggestion.type === 'social_post' && <Share2 className="h-4 w-4 mr-2" />}
                    {suggestion.type === 'hashtags' && <Target className="h-4 w-4 mr-2" />}
                    {suggestion.type.replace('_', ' ').toUpperCase()}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">
                      {suggestion.confidence}% Confidence
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {suggestion.content}
                    </pre>
                  </div>

                  <div className="text-sm text-gray-600">
                    <strong>AI Reasoning:</strong> {suggestion.reasoning}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {suggestion.metrics.predictedEngagement}%
                      </div>
                      <div className="text-xs text-gray-600">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {suggestion.metrics.sentimentScore}%
                      </div>
                      <div className="text-xs text-gray-600">Sentiment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {suggestion.metrics.readabilityScore}%
                      </div>
                      <div className="text-xs text-gray-600">Readability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">
                        {suggestion.metrics.urgencyLevel}%
                      </div>
                      <div className="text-xs text-gray-600">Urgency</div>
                    </div>
                  </div>

                  {suggestion.alternatives.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Alternative Versions:</h4>
                      <div className="space-y-2">
                        {suggestion.alternatives.map((alt, index) => (
                          <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                            {alt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Good
                    </Button>
                    <Button size="sm" variant="outline">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Improve
                    </Button>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const ContentOptimizer = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Content Optimizer
          </CardTitle>
          <CardDescription>
            Analyze and improve your existing content for better performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Paste Your Content</label>
            <Textarea
              placeholder="Paste your email, social media post, or any marketing content here for AI analysis..."
              rows={6}
              onChange={(e) => {
                if (e.target.value) {
                  analyzeContent(e.target.value);
                }
              }}
            />
          </div>

          <Button className="w-full">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analyze Content
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Content Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {analysis.overallScore}/100
                </div>
                <div className="text-gray-600">Overall Content Score</div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-lg font-bold ${
                    analysis.sentiment === 'positive' ? 'text-green-600' :
                    analysis.sentiment === 'neutral' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.sentiment.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Sentiment</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-lg font-bold ${
                    analysis.readability === 'easy' ? 'text-green-600' :
                    analysis.readability === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.readability.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Readability</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-lg font-bold ${
                    analysis.engagement === 'high' ? 'text-green-600' :
                    analysis.engagement === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.engagement.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Engagement</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-lg font-bold ${
                    analysis.compliance === 'compliant' ? 'text-green-600' :
                    analysis.compliance === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.compliance.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Compliance</div>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="font-semibold mb-3">AI Improvement Suggestions</h4>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                      <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords & Tone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Tone Analysis</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.tone.map((tone, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800">
                        {tone}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const AITemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI-Powered Templates</h2>
        <Button>
          <Bot className="h-4 w-4 mr-2" />
          Create Custom Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTemplates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge variant="outline">{template.category}</Badge>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Success Rate</div>
                    <div className="font-semibold text-green-600">{template.successRate}%</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Avg Engagement</div>
                    <div className="font-semibold text-blue-600">{template.avgEngagement}%</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Variables:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map((variable, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Generate Content with {selectedTemplate.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Template Variables</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTemplate.variables.map((variable) => (
                    <div key={variable}>
                      <label className="block text-xs text-gray-600 mb-1">
                        {variable.replace('_', ' ').toUpperCase()}
                      </label>
                      <Input placeholder={`Enter ${variable.replace('_', ' ')}`} />
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Generate Personalized Content
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const PerformanceInsights = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-gray-600">AI Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+32%</div>
              <div className="text-sm text-gray-600">Engagement Increase</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.4x</div>
              <div className="text-sm text-gray-600">Content Creation Speed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <div className="text-sm text-gray-600">Content Pieces Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing AI Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Email Subject', content: 'Your Success Journey Starts Here 🎉', engagement: 87 },
                { type: 'Social Post', content: 'Team spotlight success story...', engagement: 92 },
                { type: 'Call to Action', content: 'Ready to transform your life?', engagement: 78 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.type}</div>
                    <div className="text-sm text-gray-600">{item.content}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{item.engagement}%</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Content Generation Accuracy</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[94%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Sentiment Analysis</span>
                <span className="font-semibold">97%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-[97%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Engagement Prediction</span>
                <span className="font-semibold">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-[89%]" />
              </div>
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
          <h1 className="text-3xl font-bold flex items-center">
            <Bot className="h-8 w-8 mr-3 text-blue-600" />
            AI Content Assistant
          </h1>
          <p className="text-gray-600">Create, optimize, and perfect your marketing content with AI</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Quick Generate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">Content Generator</TabsTrigger>
          <TabsTrigger value="optimizer">Content Optimizer</TabsTrigger>
          <TabsTrigger value="templates">AI Templates</TabsTrigger>
          <TabsTrigger value="insights">Performance Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <ContentGenerator />
        </TabsContent>

        <TabsContent value="optimizer">
          <ContentOptimizer />
        </TabsContent>

        <TabsContent value="templates">
          <AITemplates />
        </TabsContent>

        <TabsContent value="insights">
          <PerformanceInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIContentAssistant;
