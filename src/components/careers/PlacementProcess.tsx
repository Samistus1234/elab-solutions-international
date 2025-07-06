'use client'

import { motion } from 'framer-motion'
import { UserPlus, FileSearch, Users, Plane, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Profile Creation',
    description: 'Build your professional profile with our guidance',
    details: [
      'Resume optimization',
      'Credential verification',
      'Skills assessment',
      'Career goals mapping',
    ],
  },
  {
    icon: FileSearch,
    title: 'Job Matching',
    description: 'AI-powered matching with suitable opportunities',
    details: [
      'Personalized job recommendations',
      'Salary benchmarking',
      'Location preferences',
      'Specialty alignment',
    ],
  },
  {
    icon: Users,
    title: 'Interview Preparation',
    description: 'Comprehensive support for interview success',
    details: [
      'Mock interviews',
      'Cultural orientation',
      'Technical preparation',
      'Salary negotiation tips',
    ],
  },
  {
    icon: Plane,
    title: 'Relocation Support',
    description: 'Complete assistance with your move',
    details: [
      'Visa processing',
      'Housing assistance',
      'Family support',
      'Cultural integration',
    ],
  },
  {
    icon: CheckCircle,
    title: 'Post-Placement Care',
    description: 'Continued support after placement',
    details: [
      '90-day follow-up',
      'Performance coaching',
      'Career development',
      'Community building',
    ],
  },
]

export function PlacementProcess() {
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
            Your Journey to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive placement process ensures you're fully prepared and supported 
            at every step of your career transition
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-teal-200 -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg text-center relative z-10">
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="text-left space-y-1">
                    {step.details.map((detail) => (
                      <li key={detail} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="absolute -top-3 -right-3 bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
            <p className="text-gray-900 font-semibold">Placement Success Rate</p>
            <p className="text-gray-600 text-sm mt-2">
              Of candidates placed within 60 days
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">$15K</div>
            <p className="text-gray-900 font-semibold">Average Salary Increase</p>
            <p className="text-gray-600 text-sm mt-2">
              Compared to home country positions
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">92%</div>
            <p className="text-gray-900 font-semibold">Retention Rate</p>
            <p className="text-gray-600 text-sm mt-2">
              Still employed after 2 years
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}