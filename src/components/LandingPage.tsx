'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  Users,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Quote,
  Globe,
  Smartphone,
  BarChart3,
  BookOpen,
  Headphones,
  Gift,
  Crown,
  Rocket,
  Heart,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const stats = [
    { label: 'Active Members', value: '15,000+', icon: Users, color: 'text-blue-600' },
    { label: 'Success Stories', value: '2,847', icon: Star, color: 'text-yellow-600' },
    { label: 'Countries Served', value: '47', icon: Globe, color: 'text-green-600' },
    { label: 'Avg. Monthly Growth', value: '23%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Training',
      description: 'Access our complete library of training materials, video courses, and interactive tutorials designed to accelerate your success.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed analytics, commission reports, and team performance insights in real-time.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Build and manage your team with our genealogy tools, communication system, and automated follow-up sequences.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Access everything on-the-go with our mobile-optimized platform. Manage your business from anywhere.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help when you need it with our dedicated support team and community of successful entrepreneurs.',
      image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=600&h=400&fit=crop'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data and commissions are protected with enterprise-grade security and transparent reporting.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Diamond Leader',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop',
      content: 'This platform completely transformed my life. Within 6 months, I was able to replace my full-time income and now help others achieve the same success.',
      earnings: '$12,500/month',
      timeframe: '8 months'
    },
    {
      name: 'Michael Chen',
      role: 'Executive Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      content: 'The training and support system here is unmatched. I went from complete beginner to top 1% performer in just one year.',
      earnings: '$28,750/month',
      timeframe: '14 months'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Regional Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      content: 'The community and mentorship opportunities have been incredible. This isnt just a business, its a family that supports your dreams.',
      earnings: '$8,900/month',
      timeframe: '6 months'
    }
  ];

  const benefits = [
    'Proven compensation plan with multiple income streams',
    'Comprehensive training program for all skill levels',
    'Advanced marketing tools and automated systems',
    'Real-time analytics and performance tracking',
    'Dedicated support team and mentor network',
    'Mobile-optimized platform for business on-the-go',
    'Secure payment processing and transparent reporting',
    'Global community of successful entrepreneurs'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">MLM Master</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#success" className="text-gray-600 hover:text-blue-600">Success Stories</a>
              <a href="#training" className="text-gray-600 hover:text-blue-600">Training</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">Join Now</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                ⚡ Limited Time: Join Today & Get 30% Commission Boost
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Your Life with Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {' '}Proven MLM System
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of successful entrepreneurs who have built thriving businesses with our comprehensive training, cutting-edge tools, and supportive community. Start your journey to financial freedom today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Your Journey Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Success Stories
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop'
                  ].map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Success story"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 15,000+ members</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Success team meeting"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">$47,250</p>
                    <p className="text-sm text-gray-600">Avg. Monthly Earnings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              🚀 Everything You Need to Succeed
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools for Your Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools, training, and support you need to build a thriving MLM business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                ✅ Proven System
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We've helped thousands of people just like you build successful businesses. Our proven system provides everything you need to succeed.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=600&fit=crop"
                alt="Business growth"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">2,847 Active Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="success" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              ⭐ Real Success Stories
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See What Our Members Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              These are real people who have transformed their lives with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-blue-600 mb-4" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-blue-600">{testimonial.role}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className="text-green-600">
                          {testimonial.earnings}
                        </Badge>
                        <span className="text-xs text-gray-500">{testimonial.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of successful entrepreneurs and get access to all the tools, training, and support you need to build a thriving business.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div>
                <Gift className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Training</h3>
                <p className="text-blue-100">Complete training library included</p>
              </div>
              <div>
                <Zap className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
                <p className="text-blue-100">Get started immediately</p>
              </div>
              <div>
                <Heart className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-blue-100">Join 15,000+ successful members</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Join Now - Limited Time Offer
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Our Success Team
            </Button>
          </div>

          <p className="text-blue-100 mt-6 text-sm">
            30-day money-back guarantee • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MLM Master</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your life with our proven MLM system. Join thousands of successful entrepreneurs today.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Training</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>success@mlmmaster.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Success Blvd, EC 12345</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MLM Master Platform. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
