'use client'

import { motion } from 'framer-motion'
import { Globe, Users, Award, Zap } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bridging Healthcare Talent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Across Continents
            </span>
          </h1>
          
          <p className="text-xl text-primary-100 mb-12">
            From our Nigerian roots to global excellence, eLab Solutions International has been 
            transforming healthcare careers and improving patient care worldwide since our founding.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Globe className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">15+</div>
              <p className="text-primary-200">Countries Served</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">10K+</div>
              <p className="text-primary-200">Professionals Placed</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">98%</div>
              <p className="text-primary-200">Success Rate</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">48hrs</div>
              <p className="text-primary-200">Avg. Processing</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}