'use client'

import { motion } from 'framer-motion'
import { Star, Trophy, Clock } from 'lucide-react'

const successStories = [
  {
    name: 'Maria Rodriguez',
    exam: 'NCLEX-RN',
    score: 'Passed on first attempt',
    country: 'Now working in Texas, USA',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80',
    testimonial: 'The AI tutor was a game-changer! It identified my weak areas in pharmacology and created a personalized study plan. The mock exams were incredibly similar to the actual NCLEX.',
    studyTime: '3 months',
    improvement: '+35%',
  },
  {
    name: 'Ahmed Hassan',
    exam: 'DHA License',
    score: '92% Score',
    country: 'Now working in Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80',
    testimonial: 'ELAB Academy\'s Prometric preparation was comprehensive. The question bank covered everything I needed, and the explanations helped me understand concepts deeply.',
    studyTime: '2 months',
    improvement: '+40%',
  },
  {
    name: 'Jennifer Park',
    exam: 'IELTS Academic',
    score: 'Band 8.5',
    country: 'Now working in London, UK',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    testimonial: 'The medical English focus was exactly what I needed. The AI speaking practice helped me gain confidence, and the writing templates were invaluable.',
    studyTime: '6 weeks',
    improvement: '+2 Bands',
  },
]

const stats = [
  { value: '90%', label: 'Pass Rate', description: 'First attempt success' },
  { value: '15K+', label: 'Success Stories', description: 'Healthcare professionals placed' },
  { value: '4.9/5', label: 'Student Rating', description: 'Average satisfaction score' },
  { value: '45d', label: 'Avg. Prep Time', description: 'To exam success' },
]

export function SuccessStories() {
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
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who have achieved their dreams with ELAB Academy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-start mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-purple-600 font-medium">{story.exam}</p>
                  <p className="text-sm text-gray-600">{story.country}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 italic mb-4">"{story.testimonial}"</p>
              
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <Trophy className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-gray-900">{story.score}</p>
                </div>
                <div className="text-center">
                  <Clock className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-gray-900">{story.studyTime}</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-600">{story.improvement}</div>
                  <p className="text-xs text-gray-600">Improvement</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Track Record Speaks for Itself
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}