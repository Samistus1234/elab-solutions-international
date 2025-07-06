'use client'

import { motion } from 'framer-motion'
import { UserPlus, FileSearch, CheckSquare, Send, Trophy } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Initial Consultation',
    description: 'Free consultation to understand your requirements and career goals',
  },
  {
    icon: FileSearch,
    title: 'Document Review',
    description: 'Thorough review of all your documents to ensure completeness',
  },
  {
    icon: CheckSquare,
    title: 'Application Processing',
    description: 'Expert handling of your applications with real-time tracking',
  },
  {
    icon: Send,
    title: 'Submission & Follow-up',
    description: 'Direct submission to authorities with regular status updates',
  },
  {
    icon: Trophy,
    title: 'Successful Completion',
    description: 'Receive your verified credentials and start your journey',
  },
]

export function ProcessOverview() {
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
            Our Streamlined Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've simplified the complex credentialing process into five easy steps, 
            ensuring a smooth journey from start to finish
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="bg-white relative z-10 mx-auto">
                  <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Process?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">48-72hrs</div>
              <p className="text-gray-600">Average processing time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <p className="text-gray-600">Document security guaranteed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <p className="text-gray-600">Support availability</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}