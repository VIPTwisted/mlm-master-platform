'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ZoomIn,
  ZoomOut,
  Download,
  Maximize,
  Search,
  Filter,
  Users,
  TrendingUp,
  Crown,
  Award,
  Star,
  Trophy
} from 'lucide-react';

interface TreeNode {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rank: string;
  rankLevel: number;
  personalVolume: number;
  teamVolume: number;
  directRecruits: number;
  totalTeamSize: number;
  isActive: boolean;
  joinDate: string;
  children?: TreeNode[];
  x?: number;
  y?: number;
  depth?: number;
  parent?: TreeNode;
}

interface D3Node extends d3.HierarchyNode<TreeNode> {
  x: number;
  y: number;
}

const AdvancedGenealogyTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [viewMode, setViewMode] = useState<'radial' | 'vertical' | 'horizontal'>('vertical');

  // Sample hierarchical data
  useEffect(() => {
    const sampleData: TreeNode = {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rank: 'Diamond Director',
      rankLevel: 7,
      personalVolume: 5500,
      teamVolume: 125000,
      directRecruits: 15,
      totalTeamSize: 245,
      isActive: true,
      joinDate: '2022-01-15',
      children: [
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike.chen@email.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          rank: 'Gold Manager',
          rankLevel: 5,
          personalVolume: 3200,
          teamVolume: 45000,
          directRecruits: 12,
          totalTeamSize: 68,
          isActive: true,
          joinDate: '2022-03-20',
          children: [
            {
              id: '3',
              name: 'Emma Rodriguez',
              email: 'emma.rodriguez@email.com',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              rank: 'Team Leader',
              rankLevel: 3,
              personalVolume: 1800,
              teamVolume: 12000,
              directRecruits: 8,
              totalTeamSize: 22,
              isActive: true,
              joinDate: '2022-06-10',
              children: [
                {
                  id: '5',
                  name: 'Alex Thompson',
                  email: 'alex.thompson@email.com',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
                  rank: 'Associate',
                  rankLevel: 1,
                  personalVolume: 800,
                  teamVolume: 2400,
                  directRecruits: 3,
                  totalTeamSize: 5,
                  isActive: true,
                  joinDate: '2023-01-15'
                },
                {
                  id: '6',
                  name: 'Maria Garcia',
                  email: 'maria.garcia@email.com',
                  avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100',
                  rank: 'Senior Associate',
                  rankLevel: 2,
                  personalVolume: 1200,
                  teamVolume: 4800,
                  directRecruits: 4,
                  totalTeamSize: 8,
                  isActive: true,
                  joinDate: '2022-11-20'
                }
              ]
            },
            {
              id: '7',
              name: 'James Wilson',
              email: 'james.wilson@email.com',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              rank: 'Manager',
              rankLevel: 4,
              personalVolume: 2800,
              teamVolume: 18000,
              directRecruits: 6,
              totalTeamSize: 28,
              isActive: true,
              joinDate: '2022-05-15'
            }
          ]
        },
        {
          id: '4',
          name: 'David Kim',
          email: 'david.kim@email.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          rank: 'Platinum Director',
          rankLevel: 6,
          personalVolume: 4500,
          teamVolume: 65000,
          directRecruits: 18,
          totalTeamSize: 98,
          isActive: true,
          joinDate: '2022-02-28',
          children: [
            {
              id: '8',
              name: 'Lisa Chang',
              email: 'lisa.chang@email.com',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
              rank: 'Gold Manager',
              rankLevel: 5,
              personalVolume: 3800,
              teamVolume: 28000,
              directRecruits: 10,
              totalTeamSize: 42,
              isActive: true,
              joinDate: '2022-08-12'
            },
            {
              id: '9',
              name: 'Robert Davis',
              email: 'robert.davis@email.com',
              avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
              rank: 'Manager',
              rankLevel: 4,
              personalVolume: 2200,
              teamVolume: 15000,
              directRecruits: 7,
              totalTeamSize: 25,
              isActive: true,
              joinDate: '2022-09-25'
            }
          ]
        }
      ]
    };
    setTreeData(sampleData);
  }, []);

  const ranks = [
    { name: 'Associate', level: 1, color: '#6b7280', icon: Star },
    { name: 'Senior Associate', level: 2, color: '#3b82f6', icon: Star },
    { name: 'Team Leader', level: 3, color: '#10b981', icon: Users },
    { name: 'Manager', level: 4, color: '#f59e0b', icon: Award },
    { name: 'Gold Manager', level: 5, color: '#d97706', icon: Trophy },
    { name: 'Platinum Director', level: 6, color: '#8b5cf6', icon: Crown },
    { name: 'Diamond Director', level: 7, color: '#4f46e5', icon: Crown },
    { name: 'Crown Ambassador', level: 8, color: '#dc2626', icon: Crown }
  ];

  const getRankColor = (rankName: string) => {
    const rank = ranks.find(r => r.name === rankName);
    return rank ? rank.color : '#6b7280';
  };

  const drawVerticalTree = (root: d3.HierarchyNode<TreeNode>) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1200;
    const height = 800;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const treeLayout = d3.tree<TreeNode>()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    const treeRoot = treeLayout(root);

    // Draw links
    g.selectAll('.link')
      .data(treeRoot.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical<any, d3.HierarchyPointNode<TreeNode>>()
        .x(d => d.x)
        .y(d => d.y))
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Draw nodes
    const node = g.selectAll('.node')
      .data(treeRoot.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d.data);
      });

    // Node circles with rank colors
    node.append('circle')
      .attr('r', d => d.depth === 0 ? 25 : 20)
      .attr('fill', d => getRankColor(d.data.rank))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))');

    // Node images
    node.append('clipPath')
      .attr('id', d => `clip-${d.data.id}`)
      .append('circle')
      .attr('r', d => d.depth === 0 ? 22 : 17);

    node.append('image')
      .attr('x', d => d.depth === 0 ? -22 : -17)
      .attr('y', d => d.depth === 0 ? -22 : -17)
      .attr('width', d => d.depth === 0 ? 44 : 34)
      .attr('height', d => d.depth === 0 ? 44 : 34)
      .attr('clip-path', d => `url(#clip-${d.data.id})`)
      .attr('href', d => d.data.avatar);

    // Activity indicator
    node.filter(d => d.data.isActive)
      .append('circle')
      .attr('cx', 15)
      .attr('cy', -15)
      .attr('r', 4)
      .attr('fill', '#10b981');

    // Name labels
    node.append('text')
      .attr('dy', d => d.depth === 0 ? 40 : 35)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', d => d.depth === 0 ? '14px' : '12px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text(d => d.data.name);

    // Rank labels
    node.append('text')
      .attr('dy', d => d.depth === 0 ? 55 : 50)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', '10px')
      .style('fill', '#6b7280')
      .text(d => d.data.rank);

    // Team size indicators
    node.append('text')
      .attr('dy', d => d.depth === 0 ? 70 : 65)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', '10px')
      .style('fill', '#4f46e5')
      .style('font-weight', 'bold')
      .text(d => `Team: ${d.data.totalTeamSize}`);

    // Add zoom and pan
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom as any);
  };

  const drawRadialTree = (root: d3.HierarchyNode<TreeNode>) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1200;
    const height = 800;
    const radius = Math.min(width, height) / 2 - 50;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const treeLayout = d3.tree<TreeNode>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    const treeRoot = treeLayout(root);

    // Draw links
    g.selectAll('.link')
      .data(treeRoot.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkRadial<any, d3.HierarchyPointNode<TreeNode>>()
        .angle(d => d.x)
        .radius(d => d.y))
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Draw nodes
    const node = g.selectAll('.node')
      .data(treeRoot.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d.data);
      });

    // Node circles
    node.append('circle')
      .attr('r', d => d.depth === 0 ? 25 : 20)
      .attr('fill', d => getRankColor(d.data.rank))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3);

    // Node images
    node.append('clipPath')
      .attr('id', d => `radial-clip-${d.data.id}`)
      .append('circle')
      .attr('r', d => d.depth === 0 ? 22 : 17);

    node.append('image')
      .attr('x', d => d.depth === 0 ? -22 : -17)
      .attr('y', d => d.depth === 0 ? -22 : -17)
      .attr('width', d => d.depth === 0 ? 44 : 34)
      .attr('height', d => d.depth === 0 ? 44 : 34)
      .attr('clip-path', d => `url(#radial-clip-${d.data.id})`)
      .attr('href', d => d.data.avatar);

    // Text labels (rotated for readability)
    node.append('text')
      .attr('dy', '.31em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    // Add zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', `translate(${width / 2},${height / 2}) ${event.transform}`);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom as any);
  };

  const drawHorizontalTree = (root: d3.HierarchyNode<TreeNode>) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1400;
    const height = 800;
    const margin = { top: 50, right: 50, bottom: 50, left: 100 };

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const treeLayout = d3.tree<TreeNode>()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const treeRoot = treeLayout(root);

    // Draw links
    g.selectAll('.link')
      .data(treeRoot.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<any, d3.HierarchyPointNode<TreeNode>>()
        .x(d => d.y)
        .y(d => d.x))
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Draw nodes
    const node = g.selectAll('.node')
      .data(treeRoot.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d.data);
      });

    // Node circles
    node.append('circle')
      .attr('r', d => d.depth === 0 ? 25 : 20)
      .attr('fill', d => getRankColor(d.data.rank))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3);

    // Node images
    node.append('clipPath')
      .attr('id', d => `horizontal-clip-${d.data.id}`)
      .append('circle')
      .attr('r', d => d.depth === 0 ? 22 : 17);

    node.append('image')
      .attr('x', d => d.depth === 0 ? -22 : -17)
      .attr('y', d => d.depth === 0 ? -22 : -17)
      .attr('width', d => d.depth === 0 ? 44 : 34)
      .attr('height', d => d.depth === 0 ? 44 : 34)
      .attr('clip-path', d => `url(#horizontal-clip-${d.data.id})`)
      .attr('href', d => d.data.avatar);

    // Name labels
    node.append('text')
      .attr('dx', d => d.children ? -35 : 35)
      .attr('dy', '.31em')
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    // Add zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', `translate(${margin.left},${margin.top}) ${event.transform}`);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom as any);
  };

  useEffect(() => {
    if (!treeData || !svgRef.current) return;

    const root = d3.hierarchy(treeData);

    switch (viewMode) {
      case 'radial':
        drawRadialTree(root);
        break;
      case 'horizontal':
        drawHorizontalTree(root);
        break;
      default:
        drawVerticalTree(root);
    }
  }, [treeData, viewMode]);

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy as any,
      1.5
    );
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy as any,
      0.75
    );
  };

  const exportAsImage = async () => {
    if (!svgRef.current) return;

    try {
      const svgElement = svgRef.current;
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = svgElement.clientWidth;
        canvas.height = svgElement.clientHeight;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `genealogy-tree-${new Date().toISOString().split('T')[0]}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Advanced Genealogy Tree
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">View Mode:</span>
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                  <TabsList>
                    <TabsTrigger value="vertical">Vertical</TabsTrigger>
                    <TabsTrigger value="horizontal">Horizontal</TabsTrigger>
                    <TabsTrigger value="radial">Radial</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Zoom: {Math.round(zoomLevel * 100)}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={exportAsImage}>
                <Download className="h-4 w-4 mr-2" />
                Export PNG
              </Button>
              <Button variant="outline">
                <Maximize className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tree Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div
                ref={containerRef}
                className="w-full overflow-auto bg-gradient-to-br from-blue-50 to-indigo-50"
                style={{ height: '600px' }}
              >
                <svg
                  ref={svgRef}
                  className="w-full h-full"
                  style={{ minWidth: '1200px', minHeight: '800px' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Details Sidebar */}
        <div className="space-y-6">
          {selectedNode && (
            <Card>
              <CardHeader>
                <CardTitle>Member Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedNode.avatar}
                      alt={selectedNode.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
                      <p className="text-gray-600">{selectedNode.email}</p>
                      <Badge style={{ backgroundColor: getRankColor(selectedNode.rank), color: 'white' }}>
                        {selectedNode.rank}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Personal Volume</div>
                      <div className="font-semibold">${selectedNode.personalVolume.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Team Volume</div>
                      <div className="font-semibold">${selectedNode.teamVolume.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Direct Recruits</div>
                      <div className="font-semibold">{selectedNode.directRecruits}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Team</div>
                      <div className="font-semibold">{selectedNode.totalTeamSize}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Join Date</div>
                    <div className="font-semibold">{new Date(selectedNode.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Rank Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ranks.map((rank) => (
                  <div key={rank.level} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: rank.color }}
                    />
                    <span className="text-sm">{rank.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Tree Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Members</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Members</span>
                  <span className="font-semibold text-green-600">245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tree Depth</span>
                  <span className="font-semibold">4 Levels</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Volume</span>
                  <span className="font-semibold">$325,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedGenealogyTree;
