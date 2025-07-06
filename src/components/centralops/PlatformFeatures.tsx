'use client'

import { motion } from 'framer-motion'
import { 
  Activity, 
  FileText, 
  Bell, 
  CreditCard, 
  Lock, 
  Users, 
  BarChart3, 
  Globe2,
  Smartphone,
  Cloud,
  Zap,
  Shield
} from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'Real-time Application Tracking',
    description: 'Monitor every step of your credentialing journey with live status updates and progress indicators.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: FileText,
    title: 'Smart Document Management',
    description: 'Upload, store, and manage all your documents securely with automatic validation and organization.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Bell,
    title: 'Automated Notifications',
    description: 'Receive instant updates via email and WhatsApp at every stage of your application process.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment Processing',
    description: 'Multiple payment options including Stripe, Paystack, and Apple Pay with complete transaction security.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    icon: Users,
    title: 'Multi-user Access',
    description: 'Collaborate with team members or family with role-based access control and activity logs.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into application timelines, success rates, and processing patterns.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Globe2,
    title: 'Multi-language Interface',
    description: 'Seamlessly switch between English, Arabic, and French for a comfortable user experience.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Access your dashboard anywhere with our fully responsive design optimized for all devices.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
]

const additionalFeatures = [
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'Unlimited secure cloud storage for all your documents',
  },
  {
    icon: Zap,
    title: 'API Integration',
    description: 'Connect with third-party systems via our robust API',
  },
  {
    icon: Shield,
    title: 'Data Encryption',
    description: '256-bit encryption for all sensitive information',
  },
  {
    icon: Users,
    title: '24/7 Support',
    description: 'Round-the-clock technical support and assistance',
  },
]

export function PlatformFeatures() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Seamless Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CentralOps brings together everything you need to manage your healthcare 
            credentialing journey in one intelligent platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Additional Platform Benefits
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-primary-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}