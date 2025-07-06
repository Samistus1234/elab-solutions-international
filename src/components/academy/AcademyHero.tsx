'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GraduationCap, Brain, Target, Trophy } from 'lucide-react'

export function AcademyHero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
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
                AI-Powered Learning Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ELAB Academy: Your Path to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Exam Success
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8">
              Master NCLEX, Prometric, and English proficiency exams with our revolutionary 
              AI-powered learning platform. Personalized study plans, adaptive learning, and 
              comprehensive resources designed for healthcare professionals.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-yellow-400" />
                <span>AI Personal Tutors</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-green-400" />
                <span>Targeted Practice</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span>Expert Content</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6 text-purple-400" />
                <span>90% Pass Rate</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#courses"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Courses
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Free Trial
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
                  <p className="text-purple-100">Practice Questions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">2000+</div>
                  <p className="text-purple-100">Video Lessons</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2">90%</div>
                  <p className="text-purple-100">Pass Rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <p className="text-purple-100">AI Support</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl p-4 w-64">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">AI Study Assistant</p>
                  <p className="text-gray-600 text-sm">Available 24/7</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}