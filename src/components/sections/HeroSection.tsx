'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Globe, Users } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}{' '}
              <span className="gradient-text">{t('titleHighlight')}</span>{' '}
              {t('titleEnd')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors group"
              >
                {t('cta.services')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href={`/${locale}/centralops`}
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
              >
                {t('cta.platform')}
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">ISO Certified</p>
                  <p className="font-semibold">{t('stats.standards')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Operating in</p>
                  <p className="font-semibold">{t('stats.countries')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Placed</p>
                  <p className="font-semibold">{t('stats.professionals')}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Healthcare professionals"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Start Your Journey Today</h3>
                  <p className="text-gray-600 mb-4">
                    Join thousands of healthcare professionals who have advanced their careers with eLab Solutions
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary-200 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}