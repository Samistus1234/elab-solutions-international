'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, Crown, Star, Zap, Shield, Clock, Users, 
  MessageCircle, Phone, Mail, Award, Target, TrendingUp 
} from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  interval: 'month' | 'year';
  description: string;
  badge?: string;
  popular?: boolean;
  features: PlanFeature[];
  limits: {
    applications: string;
    support: string;
    processing: string;
    consultations: string;
  };
  cta: string;
  color: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Professional',
    price: 49,
    interval: 'month',
    description: 'Perfect for healthcare professionals starting their international career journey',
    features: [
      { text: '1 application per quarter', included: true },
      { text: 'Document review and feedback', included: true },
      { text: 'Email support (48h response)', included: true },
      { text: 'Basic progress tracking', included: true },
      { text: 'Country requirement guides', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Priority processing', included: false },
      { text: 'Phone/WhatsApp support', included: false },
      { text: 'Dedicated consultant', included: false },
      { text: 'Interview preparation', included: false },
    ],
    limits: {
      applications: '1 per quarter',
      support: 'Email only',
      processing: 'Standard (15-20 days)',
      consultations: 'None included'
    },
    cta: 'Start Basic Plan',
    color: 'blue'
  },
  {
    id: 'premium',
    name: 'Premium Professional',
    price: 149,
    originalPrice: 199,
    interval: 'month',
    description: 'Most popular choice for serious professionals seeking comprehensive support',
    badge: 'Most Popular',
    popular: true,
    features: [
      { text: '3 applications per year', included: true, highlight: true },
      { text: 'Priority document processing', included: true, highlight: true },
      { text: 'WhatsApp & phone support', included: true, highlight: true },
      { text: 'Document translation included', included: true },
      { text: 'Country-specific guidance', included: true },
      { text: 'Resume/CV optimization', included: true },
      { text: 'Interview preparation kit', included: true },
      { text: 'Success probability assessment', included: true },
      { text: 'Dedicated consultant', included: false },
      { text: '24/7 premium support', included: false },
    ],
    limits: {
      applications: '3 per year',
      support: 'WhatsApp + Phone',
      processing: 'Priority (7-10 days)',
      consultations: '2 per month'
    },
    cta: 'Start Premium Plan',
    color: 'purple'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Professional',
    price: 399,
    originalPrice: 499,
    interval: 'month',
    description: 'Complete solution for professionals requiring maximum support and flexibility',
    badge: 'Best Value',
    features: [
      { text: 'Unlimited applications', included: true, highlight: true },
      { text: 'Dedicated account manager', included: true, highlight: true },
      { text: '24/7 premium support', included: true, highlight: true },
      { text: 'Rush processing (24-48h)', included: true, highlight: true },
      { text: 'Document legalization assistance', included: true },
      { text: 'Salary negotiation support', included: true },
      { text: 'Career coaching sessions', included: true },
      { text: 'Job placement assistance', included: true },
      { text: 'Custom reporting dashboard', included: true },
      { text: 'Success guarantee program', included: true, highlight: true },
    ],
    limits: {
      applications: 'Unlimited',
      support: '24/7 Dedicated Manager',
      processing: 'Rush (24-48h)',
      consultations: 'Weekly sessions'
    },
    cta: 'Start Enterprise Plan',
    color: 'gold'
  }
];

const annualDiscountPlans: SubscriptionPlan[] = subscriptionPlans.map(plan => ({
  ...plan,
  price: Math.round(plan.price * 12 * 0.8), // 20% discount for annual
  originalPrice: plan.price * 12,
  interval: 'year' as const,
  badge: plan.badge ? `${plan.badge} + 20% Off` : '20% Off Annual'
}));

export function SubscriptionPlans() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annually'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const currentPlans = billingInterval === 'annually' ? annualDiscountPlans : subscriptionPlans;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // TODO: Integrate with Stripe or payment processor
    console.log('Selected plan:', planId, 'Billing:', billingInterval);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Professional Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From basic document verification to comprehensive career support, 
            choose the plan that fits your international healthcare career goals.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                billingInterval === 'monthly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('annually')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                billingInterval === 'annually'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Annual</span>
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-4 ring-purple-500/20 scale-105' : ''
              } hover:shadow-2xl transition-all duration-300`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute top-0 right-0 ${
                  plan.popular ? 'bg-purple-600' : 'bg-blue-600'
                } text-white px-4 py-2 text-sm font-medium rounded-bl-lg`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.color === 'gold' ? 'bg-yellow-100' : 
                    plan.color === 'purple' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    {plan.id === 'basic' && <Star className={`h-8 w-8 text-blue-600`} />}
                    {plan.id === 'premium' && <Crown className={`h-8 w-8 text-purple-600`} />}
                    {plan.id === 'enterprise' && <Shield className={`h-8 w-8 text-yellow-600`} />}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{billingInterval === 'annually' ? 'year' : 'month'}
                      </span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-center mt-2">
                        <span className="text-gray-400 line-through text-lg">
                          ${plan.originalPrice}
                        </span>
                        <span className="text-green-600 font-semibold ml-2">
                          Save ${plan.originalPrice - plan.price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Check className={`h-3 w-3 ${
                          feature.included ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className={`ml-3 text-sm ${
                        feature.included 
                          ? feature.highlight 
                            ? 'text-gray-900 font-semibold' 
                            : 'text-gray-700'
                          : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Limits Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Plan Limits
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Applications: <span className="font-medium">{plan.limits.applications}</span></div>
                    <div>Processing: <span className="font-medium">{plan.limits.processing}</span></div>
                    <div>Support: <span className="font-medium">{plan.limits.support}</span></div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      : plan.id === 'enterprise'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {plan.cta}
                </button>

                {billingInterval === 'monthly' && (
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Cancel anytime • No setup fees
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              All Plans Include
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your application progress 24/7</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure Platform</h4>
                <p className="text-sm text-gray-600">Bank-level security for your documents</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Consultants</h4>
                <p className="text-sm text-gray-600">Access to certified healthcare advisors</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Success Tracking</h4>
                <p className="text-sm text-gray-600">Proven 96% success rate globally</p>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              30-Day Money-Back Guarantee • No Questions Asked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}