'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const offices = [
  {
    country: 'Nigeria',
    city: 'Lagos',
    address: '123 Victoria Island, Lagos State, Nigeria',
    phone: '+234 123 456 7890',
    email: 'lagos@elabsolutions.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM WAT',
    mapUrl: '#',
    flag: '🇳🇬',
  },
  {
    country: 'United Arab Emirates',
    city: 'Dubai',
    address: '456 Business Bay, Dubai, UAE',
    phone: '+971 4 123 4567',
    email: 'dubai@elabsolutions.com',
    hours: 'Sun-Thu: 9:00 AM - 6:00 PM GST',
    mapUrl: '#',
    flag: '🇦🇪',
  },
  {
    country: 'Saudi Arabia',
    city: 'Riyadh',
    address: '789 King Fahd Road, Riyadh, KSA',
    phone: '+966 11 123 4567',
    email: 'riyadh@elabsolutions.com',
    hours: 'Sun-Thu: 8:00 AM - 5:00 PM AST',
    mapUrl: '#',
    flag: '🇸🇦',
  },
]

export function OfficeLocations() {
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
            Our Office Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit us at any of our offices across Africa and the Middle East. 
            Our teams are ready to assist you with your healthcare career journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-4xl mr-3">{office.flag}</span>
                  <h3 className="text-2xl font-bold text-gray-900 inline">{office.city}</h3>
                  <p className="text-gray-600">{office.country}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{office.address}</p>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <a
                    href={`tel:${office.phone}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {office.phone}
                  </a>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {office.email}
                  </a>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{office.hours}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href={office.mapUrl}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View on Map
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Planning to Visit?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We recommend scheduling an appointment to ensure our team is available to provide 
            you with the best possible service. Contact us to arrange your visit.
          </p>
          <a
            href="tel:+2341234567890"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Schedule an Appointment
          </a>
        </motion.div>
      </div>
    </section>
  )
}