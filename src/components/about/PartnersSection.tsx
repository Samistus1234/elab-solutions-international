'use client'

import { motion } from 'framer-motion'
import { Building, Globe, Award, Users } from 'lucide-react'

const partners = [
  {
    category: 'Healthcare Institutions',
    icon: Building,
    partners: [
      'Cleveland Clinic Abu Dhabi',
      'King Faisal Specialist Hospital',
      'Hamad Medical Corporation',
      'Dubai Health Authority',
      'Mediclinic Middle East',
      'Saudi German Hospital Group',
    ],
  },
  {
    category: 'Regulatory Bodies',
    icon: Award,
    partners: [
      'Dubai Health Authority (DHA)',
      'Health Authority Abu Dhabi (HAAD)',
      'Ministry of Health UAE',
      'Saudi Commission for Health Specialties',
      'Qatar Council for Healthcare Practitioners',
      'Oman Medical Specialty Board',
    ],
  },
  {
    category: 'Educational Partners',
    icon: Globe,
    partners: [
      'University of Lagos',
      'Cairo University',
      'American University of Beirut',
      'King Saud University',
      'University of Cape Town',
      'Aga Khan University',
    ],
  },
  {
    category: 'Technology Partners',
    icon: Users,
    partners: [
      'Microsoft Azure',
      'Amazon Web Services',
      'Stripe',
      'Paystack',
      'WhatsApp Business',
      'DataFlow Group',
    ],
  },
]

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading institutions and organizations to deliver 
            exceptional value to healthcare professionals worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {partners.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary-100 rounded-lg mr-4">
                  <category.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {category.category}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {category.partners.map((partner) => (
                  <div
                    key={partner}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:bg-primary-50 transition-colors"
                  >
                    <p className="text-gray-700 font-medium">{partner}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Become a Partner
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our network of partners and help shape the future of global healthcare staffing. 
            Whether you're a healthcare institution, educational provider, or technology company, 
            let's explore how we can work together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Partner With Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}