import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  MessageSquare,
  Mail,
  Smartphone,
  Settings,
  Crown,
  Star,
  Zap,
  Calendar,
  Bell,
  FileText,
  ShoppingCart,
  Globe,
  Shield,
  Rocket,
  ChevronRight,
  Play,
  BookOpen,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Gift,
  TreePine,
  Headphones
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const quickStats = [
    { label: 'Monthly Earnings', value: '$4,750', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Team Size', value: '47', change: '+3', icon: Users, color: 'text-blue-600' },
    { label: 'Personal Volume', value: '$2,150', change: '+8%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Current Rank', value: 'Silver', change: 'Next: Gold', icon: Award, color: 'text-yellow-600' }
  ];

  const platforms = [
    {
      title: 'Team Management',
      description: 'Manage your team, track performance, and view genealogy',
      icon: Users,
      href: '/team-management',
      color: 'bg-blue-100 text-blue-600',
      stats: '47 members'
    },
    {
      title: 'Advanced Genealogy',
      description: 'Interactive team tree with real-time collaboration',
      icon: TreePine,
      href: '/advanced-genealogy',
      color: 'bg-green-100 text-green-600',
      stats: 'Live updates'
    },
    {
      title: 'Marketing Automation',
      description: 'Automated campaigns, workflows, and lead nurturing',
      icon: Rocket,
      href: '/marketing-automation',
      color: 'bg-purple-100 text-purple-600',
      stats: '12 active campaigns'
    },
    {
      title: 'AI Content Assistant',
      description: 'Generate emails, social posts, and marketing content',
      icon: Zap,
      href: '/ai-marketing',
      color: 'bg-yellow-100 text-yellow-600',
      stats: 'AI-powered'
    },
    {
      title: 'Email Campaigns',
      description: 'Create and manage email marketing campaigns',
      icon: Mail,
      href: '/email-campaigns',
      color: 'bg-red-100 text-red-600',
      stats: '89% open rate'
    },
    {
      title: 'Social Media Manager',
      description: 'Schedule posts and manage social media presence',
      icon: Globe,
      href: '/social-media',
      color: 'bg-indigo-100 text-indigo-600',
      stats: '5 platforms'
    },
    {
      title: 'AI Chatbot',
      description: 'Intelligent customer support and lead qualification',
      icon: MessageSquare,
      href: '/ai-chatbot',
      color: 'bg-pink-100 text-pink-600',
      stats: '24/7 support'
    },
    {
      title: 'Team Collaboration',
      description: 'Real-time chat, file sharing, and team coordination',
      icon: Users,
      href: '/collaborative-team',
      color: 'bg-cyan-100 text-cyan-600',
      stats: 'Real-time'
    },
    {
      title: 'Commission Calculator',
      description: 'Advanced commission calculation and payout management',
      icon: DollarSign,
      href: '/commissions',
      color: 'bg-emerald-100 text-emerald-600',
      stats: 'Automated'
    },
    {
      title: 'User Training',
      description: 'Interactive onboarding and training modules',
      icon: BookOpen,
      href: '/onboarding',
      color: 'bg-orange-100 text-orange-600',
      stats: '95% completion'
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise security controls and compliance monitoring',
      icon: Shield,
      href: '/security',
      color: 'bg-slate-100 text-slate-600',
      stats: 'Enterprise-grade'
    },
    {
      title: 'Admin Panel',
      description: 'Manage site content, settings, and configurations',
      icon: Settings,
      href: '/admin',
      color: 'bg-violet-100 text-violet-600',
      stats: 'Full control'
    }
  ];

  const recentActivity = [
    { action: 'New team member joined', time: '2 hours ago', icon: Users, color: 'text-green-600' },
    { action: 'Email campaign sent', time: '4 hours ago', icon: Mail, color: 'text-blue-600' },
    { action: 'Commission payment received', time: '1 day ago', icon: DollarSign, color: 'text-green-600' },
    { action: 'Rank advancement achieved', time: '2 days ago', icon: Award, color: 'text-yellow-600' },
    { action: 'Training module completed', time: '3 days ago', icon: BookOpen, color: 'text-purple-600' }
  ];

  const upcomingTasks = [
    { task: 'Complete monthly training', due: 'Due in 3 days', priority: 'high' },
    { task: 'Review team performance', due: 'Due in 5 days', priority: 'medium' },
    { task: 'Update social media content', due: 'Due in 1 week', priority: 'low' },
    { task: 'Prepare monthly report', due: 'Due in 2 weeks', priority: 'medium' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah!</h1>
            <p className="text-gray-600">Here's what's happening with your business today</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.color} flex items-center mt-1`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Features Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Link key={index} href={platform.href}>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-lg ${platform.color}`}>
                        <platform.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {platform.title}
                        </h3>
                        <Badge variant="outline" className="mt-1">
                          {platform.stats}
                        </Badge>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">{platform.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <p className="text-xs text-gray-500">{task.due}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with the most important tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <Mail className="h-8 w-8 text-blue-600" />
                <span>Send Campaign</span>
              </Button>
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <Users className="h-8 w-8 text-green-600" />
                <span>Add Team Member</span>
              </Button>
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <span>View Analytics</span>
              </Button>
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <BookOpen className="h-8 w-8 text-orange-600" />
                <span>Start Training</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive charts and analytics coming soon</p>
                  <Button className="mt-4" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Gold Rank</h3>
                <p className="text-gray-600 mb-4">You're 75% of the way there!</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Personal Volume:</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Volume:</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Leaders:</span>
                    <span className="text-yellow-600">2 of 3</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Target className="h-4 w-4 mr-2" />
                  View Requirements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
