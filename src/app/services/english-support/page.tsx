'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Globe, Clock, Users, BookOpen, Target, TrendingUp, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const englishTests = [
  {
    test: 'IELTS',
    full: 'International English Language Testing System',
    icon: '🇬🇧',
    description: 'Most widely accepted English test for healthcare professionals worldwide',
    scores: ['Academic: 7.0+ overall', 'General: 6.5+ overall', 'All bands 6.5+'],
    duration: '2 hours 45 minutes',
    validFor: '2 years',
    acceptedBy: ['UK (NMC)', 'Australia (AHPRA)', 'Canada', 'New Zealand'],
    color: 'blue'
  },
  {
    test: 'OET',
    full: 'Occupational English Test',
    icon: '🏥',
    description: 'Healthcare-specific English test designed for medical professionals',
    scores: ['Grade B minimum', 'Grade A preferred', 'All skills Grade B+'],
    duration: '3 hours',
    validFor: '2 years',
    acceptedBy: ['UK (NMC)', 'Australia (AHPRA)', 'New Zealand', 'Ireland'],
    color: 'green'
  },
  {
    test: 'TOEFL iBT',
    full: 'Test of English as a Foreign Language',
    icon: '🇺🇸',
    description: 'American English proficiency test for academic and professional purposes',
    scores: ['84+ overall', 'Speaking 26+', 'Reading 21+', 'Writing 24+'],
    duration: '3 hours',
    validFor: '2 years',
    acceptedBy: ['USA (CGFNS)', 'Canada', 'Some European countries'],
    color: 'red'
  },
  {
    test: 'PTE Academic',
    full: 'Pearson Test of English Academic',
    icon: '💻',
    description: 'Computer-based English test with quick results and flexible scheduling',
    scores: ['65+ overall', 'All communicative skills 65+', 'Enabling skills 50+'],
    duration: '3 hours',
    validFor: '2 years',
    acceptedBy: ['Australia (AHPRA)', 'New Zealand', 'UK (some institutions)'],
    color: 'purple'
  }
];

const preparationFeatures = [
  {
    icon: BookOpen,
    title: 'Healthcare-Focused Curriculum',
    description: 'Specialized content covering medical terminology, patient communication, and clinical scenarios'
  },
  {
    icon: Users,
    title: 'Expert Native Instructors',
    description: 'Learn from qualified teachers with healthcare background and extensive test preparation experience'
  },
  {
    icon: Target,
    title: 'Test-Specific Strategies',
    description: 'Proven techniques and strategies tailored for each specific English proficiency test'
  },
  {
    icon: MessageCircle,
    title: 'Speaking Practice Sessions',
    description: 'One-on-one speaking practice with feedback on pronunciation, fluency, and medical communication'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular assessments and detailed progress reports to track your improvement journey'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Online and offline classes with flexible timings to fit your busy healthcare professional schedule'
  }
];

const coursePackages = [
  {
    name: 'OET Intensive',
    duration: '8 weeks',
    format: 'Online + In-person',
    sessions: '24 sessions',
    features: [
      'Healthcare-specific vocabulary',
      'Medical case studies',
      'Mock OET exams',
      'Speaking practice with healthcare scenarios',
      'Writing: referral letters & discharge summaries',
      'Listening: healthcare consultations'
    ],
    price: '$899',
    popular: true
  },
  {
    name: 'IELTS Healthcare',
    duration: '10 weeks', 
    format: 'Online',
    sessions: '30 sessions',
    features: [
      'Academic & general modules',
      'Medical topics focus',
      'Task-specific strategies',
      'Speaking interview practice',
      'Writing task 1 & 2 mastery',
      'Reading healthcare passages'
    ],
    price: '$749',
    popular: false
  },
  {
    name: 'Multi-Test Prep',
    duration: '12 weeks',
    format: 'Hybrid',
    sessions: '36 sessions', 
    features: [
      'IELTS + OET preparation',
      'Flexible test selection',
      'Comprehensive skill building',
      'Multiple mock exams',
      'Personal study plan',
      'Score guarantee program'
    ],
    price: '$1299',
    popular: false
  }
];

export default function EnglishSupportPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              English Language Support for Healthcare Professionals
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Master IELTS, OET, TOEFL, and PTE with our specialized healthcare English programs. Achieve the scores you need for international nursing and medical careers.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm">Score Achievement Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">3,500+</div>
                <div className="text-sm">Students Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm">English Tests Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">6+</div>
                <div className="text-sm">Years Expertise</div>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-white text-indigo-700 font-bold py-4 px-8 rounded-full hover:bg-indigo-50 transition-colors text-lg"
            >
              Start Your English Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* English Tests Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">English Proficiency Tests</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive preparation for all major English tests required by international healthcare authorities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {englishTests.map((test, index) => (
              <motion.div
                key={test.test}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-${test.color}-600 text-white p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{test.icon}</div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {test.duration}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{test.test}</h3>
                  <p className="text-sm text-white/80 mb-2">{test.full}</p>
                  <p className="text-white/90">{test.description}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Required Scores:</h4>
                    <ul className="space-y-2">
                      {test.scores.map((score) => (
                        <li key={score} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {score}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Accepted By:</h4>
                    <div className="flex flex-wrap gap-2">
                      {test.acceptedBy.map((authority) => (
                        <span 
                          key={authority}
                          className={`bg-${test.color}-100 text-${test.color}-700 px-2 py-1 rounded-full text-xs font-medium`}
                        >
                          {authority}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                    <div>Valid for: {test.validFor}</div>
                  </div>

                  <Link
                    href="/contact"
                    className={`w-full bg-${test.color}-600 hover:bg-${test.color}-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors`}
                  >
                    Prepare for {test.test}
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Training Advantage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized English training designed specifically for healthcare professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preparationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Packages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Training Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right preparation package for your English proficiency goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coursePackages.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  course.popular ? 'ring-2 ring-indigo-500 relative' : ''
                }`}
              >
                {course.popular && (
                  <div className="bg-indigo-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h3>
                  <div className="text-3xl font-bold text-indigo-600 mb-4">{course.price}</div>
                  
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">{course.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sessions:</span>
                      <span className="font-medium">{course.sessions}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                      course.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    Enroll Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Master English for Your Healthcare Career?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who achieved their required English scores with our expert training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-full hover:bg-indigo-50 transition-colors text-lg"
            >
              Get Free Assessment
            </Link>
            <Link
              href="/academy"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-indigo-600 transition-colors text-lg"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}