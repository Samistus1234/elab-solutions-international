'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Monitor, Zap, Shield, Globe } from 'lucide-react'

export function CentralOpsHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Revolutionary Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              CentralOps: Your Command Center for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Healthcare Credentialing
              </span>
            </h1>
            
            <p className="text-xl text-primary-100 mb-8">
              Experience the future of credentialing management with our all-in-one platform. 
              Track applications, manage documents, and receive real-time updates - all in one 
              secure, intuitive dashboard.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <Monitor className="h-6 w-6 text-green-400" />
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <span>Instant Notifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-400" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-purple-400" />
                <span>Multi-language Support</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Request Demo
              </Link>
              
              <Link
                href="#features"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="CentralOps Dashboard"
                className="relative rounded-2xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-900 font-medium">Live Status Updates</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">5</span>
                  </div>
                  <span className="text-gray-900 font-medium">New Notifications</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}