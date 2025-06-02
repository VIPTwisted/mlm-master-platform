'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CreditCard,
  Download,
  Upload,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Award,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  RefreshCw,
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Send,
  Bell,
  Shield,
  Lock,
  Unlock,
  Activity,
  Globe,
  MapPin,
  Phone,
  Mail,
  Copy,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Info,
  HelpCircle,
  Star,
  Crown,
  Gift,
  Percent,
  Hash,
  Database,
  Network,
  TreePine,
  Layers,
  Box,
  Package
} from 'lucide-react';

interface CompensationPlan {
  id: string;
  name: string;
  type: 'binary' | 'unilevel' | 'matrix' | 'stairstep_breakaway' | 'hybrid';
  description: string;
  isActive: boolean;
  components: CompensationComponent[];
  ranks: Rank[];
  qualifications: PlanQualification[];
  payoutSchedule: PayoutSchedule;
  createdAt: string;
  updatedAt: string;
}

interface CompensationComponent {
  id: string;
  name: string;
  type: 'retail_commission' | 'team_bonus' | 'rank_bonus' | 'matching_bonus' | 'fast_start' | 'leadership_pool' | 'car_bonus' | 'infinity_bonus';
  percentage?: number;
  flatAmount?: number;
  maxLevels?: number;
  qualificationRequired?: string;
  conditions: ComponentCondition[];
  isActive: boolean;
}

interface ComponentCondition {
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
  description: string;
}

interface Rank {
  id: string;
  name: string;
  level: number;
  requirements: RankRequirement[];
  benefits: RankBenefit[];
  color: string;
  icon: string;
}

interface RankRequirement {
  type: 'personal_volume' | 'group_volume' | 'team_size' | 'rank_legs' | 'consecutive_months';
  value: number;
  description: string;
}

interface RankBenefit {
  type: 'commission_increase' | 'bonus_eligibility' | 'car_allowance' | 'travel_bonus' | 'recognition';
  value: number | string;
  description: string;
}

interface PlanQualification {
  id: string;
  name: string;
  type: 'monthly' | 'quarterly' | 'annual';
  requirements: QualificationRequirement[];
  benefits: string[];
}

interface QualificationRequirement {
  field: string;
  value: number;
  description: string;
}

interface PayoutSchedule {
  frequency: 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly';
  cutoffDay: number;
  payoutDay: number;
  minimumPayout: number;
  processingFee: number;
  currency: string;
}

interface Commission {
  id: string;
  memberId: string;
  memberName: string;
  planId: string;
  period: string;
  components: CommissionComponent[];
  totalAmount: number;
  status: 'calculated' | 'approved' | 'paid' | 'disputed' | 'cancelled';
  calculatedAt: string;
  paidAt?: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface CommissionComponent {
  componentId: string;
  componentName: string;
  amount: number;
  details: ComponentDetail[];
  sourceTransactions: string[];
}

interface ComponentDetail {
  description: string;
  amount: number;
  percentage?: number;
  volume?: number;
  level?: number;
  sourceId?: string;
}

interface PayoutBatch {
  id: string;
  planId: string;
  period: string;
  totalAmount: number;
  totalRecipients: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  processedAt?: string;
  failureReason?: string;
  commissions: string[];
}

interface MemberVolume {
  memberId: string;
  memberName: string;
  rank: string;
  personalVolume: number;
  groupVolume: number;
  teamSize: number;
  level: number;
  sponsor: string;
  recruits: string[];
  monthlyQualified: boolean;
}

const CommissionCalculationEngine = () => {
  const [compensationPlans, setCompensationPlans] = useState<CompensationPlan[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [payoutBatches, setPayoutBatches] = useState<PayoutBatch[]>([]);
  const [memberVolumes, setMemberVolumes] = useState<MemberVolume[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<CompensationPlan | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-06');

  useEffect(() => {
    // Sample compensation plans
    const samplePlans: CompensationPlan[] = [
      {
        id: 'plan-001',
        name: 'Binary Compensation Plan',
        type: 'binary',
        description: 'Two-leg binary tree structure with team volume matching',
        isActive: true,
        components: [
          {
            id: 'comp-001',
            name: 'Retail Commission',
            type: 'retail_commission',
            percentage: 25,
            conditions: [
              {
                field: 'product_category',
                operator: 'in',
                value: ['premium', 'standard'],
                description: 'Applies to premium and standard products'
              }
            ],
            isActive: true
          },
          {
            id: 'comp-002',
            name: 'Binary Team Bonus',
            type: 'team_bonus',
            percentage: 10,
            conditions: [
              {
                field: 'minimum_volume_each_leg',
                operator: 'greater_than',
                value: 100,
                description: 'Minimum $100 volume required in each leg'
              }
            ],
            isActive: true
          },
          {
            id: 'comp-003',
            name: 'Fast Start Bonus',
            type: 'fast_start',
            percentage: 20,
            conditions: [
              {
                field: 'recruit_first_30_days',
                operator: 'equals',
                value: true,
                description: 'Bonus for recruits in first 30 days'
              }
            ],
            isActive: true
          },
          {
            id: 'comp-004',
            name: 'Matching Bonus',
            type: 'matching_bonus',
            percentage: 25,
            maxLevels: 5,
            qualificationRequired: 'supervisor',
            conditions: [
              {
                field: 'minimum_rank',
                operator: 'greater_than',
                value: 2,
                description: 'Supervisor rank or higher required'
              }
            ],
            isActive: true
          }
        ],
        ranks: [
          {
            id: 'rank-001',
            name: 'Distributor',
            level: 1,
            requirements: [
              {
                type: 'personal_volume',
                value: 100,
                description: '$100 personal volume'
              }
            ],
            benefits: [
              {
                type: 'commission_increase',
                value: 0,
                description: 'Base commission rates'
              }
            ],
            color: 'bg-gray-500',
            icon: '🥉'
          },
          {
            id: 'rank-002',
            name: 'Supervisor',
            level: 2,
            requirements: [
              {
                type: 'personal_volume',
                value: 200,
                description: '$200 personal volume'
              },
              {
                type: 'group_volume',
                value: 1000,
                description: '$1,000 group volume'
              }
            ],
            benefits: [
              {
                type: 'commission_increase',
                value: 5,
                description: '5% commission increase'
              },
              {
                type: 'bonus_eligibility',
                value: 'matching_bonus',
                description: 'Eligible for matching bonus'
              }
            ],
            color: 'bg-blue-500',
            icon: '🥈'
          },
          {
            id: 'rank-003',
            name: 'Manager',
            level: 3,
            requirements: [
              {
                type: 'personal_volume',
                value: 300,
                description: '$300 personal volume'
              },
              {
                type: 'group_volume',
                value: 5000,
                description: '$5,000 group volume'
              },
              {
                type: 'rank_legs',
                value: 2,
                description: '2 legs with Supervisor rank'
              }
            ],
            benefits: [
              {
                type: 'commission_increase',
                value: 10,
                description: '10% commission increase'
              },
              {
                type: 'car_allowance',
                value: 500,
                description: '$500 monthly car allowance'
              }
            ],
            color: 'bg-purple-500',
            icon: '🥇'
          },
          {
            id: 'rank-004',
            name: 'Director',
            level: 4,
            requirements: [
              {
                type: 'personal_volume',
                value: 500,
                description: '$500 personal volume'
              },
              {
                type: 'group_volume',
                value: 25000,
                description: '$25,000 group volume'
              },
              {
                type: 'rank_legs',
                value: 3,
                description: '3 legs with Manager rank'
              }
            ],
            benefits: [
              {
                type: 'commission_increase',
                value: 15,
                description: '15% commission increase'
              },
              {
                type: 'car_allowance',
                value: 1000,
                description: '$1,000 monthly car allowance'
              },
              {
                type: 'travel_bonus',
                value: 2000,
                description: '$2,000 annual travel bonus'
              }
            ],
            color: 'bg-yellow-500',
            icon: '👑'
          }
        ],
        qualifications: [
          {
            id: 'qual-001',
            name: 'Monthly Active',
            type: 'monthly',
            requirements: [
              {
                field: 'personal_volume',
                value: 100,
                description: 'Minimum $100 personal volume'
              }
            ],
            benefits: ['Commission eligibility', 'Rank maintenance']
          }
        ],
        payoutSchedule: {
          frequency: 'monthly',
          cutoffDay: 25,
          payoutDay: 15,
          minimumPayout: 20,
          processingFee: 2.5,
          currency: 'USD'
        },
        createdAt: '2024-01-01',
        updatedAt: '2024-05-15'
      },
      {
        id: 'plan-002',
        name: 'Unilevel Compensation Plan',
        type: 'unilevel',
        description: 'Unlimited width with multiple level depth commissions',
        isActive: false,
        components: [
          {
            id: 'comp-005',
            name: 'Level Commissions',
            type: 'team_bonus',
            percentage: 0, // Variable by level
            maxLevels: 7,
            conditions: [
              {
                field: 'level_percentages',
                operator: 'equals',
                value: [8, 5, 4, 3, 2, 1, 1], // Level 1-7 percentages
                description: 'Commission percentages by level'
              }
            ],
            isActive: true
          },
          {
            id: 'comp-006',
            name: 'Generation Bonus',
            type: 'leadership_pool',
            percentage: 3,
            conditions: [
              {
                field: 'minimum_rank',
                operator: 'greater_than',
                value: 3,
                description: 'Director rank or higher'
              }
            ],
            isActive: true
          }
        ],
        ranks: [],
        qualifications: [],
        payoutSchedule: {
          frequency: 'weekly',
          cutoffDay: 7,
          payoutDay: 1,
          minimumPayout: 50,
          processingFee: 3.0,
          currency: 'USD'
        },
        createdAt: '2024-02-01',
        updatedAt: '2024-03-10'
      }
    ];

    // Sample commissions
    const sampleCommissions: Commission[] = [
      {
        id: 'comm-001',
        memberId: 'member-001',
        memberName: 'Sarah Johnson',
        planId: 'plan-001',
        period: '2024-06',
        components: [
          {
            componentId: 'comp-001',
            componentName: 'Retail Commission',
            amount: 250.00,
            details: [
              {
                description: 'Product sales commission (25%)',
                amount: 250.00,
                percentage: 25,
                volume: 1000
              }
            ],
            sourceTransactions: ['txn-001', 'txn-002']
          },
          {
            componentId: 'comp-002',
            componentName: 'Binary Team Bonus',
            amount: 180.00,
            details: [
              {
                description: 'Binary volume match (10%)',
                amount: 180.00,
                percentage: 10,
                volume: 1800
              }
            ],
            sourceTransactions: ['team-vol-001']
          },
          {
            componentId: 'comp-004',
            componentName: 'Matching Bonus',
            amount: 75.00,
            details: [
              {
                description: 'Level 1 matching (25%)',
                amount: 50.00,
                percentage: 25,
                level: 1
              },
              {
                description: 'Level 2 matching (25%)',
                amount: 25.00,
                percentage: 25,
                level: 2
              }
            ],
            sourceTransactions: ['match-001', 'match-002']
          }
        ],
        totalAmount: 505.00,
        status: 'paid',
        calculatedAt: '2024-06-25T10:00:00Z',
        paidAt: '2024-07-15T09:00:00Z',
        paymentMethod: 'bank_transfer',
        transactionId: 'PAY-2024-06-001'
      },
      {
        id: 'comm-002',
        memberId: 'member-002',
        memberName: 'Mike Chen',
        planId: 'plan-001',
        period: '2024-06',
        components: [
          {
            componentId: 'comp-001',
            componentName: 'Retail Commission',
            amount: 125.00,
            details: [
              {
                description: 'Product sales commission (25%)',
                amount: 125.00,
                percentage: 25,
                volume: 500
              }
            ],
            sourceTransactions: ['txn-003']
          },
          {
            componentId: 'comp-003',
            componentName: 'Fast Start Bonus',
            amount: 60.00,
            details: [
              {
                description: 'New recruit bonus (20%)',
                amount: 60.00,
                percentage: 20,
                volume: 300
              }
            ],
            sourceTransactions: ['recruit-001']
          }
        ],
        totalAmount: 185.00,
        status: 'approved',
        calculatedAt: '2024-06-25T10:00:00Z'
      }
    ];

    // Sample payout batches
    const samplePayoutBatches: PayoutBatch[] = [
      {
        id: 'batch-001',
        planId: 'plan-001',
        period: '2024-06',
        totalAmount: 15750.00,
        totalRecipients: 47,
        status: 'completed',
        createdAt: '2024-06-25T10:00:00Z',
        processedAt: '2024-07-15T09:00:00Z',
        commissions: ['comm-001', 'comm-002']
      },
      {
        id: 'batch-002',
        planId: 'plan-001',
        period: '2024-07',
        totalAmount: 18200.00,
        totalRecipients: 52,
        status: 'processing',
        createdAt: '2024-07-25T10:00:00Z',
        commissions: []
      }
    ];

    // Sample member volumes
    const sampleMemberVolumes: MemberVolume[] = [
      {
        memberId: 'member-001',
        memberName: 'Sarah Johnson',
        rank: 'Manager',
        personalVolume: 1000,
        groupVolume: 8500,
        teamSize: 15,
        level: 0,
        sponsor: '',
        recruits: ['member-002', 'member-003'],
        monthlyQualified: true
      },
      {
        memberId: 'member-002',
        memberName: 'Mike Chen',
        rank: 'Supervisor',
        personalVolume: 500,
        groupVolume: 2200,
        teamSize: 5,
        level: 1,
        sponsor: 'member-001',
        recruits: ['member-004'],
        monthlyQualified: true
      },
      {
        memberId: 'member-003',
        memberName: 'Emily Davis',
        rank: 'Distributor',
        personalVolume: 300,
        groupVolume: 300,
        teamSize: 1,
        level: 1,
        sponsor: 'member-001',
        recruits: [],
        monthlyQualified: true
      }
    ];

    setCompensationPlans(samplePlans);
    setCommissions(sampleCommissions);
    setPayoutBatches(samplePayoutBatches);
    setMemberVolumes(sampleMemberVolumes);
    setSelectedPlan(samplePlans[0]);
  }, []);

  const calculateCommissions = async (planId: string, period: string) => {
    setIsCalculating(true);

    // Simulate calculation process
    setTimeout(() => {
      console.log(`Calculating commissions for plan ${planId}, period ${period}`);
      setIsCalculating(false);

      // In a real application, this would trigger the actual calculation engine
      alert(`Commission calculation completed for ${period}`);
    }, 3000);
  };

  const processPayouts = async (batchId: string) => {
    console.log(`Processing payouts for batch ${batchId}`);

    setPayoutBatches(prev => prev.map(batch =>
      batch.id === batchId
        ? { ...batch, status: 'processing' as const }
        : batch
    ));

    // Simulate payout processing
    setTimeout(() => {
      setPayoutBatches(prev => prev.map(batch =>
        batch.id === batchId
          ? { ...batch, status: 'completed' as const, processedAt: new Date().toISOString() }
          : batch
      ));
      alert('Payouts processed successfully!');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'calculated':
      case 'pending':
        return 'bg-blue-500';
      case 'approved':
        return 'bg-yellow-500';
      case 'paid':
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-purple-500';
      case 'disputed':
      case 'failed':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const CommissionOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Commissions</p>
                <p className="text-2xl font-bold">
                  $${commissions.reduce((sum, comm) => sum + comm.totalAmount, 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% vs last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Recipients</p>
                <p className="text-2xl font-bold">{commissions.length}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  This period
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
                <p className="text-sm text-gray-600">Avg Commission</p>
                <p className="text-2xl font-bold">
                  $${(commissions.reduce((sum, comm) => sum + comm.totalAmount, 0) / commissions.length).toFixed(0)}
                </p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Per recipient
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
                <p className="text-sm text-gray-600">Payout Status</p>
                <p className="text-2xl font-bold">
                  {Math.round((commissions.filter(c => c.status === 'paid').length / commissions.length) * 100)}%
                </p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Compensation Plan */}
      {selectedPlan && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Active Compensation Plan
                </CardTitle>
                <CardDescription>{selectedPlan.description}</CardDescription>
              </div>
              <Badge className={selectedPlan.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                {selectedPlan.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Plan Details</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {selectedPlan.name}</div>
                  <div><strong>Type:</strong> {selectedPlan.type.replace('_', ' ')}</div>
                  <div><strong>Components:</strong> {selectedPlan.components.length}</div>
                  <div><strong>Ranks:</strong> {selectedPlan.ranks.length}</div>
                  <div><strong>Payout:</strong> {selectedPlan.payoutSchedule.frequency}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Commission Components</h4>
                <div className="space-y-2">
                  {selectedPlan.components.slice(0, 3).map((component) => (
                    <div key={component.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                      <span>{component.name}</span>
                      <span className="font-medium">
                        {component.percentage ? `${component.percentage}%` :
                         component.flatAmount ? `$${component.flatAmount}` : 'Variable'}
                      </span>
                    </div>
                  ))}
                  {selectedPlan.components.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{selectedPlan.components.length - 3} more
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Rank Structure</h4>
                <div className="space-y-2">
                  {selectedPlan.ranks.slice(0, 4).map((rank) => (
                    <div key={rank.id} className="flex items-center space-x-2 text-sm">
                      <span className="text-lg">{rank.icon}</span>
                      <span>{rank.name}</span>
                      <Badge className={rank.color} size="sm">
                        Level {rank.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <Button onClick={() => calculateCommissions(selectedPlan.id, selectedPeriod)}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Commissions
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Plan
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Plan Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Commission Calculations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Commission Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissions.slice(0, 5).map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{commission.memberName}</div>
                  <div className="text-sm text-gray-600">
                    Period: {commission.period} • {commission.components.length} components
                  </div>
                  <div className="text-xs text-gray-500">
                    Calculated: {new Date(commission.calculatedAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${commission.totalAmount.toFixed(2)}</div>
                  <Badge className={getStatusColor(commission.status)}>
                    {commission.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CompensationPlans = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Compensation Plans</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {compensationPlans.map((plan) => (
          <Card key={plan.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={plan.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline">{plan.type.replace('_', ' ')}</Badge>
                </div>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Components:</span>
                    <span className="font-medium ml-2">{plan.components.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ranks:</span>
                    <span className="font-medium ml-2">{plan.ranks.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payout:</span>
                    <span className="font-medium ml-2">{plan.payoutSchedule.frequency}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Min Payout:</span>
                    <span className="font-medium ml-2">${plan.payoutSchedule.minimumPayout}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Commission Components</h5>
                  <div className="space-y-1">
                    {plan.components.slice(0, 3).map((component) => (
                      <div key={component.id} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                        <span>{component.name}</span>
                        <span className="font-medium">
                          {component.percentage ? `${component.percentage}%` :
                           component.flatAmount ? `$${component.flatAmount}` : 'Variable'}
                        </span>
                      </div>
                    ))}
                    {plan.components.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{plan.components.length - 3} more components
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={() => setSelectedPlan(plan)}>
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calculator className="h-3 w-3 mr-1" />
                    Calculate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation Plan Builder</CardTitle>
          <CardDescription>Create custom compensation plans with flexible rules and components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 border-dashed border-2 border-gray-300 hover:border-blue-500 cursor-pointer">
              <div className="text-center">
                <Network className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h4 className="font-semibold">Binary Plan</h4>
                <p className="text-sm text-gray-600">Two-leg structure with volume matching</p>
              </div>
            </Card>

            <Card className="p-4 border-dashed border-2 border-gray-300 hover:border-blue-500 cursor-pointer">
              <div className="text-center">
                <TreePine className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h4 className="font-semibold">Unilevel Plan</h4>
                <p className="text-sm text-gray-600">Unlimited width with level commissions</p>
              </div>
            </Card>

            <Card className="p-4 border-dashed border-2 border-gray-300 hover:border-blue-500 cursor-pointer">
              <div className="text-center">
                <Layers className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h4 className="font-semibold">Matrix Plan</h4>
                <p className="text-sm text-gray-600">Fixed width and depth structure</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CommissionReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Commission Reports</h2>
        <div className="flex items-center space-x-3">
          <select
            className="px-3 py-2 border rounded-lg"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="2024-06">June 2024</option>
            <option value="2024-05">May 2024</option>
            <option value="2024-04">April 2024</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Commission Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Summary - {selectedPeriod}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium">Member</th>
                  <th className="text-left p-3 font-medium">Rank</th>
                  <th className="text-right p-3 font-medium">Personal Vol.</th>
                  <th className="text-right p-3 font-medium">Group Vol.</th>
                  <th className="text-right p-3 font-medium">Total Commission</th>
                  <th className="text-center p-3 font-medium">Status</th>
                  <th className="text-center p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((commission) => {
                  const member = memberVolumes.find(m => m.memberId === commission.memberId);
                  return (
                    <tr key={commission.id} className="border-t">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{commission.memberName}</div>
                          <div className="text-xs text-gray-600">{commission.memberId}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{member?.rank || 'N/A'}</Badge>
                      </td>
                      <td className="p-3 text-right">${member?.personalVolume.toLocaleString()}</td>
                      <td className="p-3 text-right">${member?.groupVolume.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-green-600">
                        ${commission.totalAmount.toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={getStatusColor(commission.status)}>
                          {commission.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Commission Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Commission by Component</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedPlan?.components.map((component) => {
                const componentTotal = commissions.reduce((sum, comm) => {
                  const compAmount = comm.components
                    .filter(c => c.componentId === component.id)
                    .reduce((compSum, c) => compSum + c.amount, 0);
                  return sum + compAmount;
                }, 0);

                return (
                  <div key={component.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="text-sm text-gray-600">{component.type.replace('_', ' ')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${componentTotal.toFixed(2)}</div>
                      <div className="text-xs text-gray-600">
                        {component.percentage ? `${component.percentage}% rate` : 'Variable rate'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Earners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commissions
                .sort((a, b) => b.totalAmount - a.totalAmount)
                .slice(0, 5)
                .map((commission, index) => (
                  <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{commission.memberName}</div>
                        <div className="text-xs text-gray-600">
                          {memberVolumes.find(m => m.memberId === commission.memberId)?.rank}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${commission.totalAmount.toFixed(2)}</div>
                      <div className="text-xs text-gray-600">{commission.components.length} components</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const PayoutManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payout Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Payout Batch
        </Button>
      </div>

      {/* Payout Batches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payout Batches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payoutBatches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">
                    {compensationPlans.find(p => p.id === batch.planId)?.name} - {batch.period}
                  </div>
                  <div className="text-sm text-gray-600">
                    {batch.totalRecipients} recipients • Created: {new Date(batch.createdAt).toLocaleDateString()}
                  </div>
                  {batch.processedAt && (
                    <div className="text-xs text-gray-500">
                      Processed: {new Date(batch.processedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-green-600">${batch.totalAmount.toLocaleString()}</div>
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    {batch.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => processPayouts(batch.id)}
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Process
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout Schedule */}
      {selectedPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Payout Schedule Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Current Schedule</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">{selectedPlan.payoutSchedule.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cutoff Day:</span>
                    <span className="font-medium">{selectedPlan.payoutSchedule.cutoffDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payout Day:</span>
                    <span className="font-medium">{selectedPlan.payoutSchedule.payoutDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Payout:</span>
                    <span className="font-medium">${selectedPlan.payoutSchedule.minimumPayout}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-medium">{selectedPlan.payoutSchedule.processingFee}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Next Payout Schedule</h4>
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Next Cutoff: July 25, 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Next Payout: August 15, 2024</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated payout amount: $18,500 to 52 recipients
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configure Schedule
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Payouts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Bank Transfer</h4>
              <p className="text-sm text-gray-600">ACH/Wire transfers</p>
              <div className="mt-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Primary</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">PayPal</h4>
              <p className="text-sm text-gray-600">Instant payments</p>
              <div className="mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Available</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg text-center opacity-50">
              <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold">Digital Wallet</h4>
              <p className="text-sm text-gray-600">Crypto payments</p>
              <div className="mt-2">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Calculation Progress Modal
  const CalculationProgress = () => {
    if (!isCalculating) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">Calculating Commissions</h3>
            <p className="text-gray-600 mb-4">Processing member volumes and applying compensation rules...</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Loading member data...</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Calculating volumes...</span>
                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Applying compensation rules...</span>
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Generating payouts...</span>
                <Clock className="h-4 w-4" />
              </div>
            </div>

            <Progress value={33} className="mt-4" />
            <p className="text-xs text-gray-500 mt-2">This may take a few minutes...</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Calculator className="h-8 w-8 mr-3 text-blue-600" />
            Commission Calculation Engine
          </h1>
          <p className="text-gray-600">Advanced MLM compensation management with automated payouts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Compensation Plans</TabsTrigger>
          <TabsTrigger value="reports">Commission Reports</TabsTrigger>
          <TabsTrigger value="payouts">Payout Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CommissionOverview />
        </TabsContent>

        <TabsContent value="plans">
          <CompensationPlans />
        </TabsContent>

        <TabsContent value="reports">
          <CommissionReports />
        </TabsContent>

        <TabsContent value="payouts">
          <PayoutManagement />
        </TabsContent>
      </Tabs>

      <CalculationProgress />
    </div>
  );
};

export default CommissionCalculationEngine;
