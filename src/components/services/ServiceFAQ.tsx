'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is DataFlow verification and why do I need it?',
    answer: 'DataFlow is a primary source verification process required by healthcare regulatory authorities in the Gulf region. It verifies your educational qualifications, professional licenses, and work experience directly from the issuing institutions. This is mandatory for healthcare professionals seeking to work in UAE, Saudi Arabia, Qatar, and other Gulf countries.',
  },
  {
    question: 'How long does the credentialing process take?',
    answer: 'The timeline varies depending on the service. DataFlow verification typically takes 15-30 days, regulatory licensing can take 2-4 weeks, and credential evaluation usually completes within 7-10 business days. We offer expedited services for urgent requirements.',
  },
  {
    question: 'What documents do I need to provide?',
    answer: 'Required documents typically include: educational certificates and transcripts, professional licenses, experience certificates, passport copy, professional photo, and CV. Specific requirements vary by destination country and profession. Our team will provide you with a detailed checklist during consultation.',
  },
  {
    question: 'Can you help with multiple country applications?',
    answer: 'Yes! We specialize in multi-country applications and can help you apply to multiple Gulf countries simultaneously. Our CentralOps platform allows you to track all applications in one place, saving time and ensuring consistency across applications.',
  },
  {
    question: 'What is the success rate of applications?',
    answer: 'We maintain a 98% success rate for applications. Our expert team reviews all documents thoroughly before submission, ensuring compliance with regulatory requirements. In rare cases of initial rejection, we provide free resubmission support.',
  },
  {
    question: 'Do you provide job placement services?',
    answer: 'Yes, through our Global Hire platform, we connect verified healthcare professionals with top hospitals and healthcare facilities worldwide. We offer job matching, interview preparation, and placement support services.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit/debit cards, bank transfers, Stripe, Paystack, and Apple Pay. Payment plans are available for comprehensive service packages.',
  },
  {
    question: 'How can I track my application status?',
    answer: 'Our CentralOps platform provides real-time tracking of all your applications. You\'ll receive email and WhatsApp notifications at each stage, and can log in anytime to check detailed status updates.',
  },
]

export function ServiceFAQ() {
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
            Find answers to common questions about our services and processes
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
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
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
                      <p className="mt-4 text-gray-600 leading-relaxed">
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
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  )
}