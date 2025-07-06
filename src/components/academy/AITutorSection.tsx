'use client'

import { motion } from 'framer-motion'
import { Brain, MessageSquare, TrendingUp, Target, Zap, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'AI analyzes your performance and adapts difficulty levels to optimize your learning curve',
  },
  {
    icon: MessageSquare,
    title: '24/7 Instant Support',
    description: 'Get immediate answers to your questions from our AI tutor, available round the clock',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visual analytics show your strengths, weaknesses, and improvement over time',
  },
  {
    icon: Target,
    title: 'Personalized Study Plans',
    description: 'Custom study schedules based on your target exam date and current knowledge level',
  },
  {
    icon: Zap,
    title: 'Smart Recommendations',
    description: 'AI suggests topics to review based on your performance patterns and exam requirements',
  },
  {
    icon: BookOpen,
    title: 'Concept Explanations',
    description: 'Detailed explanations for every question with references to study materials',
  },
]

export function AITutorSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Your Personal{' '}
              <span className="gradient-text">AI Study Assistant</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Our revolutionary AI tutor technology provides personalized guidance throughout 
              your exam preparation journey. It learns from your interactions, identifies 
              knowledge gaps, and creates a customized learning path just for you.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Study Assistant</h4>
                    <p className="text-sm text-green-600">● Online</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      "I notice you're struggling with pharmacology calculations. Let's review 
                      dosage formulas with some practice problems."
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 ml-auto max-w-xs">
                    <p className="text-sm text-gray-700">
                      "Yes, I need help with IV drip rate calculations"
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      "Great! I've prepared 10 progressive exercises starting with basic concepts. 
                      Ready to begin?"
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">87%</div>
                  <p className="text-xs text-gray-600">Current Score</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">+15%</div>
                  <p className="text-xs text-gray-600">This Week</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">45d</div>
                  <p className="text-xs text-gray-600">To Exam</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              40% faster learning
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}