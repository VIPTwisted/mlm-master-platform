'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Play,
  CheckCircle,
  Star,
  Trophy,
  Target,
  User,
  Users,
  Zap,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Eye,
  Video,
  FileText,
  Lightbulb,
  MessageSquare,
  Settings,
  BarChart3,
  DollarSign,
  ShoppingCart,
  Rocket,
  Gift,
  Calendar,
  Bell,
  Download,
  Share2,
  Heart,
  ThumbsUp,
  Coffee,
  Bookmark,
  Navigation,
  Map,
  Compass,
  Flag,
  Shield,
  Lock,
  Mail,
  Phone,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  PieChart,
  Activity,
  Layers,
  Package,
  CreditCard,
  UserPlus,
  Network,
  TreePine
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  category: 'setup' | 'training' | 'practice' | 'advanced';
  type: 'tutorial' | 'video' | 'interactive' | 'quiz' | 'checklist';
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  content: StepContent;
  isCompleted: boolean;
  progress: number; // 0-100
  unlocked: boolean;
  points: number;
  badges?: string[];
}

interface StepContent {
  overview: string;
  objectives: string[];
  steps: TutorialStep[];
  resources: Resource[];
  quiz?: QuizQuestion[];
  checklist?: ChecklistItem[];
}

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'interactive' | 'action';
  media?: string;
  actionElement?: string;
  highlightSelector?: string;
  isCompleted: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  isCompleted: boolean;
  points: number;
}

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'template';
  url: string;
  description: string;
}

interface UserProgress {
  userId: string;
  overallProgress: number;
  completedSteps: string[];
  currentStep: string;
  totalPoints: number;
  badges: Badge[];
  streak: number;
  lastActivity: string;
  timeSpent: number; // minutes
  level: number;
  experiencePoints: number;
}

interface OnboardingBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  pointsRequired: number;
  isEarned: boolean;
  earnedDate?: string;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  category: 'new_distributor' | 'team_leader' | 'advanced_training' | 'compliance';
  estimatedDuration: number; // hours
  stepIds: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isRecommended: boolean;
}

const UserOnboardingSystem = () => {
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [badges, setBadges] = useState<OnboardingBadge[]>([]);
  const [currentStep, setCurrentStep] = useState<OnboardingStep | null>(null);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [isInteractiveTutorial, setIsInteractiveTutorial] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Sample onboarding steps
    const sampleSteps: OnboardingStep[] = [
      {
        id: 'step-001',
        title: 'Complete Your Profile',
        description: 'Set up your personal and business profile information',
        category: 'setup',
        type: 'interactive',
        duration: 15,
        difficulty: 'beginner',
        prerequisites: [],
        content: {
          overview: 'Complete your profile to personalize your experience and help your team members connect with you.',
          objectives: [
            'Upload a professional profile photo',
            'Add your contact information',
            'Write a compelling bio',
            'Set your business goals'
          ],
          steps: [
            {
              id: 'profile-1',
              title: 'Upload Profile Photo',
              content: 'Click on the profile picture placeholder and upload a professional photo.',
              type: 'action',
              actionElement: 'profile-photo-upload',
              isCompleted: false
            },
            {
              id: 'profile-2',
              title: 'Add Contact Information',
              content: 'Fill in your phone number, email, and preferred contact method.',
              type: 'action',
              actionElement: 'contact-form',
              isCompleted: false
            },
            {
              id: 'profile-3',
              title: 'Write Your Bio',
              content: 'Share your story, experience, and what motivates you in this business.',
              type: 'action',
              actionElement: 'bio-textarea',
              isCompleted: false
            }
          ],
          resources: [
            {
              id: 'res-001',
              title: 'Profile Photo Guidelines',
              type: 'pdf',
              url: '/resources/profile-photo-guide.pdf',
              description: 'Best practices for professional profile photos'
            }
          ]
        },
        isCompleted: false,
        progress: 0,
        unlocked: true,
        points: 100,
        badges: ['profile_complete']
      },
      {
        id: 'step-002',
        title: 'Understanding the Compensation Plan',
        description: 'Learn how you earn money and advance in ranks',
        category: 'training',
        type: 'video',
        duration: 30,
        difficulty: 'beginner',
        prerequisites: ['step-001'],
        content: {
          overview: 'Master our compensation plan to maximize your earning potential and understand the path to success.',
          objectives: [
            'Understand different ways to earn',
            'Learn about rank advancement',
            'Calculate potential earnings',
            'Set realistic income goals'
          ],
          steps: [
            {
              id: 'comp-1',
              title: 'Watch: Compensation Overview',
              content: 'Watch this 10-minute video explaining our compensation structure.',
              type: 'video',
              media: '/videos/compensation-overview.mp4',
              isCompleted: false
            },
            {
              id: 'comp-2',
              title: 'Interactive Calculator',
              content: 'Use our earnings calculator to see your potential income.',
              type: 'interactive',
              actionElement: 'earnings-calculator',
              isCompleted: false
            }
          ],
          resources: [
            {
              id: 'res-002',
              title: 'Compensation Plan PDF',
              type: 'pdf',
              url: '/resources/compensation-plan.pdf',
              description: 'Detailed compensation plan document'
            },
            {
              id: 'res-003',
              title: 'Earnings Calculator',
              type: 'link',
              url: '/tools/earnings-calculator',
              description: 'Interactive earnings projection tool'
            }
          ],
          quiz: [
            {
              id: 'quiz-1',
              question: 'What are the three main ways to earn in our compensation plan?',
              type: 'multiple_choice',
              options: [
                'Retail sales, team bonuses, rank bonuses',
                'Monthly fees, signup bonuses, referrals',
                'Product sales, recruiting fees, monthly subscriptions'
              ],
              correctAnswer: 0,
              explanation: 'The three main ways are retail sales, team bonuses, and rank bonuses.'
            }
          ]
        },
        isCompleted: false,
        progress: 0,
        unlocked: false,
        points: 200,
        badges: ['compensation_master']
      },
      {
        id: 'step-003',
        title: 'Your First Sale',
        description: 'Learn how to make your first product sale',
        category: 'practice',
        type: 'tutorial',
        duration: 45,
        difficulty: 'beginner',
        prerequisites: ['step-002'],
        content: {
          overview: 'Master the art of selling our products with proven techniques and scripts.',
          objectives: [
            'Understand product benefits',
            'Learn sales conversation scripts',
            'Practice objection handling',
            'Make your first sale'
          ],
          steps: [
            {
              id: 'sale-1',
              title: 'Product Knowledge',
              content: 'Study our top 5 products and their unique benefits.',
              type: 'text',
              isCompleted: false
            },
            {
              id: 'sale-2',
              title: 'Sales Scripts',
              content: 'Learn proven conversation starters and closing techniques.',
              type: 'text',
              isCompleted: false
            },
            {
              id: 'sale-3',
              title: 'Role-Play Practice',
              content: 'Practice with our interactive sales simulator.',
              type: 'interactive',
              actionElement: 'sales-simulator',
              isCompleted: false
            }
          ],
          resources: [
            {
              id: 'res-004',
              title: 'Product Catalog',
              type: 'pdf',
              url: '/resources/product-catalog.pdf',
              description: 'Complete product information and benefits'
            },
            {
              id: 'res-005',
              title: 'Sales Script Templates',
              type: 'template',
              url: '/templates/sales-scripts.docx',
              description: 'Proven conversation templates'
            }
          ],
          checklist: [
            {
              id: 'check-1',
              task: 'Study all product benefits',
              description: 'Review each product and memorize key benefits',
              isCompleted: false,
              points: 50
            },
            {
              id: 'check-2',
              task: 'Practice sales script 5 times',
              description: 'Record yourself or practice with a friend',
              isCompleted: false,
              points: 75
            },
            {
              id: 'check-3',
              task: 'Complete first product sale',
              description: 'Make your first successful product sale',
              isCompleted: false,
              points: 200
            }
          ]
        },
        isCompleted: false,
        progress: 0,
        unlocked: false,
        points: 300,
        badges: ['first_sale', 'sales_pro']
      },
      {
        id: 'step-004',
        title: 'Building Your Team',
        description: 'Learn effective recruiting and team building strategies',
        category: 'training',
        type: 'tutorial',
        duration: 60,
        difficulty: 'intermediate',
        prerequisites: ['step-003'],
        content: {
          overview: 'Build a successful team by learning proven recruiting strategies and leadership skills.',
          objectives: [
            'Identify potential team members',
            'Master the recruiting conversation',
            'Support new team members',
            'Build team culture'
          ],
          steps: [
            {
              id: 'team-1',
              title: 'Target Market Identification',
              content: 'Learn to identify your ideal team members and where to find them.',
              type: 'text',
              isCompleted: false
            },
            {
              id: 'team-2',
              title: 'Recruiting Scripts and Techniques',
              content: 'Master the art of recruiting with proven scripts and approaches.',
              type: 'video',
              media: '/videos/recruiting-mastery.mp4',
              isCompleted: false
            },
            {
              id: 'team-3',
              title: 'New Member Onboarding',
              content: 'Learn how to properly onboard and support new team members.',
              type: 'interactive',
              actionElement: 'onboarding-simulator',
              isCompleted: false
            }
          ],
          resources: [
            {
              id: 'res-006',
              title: 'Recruiting Playbook',
              type: 'pdf',
              url: '/resources/recruiting-playbook.pdf',
              description: 'Complete guide to effective recruiting'
            }
          ]
        },
        isCompleted: false,
        progress: 0,
        unlocked: false,
        points: 500,
        badges: ['team_builder', 'recruiter']
      },
      {
        id: 'step-005',
        title: 'Advanced Marketing Strategies',
        description: 'Master digital marketing and social media promotion',
        category: 'advanced',
        type: 'tutorial',
        duration: 90,
        difficulty: 'advanced',
        prerequisites: ['step-004'],
        content: {
          overview: 'Take your business to the next level with advanced marketing strategies and digital tools.',
          objectives: [
            'Create compelling social media content',
            'Build an online presence',
            'Use marketing automation',
            'Track and optimize results'
          ],
          steps: [
            {
              id: 'marketing-1',
              title: 'Social Media Strategy',
              content: 'Develop a comprehensive social media marketing plan.',
              type: 'tutorial',
              isCompleted: false
            },
            {
              id: 'marketing-2',
              title: 'Content Creation',
              content: 'Learn to create engaging posts, videos, and stories.',
              type: 'interactive',
              actionElement: 'content-creator',
              isCompleted: false
            },
            {
              id: 'marketing-3',
              title: 'Marketing Analytics',
              content: 'Track your marketing performance and optimize campaigns.',
              type: 'tutorial',
              isCompleted: false
            }
          ],
          resources: [
            {
              id: 'res-007',
              title: 'Digital Marketing Guide',
              type: 'pdf',
              url: '/resources/digital-marketing.pdf',
              description: 'Advanced marketing strategies and tactics'
            }
          ]
        },
        isCompleted: false,
        progress: 0,
        unlocked: false,
        points: 750,
        badges: ['marketing_master', 'digital_guru']
      }
    ];

    // Sample learning paths
    const sampleLearningPaths: LearningPath[] = [
      {
        id: 'path-001',
        name: 'New Distributor Fast Track',
        description: 'Essential training for new distributors to get started quickly',
        category: 'new_distributor',
        estimatedDuration: 3,
        stepIds: ['step-001', 'step-002', 'step-003'],
        difficulty: 'beginner',
        isRecommended: true
      },
      {
        id: 'path-002',
        name: 'Team Leader Development',
        description: 'Advanced training for building and leading successful teams',
        category: 'team_leader',
        estimatedDuration: 6,
        stepIds: ['step-003', 'step-004', 'step-005'],
        difficulty: 'intermediate',
        isRecommended: false
      },
      {
        id: 'path-003',
        name: 'Marketing Mastery',
        description: 'Comprehensive marketing training for maximum reach and impact',
        category: 'advanced_training',
        estimatedDuration: 4,
        stepIds: ['step-004', 'step-005'],
        difficulty: 'advanced',
        isRecommended: false
      }
    ];

    // Sample user progress
    const sampleUserProgress: UserProgress = {
      userId: 'user-001',
      overallProgress: 35,
      completedSteps: ['step-001'],
      currentStep: 'step-002',
      totalPoints: 100,
      badges: [],
      streak: 3,
      lastActivity: '2024-06-01T10:30:00Z',
      timeSpent: 45,
      level: 1,
      experiencePoints: 100
    };

    // Sample badges
    const sampleBadges: OnboardingBadge[] = [
      {
        id: 'badge-001',
        name: 'Profile Complete',
        description: 'Completed your profile setup',
        icon: '👤',
        rarity: 'common',
        pointsRequired: 100,
        isEarned: true,
        earnedDate: '2024-06-01'
      },
      {
        id: 'badge-002',
        name: 'First Sale',
        description: 'Made your first product sale',
        icon: '💰',
        rarity: 'rare',
        pointsRequired: 300,
        isEarned: false
      },
      {
        id: 'badge-003',
        name: 'Team Builder',
        description: 'Recruited your first team member',
        icon: '👥',
        rarity: 'epic',
        pointsRequired: 500,
        isEarned: false
      },
      {
        id: 'badge-004',
        name: 'Marketing Master',
        description: 'Completed advanced marketing training',
        icon: '📈',
        rarity: 'legendary',
        pointsRequired: 1000,
        isEarned: false
      }
    ];

    setOnboardingSteps(sampleSteps);
    setLearningPaths(sampleLearningPaths);
    setUserProgress(sampleUserProgress);
    setBadges(sampleBadges);
  }, []);

  const startStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    setCurrentTutorialStep(0);
    setIsInteractiveTutorial(true);
  };

  const completeStep = (stepId: string) => {
    setOnboardingSteps(prev => prev.map(step =>
      step.id === stepId
        ? { ...step, isCompleted: true, progress: 100 }
        : step
    ));

    if (userProgress) {
      setUserProgress(prev => prev ? {
        ...prev,
        completedSteps: [...prev.completedSteps, stepId],
        totalPoints: prev.totalPoints + (onboardingSteps.find(s => s.id === stepId)?.points || 0),
        overallProgress: Math.round(((prev.completedSteps.length + 1) / onboardingSteps.length) * 100)
      } : null);
    }

    // Unlock next steps
    setOnboardingSteps(prev => prev.map(step => {
      if (step.prerequisites.includes(stepId)) {
        return { ...step, unlocked: true };
      }
      return step;
    }));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500';
      case 'rare':
        return 'bg-blue-500';
      case 'epic':
        return 'bg-purple-500';
      case 'legendary':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const OnboardingDashboard = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold">{userProgress?.overallProgress}%</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {userProgress?.completedSteps.length} of {onboardingSteps.length} steps
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
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold">{userProgress?.totalPoints}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  Level {userProgress?.level}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold">{userProgress?.streak} days</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Keep it up!
                </p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Invested</p>
                <p className="text-2xl font-bold">{userProgress?.timeSpent}min</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  This week
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="h-5 w-5 mr-2" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPaths.filter(path => path.isRecommended).map((path) => (
              <div key={path.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-900">{path.name}</h4>
                  <Badge className="bg-blue-500">Recommended</Badge>
                </div>
                <p className="text-sm text-blue-800 mb-4">{path.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-blue-700">
                    <span>⏱️ {path.estimatedDuration} hours</span>
                    <span>📚 {path.stepIds.length} steps</span>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  <Button size="sm">
                    <Rocket className="h-4 w-4 mr-2" />
                    Continue Path
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChevronRight className="h-5 w-5 mr-2" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onboardingSteps
              .filter(step => step.unlocked && !step.isCompleted)
              .slice(0, 4)
              .map((step) => (
                <div key={step.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{step.title}</h4>
                    <Badge className={getDifficultyColor(step.difficulty)}>
                      {step.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>⏱️ {step.duration}min</span>
                      <span>🎯 {step.points} points</span>
                      {step.type === 'video' && <Video className="h-3 w-3" />}
                      {step.type === 'interactive' && <Zap className="h-3 w-3" />}
                      {step.type === 'quiz' && <MessageSquare className="h-3 w-3" />}
                    </div>
                  </div>
                  <Progress value={step.progress} className="mb-3" />
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => startStep(step)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {step.progress > 0 ? 'Continue' : 'Start'}
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.filter(badge => badge.isEarned).map((badge) => (
              <div key={badge.id} className="text-center p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-semibold text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
                <Badge className={getRarityColor(badge.rarity)} size="sm" className="mt-2">
                  {badge.rarity}
                </Badge>
              </div>
            ))}
            {badges.filter(badge => !badge.isEarned).slice(0, 2).map((badge) => (
              <div key={badge.id} className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg opacity-50">
                <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                <h4 className="font-semibold text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600">{badge.pointsRequired} points needed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TrainingLibrary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Library</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            All Categories
          </Button>
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Sort by Duration
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {['All', 'Setup', 'Training', 'Practice', 'Advanced'].map((category) => (
          <Button
            key={category}
            variant={category === 'All' ? 'default' : 'outline'}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Training Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {onboardingSteps.map((step) => (
          <Card key={step.id} className={`cursor-pointer transition-all ${step.unlocked ? 'hover:shadow-lg' : 'opacity-50'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {step.type === 'video' && <Video className="h-5 w-5 text-blue-600" />}
                  {step.type === 'interactive' && <Zap className="h-5 w-5 text-purple-600" />}
                  {step.type === 'tutorial' && <BookOpen className="h-5 w-5 text-green-600" />}
                  {step.type === 'quiz' && <MessageSquare className="h-5 w-5 text-orange-600" />}
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </div>
                {step.isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                {!step.unlocked && <Lock className="h-5 w-5 text-gray-400" />}
              </div>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <Badge className={getDifficultyColor(step.difficulty)}>
                      {step.difficulty}
                    </Badge>
                    <span className="text-gray-600">⏱️ {step.duration}min</span>
                    <span className="text-blue-600">🎯 {step.points} points</span>
                  </div>
                </div>

                <Progress value={step.progress} className="w-full" />

                <div className="text-xs text-gray-600">
                  <strong>You'll learn:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {step.content.objectives.slice(0, 2).map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                    {step.content.objectives.length > 2 && (
                      <li>+{step.content.objectives.length - 2} more</li>
                    )}
                  </ul>
                </div>

                {step.prerequisites.length > 0 && (
                  <div className="text-xs text-orange-600">
                    Prerequisites: {step.prerequisites.length} step(s)
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={!step.unlocked}
                  onClick={() => startStep(step)}
                >
                  {step.isCompleted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review
                    </>
                  ) : step.progress > 0 ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const LearningPaths = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Learning Paths</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Path
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{path.name}</CardTitle>
                {path.isRecommended && (
                  <Badge className="bg-blue-500">Recommended</Badge>
                )}
              </div>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <span className="text-gray-600">⏱️ {path.estimatedDuration}h</span>
                    <span className="text-blue-600">📚 {path.stepIds.length} steps</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Included Steps:</h5>
                  {path.stepIds.slice(0, 3).map((stepId) => {
                    const step = onboardingSteps.find(s => s.id === stepId);
                    return step ? (
                      <div key={stepId} className="flex items-center space-x-2 text-xs text-gray-600">
                        {step.isCompleted ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <div className="h-3 w-3 border border-gray-300 rounded-full" />
                        )}
                        <span>{step.title}</span>
                      </div>
                    ) : null;
                  })}
                  {path.stepIds.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{path.stepIds.length - 3} more steps
                    </div>
                  )}
                </div>

                <Button className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  {path.isRecommended ? 'Start Recommended Path' : 'Begin Path'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ProgressTracking = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Progress & Achievements</h2>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Progress
        </Button>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onboardingSteps.map((step) => (
                <div key={step.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{step.title}</span>
                    <span className="text-xs text-gray-500">{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{userProgress?.completedSteps.length}</div>
                  <div className="text-sm text-gray-600">Steps Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{userProgress?.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{userProgress?.timeSpent}</div>
                  <div className="text-sm text-gray-600">Minutes Learned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{userProgress?.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Learning Breakdown</h4>
                {['setup', 'training', 'practice', 'advanced'].map((category) => {
                  const categorySteps = onboardingSteps.filter(s => s.category === category);
                  const completedInCategory = categorySteps.filter(s => s.isCompleted).length;
                  const percentage = Math.round((completedInCategory / categorySteps.length) * 100);

                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{category}</span>
                        <span>{completedInCategory}/{categorySteps.length}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges and Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`text-center p-4 border rounded-lg transition-all ${
                  badge.isEarned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                    : 'border-dashed border-gray-300 opacity-50'
                }`}
              >
                <div className={`text-3xl mb-2 ${!badge.isEarned ? 'grayscale' : ''}`}>
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                <Badge className={getRarityColor(badge.rarity)} size="sm">
                  {badge.rarity}
                </Badge>
                {badge.isEarned && badge.earnedDate && (
                  <p className="text-xs text-green-600 mt-1">
                    Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                  </p>
                )}
                {!badge.isEarned && (
                  <p className="text-xs text-gray-500 mt-1">
                    {badge.pointsRequired} points needed
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Interactive Tutorial Modal
  const InteractiveTutorial = () => {
    if (!isInteractiveTutorial || !currentStep) return null;

    const currentTutorialStepData = currentStep.content.steps[currentTutorialStep];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{currentStep.title}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsInteractiveTutorial(false)}
            >
              ✕
            </Button>
          </div>

          <div className="mb-4">
            <Progress
              value={(currentTutorialStep / currentStep.content.steps.length) * 100}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Step {currentTutorialStep + 1} of {currentStep.content.steps.length}</span>
              <span>{Math.round((currentTutorialStep / currentStep.content.steps.length) * 100)}% Complete</span>
            </div>
          </div>

          {currentTutorialStepData && (
            <div className="space-y-4">
              <h3 className="font-semibold">{currentTutorialStepData.title}</h3>
              <p className="text-gray-700">{currentTutorialStepData.content}</p>

              {currentTutorialStepData.type === 'video' && (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Video player would be embedded here</p>
                  <Button className="mt-4">
                    <Play className="h-4 w-4 mr-2" />
                    Play Video
                  </Button>
                </div>
              )}

              {currentTutorialStepData.type === 'interactive' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800">Interactive element would be embedded here</p>
                  <Button className="mt-4">
                    <Rocket className="h-4 w-4 mr-2" />
                    Try Interactive Demo
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  disabled={currentTutorialStep === 0}
                  onClick={() => setCurrentTutorialStep(prev => prev - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {currentStep.content.steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentTutorialStep ? 'bg-blue-600' :
                        index < currentTutorialStep ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {currentTutorialStep < currentStep.content.steps.length - 1 ? (
                  <Button onClick={() => setCurrentTutorialStep(prev => prev + 1)}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      completeStep(currentStep.id);
                      setIsInteractiveTutorial(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Step
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Rocket className="h-8 w-8 mr-3 text-blue-600" />
            User Onboarding & Training
          </h1>
          <p className="text-gray-600">Your personalized learning journey to success</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button>
            <Share2 className="h-4 w-4 mr-2" />
            Share Progress
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="library">Training Library</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="progress">Progress & Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <OnboardingDashboard />
        </TabsContent>

        <TabsContent value="library">
          <TrainingLibrary />
        </TabsContent>

        <TabsContent value="paths">
          <LearningPaths />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracking />
        </TabsContent>
      </Tabs>

      <InteractiveTutorial />
    </div>
  );
};

export default UserOnboardingSystem;
