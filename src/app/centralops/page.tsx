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
      {/* Hero Section with Animated Graphics */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Geometric Shapes */}
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20"
            animate={{ 
              y: [-20, 20, -20], 
              x: [-10, 10, -10],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-16 h-16 bg-purple-400 rotate-45 opacity-30"
            animate={{ 
              rotate: [45, 225, 45],
              y: [0, -30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-40 left-1/4 w-12 h-12 bg-cyan-400 rounded-full opacity-25"
            animate={{ 
              x: [-15, 15, -15],
              y: [0, -25, 0],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Network Nodes */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full opacity-20"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 12)}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Animated Circuit Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.path
              d="M100,200 Q300,100 500,200 T900,200"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M200,400 Q400,300 600,400 T1000,400"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </div>

        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(90deg, #ffffff, #60a5fa, #a855f7, #ffffff)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    CentralOps
                  </motion.span>{" "}
                  Partner Platform
                </motion.h1>
                
                <motion.p 
                  className="text-xl lg:text-xl mb-8 text-blue-100 max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  The most advanced B2B platform for healthcare recruiters, agents, and consultants. 
                  Manage your clients from credential verification to job placement with unmatched transparency and control.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link href="/centralops/dashboard">
                    <motion.button 
                      className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Access Dashboard
                    </motion.button>
                  </Link>
                  <Link href="/centralops/services">
                    <motion.button 
                      className="bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ⚡ Service Management
                    </motion.button>
                  </Link>
                  <Link href="/centralops/applications">
                    <motion.button 
                      className="bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📊 Application Management
                    </motion.button>
                  </Link>
                  <Link href="/centralops/academy">
                    <motion.button 
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🎓 Academy Management
                    </motion.button>
                  </Link>
                  <Link href="/centralops/recruiters">
                    <motion.button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🎯 Recruiter Dashboard
                    </motion.button>
                  </Link>
                  <Link href="#partner-tiers">
                    <motion.button 
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Partner Tiers
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Animated Dashboard Walkthrough */}
            <div className="relative">
              <motion.div
                className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Dashboard Background */}
                <div className="absolute inset-0 opacity-80">
                  {/* Dashboard Grid */}
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="dashboard-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dashboard-grid)" />
                  </svg>

                  {/* Animated Charts */}
                  <div className="absolute top-4 left-4 right-4 space-y-4">
                    {/* Bar Chart */}
                    <motion.div
                      className="bg-white/20 rounded-lg p-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <div className="flex space-x-2 justify-between items-end h-16">
                        {[40, 60, 80, 45, 70, 55].map((height, i) => (
                          <motion.div
                            key={i}
                            className="bg-blue-300 rounded-t"
                            style={{ width: '12px' }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Line Chart */}
                    <motion.div
                      className="bg-white/20 rounded-lg p-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                    >
                      <svg className="w-full h-12">
                        <motion.path
                          d="M 10 40 Q 50 10 90 25 T 170 30 T 250 15"
                          stroke="rgb(147, 197, 253)"
                          strokeWidth="3"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.5, duration: 2 }}
                        />
                        {[10, 90, 170, 250].map((x, i) => (
                          <motion.circle
                            key={i}
                            cx={x}
                            cy={[40, 25, 30, 15][i]}
                            r="4"
                            fill="rgb(59, 130, 246)"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.2, duration: 0.3 }}
                          />
                        ))}
                      </svg>
                    </motion.div>

                    {/* Pie Chart */}
                    <motion.div
                      className="bg-white/20 rounded-lg p-4 flex justify-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                    >
                      <svg className="w-16 h-16">
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgb(147, 197, 253)"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray="175.9"
                          initial={{ strokeDashoffset: 175.9 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ delay: 2, duration: 1.5 }}
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray="175.9"
                          initial={{ strokeDashoffset: 175.9 }}
                          animate={{ strokeDashoffset: 110 }}
                          transition={{ delay: 2.3, duration: 1.2 }}
                          transform="rotate(-90 32 32)"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Walking Person Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    animate={{
                      x: [-100, -50, 0, 50, 100, 50, 0, -50],
                      y: [0, -20, 0, -10, 0, -15, 0, -10],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Person SVG */}
                    <motion.svg
                      width="60"
                      height="80"
                      viewBox="0 0 60 80"
                      className="text-white"
                      animate={{ scale: [1, 1.1, 1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Head */}
                      <motion.circle
                        cx="30"
                        cy="15"
                        r="8"
                        fill="currentColor"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      />
                      
                      {/* Body */}
                      <motion.rect
                        x="25"
                        y="23"
                        width="10"
                        height="25"
                        fill="currentColor"
                        rx="2"
                      />
                      
                      {/* Arms */}
                      <motion.rect
                        x="15"
                        y="25"
                        width="8"
                        height="3"
                        fill="currentColor"
                        rx="1.5"
                        animate={{ rotate: [-10, 10, -10] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <motion.rect
                        x="37"
                        y="25"
                        width="8"
                        height="3"
                        fill="currentColor"
                        rx="1.5"
                        animate={{ rotate: [10, -10, 10] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      
                      {/* Legs */}
                      <motion.rect
                        x="26"
                        y="48"
                        width="3"
                        height="20"
                        fill="currentColor"
                        rx="1.5"
                        animate={{ rotate: [-15, 15, -15] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <motion.rect
                        x="31"
                        y="48"
                        width="3"
                        height="20"
                        fill="currentColor"
                        rx="1.5"
                        animate={{ rotate: [15, -15, 15] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      
                      {/* Briefcase */}
                      <motion.rect
                        x="40"
                        y="30"
                        width="8"
                        height="6"
                        fill="currentColor"
                        rx="1"
                        animate={{ 
                          y: [30, 28, 30],
                          rotate: [-5, 5, -5] 
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                    </motion.svg>

                    {/* Interaction Points */}
                    <motion.div
                      className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    />
                    <motion.div
                      className="absolute top-2 -right-6 w-2 h-2 bg-green-400 rounded-full"
                      animate={{
                        scale: [0, 1.2, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 2.5,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Floating Data Points */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-70"
                    style={{
                      top: `${20 + (i * 10)}%`,
                      left: `${15 + (i * 8)}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.7, 0.3, 0.7],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}

                {/* Success Indicators */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 3, duration: 0.5 }}
                >
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Action Icons */}
        <div className="absolute bottom-10 right-10">
          {[Users, TrendingUp, DollarSign].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              style={{
                bottom: `${index * 60}px`,
                right: `${index * 20}px`,
              }}
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform Stats with Enhanced Animation */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Powering Healthcare Recruitment Worldwide
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by thousands of partners across the globe
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
                
                {/* Icon Animation */}
                <motion.div
                  className="absolute top-4 right-4 opacity-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {index === 0 && <Users className="w-8 h-8 text-blue-500" />}
                  {index === 1 && <Building className="w-8 h-8 text-green-500" />}
                  {index === 2 && <DollarSign className="w-8 h-8 text-yellow-500" />}
                  {index === 3 && <TrendingUp className="w-8 h-8 text-purple-500" />}
                </motion.div>

                <motion.div 
                  className="text-4xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring", stiffness: 150 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-700 font-medium mb-2">{stat.label}</div>
                <motion.div 
                  className="text-green-600 font-semibold text-sm flex items-center justify-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.growth} this month
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features with Interactive Animation */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                cx={`${(i % 5) * 20 + 10}%`}
                cy={`${Math.floor(i / 5) * 25 + 12.5}%`}
                r="2"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0.5, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${((i * 3) % 5) * 20 + 10}%`}
                y1={`${Math.floor((i * 3) / 5) * 25 + 12.5}%`}
                x2={`${(((i * 3) + 1) % 5) * 20 + 10}%`}
                y2={`${Math.floor(((i * 3) + 1) / 5) * 25 + 12.5}%`}
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Complete Healthcare Recruitment Management
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to manage your clients' journey from initial inquiry to successful job placement
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="flex space-x-6 group"
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="bg-blue-100 rounded-xl p-4 relative group-hover:bg-blue-200 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated Ring */}
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-300 rounded-xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: index * 0.5 
                      }}
                    />
                    <feature.icon className="h-8 w-8 text-blue-600 relative z-10" />
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                          style={{
                            top: `${20 + i * 20}%`,
                            left: `${30 + i * 15}%`,
                          }}
                          animate={{
                            y: [-5, 5, -5],
                            x: [-2, 2, -2],
                            opacity: [0.6, 0.2, 0.6],
                          }}
                          transition={{
                            duration: 2 + i,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="flex-1">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-6 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {feature.description}
                  </motion.p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li 
                        key={benefitIndex} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.5 + benefitIndex * 0.1 
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        </motion.div>
                        <span className="text-gray-700">{benefit}</span>
                      </motion.li>
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

      {/* CTA Section with Dynamic Animation */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Bubbles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Animated Wave Pattern */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-32 opacity-20"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Recruitment Business?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of successful partners who trust CentralOps to manage their healthcare recruitment operations.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/centralops/signup">
              <motion.button 
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px -12px rgba(0, 0, 0, 0.3)",
                    "0 15px 40px -12px rgba(0, 0, 0, 0.4)",
                    "0 10px 30px -12px rgba(0, 0, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Start Free Trial
              </motion.button>
            </Link>
            <Link href="/centralops/services">
              <motion.button 
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-green-500 hover:to-teal-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⚡ Service Management
              </motion.button>
            </Link>
            <Link href="/centralops/applications">
              <motion.button 
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white hover:from-red-500 hover:to-pink-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📊 Application Management
              </motion.button>
            </Link>
            <Link href="/centralops/academy">
              <motion.button 
                className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white hover:from-indigo-500 hover:to-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎓 Academy Management
              </motion.button>
            </Link>
            <Link href="/centralops/recruiters">
              <motion.button 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎯 Recruiter Dashboard
              </motion.button>
            </Link>
            <Link href="/consultation">
              <motion.button 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </Link>
            <Link href="/centralops/dashboard">
              <motion.button 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Access Dashboard
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="h-6 w-6 mr-3" />
              </motion.div>
              <span>HIPAA Compliant</span>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <Globe className="h-6 w-6 mr-3" />
              </motion.div>
              <span>Global Operations</span>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ 
                  y: [-2, 2, -2],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Award className="h-6 w-6 mr-3" />
              </motion.div>
              <span>24/7 Support</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}