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
  Mail,
  Brain,
  Zap,
  Clock,
  Users,
  Target,
  TrendingUp,
  Eye,
  Send,
  Edit,
  Play,
  Pause,
  Settings,
  Calendar,
  MessageSquare,
  Lightbulb,
  Star,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Trash2,
  Copy
} from 'lucide-react';

interface ChatbotConversation {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  leadScore: number;
  stage: 'cold' | 'warm' | 'hot' | 'qualified';
  conversationSummary: string;
  keyTopics: string[];
  painPoints: string[];
  interests: string[];
  objections: string[];
  nextBestAction: string;
  conversationDate: string;
  sentimentScore: number;
  engagementLevel: 'low' | 'medium' | 'high';
}

interface EmailSequence {
  id: string;
  name: string;
  description: string;
  triggerType: 'conversation_end' | 'lead_score' | 'topic_interest' | 'objection_raised' | 'time_delay';
  triggerCondition: string;
  emailCount: number;
  status: 'active' | 'paused' | 'draft';
  performance: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
    converted: number;
  };
  createdAt: string;
  emails: FollowUpEmail[];
}

interface FollowUpEmail {
  id: string;
  sequenceId: string;
  emailNumber: number;
  delay: number; // minutes
  subject: string;
  content: string;
  personalizations: string[];
  aiGenerated: boolean;
  performance: {
    sent: number;
    opened: number;
    clicked: number;
    openRate: number;
    clickRate: number;
  };
}

interface AIEmailGeneration {
  conversationId: string;
  emailType: 'welcome' | 'objection_followup' | 'product_info' | 'testimonial' | 'urgency' | 'value_add';
  generatedSubject: string;
  generatedContent: string;
  personalizationTags: string[];
  confidence: number;
  reasoning: string;
  alternativeVersions: {
    subject: string;
    content: string;
  }[];
}

const AIFollowUpSystem = () => {
  const [conversations, setConversations] = useState<ChatbotConversation[]>([]);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [aiGenerations, setAiGenerations] = useState<AIEmailGeneration[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatbotConversation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('conversations');

  useEffect(() => {
    // Sample chatbot conversations data
    const sampleConversations: ChatbotConversation[] = [
      {
        id: '1',
        leadId: 'lead-001',
        leadName: 'Jennifer Smith',
        leadEmail: 'jennifer.smith@email.com',
        leadScore: 85,
        stage: 'hot',
        conversationSummary: 'Showed strong interest in business opportunity, asked about income potential and time commitment. Concerned about startup costs but expressed urgency to start earning extra income.',
        keyTopics: ['business opportunity', 'income potential', 'time commitment', 'startup costs'],
        painPoints: ['current job dissatisfaction', 'need extra income', 'budget constraints'],
        interests: ['financial freedom', 'flexible schedule', 'entrepreneurship'],
        objections: ['startup cost concern', 'time availability'],
        nextBestAction: 'Send success stories and payment plan options',
        conversationDate: '2024-06-01T10:30:00Z',
        sentimentScore: 78,
        engagementLevel: 'high'
      },
      {
        id: '2',
        leadId: 'lead-002',
        leadName: 'Michael Chen',
        leadEmail: 'michael.chen@email.com',
        leadScore: 62,
        stage: 'warm',
        conversationSummary: 'Interested in products for health and wellness. Asked about ingredients and third-party testing. Wife is pregnant and looking for safe nutrition options.',
        keyTopics: ['products', 'health and wellness', 'ingredients', 'safety'],
        painPoints: ['health concerns', 'product safety', 'trustworthy sources'],
        interests: ['nutrition', 'family health', 'quality products'],
        objections: ['product safety concerns', 'price comparison'],
        nextBestAction: 'Share product certifications and customer testimonials',
        conversationDate: '2024-06-01T14:15:00Z',
        sentimentScore: 65,
        engagementLevel: 'medium'
      },
      {
        id: '3',
        leadId: 'lead-003',
        leadName: 'Emily Davis',
        leadEmail: 'emily.davis@email.com',
        leadScore: 45,
        stage: 'qualified',
        conversationSummary: 'Skeptical about MLM business model, asked if it\'s a pyramid scheme. Showed interest after explanation but wants to research more. Mentioned having bad experience with another company.',
        keyTopics: ['business model', 'legitimacy', 'research', 'previous experience'],
        painPoints: ['skepticism', 'bad previous experience', 'trust issues'],
        interests: ['legitimate opportunity', 'proper business model', 'transparency'],
        objections: ['pyramid scheme concern', 'previous bad experience'],
        nextBestAction: 'Provide compliance documentation and connect with successful members',
        conversationDate: '2024-05-31T16:45:00Z',
        sentimentScore: 42,
        engagementLevel: 'medium'
      }
    ];

    // Sample email sequences
    const sampleSequences: EmailSequence[] = [
      {
        id: 'seq-001',
        name: 'High-Intent Business Opportunity Follow-up',
        description: 'For leads who showed strong interest in the business opportunity during chat',
        triggerType: 'lead_score',
        triggerCondition: 'score >= 75 AND interests contains "business opportunity"',
        emailCount: 5,
        status: 'active',
        performance: {
          sent: 127,
          opened: 89,
          clicked: 34,
          replied: 12,
          converted: 8
        },
        createdAt: '2024-05-15',
        emails: [
          {
            id: 'email-001-1',
            sequenceId: 'seq-001',
            emailNumber: 1,
            delay: 30,
            subject: 'Great chatting with you! Here\'s what happens next...',
            content: 'Hi {name}, I loved our conversation about the business opportunity...',
            personalizations: ['{name}', '{key_interest}', '{main_concern}'],
            aiGenerated: true,
            performance: { sent: 127, opened: 89, clicked: 34, openRate: 70.1, clickRate: 26.8 }
          }
        ]
      },
      {
        id: 'seq-002',
        name: 'Product Interest Nurture Sequence',
        description: 'For leads primarily interested in products',
        triggerType: 'topic_interest',
        triggerCondition: 'topics contains "products" AND engagement_level = "medium"',
        emailCount: 4,
        status: 'active',
        performance: {
          sent: 89,
          opened: 67,
          clicked: 23,
          replied: 8,
          converted: 5
        },
        createdAt: '2024-05-20',
        emails: []
      },
      {
        id: 'seq-003',
        name: 'Objection Handling Series',
        description: 'For leads who raised specific objections during conversation',
        triggerType: 'objection_raised',
        triggerCondition: 'objections not empty',
        emailCount: 6,
        status: 'active',
        performance: {
          sent: 76,
          opened: 45,
          clicked: 18,
          replied: 9,
          converted: 4
        },
        createdAt: '2024-05-18',
        emails: []
      }
    ];

    setConversations(sampleConversations);
    setSequences(sampleSequences);
  }, []);

  const generateFollowUpEmails = async (conversation: ChatbotConversation) => {
    setIsGenerating(true);
    setSelectedConversation(conversation);

    // Simulate AI processing
    setTimeout(() => {
      const aiGeneration: AIEmailGeneration = {
        conversationId: conversation.id,
        emailType: determineEmailType(conversation),
        generatedSubject: generateSubject(conversation),
        generatedContent: generateContent(conversation),
        personalizationTags: extractPersonalizationTags(conversation),
        confidence: 92,
        reasoning: generateReasoning(conversation),
        alternativeVersions: generateAlternatives(conversation)
      };

      setAiGenerations(prev => [...prev, aiGeneration]);
      setIsGenerating(false);
    }, 3000);
  };

  const determineEmailType = (conversation: ChatbotConversation): AIEmailGeneration['emailType'] => {
    if (conversation.objections.length > 0) return 'objection_followup';
    if (conversation.interests.includes('business opportunity')) return 'welcome';
    if (conversation.interests.includes('products')) return 'product_info';
    if (conversation.leadScore >= 80) return 'urgency';
    return 'value_add';
  };

  const generateSubject = (conversation: ChatbotConversation): string => {
    const subjects = {
      objection_followup: `${conversation.leadName}, I understand your concerns - here's the truth...`,
      welcome: `${conversation.leadName}, your success journey starts here! 🎯`,
      product_info: `${conversation.leadName}, the health transformation you've been seeking`,
      testimonial: `${conversation.leadName}, real success stories from people like you`,
      urgency: `${conversation.leadName}, limited spots available - don't miss this!`,
      value_add: `${conversation.leadName}, here's something that might interest you`
    };

    const emailType = determineEmailType(conversation);
    return subjects[emailType];
  };

  const generateContent = (conversation: ChatbotConversation): string => {
    const emailType = determineEmailType(conversation);

    switch (emailType) {
      case 'objection_followup':
        return `Hi ${conversation.leadName},

I really appreciated our conversation earlier, and I completely understand your concerns about ${conversation.objections[0]}.

Let me address this directly:

**${conversation.objections[0] === 'startup cost concern' ? 'About the Investment' : 'Your Concern'}:**

${conversation.objections[0] === 'startup cost concern'
  ? `I know $299 might seem like a lot upfront, but here's what most people don't realize:

• You can earn your investment back in your first 30 days
• We offer payment plans (as low as $99 down)
• The average person spends more on coffee in 3 months
• This investment includes everything you need to start earning

**Real Success Story:**
Sarah started with the same concern - she used our payment plan and earned $1,500 in her first month. "Best investment I ever made," she says.`
  : `This is actually one of the most common questions I get, and I'm glad you asked.

Here's the truth: [Specific response based on objection]

I'd love to connect you with someone who had the exact same concern and is now one of our top performers.`}

**What I'd like to do:**
Send you some specific information that addresses your ${conversation.objections[0]} directly, plus introduce you to 2-3 people who started with the same concerns.

Would that be helpful?

Looking forward to supporting your success,
[Your Name]

P.S. I'm only a text or call away if you have any questions: [Phone Number]`;

      case 'welcome':
        return `Hi ${conversation.leadName},

I'm so excited about our conversation! Your enthusiasm for ${conversation.interests[0]} really came through, and I can tell you're serious about making a change.

**Here's what I heard from you:**
• You're looking for ${conversation.interests[0]}
• Your main goal is ${conversation.painPoints[0] ? 'solving ' + conversation.painPoints[0] : 'creating positive change'}
• You're ready to take action

**What happens next:**

🎯 **Step 1 (Today):** Watch this 10-minute success story from someone just like you
[Link to video]

📚 **Step 2 (Tomorrow):** I'll send you our "Getting Started Guide" with everything you need to know

🤝 **Step 3 (This Week):** We'll schedule a brief call to answer your questions and get you started

**Quick Question:**
What's the #1 thing you want to achieve in the next 90 days? Hit reply and let me know - I want to make sure we focus on what matters most to you.

To your success,
[Your Name]

P.S. The video I mentioned has helped over 1,000 people take their first step. It's only 10 minutes, but it could change everything for you.`;

      case 'product_info':
        return `Hi ${conversation.leadName},

I loved hearing about your interest in ${conversation.interests.includes('health') ? 'improving your health' : 'our products'}!

Based on what you shared about ${conversation.painPoints[0]}, I think you'd be really interested in seeing what our products have done for people in similar situations.

**Here's what makes our products special:**

✅ **Third-party tested** - Every batch tested for purity and potency
✅ **Money-back guarantee** - 30 days, no questions asked
✅ **Real results** - 78% of customers reorder within 90 days
✅ **Not available in stores** - Exclusive formulations

**Customer Spotlight:**
"I was skeptical at first, but after 30 days I felt like a completely different person. The energy, the clarity, the confidence - everything improved." - Maria T.

**What I'd like to send you:**
1. Our most popular starter pack (perfect for beginners)
2. Third-party test results and certifications
3. 20+ customer success stories
4. Special pricing just for new customers

Interested? Just reply "YES" and I'll get everything sent over today.

To your health,
[Your Name]`;
      case 'testimonial':
        return `Hi ${conversation.leadName},
I wanted to share some real success stories with you after our conversation about ${conversation.interests[0] || 'your goals'}.
**Meet Sarah M. - Started 6 months ago:**
• Was ${conversation.painPoints[0] || 'struggling financially'} just like you mentioned
• Now earning $3,500/month consistently
• "I wish I had started sooner. The training and support made all the difference."
**Meet Mike R. - Started with big concerns:**
• Had the same worries about ${conversation.objections[0] || 'time commitment'}
• Now one of our top performers
• "The flexibility allowed me to keep my day job while building this business."
**What they all say:**
1. The training system works if you follow it
2. The community support is incredible
3. Starting was the hardest part - everything else flowed naturally
**Your next step:**
I can connect you with Sarah or Mike personally if you'd like to ask them questions directly. No pressure - just real people sharing real experiences.
Interested in a quick chat with one of them?
To your success,
[Your Name]`;
      case 'testimonial':
        return `Hi ${conversation.leadName},
I wanted to share some real success stories with you after our conversation about ${conversation.interests[0] || 'your goals'}.
**Meet Sarah M. - Started 6 months ago:**
• Was ${conversation.painPoints[0] || 'struggling financially'} just like you mentioned
• Now earning $3,500/month consistently
• "I wish I had started sooner. The training and support made all the difference."
**Meet Mike R. - Started with big concerns:**
• Had the same worries about ${conversation.objections[0] || 'time commitment'}
• Now one of our top performers
• "The flexibility allowed me to keep my day job while building this business."
**What they all say:**
1. The training system works if you follow it
2. The community support is incredible
3. Starting was the hardest part - everything else flowed naturally
**Your next step:**
I can connect you with Sarah or Mike personally if you'd like to ask them questions directly. No pressure - just real people sharing real experiences.
Interested in a quick chat with one of them?
To your success,
[Your Name]`;

      default:
        return `Hi ${conversation.leadName},

Thanks for taking the time to chat today! I really enjoyed learning more about ${conversation.interests[0] || 'your goals'}.

I wanted to follow up with something I think you'll find valuable...

[Personalized content based on conversation]

Best regards,
[Your Name]`;
    }
  };

  const extractPersonalizationTags = (conversation: ChatbotConversation): string[] => {
    return [
      '{lead_name}',
      '{main_interest}',
      '{primary_pain_point}',
      '{objection}',
      '{engagement_level}',
      '{conversation_date}',
      '{next_best_action}'
    ];
  };

  const generateReasoning = (conversation: ChatbotConversation): string => {
    const emailType = determineEmailType(conversation);

    switch (emailType) {
      case 'objection_followup':
        return `Lead raised specific objections during conversation. AI detected ${conversation.objections.length} concerns that need addressing. This email directly tackles their main objection with social proof and removes barriers to entry.`;
      case 'welcome':
        return `High engagement and interest in business opportunity detected. Lead score of ${conversation.leadScore} indicates strong potential. This welcome sequence builds on their enthusiasm and provides clear next steps.`;
      case 'product_info':
        return `Strong interest in products with health/wellness focus. Pain points around ${conversation.painPoints[0]} suggest need for solution. This email positions products as the answer to their specific needs.`;
      default:
        return `Standard follow-up based on conversation analysis. Maintains engagement while providing value and moving toward next step in the funnel.`;
    }
  };

  const generateAlternatives = (conversation: ChatbotConversation) => {
    return [
      {
        subject: `${conversation.leadName}, following up on our chat...`,
        content: 'Alternative version focusing on immediate value delivery...'
      },
      {
        subject: `Quick question, ${conversation.leadName}`,
        content: 'Alternative version using curiosity gap approach...'
      }
    ];
  };

  const ConversationAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Chatbot Conversations</h2>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync New Conversations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{conversations.length}</div>
            <div className="text-sm text-gray-600">Conversations Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {conversations.filter(c => c.stage === 'hot' || c.stage === 'qualified').length}
            </div>
            <div className="text-sm text-gray-600">Qualified Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {aiGenerations.length}
            </div>
            <div className="text-sm text-gray-600">AI Emails Generated</div>
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
                  <th className="text-left p-4 font-medium">Key Topics</th>
                  <th className="text-left p-4 font-medium">Engagement</th>
                  <th className="text-center p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {conversations.map((conv, index) => (
                  <tr key={conv.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{conv.leadName}</div>
                        <div className="text-gray-600 text-xs">{conv.leadEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={
                        conv.stage === 'hot' ? 'bg-red-500' :
                        conv.stage === 'warm' ? 'bg-orange-500' :
                        conv.stage === 'qualified' ? 'bg-yellow-500' : 'bg-gray-500'
                      }>
                        {conv.stage.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-medium">{conv.leadScore}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {conv.keyTopics.slice(0, 2).map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {conv.keyTopics.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{conv.keyTopics.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={
                        conv.engagementLevel === 'high' ? 'bg-green-500' :
                        conv.engagementLevel === 'medium' ? 'bg-yellow-500' : 'bg-gray-500'
                      }>
                        {conv.engagementLevel}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => generateFollowUpEmails(conv)}
                          disabled={isGenerating}
                        >
                          <Brain className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
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

      {/* Conversation Details Modal */}
      {selectedConversation && (
        <Card>
          <CardHeader>
            <CardTitle>Conversation Analysis: {selectedConversation.leadName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Conversation Summary</h4>
                <p className="text-sm text-gray-700 mb-4">{selectedConversation.conversationSummary}</p>

                <h4 className="font-semibold mb-2">Interests Identified</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedConversation.interests.map((interest, i) => (
                    <Badge key={i} className="bg-green-100 text-green-800">{interest}</Badge>
                  ))}
                </div>

                <h4 className="font-semibold mb-2">Pain Points</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedConversation.painPoints.map((pain, i) => (
                    <Badge key={i} className="bg-red-100 text-red-800">{pain}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">AI Recommendations</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900">Recommended Email Type</div>
                    <div className="text-sm text-blue-800">{determineEmailType(selectedConversation)}</div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900">Next Best Action</div>
                    <div className="text-sm text-green-800">{selectedConversation.nextBestAction}</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-900">Sentiment Score</div>
                    <div className="text-sm text-purple-800">{selectedConversation.sentimentScore}% Positive</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const AIGeneratedEmails = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Generated Follow-up Emails</h2>
        <div className="flex items-center space-x-3">
          <Badge className="bg-blue-100 text-blue-800">
            <Brain className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
        </div>
      </div>

      {isGenerating && (
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">AI is generating your follow-up emails...</h3>
            <p className="text-gray-600">Analyzing conversation patterns, sentiment, and optimal response strategies</p>
            <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-2/3 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {aiGenerations.map((generation) => (
          <Card key={generation.conversationId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Follow-up Email for {conversations.find(c => c.id === generation.conversationId)?.leadName}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">
                    {generation.confidence}% Confidence
                  </Badge>
                  <Badge variant="outline">
                    {generation.emailType.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                {generation.reasoning}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Generated Email */}
                <div>
                  <h4 className="font-semibold mb-3">Generated Email</h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="mb-3">
                      <label className="text-sm font-medium text-gray-600">Subject Line:</label>
                      <div className="font-medium">{generation.generatedSubject}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email Content:</label>
                      <div className="mt-2 whitespace-pre-wrap text-sm">{generation.generatedContent}</div>
                    </div>
                  </div>
                </div>

                {/* Personalization Tags */}
                <div>
                  <h4 className="font-semibold mb-2">Personalization Tags Available</h4>
                  <div className="flex flex-wrap gap-2">
                    {generation.personalizationTags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Alternative Versions */}
                <div>
                  <h4 className="font-semibold mb-3">Alternative Versions</h4>
                  <div className="space-y-3">
                    {generation.alternativeVersions.map((alt, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="font-medium text-sm mb-1">Alternative {i + 1}:</div>
                        <div className="text-sm text-gray-700">{alt.subject}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const EmailSequences = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Automated Email Sequences</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Sequence
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sequences.map((sequence) => (
          <Card key={sequence.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sequence.name}</CardTitle>
                <Badge className={
                  sequence.status === 'active' ? 'bg-green-500' :
                  sequence.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'
                }>
                  {sequence.status}
                </Badge>
              </div>
              <CardDescription>{sequence.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trigger:</span>
                    <span className="font-medium">{sequence.triggerType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emails:</span>
                    <span className="font-medium">{sequence.emailCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sent:</span>
                    <span className="font-medium">{sequence.performance.sent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Rate:</span>
                    <span className="font-medium text-green-600">
                      {Math.round((sequence.performance.opened / sequence.performance.sent) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    {sequence.status === 'active' ? <Pause /> : <Play />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Follow-up Email Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sequences</p>
                <p className="text-2xl font-bold">{sequences.length}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 this month
                </p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold">
                  {sequences.reduce((acc, seq) => acc + seq.performance.sent, 0)}
                </p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Send className="h-3 w-3 mr-1" />
                  Automated
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
                <p className="text-sm text-gray-600">Avg Open Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round(sequences.reduce((acc, seq) =>
                    acc + (seq.performance.opened / seq.performance.sent), 0
                  ) / sequences.length * 100)}%
                </p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Eye className="h-3 w-3 mr-1" />
                  Above industry
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
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">
                  {sequences.reduce((acc, seq) => acc + seq.performance.converted, 0)}
                </p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  AI optimized
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sequence Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sequences.map((sequence) => (
              <div key={sequence.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{sequence.name}</div>
                  <div className="text-sm text-gray-600">{sequence.performance.sent} emails sent</div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-sm font-medium">
                      {Math.round((sequence.performance.opened / sequence.performance.sent) * 100)}%
                    </div>
                    <div className="text-xs text-gray-600">Open Rate</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {Math.round((sequence.performance.clicked / sequence.performance.sent) * 100)}%
                    </div>
                    <div className="text-xs text-gray-600">Click Rate</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {Math.round((sequence.performance.converted / sequence.performance.sent) * 100)}%
                    </div>
                    <div className="text-xs text-gray-600">Conversion</div>
                  </div>
                </div>
              </div>
            ))}
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
            <Brain className="h-8 w-8 mr-3 text-blue-600" />
            AI Follow-up Email System
          </h1>
          <p className="text-gray-600">Automatically generate personalized follow-up emails based on chatbot conversations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800">
            <Zap className="h-3 w-3 mr-1" />
            Auto-Generated
          </Badge>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="ai-emails">AI Generated</TabsTrigger>
          <TabsTrigger value="sequences">Email Sequences</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations">
          <ConversationAnalysis />
        </TabsContent>

        <TabsContent value="ai-emails">
          <AIGeneratedEmails />
        </TabsContent>

        <TabsContent value="sequences">
          <EmailSequences />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIFollowUpSystem;
