'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, Rocket } from 'lucide-react' // Updated imports

const highlights = [
  {
    icon: Users,
    text: '85,000+ Healthcare Professionals Served',
  },
  {
    icon: Award,
    text: '17+ Years Experience',
  },
  {
    icon: Shield,
    text: 'ISO 27001 Certified',
  },
  {
    icon: Rocket,
    text: '98.5% Success Rate',
  },
]

export function ServiceHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Healthcare Licensing & Career Solutions
          </h1>
          
          <p className="text-xl text-primary-100 mb-8">
            From NCLEX preparation to global placement - we provide end-to-end solutions for healthcare professionals pursuing international opportunities across 25+ countries.
          </p>
          
          {/* Key Service Areas */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <span className="text-2xl">🩺</span>
              <p className="text-sm mt-1">NCLEX & International Exams</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <span className="text-2xl">🏥</span>
              <p className="text-sm mt-1">Regulatory Licensing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <span className="text-2xl">📋</span>
              <p className="text-sm mt-1">DataFlow Verification</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <span className="text-2xl">🎓</span>
              <p className="text-sm mt-1">Credential Evaluation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <span className="text-2xl">🌍</span>
              <p className="text-sm mt-1">Global Placement</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <span className="text-2xl">🗣️</span>
              <p className="text-sm mt-1">English Language Support</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full mb-3">
                  <item.icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}