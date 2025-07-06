'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export function DataFlowHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="bg-primary-800 text-primary-200 px-4 py-2 rounded-full text-sm font-medium">
                Primary Source Verification
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DataFlow Verification Services
            </h1>
            
            <p className="text-xl text-primary-100 mb-8">
              Streamline your journey to working in the Gulf region with our expert DataFlow 
              verification services. We handle the complex process of primary source verification 
              for all your educational and professional credentials.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-3 text-green-400" />
                <span>100% secure document handling</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-6 w-6 mr-3 text-green-400" />
                <span>Average processing time: 15-30 days</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                <span>98% first-time approval rate</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
              >
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#requirements"
                className="inline-flex items-center justify-center bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-900 transition-colors border-2 border-white/20"
              >
                View Requirements
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Countries We Serve</h3>
              
              <div className="space-y-4">
                {[
                  { country: 'United Arab Emirates', authorities: 'DHA, HAAD, MOH' },
                  { country: 'Saudi Arabia', authorities: 'SCFHS' },
                  { country: 'Qatar', authorities: 'QCHP' },
                  { country: 'Kuwait', authorities: 'MOH Kuwait' },
                  { country: 'Bahrain', authorities: 'NHRA' },
                  { country: 'Oman', authorities: 'MOH Oman' },
                ].map((item) => (
                  <div key={item.country} className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold">{item.country}</h4>
                    <p className="text-primary-200 text-sm">{item.authorities}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-primary-200 mb-2">Need help choosing?</p>
                <Link
                  href="/contact"
                  className="text-white font-semibold hover:text-primary-100 inline-flex items-center"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}