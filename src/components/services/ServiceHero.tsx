'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Globe, Award } from 'lucide-react'

const highlights = [
  {
    icon: Shield,
    text: 'ISO Certified Processes',
  },
  {
    icon: Clock,
    text: '48-Hour Processing',
  },
  {
    icon: Globe,
    text: '15+ Countries Served',
  },
  {
    icon: Award,
    text: '98% Success Rate',
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
            Comprehensive Healthcare Solutions
          </h1>
          
          <p className="text-xl text-primary-100 mb-12">
            From credentialing to placement, we provide end-to-end services designed to advance 
            your healthcare career globally. Our expert team ensures smooth processing and 
            successful outcomes for every client.
          </p>
          
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