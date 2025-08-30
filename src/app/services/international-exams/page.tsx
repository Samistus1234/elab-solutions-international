'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Globe, Clock, Users, BookOpen, Target, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import { SalaryCalculator } from '@/components/calculators/SalaryCalculator';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { ServiceApplicationForm } from '@/components/forms/ServiceApplicationForm';

const examsByCountry = [
  {
    country: '🇺🇸 United States',
    flag: '🇺🇸',
    exams: ['NCLEX-RN', 'NCLEX-PN'],
    description: 'Pass the NCLEX and begin your nursing career in the USA',
    requirements: ['BSN/ADN Degree', 'English Proficiency', 'Background Check'],
    timeline: '6-12 months',
    successRate: '95%',
    color: 'blue',
    colorClasses: {
      header: 'bg-blue-600 text-white',
      badge: 'bg-blue-100 text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  },
  {
    country: '🇬🇧 United Kingdom', 
    flag: '🇬🇧',
    exams: ['NMC Registration', 'CBT & OSCE'],
    description: 'Join the NHS through NMC registration process',
    requirements: ['Nursing Degree', 'IELTS 7.0', 'CBT Pass'],
    timeline: '8-14 months',
    successRate: '92%',
    color: 'red',
    colorClasses: {
      header: 'bg-red-600 text-white',
      badge: 'bg-red-100 text-red-700',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    }
  },
  {
    country: '🇨🇦 Canada',
    flag: '🇨🇦', 
    exams: ['NCLEX-RN', 'RPN Exam'],
    description: 'Become a registered nurse in Canada',
    requirements: ['Nursing Education', 'Language Test', 'Good Character'],
    timeline: '6-10 months',
    successRate: '89%',
    color: 'red',
    colorClasses: {
      header: 'bg-red-600 text-white',
      badge: 'bg-red-100 text-red-700',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    }
  },
  {
    country: '🇦🇺 Australia',
    flag: '🇦🇺',
    exams: ['AHPRA Registration', 'English Test'],
    description: 'Register with AHPRA for Australian nursing practice',
    requirements: ['Nursing Qualification', 'IELTS/OET', 'Police Check'],
    timeline: '4-8 months', 
    successRate: '94%',
    color: 'green',
    colorClasses: {
      header: 'bg-green-600 text-white',
      badge: 'bg-green-100 text-green-700',
      button: 'bg-green-600 hover:bg-green-700 text-white'
    }
  }
];

const prepFeatures = [
  {
    icon: BookOpen,
    title: 'Comprehensive Study Materials',
    description: 'Access to extensive question banks, video lectures, and study guides'
  },
  {
    icon: Target,
    title: 'Adaptive Practice Tests',
    description: 'AI-powered practice exams that adapt to your learning progress'
  },
  {
    icon: Users,
    title: 'Expert Tutoring',
    description: 'One-on-one sessions with experienced nursing educators'
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed performance reports'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Eligibility Assessment',
    description: 'We evaluate your credentials and determine the best pathway for your goals',
    duration: '1-2 days'
  },
  {
    step: 2, 
    title: 'Exam Registration',
    description: 'Complete application to nursing board and schedule your exam',
    duration: '2-4 weeks'
  },
  {
    step: 3,
    title: 'Preparation Program', 
    description: 'Intensive study program with personalized coaching and practice tests',
    duration: '3-6 months'
  },
  {
    step: 4,
    title: 'Exam Success & Licensing',
    description: 'Pass your exam and receive your nursing license to start your career',
    duration: '1-2 weeks'
  }
];

export default function InternationalExamsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              International Nursing Licensing Exams
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your gateway to nursing careers worldwide. From NCLEX to NMC, we provide comprehensive exam preparation and registration support for healthcare professionals.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm">First-Time Pass Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">15,000+</div>
                <div className="text-sm">Students Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Countries Supported</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-colors text-lg"
            >
              Start Your Journey Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Exam Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Destination</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We support nursing licensing exams for major English-speaking countries with high success rates
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {examsByCountry.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`${country.colorClasses.header} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{country.flag}</div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {country.successRate} Success Rate
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{country.country}</h3>
                  <p className="text-white/90">{country.description}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Exams Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {country.exams.map((exam) => (
                        <span 
                          key={exam}
                          className={`${country.colorClasses.badge} px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {country.requirements.map((req) => (
                        <li key={req} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Timeline: {country.timeline}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className={`w-full ${country.colorClasses.button} text-center py-3 px-4 rounded-lg font-medium transition-colors`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Preparation Advantage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation tools and expert guidance to maximize your exam success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {prepFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Path to Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-step process to help you achieve your international nursing career goals
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start mb-12 last:mb-0"
              >
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                    <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Salary Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SalaryCalculator />
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Your Application</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take the first step towards your international nursing career. Our experts will guide you through the entire process.
            </p>
          </div>
          <ServiceApplicationForm defaultService="International Licensing Exams" />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion 
        title="Frequently Asked Questions - International Exams"
        subtitle="Get answers to common questions about NCLEX, NMC, and other international nursing exams"
      />

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your International Nursing Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful nurses who achieved their dreams with our expert guidance and proven preparation methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-colors text-lg"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/academy"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              View Study Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}