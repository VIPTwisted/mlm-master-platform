'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCollaboration } from '@/contexts/CollaborationContext';
import {
  Users,
  MessageSquare,
  Pin,
  Eye,
  MousePointer,
  Zap,
  Activity,
  Share2,
  Bell
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
}

interface Annotation {
  id: string;
  nodeId: string;
  x: number;
  y: number;
  text: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  type: 'note' | 'question' | 'highlight' | 'action';
}

interface LiveCursor {
  userId: string;
  userName: string;
  userAvatar: string;
  x: number;
  y: number;
  color: string;
  lastUpdate: string;
}

const CollaborativeGenealogyTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeUsers,
    currentUser,
    selectedNodeId,
    selectNode,
    updateCursorPosition,
    sendMessage,
    sendTreeUpdate
  } = useCollaboration();

  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [liveCursors, setLiveCursors] = useState<LiveCursor[]>([]);
  const [showingAnnotations, setShowingAnnotations] = useState(true);
  const [newAnnotation, setNewAnnotation] = useState<{ x: number; y: number; nodeId: string } | null>(null);
  const [annotationText, setAnnotationText] = useState('');

  // Sample data
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
              joinDate: '2022-06-10'
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
          joinDate: '2022-02-28'
        }
      ]
    };
    setTreeData(sampleData);

    // Sample annotations
    setAnnotations([
      {
        id: '1',
        nodeId: '2',
        x: 300,
        y: 200,
        text: 'Great progress this month! On track for Platinum.',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
        timestamp: new Date().toISOString(),
        type: 'note'
      }
    ]);
  }, []);

  // Update live cursors from active users
  useEffect(() => {
    const cursors = activeUsers
      .filter(user => user.isViewing && user.cursorPosition && user.id !== currentUser?.id)
      .map((user, index) => ({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        x: user.cursorPosition!.x,
        y: user.cursorPosition!.y,
        color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
        lastUpdate: user.lastSeen
      }));
    setLiveCursors(cursors);
  }, [activeUsers, currentUser]);

  const ranks = [
    { name: 'Associate', level: 1, color: '#6b7280' },
    { name: 'Senior Associate', level: 2, color: '#3b82f6' },
    { name: 'Team Leader', level: 3, color: '#10b981' },
    { name: 'Manager', level: 4, color: '#f59e0b' },
    { name: 'Gold Manager', level: 5, color: '#d97706' },
    { name: 'Platinum Director', level: 6, color: '#8b5cf6' },
    { name: 'Diamond Director', level: 7, color: '#4f46e5' },
    { name: 'Crown Ambassador', level: 8, color: '#dc2626' }
  ];

  const getRankColor = (rankName: string) => {
    const rank = ranks.find(r => r.name === rankName);
    return rank ? rank.color : '#6b7280';
  };

  const drawTree = () => {
    if (!treeData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree<TreeNode>()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    const treeRoot = treeLayout(root);

    // Draw links with collaborative highlighting
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
      .attr('stroke-opacity', 0.6)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');

    // Draw nodes with real-time updates
    const node = g.selectAll('.node')
      .data(treeRoot.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        selectNode(d.data.id);
        sendTreeUpdate({
          type: 'member_update',
          nodeId: d.data.id,
          data: { action: 'selected', memberName: d.data.name }
        });
      })
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        const [x, y] = d3.pointer(event, g.node());
        setNewAnnotation({ x, y, nodeId: d.data.id });
      });

    // Node circles with selection highlighting
    node.append('circle')
      .attr('r', d => d.depth === 0 ? 30 : 25)
      .attr('fill', d => getRankColor(d.data.rank))
      .attr('stroke', d => selectedNodeId === d.data.id ? '#3b82f6' : '#fff')
      .attr('stroke-width', d => selectedNodeId === d.data.id ? 4 : 3)
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))')
      .style('transition', 'all 0.3s ease');

    // Real-time pulse animation for active nodes
    node.filter(d => d.data.isActive)
      .append('circle')
      .attr('r', d => d.depth === 0 ? 35 : 30)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .style('animation', 'pulse 2s infinite');

    // Node images
    node.append('clipPath')
      .attr('id', d => `clip-${d.data.id}`)
      .append('circle')
      .attr('r', d => d.depth === 0 ? 27 : 22);

    node.append('image')
      .attr('x', d => d.depth === 0 ? -27 : -22)
      .attr('y', d => d.depth === 0 ? -27 : -22)
      .attr('width', d => d.depth === 0 ? 54 : 44)
      .attr('height', d => d.depth === 0 ? 54 : 44)
      .attr('clip-path', d => `url(#clip-${d.data.id})`)
      .attr('href', d => d.data.avatar);

    // Activity indicator
    node.filter(d => d.data.isActive)
      .append('circle')
      .attr('cx', 20)
      .attr('cy', -20)
      .attr('r', 5)
      .attr('fill', '#10b981')
      .style('animation', 'bounce 1s infinite');

    // Collaboration indicator (users viewing this node)
    node.append('g')
      .attr('class', 'collaboration-indicator')
      .attr('transform', 'translate(-20, -20)')
      .selectAll('.viewer')
      .data(d => activeUsers.filter(user => user.isViewing && Math.random() > 0.8)) // Demo: random viewers
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * 8)
      .attr('cy', 0)
      .attr('r', 3)
      .attr('fill', (d, i) => `hsl(${(i * 137.5) % 360}, 70%, 50%)`)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    // Name labels
    node.append('text')
      .attr('dy', d => d.depth === 0 ? 50 : 45)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', d => d.depth === 0 ? '16px' : '14px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text(d => d.data.name);

    // Rank labels
    node.append('text')
      .attr('dy', d => d.depth === 0 ? 68 : 62)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text(d => d.data.rank);

    // Add mouse tracking for cursor updates
    svg.on('mousemove', (event) => {
      const [x, y] = d3.pointer(event);
      updateCursorPosition(x, y);
    });

    // Add CSS for animations
    svg.append('defs').append('style').text(`
      @keyframes pulse {
        0% { opacity: 0; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.2); }
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-3px); }
        60% { transform: translateY(-2px); }
      }
    `);
  };

  useEffect(() => {
    drawTree();
  }, [treeData, selectedNodeId]);

  const handleAddAnnotation = () => {
    if (newAnnotation && annotationText.trim() && currentUser) {
      const annotation: Annotation = {
        id: Math.random().toString(36).substr(2, 9),
        nodeId: newAnnotation.nodeId,
        x: newAnnotation.x,
        y: newAnnotation.y,
        text: annotationText.trim(),
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        timestamp: new Date().toISOString(),
        type: 'note'
      };
      setAnnotations(prev => [...prev, annotation]);
      setNewAnnotation(null);
      setAnnotationText('');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Collaboration Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Collaborative Genealogy Tree
              <Badge className="ml-2 bg-green-500">
                {activeUsers.filter(u => u.isViewing).length} online
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-4">
              {/* Active users */}
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div className="flex -space-x-2">
                  {activeUsers.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className="relative"
                      title={`${user.name} - ${user.isViewing ? 'Active' : 'Away'}`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        user.isViewing ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowingAnnotations(!showingAnnotations)}
              >
                <Pin className="h-4 w-4 mr-2" />
                {showingAnnotations ? 'Hide' : 'Show'} Notes
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tree Container */}
      <Card>
        <CardContent className="p-0 relative">
          <div
            ref={containerRef}
            className="w-full relative bg-gradient-to-br from-blue-50 to-indigo-50"
            style={{ height: '600px' }}
          >
            <svg
              ref={svgRef}
              className="w-full h-full"
            />

            {/* Live Cursors */}
            {liveCursors.map((cursor) => (
              <div
                key={cursor.userId}
                className="absolute pointer-events-none z-50"
                style={{
                  left: cursor.x,
                  top: cursor.y,
                  transform: 'translate(-2px, -2px)'
                }}
              >
                <MousePointer
                  className="h-5 w-5"
                  style={{ color: cursor.color }}
                />
                <div
                  className="text-xs bg-white px-2 py-1 rounded shadow-lg ml-2 -mt-1"
                  style={{ borderLeft: `3px solid ${cursor.color}` }}
                >
                  {cursor.userName}
                </div>
              </div>
            ))}

            {/* Annotations */}
            {showingAnnotations && annotations.map((annotation) => (
              <div
                key={annotation.id}
                className="absolute z-40 bg-yellow-100 border border-yellow-300 rounded-lg p-2 max-w-xs shadow-lg"
                style={{ left: annotation.x + 50, top: annotation.y - 50 }}
              >
                <div className="flex items-start space-x-2">
                  <img
                    src={annotation.userAvatar}
                    alt={annotation.userName}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700">
                      {annotation.userName}
                    </div>
                    <div className="text-sm text-gray-900 mt-1">
                      {annotation.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(annotation.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* New Annotation Input */}
            {newAnnotation && (
              <div
                className="absolute z-50 bg-white border rounded-lg p-3 shadow-xl"
                style={{ left: newAnnotation.x, top: newAnnotation.y }}
              >
                <Input
                  value={annotationText}
                  onChange={(e) => setAnnotationText(e.target.value)}
                  placeholder="Add a note..."
                  className="mb-2"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddAnnotation();
                    } else if (e.key === 'Escape') {
                      setNewAnnotation(null);
                      setAnnotationText('');
                    }
                  }}
                />
                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={handleAddAnnotation}>
                    Add Note
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setNewAnnotation(null);
                      setAnnotationText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Live Updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{annotations.length} active notes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{activeUsers.filter(u => u.isViewing).length} viewers</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Right-click on nodes to add notes • Real-time collaboration active
        </div>
      </div>
    </div>
  );
};

export default CollaborativeGenealogyTree;
