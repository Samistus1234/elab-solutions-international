'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileCheck, Award, GraduationCap, Globe, ArrowRight, CheckCircle, BookOpen, MapPin, Users, Trophy } from 'lucide-react'

const services = [
  {
    icon: FileCheck,
    title: 'DataFlow Verification',
    description: 'Primary source verification for healthcare professionals seeking opportunities in the Gulf region.',
    countries: ['🇦🇪 UAE', '🇸🇦 Saudi Arabia', '🇶🇦 Qatar', '🇧🇭 Bahrain', '🇴🇲 Oman', '🇰🇼 Kuwait'],
    features: [
      'Document authentication and verification',
      'License verification from source',
      'Educational credential validation',
      'Experience certificate verification',
      'Real-time tracking via CentralOps',
    ],
    benefits: [
      'Fast processing (48-72 hours)',
      'Direct submission to regulatory bodies',
      'Multi-country coverage',
      'Secure document handling',
    ],
    processSteps: [
      'Document Collection & Review',
      'Authentication Process',
      'Regulatory Submission',
      'Verification Complete'
    ],
    href: '/services/dataflow',
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'International Licensing Exams',
    description: 'Comprehensive exam preparation and assistance for healthcare licensing worldwide.',
    countries: ['🇺🇸 USA (NCLEX)', '🇬🇧 UK (NMC)', '🇨🇦 Canada', '🇦🇺 Australia', '🇮🇪 Ireland (NMB)'],
    features: [
      'NCLEX-RN/PN Preparation',
      'NMC UK Registration',
      'Australian AHPRA Registration',
      'Canadian RPN/RN Pathways',
      'Eligibility Assessment',
      'ATT (Authorization to Test)',
    ],
    benefits: [
      '95% first-time pass rate',
      'Personalized study plans',
      'Live tutoring sessions',
      'Mock exam simulations',
    ],
    processSteps: [
      'Eligibility Assessment',
      'Exam Registration',
      'Preparation Program',
      'Exam Scheduling & Support'
    ],
    href: '/services/international-exams',
    color: 'blue',
  },
  {
    icon: Award,
    title: 'Middle East Licensing',
    description: 'Specialized assistance for Gulf healthcare regulatory requirements.',
    countries: ['🇦🇪 DHA/HAAD/MOH', '🇸🇦 SCFHS', '🇶🇦 QCHP', '🇧🇭 NHRA', '🇴🇲 OMSB'],
    features: [
      'DHA (Dubai Health Authority)',
      'HAAD (Abu Dhabi Health Authority)',
      'MOH (Ministry of Health) UAE',
      'SCFHS (Saudi Commission)',
      'QCHP (Qatar Council)',
      'Professional Assessment',
    ],
    benefits: [
      'Expert guidance throughout',
      'Document preparation assistance',
      'Application tracking',
      'Interview preparation support',
    ],
    processSteps: [
      'Document Preparation',
      'Application Submission',
      'Assessment Review',
      'License Issuance'
    ],
    href: '/services/middle-east-licensing',
    color: 'secondary',
  },
  {
    icon: GraduationCap,
    title: 'Credential Evaluation',
    description: 'Comprehensive evaluation of international healthcare credentials for global recognition.',
    countries: ['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇳🇿 New Zealand'],
    features: [
      'Educational transcript evaluation',
      'Professional license assessment',
      'Experience verification',
      'Competency mapping',
      'Equivalency certificates',
      'CGFNS Certification',
    ],
    benefits: [
      'Internationally recognized reports',
      'Fast turnaround time',
      'Multi-language support',
      'Digital verification',
    ],
    processSteps: [
      'Document Submission',
      'Evaluation Process',
      'Report Generation',
      'Certification Delivery'
    ],
    href: '/services/credentials',
    color: 'green',
  },
  {
    icon: Globe,
    title: 'Global Placement Services',
    description: 'Connect with top healthcare institutions worldwide through our extensive network.',
    countries: ['🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇸🇦 Saudi', '🇨🇦 Canada', '🇦🇺 Australia'],
    features: [
      'Job matching services',
      'Profile optimization',
      'Interview preparation',
      'Visa assistance',
      'Relocation support',
      'Salary negotiation',
    ],
    benefits: [
      'Access to exclusive opportunities',
      'Personalized career guidance',
      'Salary negotiation support',
      'Post-placement assistance',
    ],
    processSteps: [
      'Profile Assessment',
      'Job Matching',
      'Application Support',
      'Placement Success'
    ],
    href: '/services/global-placement',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'English Language Support',
    description: 'Complete English proficiency exam preparation and assistance.',
    countries: ['🌍 IELTS', '🌍 TOEFL', '🌍 PTE', '🌍 OET'],
    features: [
      'IELTS Academic/General Training',
      'TOEFL iBT Preparation',
      'PTE Academic Training',
      'OET Healthcare English',
      'Mock Test Sessions',
      'Score Improvement Plans',
    ],
    benefits: [
      'Specialized healthcare English',
      'Flexible study schedules',
      'Expert native instructors',
      'Score guarantee programs',
    ],
    processSteps: [
      'Language Assessment',
      'Customized Training',
      'Mock Examinations',
      'Exam Registration & Success'
    ],
    href: '/services/english-support',
    color: 'indigo',
  },
]

const colorVariants = {
  primary: 'service-card-primary',
  secondary: 'service-card-secondary',
  blue: 'service-card-blue',
  green: 'service-card-green',
  purple: 'service-card-purple',
  indigo: 'service-card-indigo',
}

const buttonVariants = {
  primary: 'service-btn-primary',
  secondary: 'service-btn-secondary',
  blue: 'service-btn-blue',
  green: 'service-btn-green',
  purple: 'service-btn-purple',
  indigo: 'service-btn-indigo',
}

const dotVariants = {
  primary: 'benefit-dot-primary',
  secondary: 'benefit-dot-secondary',
  blue: 'benefit-dot-blue',
  green: 'benefit-dot-green',
  purple: 'benefit-dot-purple',
  indigo: 'benefit-dot-indigo',
}

export function ServiceGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with Icon and Countries */}
              <div className={`${colorVariants[service.color]} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <service.icon className="h-10 w-10" />
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-white hover:text-opacity-80 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-white/90 mb-4">{service.description}</p>
                
                {/* Countries/Regions Served */}
                <div className="flex flex-wrap gap-2">
                  {service.countries.map((country, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {/* Process Steps */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-orange-500" />
                    Process Steps:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.processSteps.map((step, idx) => (
                      <div key={step} className="flex items-center text-sm text-gray-600">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="truncate">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Include */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                  <ul className="space-y-1">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-sm text-gray-500 italic">
                        +{service.features.length - 4} more services...
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Key Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                  <div className="space-y-2">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 ${dotVariants[service.color]} rounded-full mr-2`}></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={service.href}
                    className={`flex-1 ${buttonVariants[service.color]} text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors`}
                  >
                    View Details
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}