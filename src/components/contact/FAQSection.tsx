'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'How can I get started with your services?',
    answer: 'Getting started is easy! Simply fill out our contact form or give us a call. Our team will schedule a free consultation to understand your needs and guide you through the next steps.',
  },
  {
    question: 'What are your office hours?',
    answer: 'Our offices operate Monday-Friday from 8:00 AM to 6:00 PM local time, and Saturday from 9:00 AM to 2:00 PM. We also offer 24/7 support through our online channels for urgent matters.',
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: 'Yes! We offer virtual consultations via video call for clients who cannot visit our offices in person. This service is available globally and can be scheduled at your convenience.',
  },
  {
    question: 'How quickly can I expect a response?',
    answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using our WhatsApp support or calling our offices directly.',
  },
  {
    question: 'What information should I prepare before contacting you?',
    answer: 'Having your educational certificates, professional licenses, CV, and passport ready will help us provide more accurate guidance. However, you can contact us anytime for initial consultation.',
  },
  {
    question: 'Do you provide services in languages other than English?',
    answer: 'Yes! Our team provides services in English, Arabic, and French. We also have staff who speak various other languages to better serve our diverse clientele.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find quick answers to common questions about contacting and working with eLab Solutions
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600 ml-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  )
}