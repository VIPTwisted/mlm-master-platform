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
  MessageSquare,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Star,
  Target,
  Phone,
  Mail,
  Calendar,
  Award,
  Brain,
  Zap,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Globe,
  Filter
} from 'lucide-react';

interface ChatbotMetrics {
  totalConversations: number;
  activeChats: number;
  averageResponseTime: number;
  satisfactionScore: number;
  leadsGenerated: number;
  qualifiedLeads: number;
  conversionRate: number;
  responseAccuracy: number;
  avgSessionDuration: number;
  bounceRate: number;
}

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  score: number;
  stage: 'cold' | 'warm' | 'hot' | 'qualified';
  source: string;
  lastInteraction: string;
  interests: string[];
  painPoints: string[];
  nextAction: string;
  assignedTo?: string;
}

interface ConversationAnalytics {
  intent: string;
  count: number;
  avgConfidence: number;
  successRate: number;
  avgSatisfaction: number;
}

interface KnowledgeBaseItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  accuracy: number;
  usage: number;
  lastUpdated: string;
}

const ChatbotDashboard = () => {
  const [metrics, setMetrics] = useState<ChatbotMetrics | null>(null);
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [conversationAnalytics, setConversationAnalytics] = useState<ConversationAnalytics[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [chatbotStatus, setChatbotStatus] = useState<'active' | 'paused' | 'maintenance'>('active');

  useEffect(() => {
    // Sample metrics data
    setMetrics({
      totalConversations: 1247,
      activeChats: 23,
      averageResponseTime: 0.8,
      satisfactionScore: 4.6,
      leadsGenerated: 156,
      qualifiedLeads: 89,
      conversionRate: 23.4,
      responseAccuracy: 94.2,
      avgSessionDuration: 8.5,
      bounceRate: 12.3
    });

    // Sample leads data
    setLeads([
      {
        id: '1',
        name: 'Jennifer Smith',
        email: 'jennifer.smith@email.com',
        phone: '+1 (555) 123-4567',
        score: 92,
        stage: 'hot',
        source: 'Website Chatbot',
        lastInteraction: '2024-06-01T10:30:00Z',
        interests: ['business opportunity', 'financial freedom'],
        painPoints: ['current job dissatisfaction', 'need extra income'],
        nextAction: 'Schedule discovery call',
        assignedTo: 'Sarah Johnson'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        score: 78,
        stage: 'warm',
        source: 'Facebook Messenger',
        lastInteraction: '2024-06-01T09:15:00Z',
        interests: ['products', 'health and wellness'],
        painPoints: ['budget concerns', 'time constraints'],
        nextAction: 'Send product information',
        assignedTo: 'Mike Rodriguez'
      },
      {
        id: '3',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        score: 65,
        stage: 'qualified',
        source: 'Website Chatbot',
        lastInteraction: '2024-05-31T16:45:00Z',
        interests: ['part-time opportunity', 'training'],
        painPoints: ['lack of experience', 'skepticism'],
        nextAction: 'Share success stories',
        assignedTo: 'David Kim'
      }
    ]);

    // Sample conversation analytics
    setConversationAnalytics([
      {
        intent: 'business_inquiry',
        count: 342,
        avgConfidence: 91.2,
        successRate: 78.5,
        avgSatisfaction: 4.7
      },
      {
        intent: 'pricing_inquiry',
        count: 298,
        avgConfidence: 94.8,
        successRate: 85.2,
        avgSatisfaction: 4.5
      },
      {
        intent: 'product_inquiry',
        count: 234,
        avgConfidence: 89.6,
        successRate: 72.1,
        avgSatisfaction: 4.3
      },
      {
        intent: 'support_inquiry',
        count: 189,
        avgConfidence: 96.1,
        successRate: 91.5,
        avgSatisfaction: 4.8
      },
      {
        intent: 'objection_handling',
        count: 156,
        avgConfidence: 87.3,
        successRate: 68.4,
        avgSatisfaction: 4.1
      }
    ]);

    // Sample knowledge base
    setKnowledgeBase([
      {
        id: '1',
        question: 'How much can I earn with this business?',
        answer: 'Earnings vary based on effort and time invested. Our top performers earn $10K+ monthly, while average active members earn $500-2,000 monthly.',
        category: 'Business Opportunity',
        tags: ['earnings', 'income', 'compensation'],
        accuracy: 94.2,
        usage: 156,
        lastUpdated: '2024-05-15'
      },
      {
        id: '2',
        question: 'What are the startup costs?',
        answer: 'We offer three starter packages: Basic ($99), Premium ($299), and VIP ($599). All include training, products, and support with a 30-day money-back guarantee.',
        category: 'Pricing',
        tags: ['cost', 'investment', 'packages'],
        accuracy: 97.1,
        usage: 143,
        lastUpdated: '2024-05-20'
      },
      {
        id: '3',
        question: 'Is this a pyramid scheme?',
        answer: 'No, we are a legitimate direct sales company with real products, customers, and FTC-compliant compensation plan. Income comes from product sales, not just recruitment.',
        category: 'Objections',
        tags: ['pyramid', 'legitimacy', 'compliance'],
        accuracy: 89.8,
        usage: 98,
        lastUpdated: '2024-05-18'
      }
    ]);
  }, []);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-orange-500';
      case 'qualified': return 'bg-yellow-500';
      case 'cold': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const performanceData = conversationAnalytics.map(item => ({
    name: item.intent.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    conversations: item.count,
    accuracy: item.avgConfidence,
    satisfaction: item.avgSatisfaction,
    success: item.successRate
  }));

  const Overview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversations</p>
                <p className="text-2xl font-bold">{metrics?.totalConversations}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this week
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leads Generated</p>
                <p className="text-2xl font-bold">{metrics?.leadsGenerated}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  +8% this week
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{metrics?.conversionRate}%</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Above target
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction Score</p>
                <p className="text-2xl font-bold">{metrics?.satisfactionScore}/5</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  Excellent rating
                </p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Chatbot Status
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(chatbotStatus)}>
                {chatbotStatus.toUpperCase()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChatbotStatus(chatbotStatus === 'active' ? 'paused' : 'active')}
              >
                {chatbotStatus === 'active' ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics?.activeChats}</div>
              <div className="text-sm text-gray-600">Active Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics?.averageResponseTime}s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics?.responseAccuracy}%</div>
              <div className="text-sm text-gray-600">Response Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.conversations} conversations</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">{item.accuracy}%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.success}%</div>
                    <div className="text-xs text-gray-600">Success</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.satisfaction}/5</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LeadManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lead Management</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Leads
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Manual Lead Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {leads.filter(l => l.stage === 'hot').length}
            </div>
            <div className="text-sm text-gray-600">Hot Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {leads.filter(l => l.stage === 'warm').length}
            </div>
            <div className="text-sm text-gray-600">Warm Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {leads.filter(l => l.stage === 'qualified').length}
            </div>
            <div className="text-sm text-gray-600">Qualified Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {leads.filter(l => l.stage === 'cold').length}
            </div>
            <div className="text-sm text-gray-600">Cold Leads</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">Lead</th>
                  <th className="text-left p-4 font-medium">Stage</th>
                  <th className="text-right p-4 font-medium">Score</th>
                  <th className="text-left p-4 font-medium">Source</th>
                  <th className="text-left p-4 font-medium">Assigned To</th>
                  <th className="text-left p-4 font-medium">Next Action</th>
                  <th className="text-center p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={lead.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-gray-600 text-xs">{lead.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStageColor(lead.stage)}>
                        {lead.stage.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-medium">{lead.score}</td>
                    <td className="p-4">{lead.source}</td>
                    <td className="p-4">{lead.assignedTo || 'Unassigned'}</td>
                    <td className="p-4">{lead.nextAction}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" onClick={() => setSelectedLead(lead)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedLead && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Details: {selectedLead.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div><strong>Email:</strong> {selectedLead.email}</div>
                  <div><strong>Phone:</strong> {selectedLead.phone || 'Not provided'}</div>
                  <div><strong>Score:</strong> {selectedLead.score}/100</div>
                  <div><strong>Stage:</strong> {selectedLead.stage}</div>
                  <div><strong>Source:</strong> {selectedLead.source}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Lead Intelligence</h4>
                <div className="space-y-2">
                  <div>
                    <strong>Interests:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedLead.interests.map((interest, i) => (
                        <Badge key={i} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Pain Points:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedLead.painPoints.map((pain, i) => (
                        <Badge key={i} variant="outline" className="bg-red-50">
                          {pain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div><strong>Next Action:</strong> {selectedLead.nextAction}</div>
                  <div><strong>Assigned To:</strong> {selectedLead.assignedTo || 'Unassigned'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const KnowledgeBaseManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Knowledge Base</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setIsTraining(true)}>
            <Brain className="h-4 w-4 mr-2" />
            {isTraining ? 'Training...' : 'Train AI'}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Knowledge
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{knowledgeBase.length}</div>
            <div className="text-sm text-gray-600">Knowledge Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(knowledgeBase.reduce((acc, item) => acc + item.accuracy, 0) / knowledgeBase.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Accuracy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {knowledgeBase.reduce((acc, item) => acc + item.usage, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Usage</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
          {knowledgeBase.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold">{item.question}</h4>
                  <Badge variant="outline" className="mt-1">{item.category}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">{item.accuracy}% Accurate</Badge>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-3">{item.answer}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Used {item.usage} times</span>
                  <span>Updated {new Date(item.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {item.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const Settings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chatbot Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chatbot Name</label>
              <Input defaultValue="AI Assistant" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Welcome Message</label>
              <Textarea
                defaultValue="Hi! I'm Alex, your AI assistant. How can I help you today?"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Response Delay (seconds)</label>
              <Input type="number" defaultValue="1.5" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <label className="text-sm">Enable typing indicators</label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Confidence Threshold</label>
              <Input type="number" defaultValue="75" />
              <p className="text-xs text-gray-600 mt-1">Minimum confidence for automated responses</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Lead Scoring Weight</label>
              <Input type="number" defaultValue="1.2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Escalation Keywords</label>
              <Textarea
                placeholder="urgent, manager, complaint, cancel"
                rows={2}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <label className="text-sm">Auto-escalate low confidence responses</label>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">CRM Integration</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sync leads to CRM</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-assign leads</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Send notifications</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platforms</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Website Widget</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Facebook Messenger</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">WhatsApp Business</span>
                  <Badge className="bg-gray-500">Inactive</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Bot className="h-8 w-8 mr-3 text-blue-600" />
            AI Chatbot Dashboard
          </h1>
          <p className="text-gray-600">Manage your AI-powered customer support and lead qualification</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={getStatusColor(chatbotStatus)}>
            {chatbotStatus.toUpperCase()}
          </Badge>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Lead Management</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="leads">
          <LeadManagement />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeBaseManagement />
        </TabsContent>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotDashboard;
