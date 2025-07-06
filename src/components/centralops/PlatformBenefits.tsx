'use client'

import { motion } from 'framer-motion'
import { Clock, DollarSign, Shield, Users } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Reduce processing time by up to 60% with automated workflows and real-time updates',
    stats: '60% Faster',
  },
  {
    icon: DollarSign,
    title: 'Cost Effective',
    description: 'Eliminate manual processes and reduce operational costs with our efficient platform',
    stats: '40% Savings',
  },
  {
    icon: Shield,
    title: 'Enhanced Security',
    description: 'Bank-level encryption and compliance with international data protection standards',
    stats: '100% Secure',
  },
  {
    icon: Users,
    title: 'Better Experience',
    description: 'Intuitive interface designed for healthcare professionals, by healthcare professionals',
    stats: '95% Satisfaction',
  },
]

const testimonials = [
  {
    quote: "CentralOps transformed how we manage credentialing. What used to take weeks now takes days.",
    author: "Dr. Michael Chen",
    role: "Hospital Administrator",
    company: "Dubai Medical Center",
  },
  {
    quote: "The real-time tracking feature gives us complete visibility into our applications. It's a game-changer.",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "Riyadh Healthcare Group",
  },
]

export function PlatformBenefits() {
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
            Why Choose CentralOps?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the benefits of a modern, integrated platform designed to 
            streamline your entire credentialing workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-primary-100 text-primary-600 mb-4">
                <benefit.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {benefit.description}
              </p>
              
              <div className="text-3xl font-bold text-primary-600">
                {benefit.stats}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What Our Users Say
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary-600">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Credentialing Process?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust CentralOps for 
            their credentialing management needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule a Demo
            </a>
            
            <a
              href="/services"
              className="inline-flex items-center justify-center bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-900 transition-colors border-2 border-white/20"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}