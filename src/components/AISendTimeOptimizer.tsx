'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Calendar,
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Target,
  Zap,
  Brain,
  Star,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface TimeSlot {
  hour: number;
  day: string;
  engagementRate: number;
  openRate: number;
  clickRate: number;
  timezone: string;
  confidence: number;
}

interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  demographics: {
    avgAge: number;
    primaryTimezone: string;
    devicePreference: 'mobile' | 'desktop';
    activityPattern: 'morning' | 'afternoon' | 'evening' | 'night';
  };
  optimalTimes: TimeSlot[];
  behaviorScore: number;
}

interface SendTimeRecommendation {
  datetime: string;
  confidence: number;
  reasoning: string;
  expectedPerformance: {
    openRate: number;
    clickRate: number;
    engagementScore: number;
  };
  audienceReach: number;
  competitorActivity: 'low' | 'medium' | 'high';
}

const AISendTimeOptimizer = () => {
  const [audienceSegments, setAudienceSegments] = useState<AudienceSegment[]>([]);
  const [recommendations, setRecommendations] = useState<SendTimeRecommendation[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<AudienceSegment | null>(null);
  const [campaignType, setCampaignType] = useState('promotional');
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null);

  useEffect(() => {
    // Sample audience segments
    const sampleSegments: AudienceSegment[] = [
      {
        id: '1',
        name: 'New Members (0-30 days)',
        size: 234,
        demographics: {
          avgAge: 34,
          primaryTimezone: 'EST',
          devicePreference: 'mobile',
          activityPattern: 'evening'
        },
        optimalTimes: [
          {
            hour: 19,
            day: 'Tuesday',
            engagementRate: 8.7,
            openRate: 34.2,
            clickRate: 6.8,
            timezone: 'EST',
            confidence: 92
          },
          {
            hour: 20,
            day: 'Thursday',
            engagementRate: 8.1,
            openRate: 32.8,
            clickRate: 6.2,
            timezone: 'EST',
            confidence: 89
          }
        ],
        behaviorScore: 87
      },
      {
        id: '2',
        name: 'Active Team Members',
        size: 567,
        demographics: {
          avgAge: 42,
          primaryTimezone: 'PST',
          devicePreference: 'desktop',
          activityPattern: 'morning'
        },
        optimalTimes: [
          {
            hour: 9,
            day: 'Monday',
            engagementRate: 12.3,
            openRate: 42.1,
            clickRate: 9.7,
            timezone: 'PST',
            confidence: 94
          },
          {
            hour: 10,
            day: 'Wednesday',
            engagementRate: 11.8,
            openRate: 40.5,
            clickRate: 9.2,
            timezone: 'PST',
            confidence: 91
          }
        ],
        behaviorScore: 94
      },
      {
        id: '3',
        name: 'High Performers',
        size: 89,
        demographics: {
          avgAge: 38,
          primaryTimezone: 'CST',
          devicePreference: 'mobile',
          activityPattern: 'afternoon'
        },
        optimalTimes: [
          {
            hour: 14,
            day: 'Tuesday',
            engagementRate: 15.6,
            openRate: 48.3,
            clickRate: 12.4,
            timezone: 'CST',
            confidence: 96
          },
          {
            hour: 15,
            day: 'Friday',
            engagementRate: 14.2,
            openRate: 45.7,
            clickRate: 11.8,
            timezone: 'CST',
            confidence: 93
          }
        ],
        behaviorScore: 96
      },
      {
        id: '4',
        name: 'Inactive Members',
        size: 156,
        demographics: {
          avgAge: 29,
          primaryTimezone: 'EST',
          devicePreference: 'mobile',
          activityPattern: 'night'
        },
        optimalTimes: [
          {
            hour: 21,
            day: 'Sunday',
            engagementRate: 5.2,
            openRate: 18.7,
            clickRate: 3.1,
            timezone: 'EST',
            confidence: 78
          }
        ],
        behaviorScore: 65
      }
    ];

    setAudienceSegments(sampleSegments);
    setSelectedSegment(sampleSegments[0]);
  }, []);

  const generateRecommendations = () => {
    // Generate AI-powered send time recommendations
    const mockRecommendations: SendTimeRecommendation[] = [
      {
        datetime: '2024-06-04T19:00:00',
        confidence: 94,
        reasoning: 'Peak engagement time for new members based on 6 months of data analysis. Low competitor activity.',
        expectedPerformance: {
          openRate: 38.5,
          clickRate: 7.2,
          engagementScore: 9.1
        },
        audienceReach: 85,
        competitorActivity: 'low'
      },
      {
        datetime: '2024-06-05T09:00:00',
        confidence: 91,
        reasoning: 'Optimal morning slot for active team members. High engagement on business content.',
        expectedPerformance: {
          openRate: 41.3,
          clickRate: 9.4,
          engagementScore: 11.2
        },
        audienceReach: 78,
        competitorActivity: 'medium'
      },
      {
        datetime: '2024-06-04T14:00:00',
        confidence: 96,
        reasoning: 'Premium afternoon slot for high performers. Highest conversion potential.',
        expectedPerformance: {
          openRate: 46.8,
          clickRate: 11.9,
          engagementScore: 14.7
        },
        audienceReach: 92,
        competitorActivity: 'low'
      }
    ];

    setRecommendations(mockRecommendations);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTime = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            AI Send Time Optimizer
          </CardTitle>
          <CardDescription>
            Optimize send times using AI analysis of audience behavior patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Type</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
              >
                <option value="promotional">Promotional</option>
                <option value="educational">Educational</option>
                <option value="welcome">Welcome Series</option>
                <option value="follow-up">Follow-up</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={generateRecommendations} className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Recommendations
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audience Segments */}
      <Card>
        <CardHeader>
          <CardTitle>Audience Segments Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audienceSegments.map((segment) => (
              <div key={segment.id} className="border rounded-lg p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedSegment(
                    expandedSegment === segment.id ? null : segment.id
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {expandedSegment === segment.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <h3 className="font-semibold">{segment.name}</h3>
                    </div>
                    <Badge variant="outline">{segment.size} members</Badge>
                    <Badge className={getConfidenceColor(segment.behaviorScore)}>
                      {segment.behaviorScore}% Score
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      Age {segment.demographics.avgAge}
                    </span>
                    <span className="flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {segment.demographics.primaryTimezone}
                    </span>
                    <span className="capitalize">{segment.demographics.activityPattern}</span>
                  </div>
                </div>

                {expandedSegment === segment.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Demographics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Average Age:</span>
                            <span>{segment.demographics.avgAge} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Primary Timezone:</span>
                            <span>{segment.demographics.primaryTimezone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Device Preference:</span>
                            <span className="capitalize">{segment.demographics.devicePreference}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Activity Pattern:</span>
                            <span className="capitalize">{segment.demographics.activityPattern}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Optimal Send Times</h4>
                        <div className="space-y-2">
                          {segment.optimalTimes.map((time, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <span className="font-medium">{time.day}</span>
                                <span className="text-gray-600 ml-2">{formatTime(time.hour)}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{time.openRate}% Open</div>
                                <div className="text-xs text-gray-600">{time.confidence}% Confidence</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              AI Send Time Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {new Date(rec.datetime).toLocaleString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </h3>
                        <Badge className={getConfidenceColor(rec.confidence)}>
                          {rec.confidence}% Confidence
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{rec.reasoning}</p>
                    </div>
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">
                        {rec.expectedPerformance.openRate}%
                      </div>
                      <div className="text-gray-600">Expected Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">
                        {rec.expectedPerformance.clickRate}%
                      </div>
                      <div className="text-gray-600">Click Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">
                        {rec.expectedPerformance.engagementScore}
                      </div>
                      <div className="text-gray-600">Engagement Score</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">
                        {rec.audienceReach}%
                      </div>
                      <div className="text-gray-600">Audience Reach</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-semibold capitalize ${getActivityColor(rec.competitorActivity)}`}>
                        {rec.competitorActivity}
                      </div>
                      <div className="text-gray-600">Competitor Activity</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">AI Optimization Tip</h4>
                  <p className="text-blue-800 text-sm">
                    Based on your audience analysis, sending during evening hours (7-9 PM EST)
                    typically yields 23% higher engagement rates for your team demographics.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Send Time Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">23%</div>
              <div className="text-sm text-gray-600">Improvement with AI optimization</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Prediction accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-gray-600">Campaigns optimized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">7.2x</div>
              <div className="text-sm text-gray-600">ROI improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISendTimeOptimizer;
