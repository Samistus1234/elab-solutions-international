'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Mail, CreditCard, FileText, Globe, Smartphone } from 'lucide-react'

const integrations = [
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    description: 'Instant notifications and updates',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Email',
    icon: Mail,
    description: 'Comprehensive email alerts',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Stripe',
    icon: CreditCard,
    description: 'Secure payment processing',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Paystack',
    icon: CreditCard,
    description: 'African payment gateway',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    name: 'Apple Pay',
    icon: Smartphone,
    description: 'One-touch payments',
    color: 'text-gray-900',
    bgColor: 'bg-gray-100',
  },
  {
    name: 'DataFlow',
    icon: FileText,
    description: 'Direct API integration',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
]

export function IntegrationSection() {
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
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CentralOps connects with the tools and services you already use, 
            creating a unified ecosystem for your credentialing needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className={`inline-flex p-4 rounded-full ${integration.bgColor} mb-4`}>
                <integration.icon className={`h-8 w-8 ${integration.color}`} />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">
                {integration.name}
              </h3>
              
              <p className="text-sm text-gray-600">
                {integration.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-white text-center"
        >
          <Globe className="h-16 w-16 mx-auto mb-6 text-white/80" />
          <h3 className="text-3xl font-bold mb-4">
            API Access for Enterprise
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Integrate CentralOps directly into your existing systems with our 
            comprehensive RESTful API and webhook support
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">RESTful</div>
              <p className="text-primary-100">Modern API design</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Webhooks</div>
              <p className="text-primary-100">Real-time events</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">OAuth 2.0</div>
              <p className="text-primary-100">Secure authentication</p>
            </div>
          </div>
          
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Request API Access
          </a>
        </motion.div>
      </div>
    </section>
  )
}