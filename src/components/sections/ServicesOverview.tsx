'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileCheck, Award, GraduationCap, Briefcase, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: FileCheck,
    title: 'DataFlow Verification',
    description: 'Comprehensive primary source verification services for healthcare professionals seeking opportunities in the Gulf region.',
    features: ['Document Authentication', 'License Verification', 'Experience Validation'],
    href: '/services/dataflow',
    color: 'primary',
  },
  {
    icon: Award,
    title: 'Regulatory Licensing',
    description: 'Expert assistance with regulatory body applications and healthcare licensing across multiple jurisdictions.',
    features: ['DHA/HAAD/MOH', 'SCFHS Registration', 'International Licensing'],
    href: '/services/licensing',
    color: 'secondary',
  },
  {
    icon: GraduationCap,
    title: 'Exam Preparation',
    description: 'Comprehensive exam preparation through ELAB Academy with AI-powered tutors and extensive question banks.',
    features: ['NCLEX-RN', 'Prometric Exams', 'Language Proficiency'],
    href: '/academy',
    color: 'primary',
  },
  {
    icon: Briefcase,
    title: 'Global Placement',
    description: 'Connect with top healthcare institutions worldwide through our extensive network and placement services.',
    features: ['Job Matching', 'Interview Prep', 'Relocation Support'],
    href: '/careers',
    color: 'secondary',
  },
]

export function ServicesOverview() {
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
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From credentialing to placement, we provide end-to-end services to advance your healthcare career globally
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-lg bg-${service.color}-100 text-${service.color}-600 mb-4`}>
                <service.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href={service.href}
                className={`inline-flex items-center text-${service.color}-600 font-semibold group-hover:text-${service.color}-700 transition-colors`}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors group"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}