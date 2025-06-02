'use client';

import { useState } from 'react';
import ChatbotDashboard from '@/components/ChatbotDashboard';
import AIChatbot from '@/components/AIChatbot';

export default function AIChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChatbotDashboard />
      <AIChatbot />
    </div>
  );
}
