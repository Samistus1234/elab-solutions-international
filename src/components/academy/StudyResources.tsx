'use client'

import { motion } from 'framer-motion'
import { FileText, Video, Headphones, BookOpen, FlaskConical, Users } from 'lucide-react'

const resources = [
  {
    icon: FileText,
    title: 'Question Banks',
    count: '50,000+',
    description: 'Extensive collection of exam-style questions with detailed rationales',
    features: ['Topic-wise organization', 'Difficulty levels', 'Timed practice', 'Performance analytics'],
  },
  {
    icon: Video,
    title: 'Video Lessons',
    count: '2,000+',
    description: 'Expert-led video tutorials covering all exam topics',
    features: ['HD quality videos', 'Downloadable content', 'Subtitles available', 'Mobile friendly'],
  },
  {
    icon: BookOpen,
    title: 'Study Guides',
    count: '500+',
    description: 'Comprehensive study materials and reference guides',
    features: ['PDF downloads', 'Quick references', 'Concept maps', 'Summary sheets'],
  },
  {
    icon: FlaskConical,
    title: 'Case Studies',
    count: '1,000+',
    description: 'Real-world scenarios to enhance clinical reasoning',
    features: ['Interactive cases', 'Step-by-step analysis', 'Clinical scenarios', 'Best practices'],
  },
  {
    icon: Headphones,
    title: 'Audio Lessons',
    count: '800+',
    description: 'Learn on-the-go with our audio study materials',
    features: ['Podcast format', 'Offline access', 'Speed control', 'Chapter markers'],
  },
  {
    icon: Users,
    title: 'Study Groups',
    count: '100+',
    description: 'Join virtual study groups with peers preparing for the same exam',
    features: ['Live sessions', 'Peer support', 'Group discussions', 'Shared resources'],
  },
]

export function StudyResources() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Study Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed, all in one place. Access thousands of resources 
            designed by healthcare education experts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <resource.icon className="h-8 w-8 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">{resource.count}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              
              <ul className="space-y-2">
                {resource.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Mobile App Available
              </h3>
              <p className="text-purple-100 mb-6">
                Study anywhere, anytime with our mobile app. Download content for offline access, 
                sync progress across devices, and never miss a study session.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Download for iOS
                </button>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Download for Android
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">4.8★</div>
                <p className="text-purple-200">App Store Rating</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">100K+</div>
                <p className="text-purple-200">Downloads</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}