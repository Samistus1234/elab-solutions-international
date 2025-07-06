'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Monitor, Bot, Bell, CreditCard, FileText, Globe2 } from 'lucide-react'

const features = [
  {
    icon: Monitor,
    title: 'CentralOps Platform',
    description: 'Real-time tracking and management of all your applications in one place',
  },
  {
    icon: Bot,
    title: 'AI-Powered Learning',
    description: 'Advanced AI tutors and personalized study plans for exam success',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Stay updated with email and WhatsApp notifications on application status',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multiple payment options including Stripe, Paystack, and Apple Pay',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Secure cloud storage and easy document submission process',
  },
  {
    icon: Globe2,
    title: 'Multi-language Support',
    description: 'Platform available in English, Arabic, and French',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Powered by Technology,{' '}
              <span className="gradient-text">Driven by Excellence</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Our cutting-edge CentralOps platform revolutionizes the credentialing process with advanced features designed for efficiency and transparency.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link
              href="/centralops"
              className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Explore CentralOps Platform
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="CentralOps Platform Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20"></div>
            </div>
            
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary-200 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}