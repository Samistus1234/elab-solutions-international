'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageSquare, Clock, Globe } from 'lucide-react'

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    details: [
      { label: 'Nigeria', value: '+234 123 456 7890' },
      { label: 'UAE', value: '+971 4 123 4567' },
      { label: 'Saudi Arabia', value: '+966 11 123 4567' },
    ],
  },
  {
    icon: Mail,
    title: 'Email',
    details: [
      { label: 'General Inquiries', value: 'info@elabsolutions.com' },
      { label: 'Support', value: 'support@elabsolutions.com' },
      { label: 'Careers', value: 'careers@elabsolutions.com' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    details: [
      { label: 'WhatsApp', value: '+234 123 456 7890' },
      { label: 'Website Chat', value: 'Available 24/7' },
    ],
  },
]

const businessHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM (Local Time)' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM (Local Time)' },
  { day: 'Sunday', hours: 'Closed' },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-primary-100 rounded-lg mr-3">
                  <method.icon className="h-5 w-5 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900">{method.title}</h4>
              </div>
              
              <div className="ml-11 space-y-2">
                {method.details.map((detail) => (
                  <div key={detail.label}>
                    <p className="text-sm text-gray-600">{detail.label}</p>
                    <p className="font-medium text-gray-900">{detail.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-primary-50 rounded-2xl p-8"
      >
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-primary-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
        </div>
        
        <div className="space-y-3">
          {businessHours.map((schedule) => (
            <div key={schedule.day} className="flex justify-between">
              <span className="text-gray-600">{schedule.day}</span>
              <span className="font-medium text-gray-900">{schedule.hours}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-primary-200">
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="h-4 w-4 mr-2" />
            <p>Support available in multiple time zones</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
      >
        <h3 className="text-xl font-bold mb-4">Urgent Support?</h3>
        <p className="text-primary-100 mb-6">
          For urgent matters regarding active applications or time-sensitive issues, 
          our priority support team is available.
        </p>
        <a
          href="https://wa.me/2341234567890"
          className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          WhatsApp Support
        </a>
      </motion.div>
    </div>
  )
}