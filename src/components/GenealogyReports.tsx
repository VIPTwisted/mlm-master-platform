'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Award,
  Filter,
  Search,
  FileSpreadsheet,
  FileText,
  Mail
} from 'lucide-react';

interface ReportData {
  id: string;
  name: string;
  email: string;
  rank: string;
  personalVolume: number;
  teamVolume: number;
  directRecruits: number;
  totalTeamSize: number;
  joinDate: string;
  lastActivity: string;
  isActive: boolean;
  sponsor: string;
  leg: number;
  depth: number;
  commissions: number;
  bonuses: number;
}

interface TeamPerformance {
  period: string;
  personalVolume: number;
  teamVolume: number;
  newRecruits: number;
  activeMembers: number;
  totalCommissions: number;
}

interface RankDistribution {
  rank: string;
  count: number;
  percentage: number;
  averageVolume: number;
}

const GenealogyReports = () => {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [performanceData, setPerformanceData] = useState<TeamPerformance[]>([]);
  const [rankDistribution, setRankDistribution] = useState<RankDistribution[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeg, setSelectedLeg] = useState('all');

  useEffect(() => {
    // Sample data - in real app this would come from API
    const sampleReportData: ReportData[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        rank: 'Diamond Director',
        personalVolume: 5500,
        teamVolume: 125000,
        directRecruits: 15,
        totalTeamSize: 245,
        joinDate: '2022-01-15',
        lastActivity: '2024-06-01',
        isActive: true,
        sponsor: '',
        leg: 0,
        depth: 0,
        commissions: 12500,
        bonuses: 8500
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        rank: 'Gold Manager',
        personalVolume: 3200,
        teamVolume: 45000,
        directRecruits: 12,
        totalTeamSize: 68,
        joinDate: '2022-03-20',
        lastActivity: '2024-05-28',
        isActive: true,
        sponsor: 'Sarah Johnson',
        leg: 1,
        depth: 1,
        commissions: 4500,
        bonuses: 2800
      },
      // Add more sample data...
    ];

    const samplePerformanceData: TeamPerformance[] = [
      {
        period: '2024-06',
        personalVolume: 5500,
        teamVolume: 125000,
        newRecruits: 8,
        activeMembers: 242,
        totalCommissions: 21000
      },
      {
        period: '2024-05',
        personalVolume: 4800,
        teamVolume: 118000,
        newRecruits: 6,
        activeMembers: 238,
        totalCommissions: 19500
      },
      {
        period: '2024-04',
        personalVolume: 4200,
        teamVolume: 112000,
        newRecruits: 4,
        activeMembers: 235,
        totalCommissions: 18200
      }
    ];

    const sampleRankDistribution: RankDistribution[] = [
      { rank: 'Associate', count: 128, percentage: 52.2, averageVolume: 450 },
      { rank: 'Senior Associate', count: 64, percentage: 26.1, averageVolume: 850 },
      { rank: 'Team Leader', count: 32, percentage: 13.1, averageVolume: 1200 },
      { rank: 'Manager', count: 12, percentage: 4.9, averageVolume: 2800 },
      { rank: 'Gold Manager', count: 6, percentage: 2.4, averageVolume: 3200 },
      { rank: 'Platinum Director', count: 2, percentage: 0.8, averageVolume: 4500 },
      { rank: 'Diamond Director', count: 1, percentage: 0.4, averageVolume: 5500 }
    ];

    setReportData(sampleReportData);
    setPerformanceData(samplePerformanceData);
    setRankDistribution(sampleRankDistribution);
  }, []);

  const filteredData = reportData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TeamOverviewReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">245</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3.2% this month
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
                <p className="text-sm text-gray-600">Team Volume</p>
                <p className="text-2xl font-bold">$125K</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +6.8% this month
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
                <p className="text-sm text-gray-600">Active Rate</p>
                <p className="text-2xl font-bold">98.8%</p>
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
                <p className="text-sm text-gray-600">Avg. Depth</p>
                <p className="text-2xl font-bold">3.8</p>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Levels deep
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
            <CardTitle>Rank Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankDistribution.map((rank, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded" style={{
                      backgroundColor: `hsl(${220 + index * 30}, 70%, ${60 + index * 5}%)`
                    }} />
                    <span className="font-medium">{rank.rank}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{rank.count}</span>
                    <span className="text-sm font-medium">{rank.percentage}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${rank.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((period, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{period.period}</div>
                    <div className="text-sm text-gray-600">
                      ${period.teamVolume.toLocaleString()} volume
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${period.totalCommissions.toLocaleString()}</div>
                    <div className="text-sm text-green-600">
                      {period.newRecruits} new recruits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const DetailedMemberReport = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button onClick={() => exportToCSV(filteredData, 'member-report')}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">Member</th>
                  <th className="text-left p-4 font-medium">Rank</th>
                  <th className="text-right p-4 font-medium">Personal Vol.</th>
                  <th className="text-right p-4 font-medium">Team Vol.</th>
                  <th className="text-right p-4 font-medium">Team Size</th>
                  <th className="text-right p-4 font-medium">Commissions</th>
                  <th className="text-center p-4 font-medium">Status</th>
                  <th className="text-center p-4 font-medium">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((member, index) => (
                  <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-gray-600 text-xs">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{member.rank}</Badge>
                    </td>
                    <td className="p-4 text-right font-medium">
                      ${member.personalVolume.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-medium">
                      ${member.teamVolume.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">{member.totalTeamSize}</td>
                    <td className="p-4 text-right font-medium text-green-600">
                      ${member.commissions.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={member.isActive ? 'bg-green-500' : 'bg-red-500'}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      {new Date(member.lastActivity).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const VolumeAnalysisReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Volume by Leg Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((leg) => {
                const legVolume = Math.floor(Math.random() * 25000) + 5000;
                const legMembers = Math.floor(Math.random() * 50) + 10;
                return (
                  <div key={leg} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Leg {leg}</div>
                      <div className="text-sm text-gray-600">{legMembers} members</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${legVolume.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        {Math.round((legVolume / 125000) * 100)}% of total
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
            <CardTitle>Depth Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((depth) => {
                const depthMembers = Math.floor(Math.random() * 60) + 20;
                const depthVolume = Math.floor(Math.random() * 30000) + 8000;
                return (
                  <div key={depth} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Level {depth}</div>
                      <div className="text-sm text-gray-600">{depthMembers} members</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${depthVolume.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        Avg: ${Math.round(depthVolume / depthMembers).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Volume Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceData.map((period, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold">${period.teamVolume.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{period.period}</div>
                <div className="mt-2">
                  {index > 0 && (
                    <span className={`text-sm flex items-center justify-center ${
                      period.teamVolume > performanceData[index - 1].teamVolume
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {period.teamVolume > performanceData[index - 1].teamVolume
                        ? <TrendingUp className="h-3 w-3 mr-1" />
                        : <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {Math.abs(Math.round(((period.teamVolume - performanceData[index - 1].teamVolume) / performanceData[index - 1].teamVolume) * 100))}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ActivityReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">242</div>
              <div className="text-sm text-gray-600">Active Members</div>
              <div className="text-xs text-green-600 mt-1">98.8% activity rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">18</div>
              <div className="text-sm text-gray-600">New This Month</div>
              <div className="text-xs text-blue-600 mt-1">+3 from last month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Inactive Members</div>
              <div className="text-xs text-orange-600 mt-1">Need attention</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15.2</div>
              <div className="text-sm text-gray-600">Avg Days Active</div>
              <div className="text-xs text-purple-600 mt-1">This month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.slice(0, 10).map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">Last active: {new Date(member.lastActivity).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={member.isActive ? 'bg-green-500' : 'bg-red-500'}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </Badge>
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
          <h1 className="text-3xl font-bold">Genealogy Reports</h1>
          <p className="text-gray-600">Comprehensive analysis and reporting of your team structure</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Print Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="members">Member Details</TabsTrigger>
          <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
          <TabsTrigger value="activity">Activity Report</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TeamOverviewReport />
        </TabsContent>

        <TabsContent value="members">
          <DetailedMemberReport />
        </TabsContent>

        <TabsContent value="volume">
          <VolumeAnalysisReport />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenealogyReports;
