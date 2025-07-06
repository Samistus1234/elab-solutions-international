'use client'

import Link from 'next/link';import { motion } from 'framer-motion'
import { FileText, Search, CheckSquare, Send, Trophy, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Document Collection',
    description: 'We help you gather all required documents including educational certificates, licenses, and experience letters.',
    details: [
      'Educational transcripts and certificates',
      'Professional licenses',
      'Experience certificates',
      'Passport and photo',
    ],
  },
  {
    icon: Search,
    title: 'Document Review',
    description: 'Our experts thoroughly review your documents to ensure they meet DataFlow requirements.',
    details: [
      'Completeness check',
      'Authenticity verification',
      'Format compliance',
      'Translation if needed',
    ],
  },
  {
    icon: CheckSquare,
    title: 'Application Preparation',
    description: 'We prepare and submit your DataFlow application with all required information.',
    details: [
      'Online form completion',
      'Document upload',
      'Fee payment processing',
      'Application submission',
    ],
  },
  {
    icon: Send,
    title: 'Verification Process',
    description: 'DataFlow contacts your institutions directly for primary source verification.',
    details: [
      'University verification',
      'License board confirmation',
      'Employer verification',
      'Status tracking',
    ],
  },
  {
    icon: Trophy,
    title: 'Report Delivery',
    description: 'Receive your verified DataFlow report ready for regulatory authority submission.',
    details: [
      'Digital report access',
      'Physical certificate',
      'Validity confirmation',
      'Next steps guidance',
    ],
  },
]

export function DataFlowProcess() {
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
            DataFlow Verification Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures your DataFlow verification is completed 
            efficiently and accurately
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-lg mr-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Step {index + 1}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{step.description}</p>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <step.icon className="h-32 w-32 text-primary-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary-900 text-white rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Track Your Application in Real-Time
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            With our CentralOps platform, you can monitor your DataFlow application status 
            24/7 and receive instant notifications at each stage
          </p>
          <Link
            href="/centralops"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
          >
            Learn About CentralOps
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}