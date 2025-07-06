'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  'Fast-track processing',
  'Expert guidance',
  'Transparent pricing',
  '24/7 support',
]

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Advance Your Healthcare Career?
          </h2>
          
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of healthcare professionals who have successfully navigated their journey to international opportunities with eLab Solutions
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-900 transition-colors border-2 border-white/20"
            >
              Explore Our Services
            </Link>
          </div>
          
          <div className="mt-10 text-primary-100">
            <p className="text-sm">
              Questions? Call us at{' '}
              <a href="tel:+234123456789" className="underline hover:text-white transition-colors">
                +234 123 456 789
              </a>{' '}
              or email{' '}
              <a href="mailto:info@elabsolutions.com" className="underline hover:text-white transition-colors">
                info@elabsolutions.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}