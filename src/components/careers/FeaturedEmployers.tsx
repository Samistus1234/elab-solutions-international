'use client'

import { motion } from 'framer-motion'
import { Building, MapPin, Users, Star } from 'lucide-react'

const employers = [
  {
    name: 'Cleveland Clinic Abu Dhabi',
    logo: '🏥',
    location: 'Abu Dhabi, UAE',
    employees: '5000+',
    rating: 4.8,
    openPositions: 45,
    specialties: ['Cardiology', 'Oncology', 'Neurology'],
    description: 'World-class multi-specialty hospital',
  },
  {
    name: 'King Faisal Specialist Hospital',
    logo: '🏥',
    location: 'Riyadh, Saudi Arabia',
    employees: '10000+',
    rating: 4.7,
    openPositions: 62,
    specialties: ['Oncology', 'Transplant', 'Genetics'],
    description: 'Leading tertiary care and research center',
  },
  {
    name: 'Hamad Medical Corporation',
    logo: '🏥',
    location: 'Doha, Qatar',
    employees: '15000+',
    rating: 4.6,
    openPositions: 38,
    specialties: ['Emergency', 'Pediatrics', 'Women\'s Health'],
    description: 'Qatar\'s premier healthcare provider',
  },
  {
    name: 'Dubai Health Authority',
    logo: '🏥',
    location: 'Dubai, UAE',
    employees: '8000+',
    rating: 4.7,
    openPositions: 55,
    specialties: ['Public Health', 'Primary Care', 'Specialized Care'],
    description: 'Government healthcare network',
  },
  {
    name: 'Mediclinic Middle East',
    logo: '🏥',
    location: 'Multiple Locations',
    employees: '7000+',
    rating: 4.5,
    openPositions: 41,
    specialties: ['Multi-specialty', 'Emergency', 'Outpatient'],
    description: 'International private healthcare group',
  },
  {
    name: 'Saudi German Hospital Group',
    logo: '🏥',
    location: 'Multiple Countries',
    employees: '6000+',
    rating: 4.6,
    openPositions: 33,
    specialties: ['General Surgery', 'Orthopedics', 'Maternity'],
    description: 'Largest private hospital group in MENA',
  },
]

export function FeaturedEmployers() {
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
            Featured Healthcare Employers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with the most prestigious healthcare institutions in the Gulf region
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {employers.map((employer, index) => (
            <motion.div
              key={employer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{employer.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{employer.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {employer.location}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{employer.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Users className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-gray-900">{employer.employees}</p>
                  <p className="text-xs text-gray-600">Employees</p>
                </div>
                <div className="text-center">
                  <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-gray-900">{employer.rating}</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center">
                  <Building className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-gray-900">{employer.openPositions}</p>
                  <p className="text-xs text-gray-600">Open Jobs</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Key Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {employer.specialties.map((specialty) => (
                    <span key={specialty} className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                View All Jobs
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Want to feature your healthcare institution?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Become a Partner Employer
          </a>
        </motion.div>
      </div>
    </section>
  )
}