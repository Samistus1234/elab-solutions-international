'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Stethoscope, Globe, Microscope, Languages, Clock, Users } from 'lucide-react'

const courses = [
  {
    icon: Stethoscope,
    title: 'NCLEX-RN Preparation',
    description: 'Comprehensive preparation for the National Council Licensure Examination for Registered Nurses',
    duration: '3-6 months',
    students: '15,000+',
    features: [
      '6,000+ practice questions',
      'CAT simulation exams',
      'Pharmacology mastery',
      'Priority & delegation focus',
    ],
    color: 'from-blue-600 to-cyan-600',
  },
  {
    icon: Globe,
    title: 'Prometric Exams',
    description: 'Prepare for DHA, HAAD, MOH, SCFHS, and other Gulf region licensing exams',
    duration: '2-4 months',
    students: '12,000+',
    features: [
      'Country-specific content',
      'Mock exams with timer',
      'Previous year questions',
      'Expert video explanations',
    ],
    color: 'from-green-600 to-emerald-600',
  },
  {
    icon: Languages,
    title: 'English Proficiency',
    description: 'Master IELTS, OET, and TOEFL for healthcare professionals',
    duration: '2-3 months',
    students: '8,000+',
    features: [
      'Medical vocabulary focus',
      'Speaking practice with AI',
      'Writing templates',
      'Listening comprehension',
    ],
    color: 'from-purple-600 to-pink-600',
  },
  {
    icon: Microscope,
    title: 'Specialty Exams',
    description: 'Preparation for specialized healthcare certification exams',
    duration: 'Varies',
    students: '5,000+',
    features: [
      'Lab technician exams',
      'Pharmacy licensing',
      'Radiology certifications',
      'Specialty nursing exams',
    ],
    color: 'from-orange-600 to-red-600',
  },
]

export function CourseOfferings() {
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Exam Preparation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide range of courses designed specifically for healthcare 
            professionals seeking international opportunities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <course.icon className="h-12 w-12" />
                  <div className="text-right">
                    <div className="flex items-center text-sm mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} enrolled
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-white/90">{course.description}</p>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Course Highlights:</h4>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/academy/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`block text-center bg-gradient-to-r ${course.color} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Not sure which course is right for you?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}