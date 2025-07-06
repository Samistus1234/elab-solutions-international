'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileCheck, Award, GraduationCap, Globe, ArrowRight, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: FileCheck,
    title: 'DataFlow Verification',
    description: 'Primary source verification for healthcare professionals seeking opportunities in the Gulf region.',
    features: [
      'Document authentication and verification',
      'License verification from source',
      'Educational credential validation',
      'Experience certificate verification',
      'Real-time tracking via CentralOps',
    ],
    benefits: [
      'Fast processing (48-72 hours)',
      'Direct submission to regulatory bodies',
      'Multi-country coverage',
      'Secure document handling',
    ],
    href: '/services/dataflow',
    color: 'primary',
  },
  {
    icon: Award,
    title: 'Regulatory Licensing',
    description: 'Complete assistance with healthcare regulatory body applications across multiple jurisdictions.',
    features: [
      'DHA (Dubai Health Authority)',
      'HAAD (Abu Dhabi Health Authority)',
      'MOH (Ministry of Health) UAE',
      'SCFHS (Saudi Commission)',
      'QCHP (Qatar Council)',
    ],
    benefits: [
      'Expert guidance throughout',
      'Document preparation assistance',
      'Application tracking',
      'Interview preparation support',
    ],
    href: '/services/licensing',
    color: 'secondary',
  },
  {
    icon: GraduationCap,
    title: 'Credential Evaluation',
    description: 'Comprehensive evaluation of international healthcare credentials for global recognition.',
    features: [
      'Educational transcript evaluation',
      'Professional license assessment',
      'Experience verification',
      'Competency mapping',
      'Equivalency certificates',
    ],
    benefits: [
      'Internationally recognized reports',
      'Fast turnaround time',
      'Multi-language support',
      'Digital verification',
    ],
    href: '/services/credentials',
    color: 'primary',
  },
  {
    icon: Globe,
    title: 'Global Placement Services',
    description: 'Connect with top healthcare institutions worldwide through our extensive network.',
    features: [
      'Job matching services',
      'Profile optimization',
      'Interview preparation',
      'Visa assistance',
      'Relocation support',
    ],
    benefits: [
      'Access to exclusive opportunities',
      'Personalized career guidance',
      'Salary negotiation support',
      'Post-placement assistance',
    ],
    href: '/careers',
    color: 'secondary',
  },
]

export function ServiceGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`bg-${service.color}-600 text-white p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <service.icon className="h-10 w-10" />
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-white hover:text-${service.color}-100 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-${service.color}-100">{service.description}</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-${service.color}-600 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}