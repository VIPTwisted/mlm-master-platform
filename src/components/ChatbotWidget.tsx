'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Star } from 'lucide-react';

interface WidgetMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  quickReplies?: string[];
}

interface ChatbotWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  companyName?: string;
  greeting?: string;
  size?: 'small' | 'medium' | 'large';
}

const ChatbotWidget = ({
  position = 'bottom-right',
  primaryColor = '#2563eb',
  companyName = 'Our Team',
  greeting = "Hi! I'm here to help you learn about our amazing business opportunity. What would you like to know?",
  size = 'medium'
}: ChatbotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show widget after a delay for first-time visitors
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
        setMessages([{
          id: '1',
          type: 'bot',
          content: greeting,
          timestamp: new Date().toISOString(),
          quickReplies: [
            "Tell me about the opportunity",
            "What are the products?",
            "How much does it cost?",
            "Is this legitimate?"
          ]
        }]);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [greeting, hasInteracted]);

  const sizeClasses = {
    small: { widget: 'w-80 h-96', button: 'w-12 h-12' },
    medium: { widget: 'w-96 h-[500px]', button: 'w-14 h-14' },
    large: { widget: 'w-[420px] h-[600px]', button: 'w-16 h-16' }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const processMessage = (userMessage: string) => {
    setHasInteracted(true);

    // Add user message
    const userMsg: WidgetMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(userMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Show rating after a few exchanges
      if (messages.length > 4 && !showRating) {
        setTimeout(() => setShowRating(true), 2000);
      }
    }, Math.random() * 1500 + 800);
  };

  const generateResponse = (userMessage: string): WidgetMessage => {
    const lowerMessage = userMessage.toLowerCase();
    let content = '';
    let quickReplies: string[] = [];

    if (lowerMessage.includes('opportunity') || lowerMessage.includes('business')) {
      content = `🎯 **Our Business Opportunity**

Transform your life with our proven system:
• Flexible schedule - work from anywhere
• Comprehensive training & support
• Multiple income streams
• Strong community of entrepreneurs

**Average Results:**
• Part-time (10hrs/week): $500-1,500/month
• Full-time commitment: $2,000-10,000+/month

Ready to learn more?`;
      quickReplies = ["How do I get started?", "What's the investment?", "Success stories?"];
    } else if (lowerMessage.includes('product')) {
      content = `✨ **Premium Product Line**

We offer scientifically-formulated products in:
• Weight Management & Nutrition
• Energy & Performance
• Beauty & Anti-Aging
• Immune Support

**Why Choose Our Products:**
• Third-party tested for purity
• 30-day money-back guarantee
• Not available in stores
• 78% customer retention rate

Want to try our bestsellers?`;
      quickReplies = ["Show me products", "Pricing info", "Customer reviews"];
    } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('investment')) {
      content = `💰 **Investment Options**

**Starter Packages:**
• Basic: $99 (Starter kit + training)
• Premium: $299 (Best value package)
• VIP: $599 (Everything + coaching)

**What's Included:**
• Product samples & starter kit
• Complete training program
• Marketing materials
• Personal mentor
• 30-day money-back guarantee

Most people start with Premium. Payment plans available!`;
      quickReplies = ["I want Premium", "Payment plan options", "What's the guarantee?"];
    } else if (lowerMessage.includes('legitimate') || lowerMessage.includes('scam') || lowerMessage.includes('real')) {
      content = `✅ **100% Legitimate Business**

We're proud to be:
• Registered business with proper licenses
• FTC compliant compensation plan
• Real products with genuine customers
• Member of Direct Selling Association
• A+ Better Business Bureau rating

**Key Facts:**
• In business since 2015
• 500,000+ satisfied customers
• Publicly available financial reports
• Proper income disclosures

Your success is our reputation!`;
      quickReplies = ["Show me proof", "Customer testimonials", "Income disclosures"];
    } else if (lowerMessage.includes('start') || lowerMessage.includes('join')) {
      content = `🚀 **Ready to Start Your Journey?**

Here's what happens next:

**1. Choose Your Package**
Select the starter package that fits your goals

**2. Complete Registration**
Quick 5-minute online enrollment

**3. Access Training**
Immediate access to our success system

**4. Get Your Mentor**
Personal coach assigned within 24 hours

**5. Start Earning**
Begin building your business right away

Ready to take the first step?`;
      quickReplies = ["Yes, let's do this!", "Schedule a call", "I need more info"];
    } else {
      content = `Thanks for your question! I'm here to help you learn about our amazing opportunity.

I can tell you about:
• Our business opportunity & income potential
• Our premium product line
• Getting started & investment options
• Why we're a legitimate, trusted company

What interests you most?`;
      quickReplies = ["Business opportunity", "Products", "Getting started", "Is this real?"];
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'bot',
      content,
      timestamp: new Date().toISOString(),
      quickReplies
    };
  };

  const handleQuickReply = (reply: string) => {
    processMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim()) {
        processMessage(inputMessage);
      }
    }
  };

  const ContactForm = () => (
    <div className="p-4 border-t bg-blue-50">
      <div className="text-sm font-medium mb-3">Get personalized help from a real person!</div>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          className="w-full text-sm p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full text-sm p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors"
          style={{ backgroundColor: primaryColor }}
        >
          Connect me with an expert
        </button>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`fixed ${positionClasses[position]} z-50`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className={`${sizeClasses[size].button} rounded-full text-white shadow-lg flex items-center justify-center`}
          style={{ backgroundColor: primaryColor }}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>

        {/* Notification pulse for first-time visitors */}
        {!hasInteracted && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      className={`fixed ${positionClasses[position]} ${sizeClasses[size].widget} z-50`}
    >
      <div className="bg-white rounded-lg shadow-2xl h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="p-4 text-white flex items-center justify-between"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">{companyName}</div>
              <div className="text-xs opacity-90">Usually replies instantly</div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
                style={message.type === 'user' ? { backgroundColor: primaryColor } : {}}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {message.quickReplies && (
                    <div className="mt-3 space-y-1">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="block w-full text-left p-2 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-white text-opacity-70' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-lg rounded-bl-none p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Rating Section */}
        {showRating && (
          <div className="p-3 bg-yellow-50 border-t">
            <div className="text-xs text-center mb-2">How was your experience?</div>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-yellow-400 hover:text-yellow-500"
                  onClick={() => setShowRating(false)}
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form or Input */}
        {messages.length > 6 ? (
          <ContactForm />
        ) : (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 text-sm p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={() => inputMessage.trim() && processMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 text-white rounded-lg disabled:opacity-50"
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI • We typically reply instantly
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatbotWidget;
