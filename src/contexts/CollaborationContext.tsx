'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import io, { type Socket } from 'socket.io-client';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system' | 'achievement' | 'announcement';
  targetNodeId?: string;
}

interface ActiveUser {
  id: string;
  name: string;
  avatar: string;
  currentView: string;
  lastSeen: string;
  isViewing: boolean;
  cursorPosition?: { x: number; y: number };
}

interface TreeUpdate {
  id: string;
  type: 'member_update' | 'rank_change' | 'volume_update' | 'new_member' | 'status_change';
  nodeId: string;
  data: any;
  userId: string;
  userName: string;
  timestamp: string;
}

interface CollaborationState {
  socket: Socket | null;
  isConnected: boolean;
  chatMessages: ChatMessage[];
  activeUsers: ActiveUser[];
  treeUpdates: TreeUpdate[];
  currentUser: ActiveUser | null;
  selectedNodeId: string | null;
  showChat: boolean;
  showActiveUsers: boolean;
}

interface CollaborationContextType extends CollaborationState {
  sendMessage: (message: string, type?: ChatMessage['type'], targetNodeId?: string) => void;
  updateCurrentView: (view: string) => void;
  updateCursorPosition: (x: number, y: number) => void;
  selectNode: (nodeId: string | null) => void;
  toggleChat: () => void;
  toggleActiveUsers: () => void;
  sendTreeUpdate: (update: Omit<TreeUpdate, 'id' | 'userId' | 'userName' | 'timestamp'>) => void;
}

const CollaborationContext = createContext<CollaborationContextType | null>(null);

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

interface CollaborationProviderProps {
  children: ReactNode;
}

export const CollaborationProvider = ({ children }: CollaborationProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [treeUpdates, setTreeUpdates] = useState<TreeUpdate[]>([]);
  const [currentUser, setCurrentUser] = useState<ActiveUser | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(true);
  const [showActiveUsers, setShowActiveUsers] = useState(true);

  useEffect(() => {
    // In a real app, this would connect to your WebSocket server
    // For demo purposes, we'll simulate the connection
    const mockSocket = {
      on: (event: string, callback: Function) => {
        // Simulate incoming messages for demo
        if (event === 'connect') {
          setTimeout(() => callback(), 100);
        }
      },
      emit: (event: string, data: any) => {
        console.log(`Mock socket emit: ${event}`, data);
        // Simulate responses for demo
        simulateIncomingData(event, data);
      },
      disconnect: () => {},
      connected: true
    } as any;

    setSocket(mockSocket);
    setIsConnected(true);

    // Set up current user
    const user: ActiveUser = {
      id: 'current-user',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
      currentView: 'genealogy-tree',
      lastSeen: new Date().toISOString(),
      isViewing: true
    };
    setCurrentUser(user);

    // Add some demo active users
    setTimeout(() => {
      setActiveUsers([
        {
          id: 'user-1',
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
          currentView: 'genealogy-tree',
          lastSeen: new Date().toISOString(),
          isViewing: true,
          cursorPosition: { x: 300, y: 200 }
        },
        {
          id: 'user-2',
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
          currentView: 'reports',
          lastSeen: new Date(Date.now() - 300000).toISOString(),
          isViewing: false
        }
      ]);
    }, 1000);

    // Add demo chat messages
    setTimeout(() => {
      setChatMessages([
        {
          id: '1',
          userId: 'user-1',
          userName: 'Sarah Johnson',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
          message: 'Great team performance this month! 🎉',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          type: 'text'
        },
        {
          id: '2',
          userId: 'system',
          userName: 'System',
          userAvatar: '',
          message: 'Mike Chen achieved Gold Manager rank!',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          type: 'achievement'
        }
      ]);
    }, 1500);

    return () => {
      mockSocket.disconnect();
    };
  }, []);

  const simulateIncomingData = (event: string, data: any) => {
    // Simulate real-time responses for demo purposes
    if (event === 'send_message') {
      setTimeout(() => {
        const newMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          userId: currentUser?.id || 'unknown',
          userName: currentUser?.name || 'Unknown',
          userAvatar: currentUser?.avatar || '',
          message: data.message,
          timestamp: new Date().toISOString(),
          type: data.type || 'text',
          targetNodeId: data.targetNodeId
        };
        setChatMessages(prev => [...prev, newMessage]);
      }, 100);
    }

    if (event === 'tree_update') {
      setTimeout(() => {
        const update: TreeUpdate = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          userId: currentUser?.id || 'unknown',
          userName: currentUser?.name || 'Unknown',
          timestamp: new Date().toISOString()
        };
        setTreeUpdates(prev => [...prev.slice(-19), update]); // Keep last 20 updates
      }, 100);
    }
  };

  const sendMessage = (message: string, type: ChatMessage['type'] = 'text', targetNodeId?: string) => {
    if (socket && message.trim()) {
      socket.emit('send_message', {
        message: message.trim(),
        type,
        targetNodeId
      });
    }
  };

  const updateCurrentView = (view: string) => {
    if (socket && currentUser) {
      const updatedUser = { ...currentUser, currentView: view, lastSeen: new Date().toISOString() };
      setCurrentUser(updatedUser);
      socket.emit('update_view', { view });
    }
  };

  const updateCursorPosition = (x: number, y: number) => {
    if (socket && currentUser) {
      const updatedUser = { ...currentUser, cursorPosition: { x, y } };
      setCurrentUser(updatedUser);
      socket.emit('cursor_move', { x, y });
    }
  };

  const selectNode = (nodeId: string | null) => {
    setSelectedNodeId(nodeId);
    if (socket) {
      socket.emit('node_select', { nodeId });
    }
  };

  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  const toggleActiveUsers = () => {
    setShowActiveUsers(prev => !prev);
  };

  const sendTreeUpdate = (update: Omit<TreeUpdate, 'id' | 'userId' | 'userName' | 'timestamp'>) => {
    if (socket) {
      socket.emit('tree_update', update);
    }
  };

  const value: CollaborationContextType = {
    socket,
    isConnected,
    chatMessages,
    activeUsers,
    treeUpdates,
    currentUser,
    selectedNodeId,
    showChat,
    showActiveUsers,
    sendMessage,
    updateCurrentView,
    updateCursorPosition,
    selectNode,
    toggleChat,
    toggleActiveUsers,
    sendTreeUpdate
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
};
