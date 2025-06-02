'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  TrendingUp,
  Award,
  MessageSquare,
  Target,
  Crown,
  Star,
  Trophy,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Download,
  Bell,
  Calendar,
  BarChart3,
  UserPlus,
  Gift,
  TreePine,
  FileBarChart,
  Share2
} from 'lucide-react';
import AdvancedGenealogyTree from './AdvancedGenealogyTree';
import GenealogyReports from './GenealogyReports';

// Team Member Interface
interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rank: string;
  rankLevel: number;
  joinDate: string;
  personalVolume: number;
  teamVolume: number;
  directRecruits: number;
  totalTeamSize: number;
  isActive: boolean;
  sponsor: string;
  children: TeamMember[];
  rankProgress: {
    current: string;
    next: string;
    progress: number;
    requirements: RankRequirement[];
  };
  performance: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    trend: 'up' | 'down' | 'stable';
  };
}

interface RankRequirement {
  type: 'personal_volume' | 'team_volume' | 'direct_recruits' | 'active_legs';
  description: string;
  required: number;
  current: number;
  completed: boolean;
}

const TeamManagementSystem = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [teamData, setTeamData] = useState<TeamMember[]>([]);

  // Sample data
  useEffect(() => {
    const sampleTeamData: TeamMember[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        rank: 'Diamond Director',
        rankLevel: 7,
        joinDate: '2022-01-15',
        personalVolume: 5500,
        teamVolume: 45000,
        directRecruits: 12,
        totalTeamSize: 156,
        isActive: true,
        sponsor: 'root',
        children: [
          {
            id: '2',
            name: 'Mike Chen',
            email: 'mike.chen@email.com',
            phone: '+1 (555) 234-5678',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            rank: 'Gold Manager',
            rankLevel: 5,
            joinDate: '2022-03-20',
            personalVolume: 3200,
            teamVolume: 18000,
            directRecruits: 8,
            totalTeamSize: 42,
            isActive: true,
            sponsor: '1',
            children: [
              {
                id: '3',
                name: 'Emma Rodriguez',
                email: 'emma.rodriguez@email.com',
                phone: '+1 (555) 345-6789',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                rank: 'Team Leader',
                rankLevel: 3,
                joinDate: '2022-06-10',
                personalVolume: 1800,
                teamVolume: 8500,
                directRecruits: 5,
                totalTeamSize: 18,
                isActive: true,
                sponsor: '2',
                children: [],
                rankProgress: {
                  current: 'Team Leader',
                  next: 'Manager',
                  progress: 75,
                  requirements: [
                    { type: 'personal_volume', description: 'Personal Volume', required: 2000, current: 1800, completed: false },
                    { type: 'team_volume', description: 'Team Volume', required: 10000, current: 8500, completed: false },
                    { type: 'direct_recruits', description: 'Direct Recruits', required: 6, current: 5, completed: false }
                  ]
                },
                performance: { thisMonth: 1800, lastMonth: 1600, thisYear: 18000, trend: 'up' }
              }
            ],
            rankProgress: {
              current: 'Gold Manager',
              next: 'Platinum Director',
              progress: 65,
              requirements: [
                { type: 'personal_volume', description: 'Personal Volume', required: 4000, current: 3200, completed: false },
                { type: 'team_volume', description: 'Team Volume', required: 25000, current: 18000, completed: false },
                { type: 'direct_recruits', description: 'Direct Recruits', required: 10, current: 8, completed: false }
              ]
            },
            performance: { thisMonth: 3200, lastMonth: 2800, thisYear: 28000, trend: 'up' }
          },
          {
            id: '4',
            name: 'David Kim',
            email: 'david.kim@email.com',
            phone: '+1 (555) 456-7890',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            rank: 'Manager',
            rankLevel: 4,
            joinDate: '2022-02-28',
            personalVolume: 2500,
            teamVolume: 12000,
            directRecruits: 6,
            totalTeamSize: 28,
            isActive: true,
            sponsor: '1',
            children: [],
            rankProgress: {
              current: 'Manager',
              next: 'Gold Manager',
              progress: 55,
              requirements: [
                { type: 'personal_volume', description: 'Personal Volume', required: 3000, current: 2500, completed: false },
                { type: 'team_volume', description: 'Team Volume', required: 15000, current: 12000, completed: false },
                { type: 'direct_recruits', description: 'Direct Recruits', required: 8, current: 6, completed: false }
              ]
            },
            performance: { thisMonth: 2500, lastMonth: 2300, thisYear: 25000, trend: 'up' }
          }
        ],
        rankProgress: {
          current: 'Diamond Director',
          next: 'Crown Ambassador',
          progress: 80,
          requirements: [
            { type: 'personal_volume', description: 'Personal Volume', required: 6000, current: 5500, completed: false },
            { type: 'team_volume', description: 'Team Volume', required: 50000, current: 45000, completed: false },
            { type: 'active_legs', description: 'Active Legs', required: 6, current: 5, completed: false }
          ]
        },
        performance: { thisMonth: 5500, lastMonth: 4800, thisYear: 52000, trend: 'up' }
      }
    ];
    setTeamData(sampleTeamData);
    if (sampleTeamData.length > 0) {
      setExpandedNodes(new Set(['1', '2'])); // Expand first two levels by default
    }
  }, []);

  const ranks = [
    { name: 'Associate', level: 1, color: 'bg-gray-500', icon: Star },
    { name: 'Senior Associate', level: 2, color: 'bg-blue-500', icon: Star },
    { name: 'Team Leader', level: 3, color: 'bg-green-500', icon: Users },
    { name: 'Manager', level: 4, color: 'bg-yellow-500', icon: Award },
    { name: 'Gold Manager', level: 5, color: 'bg-yellow-600', icon: Trophy },
    { name: 'Platinum Director', level: 6, color: 'bg-purple-500', icon: Crown },
    { name: 'Diamond Director', level: 7, color: 'bg-indigo-600', icon: Crown },
    { name: 'Crown Ambassador', level: 8, color: 'bg-red-600', icon: Crown }
  ];

  const getRankInfo = (rankName: string) => {
    return ranks.find(rank => rank.name === rankName) || ranks[0];
  };

  const GenealogyTreeNode = ({ member, level = 0 }: { member: TeamMember; level?: number }) => {
    const rankInfo = getRankInfo(member.rank);
    const isExpanded = expandedNodes.has(member.id);
    const hasChildren = member.children && member.children.length > 0;

    const toggleNode = () => {
      const newExpanded = new Set(expandedNodes);
      if (isExpanded) {
        newExpanded.delete(member.id);
      } else {
        newExpanded.add(member.id);
      }
      setExpandedNodes(newExpanded);
    };

    return (
      <div className="relative">
        <div className={`mb-4 ${level > 0 ? 'ml-8' : ''}`}>
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedMember?.id === member.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {hasChildren && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleNode(); }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                )}
                {!hasChildren && <div className="w-6" />}
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${rankInfo.color} text-white`}>
                      <rankInfo.icon className="h-3 w-3 mr-1" />
                      {member.rank}
                    </Badge>
                    <span className={`text-sm ${member.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Team: {member.totalTeamSize}</div>
                <div className="text-sm font-semibold">${member.teamVolume.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {member.performance.trend === 'up' && (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  )}
                  <span className={`text-xs ${
                    member.performance.trend === 'up' ? 'text-green-600' :
                    member.performance.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {member.performance.trend === 'up' ? '+' : ''}
                    {Math.round(((member.performance.thisMonth - member.performance.lastMonth) / member.performance.lastMonth) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-4 border-l-2 border-gray-200 pl-4">
            {member.children.map(child => (
              <GenealogyTreeNode key={child.id} member={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const RankProgressComponent = ({ member }: { member: TeamMember }) => {
    const currentRankInfo = getRankInfo(member.rankProgress.current);
    const nextRankInfo = getRankInfo(member.rankProgress.next);

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Rank Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge className={`${currentRankInfo.color} text-white`}>
                  <currentRankInfo.icon className="h-4 w-4 mr-2" />
                  Current: {member.rankProgress.current}
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline">
                  <nextRankInfo.icon className="h-4 w-4 mr-2" />
                  Next: {member.rankProgress.next}
                </Badge>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress to Next Rank</span>
                <span className="text-sm text-gray-600">{member.rankProgress.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${member.rankProgress.progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Requirements for {member.rankProgress.next}</h4>
              {member.rankProgress.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{req.description}</div>
                    <div className="text-sm text-gray-600">
                      {req.current.toLocaleString()} / {req.required.toLocaleString()}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className={`h-1 rounded-full ${req.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min((req.current / req.required) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {req.completed ? (
                      <Badge className="bg-green-500 text-white">✓ Complete</Badge>
                    ) : (
                      <Badge variant="outline">
                        {Math.round((req.current / req.required) * 100)}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {member.rankProgress.progress >= 100 && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Ready for Rank Advancement!</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const TeamAnalytics = () => {
    const totalMembers = 156;
    const activeMembers = 142;
    const newRecruits = 12;
    const totalVolume = 245000;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Team Size</p>
                  <p className="text-2xl font-bold">{totalMembers}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% this month
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
                  <p className="text-sm text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold">${totalVolume.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% this month
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Rate</p>
                  <p className="text-2xl font-bold">{Math.round((activeMembers / totalMembers) * 100)}%</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Target className="h-3 w-3 mr-1" />
                    Above target
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Recruits</p>
                  <p className="text-2xl font-bold">{newRecruits}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <UserPlus className="h-3 w-3 mr-1" />
                    This month
                  </p>
                </div>
                <UserPlus className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Rank Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ranks.map((rank) => {
                  const count = Math.floor(Math.random() * 20) + 1;
                  const percentage = (count / totalMembers) * 100;
                  return (
                    <div key={rank.level} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${rank.color} rounded`} />
                        <span className="font-medium">{rank.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{count}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${rank.color} h-2 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          />
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
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamData[0]?.children.slice(0, 3).map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.rank}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${member.teamVolume.toLocaleString()}</div>
                      <div className="text-sm text-green-600">+{member.performance.trend === 'up' ? '↗' : '→'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your team structure, track progress, and analyze performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      <Tabs defaultValue="genealogy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="genealogy">Genealogy Tree</TabsTrigger>
          <TabsTrigger value="advanced-tree">Advanced Tree</TabsTrigger>
          <TabsTrigger value="collaborative">Collaborative</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="ranks">Rank System</TabsTrigger>
          <TabsTrigger value="analytics">Team Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="genealogy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Team Structure</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="max-h-[600px] overflow-y-auto">
                  <div className="space-y-4">
                    {teamData.map(member => (
                      <GenealogyTreeNode key={member.id} member={member} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {selectedMember && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Member Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedMember.avatar}
                            alt={selectedMember.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{selectedMember.name}</h3>
                            <p className="text-gray-600">{selectedMember.email}</p>
                            <p className="text-sm text-gray-500">Joined: {new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Personal Volume</div>
                            <div className="font-semibold">${selectedMember.personalVolume.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Team Volume</div>
                            <div className="font-semibold">${selectedMember.teamVolume.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Direct Recruits</div>
                            <div className="font-semibold">{selectedMember.directRecruits}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Total Team</div>
                            <div className="font-semibold">{selectedMember.totalTeamSize}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <RankProgressComponent member={selectedMember} />
                </>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Team Members</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active This Month</span>
                      <span className="font-semibold text-green-600">142</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">New Recruits</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Team Volume</span>
                      <span className="font-semibold">$245,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced-tree" className="space-y-6">
          <AdvancedGenealogyTree />
        </TabsContent>

        <TabsContent value="collaborative" className="space-y-6">
          <div className="text-center py-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Collaborative Team Management</h3>
              <p className="text-gray-600 mb-4">
                Experience real-time collaboration with live cursors, team chat, and instant updates
              </p>
              <a
                href="/collaborative-team"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Open Collaborative Mode
              </a>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <GenealogyReports />
        </TabsContent>

        <TabsContent value="ranks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ranks.map((rank) => (
              <Card key={rank.level} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${rank.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <rank.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">{rank.name}</h3>
                  <p className="text-sm text-gray-600">Level {rank.level}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {Math.floor(Math.random() * 20) + 1} members
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rank Requirements</CardTitle>
              <CardDescription>
                Requirements to advance through the rank system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Rank</th>
                      <th className="text-left py-2">Personal Volume</th>
                      <th className="text-left py-2">Team Volume</th>
                      <th className="text-left py-2">Direct Recruits</th>
                      <th className="text-left py-2">Active Legs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Team Leader</td>
                      <td className="py-2">$2,000</td>
                      <td className="py-2">$10,000</td>
                      <td className="py-2">6</td>
                      <td className="py-2">3</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Manager</td>
                      <td className="py-2">$3,000</td>
                      <td className="py-2">$15,000</td>
                      <td className="py-2">8</td>
                      <td className="py-2">4</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Gold Manager</td>
                      <td className="py-2">$4,000</td>
                      <td className="py-2">$25,000</td>
                      <td className="py-2">10</td>
                      <td className="py-2">5</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Platinum Director</td>
                      <td className="py-2">$5,000</td>
                      <td className="py-2">$35,000</td>
                      <td className="py-2">12</td>
                      <td className="py-2">6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <TeamAnalytics />
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Team Announcements
                </CardTitle>
                <CardDescription>
                  Send messages and updates to your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <div className="font-medium">Monthly Team Meeting</div>
                      <div className="text-sm text-gray-600">Join us for our monthly team call this Friday at 7 PM EST</div>
                      <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                    </div>
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <div className="font-medium">New Product Launch</div>
                      <div className="text-sm text-gray-600">Exciting new products available in your back office!</div>
                      <div className="text-xs text-gray-500 mt-1">1 week ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Team Events
                </CardTitle>
                <CardDescription>
                  Schedule and manage team events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Event
                  </Button>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">Leadership Training</div>
                      <div className="text-sm text-gray-600">June 15, 2024 at 2:00 PM</div>
                      <div className="text-xs text-blue-600 mt-1">15 attendees</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">Product Demo</div>
                      <div className="text-sm text-gray-600">June 20, 2024 at 7:00 PM</div>
                      <div className="text-xs text-blue-600 mt-1">28 attendees</div>
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

export default TeamManagementSystem;
