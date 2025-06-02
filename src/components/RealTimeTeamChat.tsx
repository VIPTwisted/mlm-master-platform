'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCollaboration } from '@/contexts/CollaborationContext';
import {
  MessageSquare,
  Send,
  Smile,
  Paperclip,
  Users,
  X,
  Minimize2,
  Maximize2,
  Settings,
  Award,
  TrendingUp,
  Bell
} from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const EmojiPicker = ({ onEmojiSelect, isOpen, onClose }: EmojiPickerProps) => {
  const emojis = [
    '😀', '😃', '😄', '😁', '🤣', '😊', '😇', '🙂', '😉', '😌',
    '👍', '👎', '👏', '🙌', '👊', '✊', '🤝', '🙏', '💪', '🔥',
    '❤️', '💚', '💙', '💜', '🧡', '💛', '🤍', '🖤', '💯', '⭐',
    '🎉', '🎊', '🥳', '🚀', '💰', '💎', '🏆', '🥇', '🎯', '📈'
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-12 left-0 bg-white border rounded-lg shadow-lg p-3 z-50">
      <div className="grid grid-cols-10 gap-1 max-w-xs">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onEmojiSelect(emoji);
              onClose();
            }}
            className="text-lg hover:bg-gray-100 p-1 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

interface RealTimeTeamChatProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  className?: string;
}

const RealTimeTeamChat = ({ isMinimized = false, onToggleMinimize, className = '' }: RealTimeTeamChatProps) => {
  const {
    chatMessages,
    activeUsers,
    isConnected,
    sendMessage,
    currentUser
  } = useCollaboration();

  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'announcement':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'system':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 relative"
        >
          <MessageSquare className="h-6 w-6" />
          {chatMessages.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full p-0 flex items-center justify-center">
              {chatMessages.length > 9 ? '9+' : chatMessages.length}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-96 h-[500px] flex flex-col z-50 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <MessageSquare className="h-5 w-5 mr-2" />
            Team Chat
            <Badge className={`ml-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
              {isConnected ? 'Online' : 'Offline'}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Users */}
        <div className="flex items-center space-x-2 mt-2">
          <Users className="h-4 w-4 text-gray-500" />
          <div className="flex -space-x-1">
            {activeUsers.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="relative"
                title={`${user.name} - ${user.isViewing ? 'Active' : 'Away'}`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  user.isViewing ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
            ))}
            {activeUsers.length > 5 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                +{activeUsers.length - 5}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600">
            {activeUsers.filter(u => u.isViewing).length} online
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                msg.userId === currentUser?.id
                  ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg'
                  : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
              } p-3`}>
                {msg.userId !== currentUser?.id && (
                  <div className="flex items-center space-x-2 mb-1">
                    {msg.userAvatar && (
                      <img
                        src={msg.userAvatar}
                        alt={msg.userName}
                        className="w-4 h-4 rounded-full"
                      />
                    )}
                    <span className="text-xs font-medium">{msg.userName}</span>
                    {getMessageIcon(msg.type)}
                  </div>
                )}
                <div className="text-sm">{msg.message}</div>
                <div className={`text-xs mt-1 ${
                  msg.userId === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Indicators */}
        {isTyping && (
          <div className="text-xs text-gray-500 mb-2">
            You are typing...
          </div>
        )}

        {/* Message Input */}
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-20"
                disabled={!isConnected}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 h-8 w-8"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-8 w-8"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || !isConnected}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <EmojiPicker
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            onEmojiSelect={(emoji) => setMessage(prev => prev + emoji)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeTeamChat;
