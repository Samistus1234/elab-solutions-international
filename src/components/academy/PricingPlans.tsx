'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '$99',
    period: 'per month',
    description: 'Perfect for self-paced learners',
    features: [
      'Access to question banks',
      'Basic study materials',
      'Progress tracking',
      'Email support',
      'Mobile app access',
    ],
    notIncluded: [
      'AI tutor access',
      'Live sessions',
      'Personalized study plan',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$199',
    period: 'per month',
    description: 'Most popular choice for serious learners',
    features: [
      'Everything in Basic',
      'AI tutor 24/7 access',
      'Video lessons library',
      'Mock exams with analytics',
      'Personalized study plan',
      'Priority email & chat support',
      'Study group access',
    ],
    notIncluded: [
      '1-on-1 mentorship',
    ],
    highlighted: true,
    popular: true,
  },
  {
    name: 'Premium',
    price: '$399',
    period: 'per month',
    description: 'Comprehensive support for guaranteed success',
    features: [
      'Everything in Professional',
      '1-on-1 expert mentorship',
      'Weekly live sessions',
      'Unlimited mock exams',
      'Interview preparation',
      'Job placement assistance',
      'Success guarantee*',
      'WhatsApp support',
    ],
    notIncluded: [],
    highlighted: false,
  },
]

export function PricingPlans() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing plans designed to fit your budget and learning needs. 
            All plans include a 7-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl ${
                plan.highlighted
                  ? 'ring-2 ring-purple-600 shadow-xl scale-105'
                  : 'shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <p className="font-semibold text-gray-900">Includes:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <p className="font-semibold text-gray-900 pt-4">Not included:</p>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <span className="text-gray-400 mr-3">✕</span>
                            <span className="text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                
                <Link
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-purple-100 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Success Guarantee
            </h3>
            <p className="text-gray-600 mb-6">
              We're so confident in our program that Premium plan members who don't pass their 
              exam after completing our full curriculum get a full refund or free extension 
              until they pass.*
            </p>
            
            <p className="text-sm text-gray-500">
              *Terms and conditions apply. Student must complete at least 80% of assigned coursework 
              and mock exams to qualify.
            </p>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              Need a custom plan for your institution?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}