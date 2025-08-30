'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, TrendingUp, DollarSign, Award, Shield, Globe,
  CheckCircle, ArrowRight, Star, Zap, Target, Clock,
  BarChart3, PieChart, LineChart, Eye, Edit, Plus,
  Briefcase, HeartHandshake, Building, UserCheck
} from 'lucide-react';

const partnerTiers = [
  {
    id: 'individual',
    name: 'Individual Recruiter',
    price: 'Free',
    description: 'Perfect for individual recruiters managing their own client portfolio',
    color: 'green',
    features: [
      'Manage up to 50 clients',
      'Basic progress tracking',
      'Standard reporting',
      'Email support',
      'Mobile app access',
      '10% commission rate'
    ],
    limitations: [
      'Limited to personal clients only',
      'Basic analytics dashboard',
      'Standard support response time'
    ]
  },
  {
    id: 'consultant',
    name: 'Consultant Level',
    price: '$99/month',
    description: 'Ideal for consultants managing multiple recruiters and larger client bases',
    color: 'blue',
    popular: true,
    features: [
      'Manage unlimited clients',
      'Team management tools',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      '12% commission rate',
      'Bulk operations',
      'Advanced reporting'
    ],
    limitations: [
      'Limited territory management',
      'Standard integrations only'
    ]
  },
  {
    id: 'specialist',
    name: 'Specialist Partner',
    price: '$299/month',
    description: 'Enterprise solution for specialist partners with territory management',
    color: 'purple',
    features: [
      'Everything in Consultant',
      'Territory management',
      'Multi-region operations',
      'White-label solution',
      'API access',
      '15% commission rate',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced fraud protection'
    ],
    limitations: []
  }
];

const platformStats = [
  { label: 'Active Partners', value: '2,847', growth: '+23%' },
  { label: 'Clients Managed', value: '45,672', growth: '+34%' },
  { label: 'Monthly Commissions', value: '$2.4M', growth: '+28%' },
  { label: 'Avg. Success Rate', value: '84.5%', growth: '+5.2%' }
];

const keyFeatures = [
  {
    icon: Users,
    title: 'Complete Client Journey Management',
    description: 'Track clients from initial inquiry through credential verification, licensing, and job placement.',
    benefits: ['Real-time progress tracking', 'Automated notifications', 'Document management']
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics & Reporting',
    description: 'Comprehensive dashboards with healthcare-specific KPIs and performance metrics.',
    benefits: ['Conversion funnel analysis', 'Commission tracking', 'Performance insights']
  },
  {
    icon: DollarSign,
    title: 'Automated Commission Management',
    description: 'Transparent commission tracking with automated payouts and detailed earnings reports.',
    benefits: ['Real-time earnings tracking', 'Automated payments', 'Tax documentation']
  },
  {
    icon: Shield,
    title: 'Compliance & Verification',
    description: 'Integrated compliance tools for healthcare credentialing and document verification.',
    benefits: ['HIPAA compliance', 'Document security', 'Audit trails']
  }
];

const successStories = [
  {
    name: 'Sarah Thompson',
    title: 'Senior Healthcare Recruiter',
    tier: 'Consultant',
    earnings: '$127K',
    clients: 156,
    quote: 'CentralOps transformed my recruitment practice. I now manage 3x more clients with better outcomes.',
    image: '/api/placeholder/64/64'
  },
  {
    name: 'Ahmed Al-Rashid',
    title: 'Specialist Partner',
    tier: 'Specialist',
    earnings: '$340K',
    clients: 420,
    quote: 'The territory management and white-label features helped me scale across multiple regions.',
    image: '/api/placeholder/64/64'
  },
  {
    name: 'Maria Santos',
    title: 'Independent Consultant',
    tier: 'Individual',
    earnings: '$84K',
    clients: 89,
    quote: 'Started with the free tier and grew my practice systematically. The platform is incredible.',
    image: '/api/placeholder/64/64'
  }
];

export default function CentralOpsPage() {
  const [selectedTier, setSelectedTier] = useState('consultant');

  const getTierColor = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-8">
                CentralOps Partner Platform
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                The most advanced B2B platform for healthcare recruiters, agents, and consultants. 
                Manage your clients from credential verification to job placement with unmatched transparency and control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/centralops/dashboard">
                  <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                    Access Dashboard
                  </button>
                </Link>
                <Link href="#partner-tiers">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                    View Partner Tiers
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powering Healthcare Recruitment Worldwide</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of partners across the globe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium mb-2">{stat.label}</div>
                <div className="text-green-600 font-semibold text-sm">{stat.growth} this month</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Complete Healthcare Recruitment Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your clients' journey from initial inquiry to successful job placement
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex space-x-6"
              >
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-xl p-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section id="partner-tiers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Partner Tier</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect plan for your recruitment business size and needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerTiers.map((tier, index) => {
              const colors = getTierColor(tier.color);
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                    tier.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{tier.price}</div>
                    {tier.id !== 'individual' && <div className="text-gray-500">per month</div>}
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-900">Features included:</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <Link href={`/centralops/signup?tier=${tier.id}`}>
                      <button className={`w-full ${colors.button} text-white font-bold py-4 px-6 rounded-xl transition-colors`}>
                        {tier.id === 'individual' ? 'Start Free' : 'Start Trial'}
                      </button>
                    </Link>
                    <Link href="/consultation">
                      <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-medium py-3 px-6 rounded-xl transition-colors">
                        Schedule Demo
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Partner Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our partners are transforming their recruitment businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold mx-auto mb-4">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                  <p className="text-gray-600">{story.title}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {story.tier} Partner
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{story.earnings}</div>
                    <div className="text-sm text-gray-600">Annual Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{story.clients}</div>
                    <div className="text-sm text-gray-600">Clients Managed</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic text-center">
                  "{story.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Recruitment Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful partners who trust CentralOps to manage their healthcare recruitment operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/centralops/signup">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                Start Free Trial
              </button>
            </Link>
            <Link href="/consultation">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                Schedule Demo
              </button>
            </Link>
            <Link href="/centralops/dashboard">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                Access Dashboard
              </button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-100">
            <div className="flex items-center justify-center">
              <Shield className="h-6 w-6 mr-3" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center justify-center">
              <Globe className="h-6 w-6 mr-3" />
              <span>Global Operations</span>
            </div>
            <div className="flex items-center justify-center">
              <Award className="h-6 w-6 mr-3" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}