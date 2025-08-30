'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Globe, Clock, Users, FileText, Shield, Star } from 'lucide-react';
import Link from 'next/link';

const gulfCountries = [
  {
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    authorities: [
      { name: 'DHA', full: 'Dubai Health Authority', color: 'blue' },
      { name: 'HAAD', full: 'Health Authority Abu Dhabi', color: 'green' },
      { name: 'MOH', full: 'Ministry of Health UAE', color: 'red' }
    ],
    specialties: ['Nursing', 'Medicine', 'Pharmacy', 'Allied Health'],
    timeline: '6-12 weeks',
    requirements: ['DataFlow PSV', 'Professional License', 'Experience Letters', 'Good Standing Certificate'],
    examRequired: 'Yes (MCQ + Clinical)',
    description: 'Leading healthcare destination in the Middle East with modern facilities'
  },
  {
    country: 'Saudi Arabia', 
    flag: '🇸🇦',
    authorities: [
      { name: 'SCFHS', full: 'Saudi Commission for Health Specialties', color: 'green' }
    ],
    specialties: ['Medicine', 'Nursing', 'Dentistry', 'Pharmacy', 'Allied Health'],
    timeline: '8-16 weeks',
    requirements: ['DataFlow PSV', 'Professional Assessment', 'Arabic Language (Optional)', 'Medical License'],
    examRequired: 'Yes (Specialty Specific)',
    description: 'Largest healthcare market in the Gulf with Vision 2030 expansion'
  },
  {
    country: 'Qatar',
    flag: '🇶🇦', 
    authorities: [
      { name: 'QCHP', full: 'Qatar Council for Healthcare Practitioners', color: 'maroon' }
    ],
    specialties: ['Medicine', 'Nursing', 'Dentistry', 'Pharmacy'],
    timeline: '4-8 weeks',
    requirements: ['DataFlow PSV', 'Prometric Exam', 'Professional License', 'CV'],
    examRequired: 'Yes (Prometric)',
    description: 'World Cup host with expanding healthcare infrastructure'
  },
  {
    country: 'Bahrain',
    flag: '🇧🇭',
    authorities: [
      { name: 'NHRA', full: 'National Health Regulatory Authority', color: 'red' }
    ],
    specialties: ['Medicine', 'Nursing', 'Dentistry', 'Pharmacy'],
    timeline: '4-6 weeks',
    requirements: ['DataFlow PSV', 'Professional License', 'MCQ Exam', 'Interview'],
    examRequired: 'Yes (MCQ + Interview)',
    description: 'Financial hub with growing medical tourism sector'
  },
  {
    country: 'Oman',
    flag: '🇴🇲',
    authorities: [
      { name: 'OMSB', full: 'Oman Medical Specialty Board', color: 'red' }
    ],
    specialties: ['Medicine', 'Nursing', 'Dentistry', 'Allied Health'],
    timeline: '6-10 weeks', 
    requirements: ['DataFlow PSV', 'Professional License', 'Assessment Exam', 'Arabic Basic'],
    examRequired: 'Yes (Specialty Based)',
    description: 'Emerging healthcare destination with government support'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Eligibility Assessment',
    description: 'We evaluate your credentials and determine the best regulatory authority for your specialty and experience level',
    icon: FileText,
    duration: '1-3 days'
  },
  {
    step: 2,
    title: 'Document Preparation', 
    description: 'Complete document collection, attestation, and DataFlow PSV application submission',
    icon: Shield,
    duration: '2-4 weeks'
  },
  {
    step: 3,
    title: 'Application Submission',
    description: 'Submit your complete application to the relevant health authority with all required documents',
    icon: Award,
    duration: '1-2 weeks'
  },
  {
    step: 4,
    title: 'Exam Preparation & Scheduling',
    description: 'Prepare for required assessments and schedule your professional evaluation exam',
    icon: Users,
    duration: '2-6 weeks'
  },
  {
    step: 5,
    title: 'License Issuance',
    description: 'Receive your professional license and begin your healthcare career in the Gulf',
    icon: Star,
    duration: '1-2 weeks'
  }
];

const features = [
  {
    icon: Globe,
    title: 'Multi-Country Expertise',
    description: 'Deep knowledge of all 5 Gulf countries licensing requirements'
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    description: 'Streamlined processes to minimize waiting times'
  },
  {
    icon: Shield,
    title: 'Compliance Guarantee',
    description: '100% compliance with regulatory authority requirements'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Personal case manager throughout your entire journey'
  }
];

export default function MiddleEastLicensingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Middle East Healthcare Licensing
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Your gateway to healthcare careers in the Gulf. Expert assistance for DHA, SCFHS, QCHP, NHRA, and OMSB licensing with proven success rates.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-sm">Professionals Licensed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm">Gulf Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-white text-green-700 font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-colors text-lg"
            >
              Start Your Application
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gulf Countries Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Gulf Healthcare Authorities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide expert assistance for healthcare licensing across all major Gulf authorities
            </p>
          </div>

          <div className="space-y-8">
            {gulfCountries.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex flex-col justify-center items-center text-center">
                    <div className="text-6xl mb-4">{country.flag}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{country.country}</h3>
                    <p className="text-gray-600 text-sm">{country.description}</p>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Health Authorities:</h4>
                        <div className="space-y-2">
                          {country.authorities.map((auth) => (
                            <div key={auth.name} className="flex items-center">
                              <span className={`bg-${auth.color}-100 text-${auth.color}-700 px-2 py-1 rounded text-sm font-medium mr-2`}>
                                {auth.name}
                              </span>
                              <span className="text-sm text-gray-600">{auth.full}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Specialties Covered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {country.specialties.map((specialty) => (
                            <span key={specialty} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Requirements:</h4>
                        <ul className="space-y-1">
                          {country.requirements.slice(0, 3).map((req) => (
                            <li key={req} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Timeline:</span>
                          <span className="text-sm font-medium text-gray-800">{country.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Exam Required:</span>
                          <span className="text-sm font-medium text-gray-800">{country.examRequired}</span>
                        </div>
                        <Link
                          href="/contact"
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors block"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose eLab for Gulf Licensing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven expertise and comprehensive support throughout your licensing journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Licensing Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive 5-step process ensures smooth and successful licensing
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
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div className="flex items-center">
                      <step.icon className="h-6 w-6 text-green-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-9">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Gulf Healthcare Career?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who achieved their Middle East career goals through our expert licensing assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-colors text-lg"
            >
              Get Free Assessment
            </Link>
            <Link
              href="/services/dataflow"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-green-600 transition-colors text-lg"
            >
              Start DataFlow PSV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}