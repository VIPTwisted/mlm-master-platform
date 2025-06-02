'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AIContentAssistant from './AIContentAssistant';
import AISubjectLineOptimizer from './AISubjectLineOptimizer';
import AISendTimeOptimizer from './AISendTimeOptimizer';
import {
  Mail,
  Send,
  Eye,
  Save,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Palette,
  Image,
  Type,
  Link,
  Smartphone,
  Monitor,
  Play,
  Pause,
  Copy,
  Download,
  Upload,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'promotion' | 'newsletter' | 'follow-up' | 'announcement';
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
  lastModified: string;
  opens: number;
  clicks: number;
  conversions: number;
  recipients: number;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  templates: EmailTemplate[];
  audienceSize: number;
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed';
  scheduledDate?: string;
  createdAt: string;
  performance: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    unsubscribed: number;
  };
}

interface EmailBlock {
  id: string;
  type: 'header' | 'text' | 'image' | 'button' | 'social' | 'footer' | 'divider';
  content: any;
  styles: any;
}

const EmailCampaignBuilder = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [emailBlocks, setEmailBlocks] = useState<EmailBlock[]>([]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditing, setIsEditing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Sample campaign data
    const sampleCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'New Member Welcome Series',
        description: 'Automated welcome sequence for new team members',
        audienceSize: 245,
        status: 'running',
        createdAt: '2024-06-01',
        templates: [
          {
            id: '1',
            name: 'Welcome Email',
            subject: 'Welcome to Our Amazing Team! 🎉',
            content: '<h1>Welcome!</h1><p>We\'re excited to have you join our team...</p>',
            type: 'welcome',
            status: 'active',
            createdAt: '2024-06-01',
            lastModified: '2024-06-01',
            opens: 195,
            clicks: 87,
            conversions: 23,
            recipients: 245
          },
          {
            id: '2',
            name: 'Getting Started Guide',
            subject: 'Your First Steps to Success',
            content: '<h1>Getting Started</h1><p>Here\'s how to get started...</p>',
            type: 'follow-up',
            status: 'active',
            createdAt: '2024-06-01',
            lastModified: '2024-06-02',
            opens: 167,
            clicks: 94,
            conversions: 31,
            recipients: 195
          }
        ],
        performance: {
          sent: 490,
          opened: 362,
          clicked: 181,
          converted: 54,
          unsubscribed: 3
        }
      },
      {
        id: '2',
        name: 'Monthly Product Spotlight',
        description: 'Monthly promotional campaign featuring top products',
        audienceSize: 1250,
        status: 'scheduled',
        scheduledDate: '2024-07-01',
        createdAt: '2024-06-15',
        templates: [
          {
            id: '3',
            name: 'Product Feature Email',
            subject: 'This Month\'s Top Products - Don\'t Miss Out!',
            content: '<h1>Featured Products</h1><p>Check out our top products this month...</p>',
            type: 'promotion',
            status: 'draft',
            createdAt: '2024-06-15',
            lastModified: '2024-06-20',
            opens: 0,
            clicks: 0,
            conversions: 0,
            recipients: 0
          }
        ],
        performance: {
          sent: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          unsubscribed: 0
        }
      }
    ];
    setCampaigns(sampleCampaigns);
    setSelectedCampaign(sampleCampaigns[0]);
  }, []);

  const emailTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Series',
      description: 'Perfect for new team member onboarding',
      preview: '/api/placeholder/300/200',
      blocks: [
        { id: '1', type: 'header', content: { title: 'Welcome to Our Team!' }, styles: {} },
        { id: '2', type: 'text', content: { text: 'We\'re excited to have you join us...' }, styles: {} },
        { id: '3', type: 'button', content: { text: 'Get Started', url: '#' }, styles: {} }
      ]
    },
    {
      id: 'promotion',
      name: 'Product Promotion',
      description: 'Showcase products and drive sales',
      preview: '/api/placeholder/300/200',
      blocks: [
        { id: '1', type: 'header', content: { title: 'Special Offer!' }, styles: {} },
        { id: '2', type: 'image', content: { src: '/api/placeholder/400/200', alt: 'Product' }, styles: {} },
        { id: '3', type: 'text', content: { text: 'Limited time offer on our best products...' }, styles: {} },
        { id: '4', type: 'button', content: { text: 'Shop Now', url: '#' }, styles: {} }
      ]
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      description: 'Keep your team informed and engaged',
      preview: '/api/placeholder/300/200',
      blocks: [
        { id: '1', type: 'header', content: { title: 'Team Newsletter' }, styles: {} },
        { id: '2', type: 'text', content: { text: 'Here\'s what\'s happening this month...' }, styles: {} },
        { id: '3', type: 'divider', content: {}, styles: {} },
        { id: '4', type: 'text', content: { text: 'Featured achievements and updates...' }, styles: {} }
      ]
    }
  ];

  const blockTypes = [
    { type: 'header', icon: Type, name: 'Header', description: 'Add headings and titles' },
    { type: 'text', icon: Type, name: 'Text Block', description: 'Add paragraphs and content' },
    { type: 'image', icon: Image, name: 'Image', description: 'Add photos and graphics' },
    { type: 'button', icon: Link, name: 'Button', description: 'Add call-to-action buttons' },
    { type: 'social', icon: Users, name: 'Social Media', description: 'Add social media links' },
    { type: 'divider', icon: BarChart3, name: 'Divider', description: 'Add visual separators' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
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

  const BlockEditor = ({ block, onUpdate }: { block: EmailBlock; onUpdate: (block: EmailBlock) => void }) => {
    const [content, setContent] = useState(block.content);

    const handleUpdate = (newContent: any) => {
      setContent(newContent);
      onUpdate({ ...block, content: newContent });
    };

    switch (block.type) {
      case 'header':
        return (
          <div className="p-4 border rounded-lg">
            <label className="block text-sm font-medium mb-2">Header Text</label>
            <Input
              value={content.title || ''}
              onChange={(e) => handleUpdate({ ...content, title: e.target.value })}
              placeholder="Enter header text"
            />
          </div>
        );

      case 'text':
        return (
          <div className="p-4 border rounded-lg">
            <label className="block text-sm font-medium mb-2">Text Content</label>
            <ReactQuill
              value={content.text || ''}
              onChange={(value) => handleUpdate({ ...content, text: value })}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['clean']
                ]
              }}
            />
          </div>
        );

      case 'button':
        return (
          <div className="p-4 border rounded-lg space-y-2">
            <label className="block text-sm font-medium">Button Text</label>
            <Input
              value={content.text || ''}
              onChange={(e) => handleUpdate({ ...content, text: e.target.value })}
              placeholder="Button text"
            />
            <label className="block text-sm font-medium">Button URL</label>
            <Input
              value={content.url || ''}
              onChange={(e) => handleUpdate({ ...content, url: e.target.value })}
              placeholder="https://..."
            />
          </div>
        );

      case 'image':
        return (
          <div className="p-4 border rounded-lg space-y-2">
            <label className="block text-sm font-medium">Image URL</label>
            <Input
              value={content.src || ''}
              onChange={(e) => handleUpdate({ ...content, src: e.target.value })}
              placeholder="Image URL"
            />
            <label className="block text-sm font-medium">Alt Text</label>
            <Input
              value={content.alt || ''}
              onChange={(e) => handleUpdate({ ...content, alt: e.target.value })}
              placeholder="Alt text"
            />
          </div>
        );

      default:
        return (
          <div className="p-4 border rounded-lg">
            <p className="text-gray-500">Block type: {block.type}</p>
          </div>
        );
    }
  };

  const EmailPreview = ({ blocks }: { blocks: EmailBlock[] }) => {
    const renderBlock = (block: EmailBlock) => {
      switch (block.type) {
        case 'header':
          return (
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {block.content.title || 'Header Text'}
            </h1>
          );

        case 'text':
          return (
            <div
              className="text-gray-700 mb-4 prose"
              dangerouslySetInnerHTML={{ __html: block.content.text || 'Text content...' }}
            />
          );

        case 'button':
          return (
            <div className="mb-4">
              <a
                href={block.content.url || '#'}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {block.content.text || 'Button Text'}
              </a>
            </div>
          );

        case 'image':
          return (
            <div className="mb-4">
              <img
                src={block.content.src || '/api/placeholder/400/200'}
                alt={block.content.alt || 'Image'}
                className="w-full rounded-lg"
              />
            </div>
          );

        case 'divider':
          return <hr className="my-6 border-gray-300" />;

        default:
          return <div className="mb-4 p-2 bg-gray-100 rounded">Unknown block type</div>;
      }
    };

    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm ${
        previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'max-w-2xl'
      }`}>
        {blocks.map((block) => (
          <div key={block.id}>
            {renderBlock(block)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Campaign Builder</h1>
          <p className="text-gray-600">Create and manage automated email marketing campaigns</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="builder">Email Builder</TabsTrigger>
          <TabsTrigger value="ai-content">AI Content</TabsTrigger>
          <TabsTrigger value="ai-subject">AI Subject</TabsTrigger>
          <TabsTrigger value="ai-timing">AI Timing</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Audience</span>
                      <span className="font-medium">{campaign.audienceSize} members</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Templates</span>
                      <span className="font-medium">{campaign.templates.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Open Rate</span>
                      <span className="font-medium text-green-600">
                        {campaign.performance.sent > 0
                          ? Math.round((campaign.performance.opened / campaign.performance.sent) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button size="sm" onClick={() => setSelectedCampaign(campaign)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campaign Details */}
          {selectedCampaign && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedCampaign.name}
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(selectedCampaign.status)}>
                      {selectedCampaign.status}
                    </Badge>
                    <Button size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedCampaign.performance.sent}</div>
                    <div className="text-sm text-gray-600">Emails Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedCampaign.performance.opened}</div>
                    <div className="text-sm text-gray-600">Opened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedCampaign.performance.clicked}</div>
                    <div className="text-sm text-gray-600">Clicked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedCampaign.performance.converted}</div>
                    <div className="text-sm text-gray-600">Converted</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Email Templates</h4>
                  {selectedCampaign.templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h5 className="font-medium">{template.name}</h5>
                        <p className="text-sm text-gray-600">{template.subject}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{template.opens} opens</div>
                          <div className="text-xs text-gray-600">{template.recipients} sent</div>
                        </div>
                        <Badge className={getStatusColor(template.status)}>
                          {template.status}
                        </Badge>
                        <Button size="sm" onClick={() => setSelectedTemplate(template)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Builder Toolbar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {blockTypes.map((blockType) => (
                    <Button
                      key={blockType.type}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        const newBlock: EmailBlock = {
                          id: Math.random().toString(36).substr(2, 9),
                          type: blockType.type as any,
                          content: {},
                          styles: {}
                        };
                        setEmailBlocks(prev => [...prev, newBlock]);
                      }}
                    >
                      <blockType.icon className="h-4 w-4 mr-2" />
                      {blockType.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={previewMode === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Desktop
                    </Button>
                    <Button
                      variant={previewMode === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile
                    </Button>
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Test Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Email Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Email Preview
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <EmailPreview blocks={emailBlocks} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Block Editors */}
          {emailBlocks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emailBlocks.map((block) => (
                  <div key={block.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium capitalize">{block.type} Block</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEmailBlocks(prev => prev.filter(b => b.id !== block.id));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    <BlockEditor
                      block={block}
                      onUpdate={(updatedBlock) => {
                        setEmailBlocks(prev =>
                          prev.map(b => b.id === updatedBlock.id ? updatedBlock : b)
                        );
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ai-content" className="space-y-6">
          <AIContentAssistant />
        </TabsContent>

        <TabsContent value="ai-subject" className="space-y-6">
          <AISubjectLineOptimizer />
        </TabsContent>

        <TabsContent value="ai-timing" className="space-y-6">
          <AISendTimeOptimizer />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emailTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <Mail className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setEmailBlocks(template.blocks as EmailBlock[]);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                    <p className="text-2xl font-bold">12</p>
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
                    <p className="text-sm text-gray-600">Emails Sent</p>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Send className="h-3 w-3 mr-1" />
                      Last 30 days
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
                    <p className="text-sm text-gray-600">Open Rate</p>
                    <p className="text-2xl font-bold">73.8%</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Above average
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Click Rate</p>
                    <p className="text-2xl font-bold">24.5%</p>
                    <p className="text-xs text-purple-600 flex items-center mt-1">
                      <Link className="h-3 w-3 mr-1" />
                      Engagement
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-600">
                          {campaign.performance.sent} sent • {campaign.performance.opened} opened
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {campaign.performance.sent > 0
                            ? Math.round((campaign.performance.opened / campaign.performance.sent) * 100)
                            : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Open Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Welcome Series completed</div>
                      <div className="text-sm text-gray-600">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Send className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Product Spotlight sent</div>
                      <div className="text-sm text-gray-600">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Template needs review</div>
                      <div className="text-sm text-gray-600">3 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCampaignBuilder;
