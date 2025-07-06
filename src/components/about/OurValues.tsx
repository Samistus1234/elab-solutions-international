'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Zap, Users, Target, Globe } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Excellence',
    description: 'We strive for excellence in every interaction, ensuring the highest standards of service for our clients and partners.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Speed',
    description: 'We understand that time is critical in healthcare careers. Our processes are optimized for efficiency without compromising quality.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Trust is our foundation. We maintain the highest ethical standards in handling sensitive information and professional relationships.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We view every client as a partner in their journey, providing personalized support and celebrating their successes.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'We continuously innovate to improve our services, leveraging technology to create better experiences and outcomes.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Globe,
    title: 'Global Mindset',
    description: 'We embrace diversity and cultural understanding, connecting talent across borders while respecting local contexts.',
    color: 'from-teal-500 to-cyan-500',
  },
]

export function OurValues() {
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
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we do and shape how we serve our clients, 
            partners, and communities around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${value.color} text-white mb-6`}>
                <value.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Our Commitment to You
          </h3>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Every day, we work to uphold these values and deliver on our promise: to be your 
            trusted partner in advancing your healthcare career globally. Your success is our 
            success, and we're committed to going above and beyond to help you achieve your dreams.
          </p>
        </motion.div>
      </div>
    </section>
  )
}