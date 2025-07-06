'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star } from 'lucide-react'

const packages = [
  {
    name: 'Basic',
    price: '$299',
    description: 'Essential DataFlow verification service',
    features: [
      'Single country application',
      'Document review and preparation',
      'Application submission',
      'Email support',
      'Processing time: 20-30 days',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$449',
    description: 'Complete verification with priority support',
    features: [
      'Multi-country applications (up to 3)',
      'Priority document review',
      'Expedited processing',
      'WhatsApp & email support',
      'Processing time: 15-20 days',
      'Free document translation (up to 5)',
      'Application status tracking',
    ],
    highlighted: true,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$699',
    description: 'Premium service for healthcare institutions',
    features: [
      'Unlimited country applications',
      'Dedicated account manager',
      'Same-day document review',
      '24/7 priority support',
      'Processing time: 10-15 days',
      'Unlimited document translation',
      'Bulk application discounts',
      'Custom reporting dashboard',
    ],
    highlighted: false,
  },
]

export function DataFlowPricing() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the package that best fits your needs. All plans include our 
            success guarantee and expert support
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl ${
                pkg.highlighted
                  ? 'ring-2 ring-primary-600 shadow-xl scale-105'
                  : 'shadow-lg'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-600 ml-2">per application</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    pkg.highlighted
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
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
          <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Success Guarantee
            </h3>
            <p className="text-gray-600 mb-6">
              We're confident in our expertise. If your DataFlow application is rejected due to 
              our error, we'll reprocess it free of charge or provide a full refund.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">98%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">10K+</div>
                <p className="text-gray-600">Applications Processed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">15+</div>
                <p className="text-gray-600">Countries Covered</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}