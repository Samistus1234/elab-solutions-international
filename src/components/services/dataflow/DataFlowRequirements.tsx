'use client'

import { motion } from 'framer-motion'
import { FileText, GraduationCap, Award, Briefcase, AlertCircle } from 'lucide-react'

const requirements = [
  {
    icon: GraduationCap,
    category: 'Educational Documents',
    items: [
      'Degree certificates (Bachelor\'s, Master\'s, PhD)',
      'Academic transcripts/mark sheets',
      'Internship completion certificate',
      'Professional diploma certificates',
    ],
    note: 'All documents must be attested by the issuing institution',
  },
  {
    icon: Award,
    category: 'Professional Licenses',
    items: [
      'Current professional license',
      'Previous license renewals',
      'Registration certificates',
      'Good standing certificates',
    ],
    note: 'License must be active and in good standing',
  },
  {
    icon: Briefcase,
    category: 'Experience Documents',
    items: [
      'Experience certificates from all employers',
      'Reference letters (if required)',
      'Job descriptions/duty letters',
      'Contract copies (for some authorities)',
    ],
    note: 'Must include dates, designation, and job responsibilities',
  },
  {
    icon: FileText,
    category: 'Personal Documents',
    items: [
      'Valid passport copy',
      'Professional photograph',
      'CV/Resume',
      'Marriage certificate (if name changed)',
    ],
    note: 'Passport must have at least 6 months validity',
  },
]

export function DataFlowRequirements() {
  return (
    <section id="requirements" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Document Requirements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ensure you have all necessary documents ready for a smooth DataFlow verification process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {requirements.map((req, index) => (
            <motion.div
              key={req.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg mr-4">
                  <req.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{req.category}</h3>
              </div>
              
              <ul className="space-y-2 mb-4">
                {req.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-amber-800">{req.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Important Guidelines</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Document Preparation</h4>
              <ul className="space-y-1 text-sm text-primary-100">
                <li>• Ensure all documents are clear and legible</li>
                <li>• Color scans are preferred over black & white</li>
                <li>• File size should not exceed 5MB per document</li>
                <li>• Accepted formats: PDF, JPG, PNG</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Additional Requirements</h4>
              <ul className="space-y-1 text-sm text-primary-100">
                <li>• Documents in languages other than English need translation</li>
                <li>• Some authorities require attestation from embassy</li>
                <li>• Gap periods in employment need explanation letters</li>
                <li>• Name variations must be explained with affidavit</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-primary-100">
              Need help preparing your documents? Our experts provide free consultation to ensure your documents meet all requirements.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}