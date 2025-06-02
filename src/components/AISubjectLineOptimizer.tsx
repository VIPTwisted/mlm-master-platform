'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  TrendingUp,
  Zap,
  RefreshCw,
  Copy,
  Star,
  Eye,
  Clock,
  Users,
  BarChart3,
  TestTube,
  Lightbulb,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SubjectLineAnalysis {
  score: number;
  openRatePrediction: number;
  wordCount: number;
  characterCount: number;
  hasEmoji: boolean;
  hasPersonalization: boolean;
  hasUrgency: boolean;
  hasCuriosity: boolean;
  spamScore: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  improvements: string[];
  warnings: string[];
}

interface SubjectLineVariation {
  id: string;
  text: string;
  score: number;
  technique: string;
  reasoning: string;
  predictedPerformance: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
}

interface ABTestResult {
  variation: string;
  sends: number;
  opens: number;
  clicks: number;
  openRate: number;
  clickRate: number;
  winner: boolean;
}

const AISubjectLineOptimizer = () => {
  const [inputSubject, setInputSubject] = useState('');
  const [analysis, setAnalysis] = useState<SubjectLineAnalysis | null>(null);
  const [variations, setVariations] = useState<SubjectLineVariation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [abTestResults, setAbTestResults] = useState<ABTestResult[]>([]);

  const analyzeSubjectLine = (subject: string) => {
    if (!subject.trim()) {
      setAnalysis(null);
      return;
    }

    // Simulate AI analysis
    const hasEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(subject);
    const hasPersonalization = /\[.*\]|{.*}|your|you/i.test(subject);
    const hasUrgency = /urgent|limited|hurry|now|today|deadline|expires/i.test(subject);
    const hasCuriosity = /\?|secret|reveal|discover|hidden|why|how/i.test(subject);

    const mockAnalysis: SubjectLineAnalysis = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      openRatePrediction: Math.floor(Math.random() * 25) + 15, // 15-40%
      wordCount: subject.split(' ').length,
      characterCount: subject.length,
      hasEmoji,
      hasPersonalization,
      hasUrgency,
      hasCuriosity,
      spamScore: Math.floor(Math.random() * 30), // 0-30
      sentiment: Math.random() > 0.7 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
      improvements: [
        !hasEmoji && Math.random() > 0.5 ? 'Consider adding an emoji to increase visual appeal' : '',
        !hasPersonalization && Math.random() > 0.5 ? 'Add personalization to improve relevance' : '',
        subject.length > 50 ? 'Shorten to under 50 characters for better mobile display' : '',
        !hasUrgency && Math.random() > 0.6 ? 'Create urgency to encourage immediate action' : ''
      ].filter(Boolean),
      warnings: [
        subject.length > 60 ? 'Subject line may be truncated on mobile devices' : '',
        hasUrgency && subject.toUpperCase() === subject ? 'Avoid all caps with urgency words to prevent spam filters' : '',
        subject.split('!').length > 3 ? 'Too many exclamation marks may trigger spam filters' : ''
      ].filter(Boolean)
    };

    setAnalysis(mockAnalysis);
  };

  const generateVariations = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const techniques = [
        'Curiosity Gap',
        'Urgency & Scarcity',
        'Social Proof',
        'Personalization',
        'Benefit-Focused',
        'Question Format',
        'Emoji Enhancement',
        'Numbers & Stats'
      ];

      const mockVariations: SubjectLineVariation[] = [
        {
          id: '1',
          text: '🎉 Your Success Journey Starts Here - Welcome!',
          score: 94,
          technique: 'Emoji Enhancement',
          reasoning: 'Emoji increases open rates by 25%, celebration theme creates positive emotion',
          predictedPerformance: { openRate: 34, clickRate: 8.2, conversionRate: 2.1 }
        },
        {
          id: '2',
          text: 'The Secret 92% of Successful People Know',
          score: 91,
          technique: 'Curiosity Gap',
          reasoning: 'Creates strong curiosity gap with specific statistic for credibility',
          predictedPerformance: { openRate: 31, clickRate: 7.8, conversionRate: 1.9 }
        },
        {
          id: '3',
          text: 'Only 24 Hours Left: Your Opportunity Awaits',
          score: 88,
          technique: 'Urgency & Scarcity',
          reasoning: 'Time pressure combined with opportunity creates urgency without being pushy',
          predictedPerformance: { openRate: 29, clickRate: 9.1, conversionRate: 2.3 }
        },
        {
          id: '4',
          text: '[Name], Your Team is Celebrating You Today',
          score: 86,
          technique: 'Personalization',
          reasoning: 'Personal name plus social recognition creates strong emotional appeal',
          predictedPerformance: { openRate: 28, clickRate: 7.5, conversionRate: 1.8 }
        },
        {
          id: '5',
          text: 'How Sarah Earned $5,000 in Her First Month',
          score: 83,
          technique: 'Social Proof',
          reasoning: 'Real success story with specific dollar amount provides credible social proof',
          predictedPerformance: { openRate: 26, clickRate: 6.9, conversionRate: 1.6 }
        }
      ];

      setVariations(mockVariations);
      setIsGenerating(false);
    }, 2000);
  };

  const startABTest = () => {
    if (selectedVariations.length < 2) return;

    // Simulate A/B test results
    const mockResults: ABTestResult[] = selectedVariations.map((id, index) => {
      const variation = variations.find(v => v.id === id);
      const sends = 1000;
      const openRate = variation?.predictedPerformance.openRate || 20;
      const clickRate = variation?.predictedPerformance.clickRate || 5;
      const opens = Math.floor(sends * (openRate / 100));
      const clicks = Math.floor(opens * (clickRate / 100));

      return {
        variation: variation?.text || '',
        sends,
        opens,
        clicks,
        openRate,
        clickRate,
        winner: index === 0 // First selected wins for demo
      };
    });

    setAbTestResults(mockResults);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputSubject) {
        analyzeSubjectLine(inputSubject);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [inputSubject]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            AI Subject Line Optimizer
          </CardTitle>
          <CardDescription>
            Optimize your email subject lines for maximum open rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter Subject Line</label>
            <Input
              value={inputSubject}
              onChange={(e) => setInputSubject(e.target.value)}
              placeholder="Type your subject line here..."
              className="text-lg"
            />
          </div>

          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </div>
                <div className="text-sm text-gray-600">AI Score</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {analysis.openRatePrediction}%
                </div>
                <div className="text-sm text-gray-600">Predicted Open Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {analysis.characterCount}
                </div>
                <div className="text-sm text-gray-600">Characters</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${
                  analysis.spamScore < 15 ? 'text-green-600' :
                  analysis.spamScore < 25 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analysis.spamScore}%
                </div>
                <div className="text-sm text-gray-600">Spam Risk</div>
              </div>
            </div>
          )}

          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Features Detected
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emoji Usage</span>
                    <Badge className={analysis.hasEmoji ? 'bg-green-500' : 'bg-gray-500'}>
                      {analysis.hasEmoji ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Personalization</span>
                    <Badge className={analysis.hasPersonalization ? 'bg-green-500' : 'bg-gray-500'}>
                      {analysis.hasPersonalization ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Urgency</span>
                    <Badge className={analysis.hasUrgency ? 'bg-green-500' : 'bg-gray-500'}>
                      {analysis.hasUrgency ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Curiosity</span>
                    <Badge className={analysis.hasCuriosity ? 'bg-green-500' : 'bg-gray-500'}>
                      {analysis.hasCuriosity ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-blue-600" />
                  AI Suggestions
                </h4>
                <div className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <div key={index} className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      {improvement}
                    </div>
                  ))}
                  {analysis.warnings.map((warning, index) => (
                    <div key={index} className="text-sm text-red-700 bg-red-50 p-2 rounded flex items-start">
                      <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      {warning}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={generateVariations}
            disabled={isGenerating || !inputSubject}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Variations...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate AI Variations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {variations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Variations</CardTitle>
            <CardDescription>
              Select variations for A/B testing or use the highest-scoring option
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {variations.map((variation) => (
                <div
                  key={variation.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedVariations.includes(variation.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedVariations(prev =>
                      prev.includes(variation.id)
                        ? prev.filter(id => id !== variation.id)
                        : [...prev, variation.id]
                    );
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-lg mb-1">{variation.text}</div>
                      <div className="text-sm text-gray-600 mb-2">{variation.reasoning}</div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge className={getScoreBadge(variation.score)}>
                        {variation.score}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {variation.technique}
                    </Badge>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {variation.predictedPerformance.openRate}% Open
                      </span>
                      <span className="flex items-center">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        {variation.predictedPerformance.clickRate}% Click
                      </span>
                      <span className="flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        {variation.predictedPerformance.conversionRate}% Convert
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedVariations.length >= 2 && (
              <div className="mt-6">
                <Button onClick={startABTest} className="w-full">
                  <TestTube className="h-4 w-4 mr-2" />
                  Start A/B Test with {selectedVariations.length} Variations
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {abTestResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              A/B Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {abTestResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${
                    result.winner ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">{result.variation}</div>
                    {result.winner && (
                      <Badge className="bg-green-500">
                        <Award className="h-3 w-3 mr-1" />
                        Winner
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Sent</div>
                      <div className="font-semibold">{result.sends.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Opens</div>
                      <div className="font-semibold">{result.opens.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Open Rate</div>
                      <div className="font-semibold text-blue-600">{result.openRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Click Rate</div>
                      <div className="font-semibold text-green-600">{result.clickRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISubjectLineOptimizer;
