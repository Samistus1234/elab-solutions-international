'use client'

import { motion } from 'framer-motion'
import { FileText, Video, Download, BookOpen, Users, TrendingUp } from 'lucide-react'

const resources = [
  {
    icon: FileText,
    title: 'CV Writing Guide',
    description: 'Create a standout CV for Gulf healthcare positions',
    type: 'PDF Guide',
    action: 'Download',
  },
  {
    icon: Video,
    title: 'Interview Masterclass',
    description: 'Video series on acing healthcare interviews',
    type: 'Video Course',
    action: 'Watch Now',
  },
  {
    icon: BookOpen,
    title: 'Country Guides',
    description: 'Living and working guides for each Gulf country',
    type: 'E-Books',
    action: 'Read More',
  },
  {
    icon: TrendingUp,
    title: 'Salary Reports',
    description: '2024 healthcare salary trends by specialty',
    type: 'Report',
    action: 'View Report',
  },
  {
    icon: Users,
    title: 'Success Stories',
    description: 'Learn from professionals who made the move',
    type: 'Case Studies',
    action: 'Read Stories',
  },
  {
    icon: Download,
    title: 'Application Templates',
    description: 'Cover letters and application templates',
    type: 'Templates',
    action: 'Get Templates',
  },
]

const tips = [
  {
    title: 'Research Your Destination',
    content: 'Understand the healthcare system, culture, and requirements of your target country.',
  },
  {
    title: 'Prepare Your Documents Early',
    content: 'Start credential verification and attestation processes well in advance.',
  },
  {
    title: 'Network Actively',
    content: 'Join professional groups and connect with healthcare professionals already working abroad.',
  },
  {
    title: 'Continuous Learning',
    content: 'Stay updated with the latest practices and consider additional certifications.',
  },
]

export function CareerResources() {
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
            Career Resources & Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to prepare for your international healthcare career
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <resource.icon className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                  {resource.type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              
              <button className="text-teal-600 hover:text-teal-700 font-semibold">
                {resource.action} →
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Pro Tips for International Job Seekers
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-gray-600">{tip.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-teal-900 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-teal-100 mb-6">
              Upload your CV and let our experts match you with the perfect opportunity
            </p>
            <button className="bg-white text-teal-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Upload Your CV
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}