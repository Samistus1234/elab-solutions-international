'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, MapPin, Briefcase, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export function CareersHero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  return (
    <section className="relative bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Healthcare Career
            </span>
          </h1>
          
          <p className="text-xl text-teal-100 mb-12">
            Connect with top healthcare institutions worldwide. Browse thousands of opportunities 
            in the Gulf region and beyond, all verified and ready for qualified professionals.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or specialty"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Country or city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <button className="w-full md:w-auto bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              Search Jobs
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-teal-400" />
              <span>5,000+ Active Jobs</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-cyan-400" />
              <span>15+ Countries</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              <span>New Jobs Daily</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}