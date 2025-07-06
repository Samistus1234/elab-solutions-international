'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Award, Medal } from 'lucide-react'

const awards = [
  {
    year: '2023',
    title: 'Best Healthcare Recruitment Platform',
    organization: 'Gulf Healthcare Awards',
    icon: Trophy,
  },
  {
    year: '2023',
    title: 'Excellence in Digital Innovation',
    organization: 'Africa Tech Summit',
    icon: Star,
  },
  {
    year: '2022',
    title: 'ISO 9001:2015 Certification',
    organization: 'International Organization for Standardization',
    icon: Award,
  },
  {
    year: '2022',
    title: 'Top Employer - Healthcare Sector',
    organization: 'Nigerian Employers Association',
    icon: Medal,
  },
  {
    year: '2021',
    title: 'Best EdTech Solution',
    organization: 'Middle East Education Awards',
    icon: Star,
  },
  {
    year: '2020',
    title: 'Customer Excellence Award',
    organization: 'Healthcare Service Excellence Forum',
    icon: Trophy,
  },
]

const certifications = [
  'ISO 9001:2015 Quality Management',
  'ISO 27001 Information Security',
  'GDPR Compliant',
  'PCI DSS Certified',
]

export function AwardsSection() {
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
            Recognition & Awards
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders and 
            international organizations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.year}-${award.title}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex p-3 bg-white rounded-full shadow-md mb-4">
                <award.icon className="h-8 w-8 text-primary-600" />
              </div>
              
              <div className="text-primary-600 font-bold mb-2">{award.year}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {award.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {award.organization}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Certifications & Compliance
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Award className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <p className="font-medium text-gray-900">{cert}</p>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
            We maintain the highest standards of quality, security, and compliance to ensure 
            the trust and confidence of our clients and partners worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  )
}