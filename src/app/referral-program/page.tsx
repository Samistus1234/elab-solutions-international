'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, DollarSign, Gift, ArrowRight, Star, Target,
  CheckCircle, TrendingUp, Award, Shield, Zap, Globe,
  UserPlus, CreditCard, BarChart3, Clock, Heart, Trophy,
  ChevronDown
} from 'lucide-react';

// Referral Program Structure based on research
const referralTiers = [
  {
    id: 'starter',
    name: 'Starter Referrer',
    minReferrals: 0,
    maxReferrals: 5,
    rewards: {
      dataflow: { amount: 50, currency: 'USD', description: '$50 per successful DataFlow referral' },
      nclex: { amount: 75, currency: 'USD', description: '$75 per NCLEX package referral' },
      licensing: { amount: 100, currency: 'USD', description: '$100 per licensing service referral' },
      consultation: { amount: 25, currency: 'USD', description: '$25 per consultation referral' }
    },
    bonuses: ['Welcome bonus: $25 for your first successful referral'],
    color: 'green'
  },
  {
    id: 'champion',
    name: 'Champion Referrer',
    minReferrals: 6,
    maxReferrals: 20,
    rewards: {
      dataflow: { amount: 75, currency: 'USD', description: '$75 per successful DataFlow referral' },
      nclex: { amount: 100, currency: 'USD', description: '$100 per NCLEX package referral' },
      licensing: { amount: 150, currency: 'USD', description: '$150 per licensing service referral' },
      consultation: { amount: 35, currency: 'USD', description: '$35 per consultation referral' }
    },
    bonuses: [
      'Quarterly bonus: $200 for 10+ referrals per quarter',
      'Early payment: Rewards paid within 15 days'
    ],
    popular: true,
    color: 'blue'
  },
  {
    id: 'ambassador',
    name: 'Elite Ambassador',
    minReferrals: 21,
    maxReferrals: null,
    rewards: {
      dataflow: { amount: 100, currency: 'USD', description: '$100 per successful DataFlow referral' },
      nclex: { amount: 125, currency: 'USD', description: '$125 per NCLEX package referral' },
      licensing: { amount: 200, currency: 'USD', description: '$200 per licensing service referral' },
      consultation: { amount: 50, currency: 'USD', description: '$50 per consultation referral' }
    },
    bonuses: [
      'Annual bonus: $1,000 for 50+ successful referrals',
      'Priority support and dedicated account manager',
      'Immediate payment: Rewards paid within 7 days',
      'Exclusive ambassador events and recognition'
    ],
    color: 'purple'
  }
];

const programStats = [
  { label: 'Active Referrers', value: '2,847', growth: '+34%' },
  { label: 'Total Rewards Paid', value: '$428K', growth: '+67%' },
  { label: 'Successful Referrals', value: '8,923', growth: '+45%' },
  { label: 'Average Monthly Earnings', value: '$385', growth: '+28%' }
];

const howItWorks = [
  {
    step: 1,
    title: 'Join the Program',
    description: 'Sign up for free and get your unique referral link and resources',
    icon: UserPlus,
    details: ['Instant approval for healthcare professionals', 'Marketing materials provided', 'Personal referral dashboard']
  },
  {
    step: 2,
    title: 'Share & Refer',
    description: 'Share your link with colleagues, friends, and professional networks',
    icon: Users,
    details: ['Social media sharing tools', 'Email templates provided', 'Track clicks and conversions']
  },
  {
    step: 3,
    title: 'Earn Rewards',
    description: 'Get paid when your referrals successfully complete their services',
    icon: CreditCard,
    details: ['Fast payment processing', 'Multiple payment methods', 'Detailed earnings reports']
  },
  {
    step: 4,
    title: 'Level Up',
    description: 'Unlock higher tiers with better rewards and exclusive benefits',
    icon: Trophy,
    details: ['Automatic tier upgrades', 'Bonus rewards for performance', 'VIP support access']
  }
];

const successStories = [
  {
    name: 'Dr. Amira Hassan',
    title: 'Pediatric Nurse, UAE',
    tier: 'Elite Ambassador',
    monthlyEarnings: '$1,250',
    totalReferrals: 47,
    quote: 'I\'ve helped 47 colleagues achieve their international healthcare dreams while earning substantial rewards.',
    image: '/api/placeholder/80/80'
  },
  {
    name: 'James Mitchell, RN',
    title: 'ICU Nurse, Australia',
    tier: 'Champion Referrer',
    monthlyEarnings: '$680',
    totalReferrals: 18,
    quote: 'The referral program has been an amazing way to support my peers while earning extra income.',
    image: '/api/placeholder/80/80'
  },
  {
    name: 'Maria Santos',
    title: 'Nurse Educator, Philippines',
    tier: 'Champion Referrer',
    monthlyEarnings: '$525',
    totalReferrals: 23,
    quote: 'eLab\'s referral program is transparent, reliable, and truly rewarding. Highly recommended!',
    image: '/api/placeholder/80/80'
  }
];

const faqs = [
  {
    question: 'How much can I earn through the referral program?',
    answer: 'Your earnings depend on your tier and the services your referrals choose. Starter referrers can earn $25-$100 per successful referral, while Elite Ambassadors can earn up to $200 per referral plus bonuses. Top performers earn over $1,000 monthly.'
  },
  {
    question: 'When do I get paid?',
    answer: 'Rewards are paid after your referral successfully completes their service payment. Starter referrers receive payment within 30 days, Champions within 15 days, and Elite Ambassadors within 7 days.'
  },
  {
    question: 'Is there a limit to how many people I can refer?',
    answer: 'No! There\'s no limit to the number of referrals you can make. The more successful referrals you generate, the higher your tier and the better your rewards become.'
  },
  {
    question: 'What counts as a successful referral?',
    answer: 'A successful referral is when someone uses your unique link to sign up and completes payment for any of our services (DataFlow, NCLEX, licensing, or consultation).'
  },
  {
    question: 'Can I track my referrals and earnings?',
    answer: 'Yes! Your personal referral dashboard provides real-time tracking of clicks, conversions, earnings, and detailed analytics to help you optimize your referral strategy.'
  }
];

export default function ReferralProgramPage() {
  const [selectedTier, setSelectedTier] = useState('champion');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Gift className="h-12 w-12 text-yellow-300" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-8">
                eLab Referral Program
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                Help your colleagues achieve their international healthcare dreams and earn substantial rewards. 
                Join thousands of healthcare professionals already earning through our referral program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/referral-program/signup">
                  <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                    Join Program - Free
                  </button>
                </Link>
                <Link href="/referral-program/dashboard">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                    Access Dashboard
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Performance</h2>
            <p className="text-lg text-gray-600">Join a thriving community of healthcare referrers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {programStats.map((stat, index) => (
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

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and begin earning from your professional network
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                  <div className="text-center mb-6">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Referral Tiers & Rewards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock higher rewards as you refer more successfully. Our tier system ensures top performers get the best benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {referralTiers.map((tier, index) => {
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
                    <p className="text-gray-600 mb-4">
                      {tier.minReferrals === 0 ? 'Start earning immediately' : 
                       tier.maxReferrals ? `${tier.minReferrals}-${tier.maxReferrals} successful referrals` :
                       `${tier.minReferrals}+ successful referrals`}
                    </p>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-4 py-2 text-sm font-medium mb-4">
                      Up to ${Math.max(...Object.values(tier.rewards).map(r => r.amount))} per referral
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Service Rewards:</h4>
                      <ul className="space-y-2">
                        {Object.entries(tier.rewards).map(([service, reward]) => (
                          <li key={service} className="flex items-start">
                            <DollarSign className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{reward.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tier.bonuses.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Bonus Benefits:</h4>
                        <ul className="space-y-2">
                          {tier.bonuses.map((bonus, bonusIndex) => (
                            <li key={bonusIndex} className="flex items-start">
                              <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{bonus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Link href="/referral-program/signup">
                    <button className={`w-full ${colors.button} text-white font-bold py-4 px-6 rounded-xl transition-colors`}>
                      {tier.minReferrals === 0 ? 'Start Free' : 'Upgrade to This Tier'}
                    </button>
                  </Link>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our referrers are making a difference while earning substantial rewards
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
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center text-white font-bold mx-auto mb-4 text-lg">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                  <p className="text-gray-600">{story.title}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {story.tier}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{story.monthlyEarnings}</div>
                    <div className="text-sm text-gray-600">Monthly Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{story.totalReferrals}</div>
                    <div className="text-sm text-gray-600">Total Referrals</div>
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our referral program
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md"
              >
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who are already earning through our referral program. 
            It's free to join and you can start earning immediately.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/referral-program/signup">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                Join Free Today
              </button>
            </Link>
            <Link href="/referral-program/dashboard">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                View Dashboard
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-colors">
                Ask Questions
              </button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-blue-100">
            <div className="flex items-center justify-center">
              <Shield className="h-6 w-6 mr-3" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center justify-center">
              <Globe className="h-6 w-6 mr-3" />
              <span>Global Program</span>
            </div>
            <div className="flex items-center justify-center">
              <Award className="h-6 w-6 mr-3" />
              <span>Trusted Platform</span>
            </div>
            <div className="flex items-center justify-center">
              <Heart className="h-6 w-6 mr-3" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}