'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Upload,
  Edit,
  Save,
  Eye,
  Globe,
  Image,
  Type,
  Palette,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Plus,
  Copy,
  RefreshCw,
  Download,
  Monitor,
  Smartphone,
  Tablet,
  Star,
  Heart,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Target,
  Crown,
  Gift,
  Rocket,
  DollarSign,
  Calendar,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'hero' | 'feature' | 'testimonial' | 'cta' | 'stats';
  title: string;
  content: string;
  imageUrl?: string;
  altText?: string;
  buttonText?: string;
  buttonUrl?: string;
  position: number;
  isVisible: boolean;
  page: string;
}

interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  analytics: {
    googleAnalytics: string;
    facebookPixel: string;
  };
}

interface PlaceholderImage {
  id: string;
  category: 'hero' | 'team' | 'product' | 'testimonial' | 'feature' | 'icon';
  url: string;
  alt: string;
  title: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [placeholderImages, setPlaceholderImages] = useState<PlaceholderImage[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    // Initialize with placeholder content and images
    const samplePlaceholderImages: PlaceholderImage[] = [
      {
        id: 'hero-1',
        category: 'hero',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
        alt: 'Professional team meeting',
        title: 'Team Success Hero Image'
      },
      {
        id: 'hero-2',
        category: 'hero',
        url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=600&fit=crop',
        alt: 'Business growth concept',
        title: 'Growth & Success'
      },
      {
        id: 'team-1',
        category: 'team',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        alt: 'Professional woman smiling',
        title: 'Team Member Portrait'
      },
      {
        id: 'team-2',
        category: 'team',
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        alt: 'Professional man in suit',
        title: 'Executive Portrait'
      },
      {
        id: 'product-1',
        category: 'product',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
        alt: 'Premium product showcase',
        title: 'Premium Product Line'
      },
      {
        id: 'feature-1',
        category: 'feature',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        alt: 'Analytics dashboard',
        title: 'Analytics & Reporting'
      },
      {
        id: 'testimonial-1',
        category: 'testimonial',
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
        alt: 'Happy customer testimonial',
        title: 'Customer Success Story'
      }
    ];

    const sampleContentBlocks: ContentBlock[] = [
      {
        id: 'hero-main',
        type: 'hero',
        title: 'Transform Your Life with Our Proven MLM System',
        content: 'Join thousands of successful entrepreneurs who have built thriving businesses with our comprehensive training, cutting-edge tools, and supportive community. Start your journey to financial freedom today.',
        imageUrl: samplePlaceholderImages[0].url,
        altText: 'Success team meeting',
        buttonText: 'Start Your Journey',
        buttonUrl: '/get-started',
        position: 1,
        isVisible: true,
        page: 'home'
      },
      {
        id: 'stats-section',
        type: 'stats',
        title: 'Proven Results That Speak for Themselves',
        content: 'Our platform has helped thousands achieve their dreams with measurable results and transparent reporting.',
        position: 2,
        isVisible: true,
        page: 'home'
      },
      {
        id: 'feature-training',
        type: 'feature',
        title: 'Comprehensive Training System',
        content: 'Access our library of training materials, interactive tutorials, and live coaching sessions designed to accelerate your success.',
        imageUrl: samplePlaceholderImages[5].url,
        altText: 'Training and education',
        position: 3,
        isVisible: true,
        page: 'home'
      },
      {
        id: 'testimonial-main',
        type: 'testimonial',
        title: 'Sarah Johnson - Top Performer',
        content: 'This platform changed my life completely. Within 6 months, I was able to replace my full-time income and now I help others achieve the same success.',
        imageUrl: samplePlaceholderImages[6].url,
        altText: 'Sarah Johnson testimonial',
        position: 4,
        isVisible: true,
        page: 'home'
      },
      {
        id: 'cta-join',
        type: 'cta',
        title: 'Ready to Start Your Success Story?',
        content: 'Join our community of successful entrepreneurs and access all the tools, training, and support you need to build a thriving business.',
        buttonText: 'Join Now - Limited Time Offer',
        buttonUrl: '/signup',
        position: 5,
        isVisible: true,
        page: 'home'
      }
    ];

    const sampleSiteSettings: SiteSettings = {
      siteName: 'MLM Master Platform',
      tagline: 'Your Success Is Our Mission',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop',
      favicon: '/favicon.ico',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#F59E0B',
      font: 'Inter',
      contactEmail: 'success@mlmmaster.com',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Success Boulevard, Entrepreneur City, EC 12345',
      socialMedia: {
        facebook: 'https://facebook.com/mlmmaster',
        twitter: 'https://twitter.com/mlmmaster',
        instagram: 'https://instagram.com/mlmmaster',
        linkedin: 'https://linkedin.com/company/mlmmaster',
        youtube: 'https://youtube.com/mlmmaster'
      },
      seoSettings: {
        metaTitle: 'MLM Master Platform - Transform Your Life with Proven Success',
        metaDescription: 'Join thousands of successful entrepreneurs with our comprehensive MLM platform. Get training, tools, and support to build your thriving business.',
        keywords: 'MLM, network marketing, business opportunity, financial freedom, entrepreneur, success'
      },
      analytics: {
        googleAnalytics: 'G-XXXXXXXXXX',
        facebookPixel: '123456789'
      }
    };

    setContentBlocks(sampleContentBlocks);
    setSiteSettings(sampleSiteSettings);
    setPlaceholderImages(samplePlaceholderImages);
  }, []);

  const saveContent = () => {
    // In a real app, this would save to your backend/CMS
    console.log('Saving content...', { contentBlocks, siteSettings });
    alert('Content saved successfully!');
  };

  const updateContentBlock = (id: string, updates: Partial<ContentBlock>) => {
    setContentBlocks(prev => prev.map(block =>
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const addContentBlock = (type: ContentBlock['type'], page: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      title: 'New Content Block',
      content: 'Click to edit this content...',
      position: contentBlocks.filter(b => b.page === page).length + 1,
      isVisible: true,
      page
    };
    setContentBlocks(prev => [...prev, newBlock]);
  };

  const ContentEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setPreviewMode('desktop')}>
            <Monitor className={`h-4 w-4 mr-2 ${previewMode === 'desktop' ? 'text-blue-600' : ''}`} />
            Desktop
          </Button>
          <Button variant="outline" onClick={() => setPreviewMode('tablet')}>
            <Tablet className={`h-4 w-4 mr-2 ${previewMode === 'tablet' ? 'text-blue-600' : ''}`} />
            Tablet
          </Button>
          <Button variant="outline" onClick={() => setPreviewMode('mobile')}>
            <Smartphone className={`h-4 w-4 mr-2 ${previewMode === 'mobile' ? 'text-blue-600' : ''}`} />
            Mobile
          </Button>
          <Button onClick={saveContent}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Page Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Content</CardTitle>
              <CardDescription>Drag and drop to reorder content blocks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentBlocks
                  .filter(block => block.page === 'home')
                  .sort((a, b) => a.position - b.position)
                  .map((block) => (
                    <div
                      key={block.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedBlock?.id === block.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedBlock(block)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {block.type === 'hero' && <Rocket className="h-4 w-4 text-blue-600" />}
                          {block.type === 'feature' && <Star className="h-4 w-4 text-green-600" />}
                          {block.type === 'testimonial' && <Heart className="h-4 w-4 text-red-600" />}
                          {block.type === 'stats' && <BarChart3 className="h-4 w-4 text-purple-600" />}
                          {block.type === 'cta' && <Target className="h-4 w-4 text-orange-600" />}
                          <span className="font-medium">{block.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={block.isVisible ? 'default' : 'secondary'}>
                            {block.isVisible ? 'Visible' : 'Hidden'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateContentBlock(block.id, { isVisible: !block.isVisible });
                            }}
                          >
                            {block.isVisible ? <Eye className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{block.content}</p>
                      {block.imageUrl && (
                        <img
                          src={block.imageUrl}
                          alt={block.altText}
                          className="mt-2 w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}

                <Button
                  variant="dashed"
                  className="w-full p-8 border-2 border-dashed border-gray-300 hover:border-blue-500"
                  onClick={() => addContentBlock('text', 'home')}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Content Block
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Block Editor */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Edit Content Block</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBlock ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Block Type</label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={selectedBlock.type}
                      onChange={(e) => updateContentBlock(selectedBlock.id, { type: e.target.value as ContentBlock['type'] })}
                    >
                      <option value="text">Text Block</option>
                      <option value="hero">Hero Section</option>
                      <option value="feature">Feature Block</option>
                      <option value="testimonial">Testimonial</option>
                      <option value="stats">Statistics</option>
                      <option value="cta">Call to Action</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={selectedBlock.title}
                      onChange={(e) => updateContentBlock(selectedBlock.id, { title: e.target.value })}
                      placeholder="Enter block title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      value={selectedBlock.content}
                      onChange={(e) => updateContentBlock(selectedBlock.id, { content: e.target.value })}
                      placeholder="Enter your content..."
                      rows={4}
                    />
                  </div>

                  {(selectedBlock.type === 'hero' || selectedBlock.type === 'feature' || selectedBlock.type === 'testimonial') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <div className="flex space-x-2">
                          <Input
                            value={selectedBlock.imageUrl || ''}
                            onChange={(e) => updateContentBlock(selectedBlock.id, { imageUrl: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                          <Button variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Alt Text</label>
                        <Input
                          value={selectedBlock.altText || ''}
                          onChange={(e) => updateContentBlock(selectedBlock.id, { altText: e.target.value })}
                          placeholder="Describe the image..."
                        />
                      </div>
                    </>
                  )}

                  {(selectedBlock.type === 'hero' || selectedBlock.type === 'cta') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Button Text</label>
                        <Input
                          value={selectedBlock.buttonText || ''}
                          onChange={(e) => updateContentBlock(selectedBlock.id, { buttonText: e.target.value })}
                          placeholder="Click here..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Button URL</label>
                        <Input
                          value={selectedBlock.buttonUrl || ''}
                          onChange={(e) => updateContentBlock(selectedBlock.id, { buttonUrl: e.target.value })}
                          placeholder="/signup"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBlock.isVisible}
                      onChange={(e) => updateContentBlock(selectedBlock.id, { isVisible: e.target.checked })}
                      id="visible-checkbox"
                    />
                    <label htmlFor="visible-checkbox" className="text-sm">Visible on site</label>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setContentBlocks(prev => prev.filter(b => b.id !== selectedBlock.id));
                      setSelectedBlock(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Block
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Select a content block to edit</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const MediaLibrary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {placeholderImages.map((image) => (
          <Card key={image.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="font-medium truncate">{image.title}</h4>
                <Badge variant="outline" className="mt-2">
                  {image.category}
                </Badge>
                <div className="flex items-center space-x-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Upload placeholder */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer">
          <CardContent className="p-0 h-48 flex items-center justify-center">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Upload New Image</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const SiteSettingsEditor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Site Settings</h2>

      {siteSettings && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <Input
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings(prev => prev ? { ...prev, siteName: e.target.value } : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tagline</label>
                <Input
                  value={siteSettings.tagline}
                  onChange={(e) => setSiteSettings(prev => prev ? { ...prev, tagline: e.target.value } : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <Input
                  value={siteSettings.logo}
                  onChange={(e) => setSiteSettings(prev => prev ? { ...prev, logo: e.target.value } : null)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={siteSettings.primaryColor}
                    onChange={(e) => setSiteSettings(prev => prev ? { ...prev, primaryColor: e.target.value } : null)}
                    className="w-16"
                  />
                  <Input
                    value={siteSettings.primaryColor}
                    onChange={(e) => setSiteSettings(prev => prev ? { ...prev, primaryColor: e.target.value } : null)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={siteSettings.secondaryColor}
                    onChange={(e) => setSiteSettings(prev => prev ? { ...prev, secondaryColor: e.target.value } : null)}
                    className="w-16"
                  />
                  <Input
                    value={siteSettings.secondaryColor}
                    onChange={(e) => setSiteSettings(prev => prev ? { ...prev, secondaryColor: e.target.value } : null)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Accent Color</label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={siteSettings.accentColor}
                    onChange={(e) => setSiteSettings(prev => prev ? { ...prev, accentColor: e.target.value } : null)}
                    className="w-16"
                  />
                  <Input
                    value={siteSettings.accentColor}
                    onChange={(e) => setSiteSettings(prev => prev ? { ...prev, accentColor: e.target.value } : null)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  value={siteSettings.contactEmail}
                  onChange={(e) => setSiteSettings(prev => prev ? { ...prev, contactEmail: e.target.value } : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={siteSettings.contactPhone}
                  onChange={(e) => setSiteSettings(prev => prev ? { ...prev, contactPhone: e.target.value } : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Textarea
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings(prev => prev ? { ...prev, address: e.target.value } : null)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Meta Title</label>
                <Input
                  value={siteSettings.seoSettings.metaTitle}
                  onChange={(e) => setSiteSettings(prev => prev ? {
                    ...prev,
                    seoSettings: { ...prev.seoSettings, metaTitle: e.target.value }
                  } : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <Textarea
                  value={siteSettings.seoSettings.metaDescription}
                  onChange={(e) => setSiteSettings(prev => prev ? {
                    ...prev,
                    seoSettings: { ...prev.seoSettings, metaDescription: e.target.value }
                  } : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Keywords</label>
                <Input
                  value={siteSettings.seoSettings.keywords}
                  onChange={(e) => setSiteSettings(prev => prev ? {
                    ...prev,
                    seoSettings: { ...prev.seoSettings, keywords: e.target.value }
                  } : null)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Page Views</p>
                <p className="text-2xl font-bold">12,847</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% this month
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">247</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  1.9% rate
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$18,952</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  +15% growth
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { page: 'Homepage Hero', views: 8432, conversions: 127, rate: '1.5%' },
              { page: 'Training Features', views: 5621, conversions: 89, rate: '1.6%' },
              { page: 'Success Stories', views: 4387, conversions: 71, rate: '1.6%' },
              { page: 'Join Now CTA', views: 3912, conversions: 156, rate: '4.0%' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{item.page}</div>
                  <div className="text-sm text-gray-600">{item.views} views</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{item.conversions} conversions</div>
                  <div className="text-sm text-gray-600">{item.rate} rate</div>
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
          <h1 className="text-3xl font-bold flex items-center">
            <Settings className="h-8 w-8 mr-3 text-blue-600" />
            MLM Platform Admin
          </h1>
          <p className="text-gray-600">Manage your entire site content, design, and settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Site
          </Button>
          <Button>
            <Globe className="h-4 w-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content Editor</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentEditor />
        </TabsContent>

        <TabsContent value="media">
          <MediaLibrary />
        </TabsContent>

        <TabsContent value="settings">
          <SiteSettingsEditor />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
