'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 to-secondary-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Start Your Journey Together
          </h1>
          
          <p className="text-xl text-primary-100 mb-12">
            Whether you're a healthcare professional seeking opportunities or an institution 
            looking for talent, we're here to help. Reach out to our team today.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <MessageSquare className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm">24/7 Live Chat</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <Phone className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-sm">Phone Support</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <Mail className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm">Email Support</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <MapPin className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-sm">3 Office Locations</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}