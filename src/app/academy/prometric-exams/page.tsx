'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle, Clock, DollarSign, Star, 
  BookOpen, Users, Award, Target, AlertCircle, Globe,
  Calendar, MapPin, TrendingUp, Shield, FileText, Search
} from 'lucide-react';

const gulfCountries = [
  {
    country: 'United Arab Emirates',
    authorities: [
      {
        name: 'DHA (Dubai Health Authority)',
        city: 'Dubai',
        examFee: '$300',
        passingScore: '60%',
        duration: '170 minutes',
        questions: '150 MCQs',
        retakes: '3 attempts maximum'
      },
      {
        name: 'DOH (Department of Health)',
        city: 'Abu Dhabi',
        examFee: '$300',
        passingScore: '65%',
        duration: '180 minutes',
        questions: '150 MCQs',
        retakes: '3 attempts maximum'
      },
      {
        name: 'MOH (Ministry of Health)',
        city: 'Federal UAE',
        examFee: '$300',
        passingScore: '60%',
        duration: '180 minutes',
        questions: '150 MCQs',
        retakes: '3 attempts maximum'
      }
    ]
  },
  {
    country: 'Saudi Arabia',
    authorities: [
      {
        name: 'SCFHS (Saudi Commission for Health Specialties)',
        city: 'National',
        examFee: '$400',
        passingScore: 'Variable by specialty',
        duration: '180 minutes',
        questions: '100 MCQs',
        retakes: 'Multiple attempts allowed'
      }
    ]
  },
  {
    country: 'Qatar',
    authorities: [
      {
        name: 'QCHP (Qatar Council for Healthcare Practitioners)',
        city: 'Doha',
        examFee: '$350',
        passingScore: '60%',
        duration: '180 minutes',
        questions: '150 MCQs',
        retakes: '3 attempts maximum'
      }
    ]
  },
  {
    country: 'Oman',
    authorities: [
      {
        name: 'OMSB (Oman Medical Specialty Board)',
        city: 'Muscat',
        examFee: '$350',
        passingScore: '60%',
        duration: '180 minutes',
        questions: '150 MCQs',
        retakes: 'Multiple attempts allowed'
      }
    ]
  },
  {
    country: 'Bahrain',
    authorities: [
      {
        name: 'NHRA (National Health Regulatory Authority)',
        city: 'Manama',
        examFee: '$300',
        passingScore: '60%',
        duration: '180 minutes',
        questions: '150 MCQs',
        retakes: '3 attempts maximum'
      }
    ]
  }
];

const examSubjects = [
  {
    category: 'General Medicine',
    topics: [
      'Internal Medicine',
      'Cardiology', 
      'Respiratory Medicine',
      'Gastroenterology',
      'Endocrinology',
      'Nephrology',
      'Hematology',
      'Infectious Diseases'
    ]
  },
  {
    category: 'Surgery',
    topics: [
      'General Surgery',
      'Orthopedic Surgery',
      'Urology',
      'Plastic Surgery',
      'Neurosurgery',
      'Cardiovascular Surgery',
      'Emergency Surgery'
    ]
  },
  {
    category: 'Specialized Fields',
    topics: [
      'Pediatrics',
      'Obstetrics & Gynecology',
      'Radiology',
      'Pathology',
      'Anesthesiology',
      'Dermatology',
      'Psychiatry',
      'Emergency Medicine'
    ]
  },
  {
    category: 'Nursing',
    topics: [
      'Medical-Surgical Nursing',
      'Critical Care Nursing',
      'Pediatric Nursing',
      'Maternal-Newborn Nursing',
      'Community Health Nursing',
      'Psychiatric Nursing'
    ]
  }
];

const preparationPhases = [
  {
    phase: 1,
    title: 'Document Preparation',
    duration: '2-4 weeks',
    tasks: [
      'Degree authentication and apostille',
      'Experience certificates verification',
      'Good standing certificate from licensing board',
      'Passport validity check (minimum 6 months)'
    ]
  },
  {
    phase: 2,
    title: 'DataFlow PSV Registration',
    duration: '3-6 weeks',
    tasks: [
      'Primary Source Verification application',
      'Document submission to DataFlow',
      'Verification with original institutions',
      'PSV certificate issuance'
    ]
  },
  {
    phase: 3,
    title: 'Regulatory Body Application',
    duration: '2-4 weeks',
    tasks: [
      'Online application to chosen authority',
      'Fee payment and document upload',
      'Eligibility number generation',
      'Exam scheduling authorization'
    ]
  },
  {
    phase: 4,
    title: 'Exam Preparation & Booking',
    duration: '4-8 weeks',
    tasks: [
      'Comprehensive study plan execution',
      'Practice MCQs and mock exams',
      'Prometric exam slot booking',
      'Final preparation and revision'
    ]
  }
];

export default function PrometricExamsPage() {
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [selectedTab, setSelectedTab] = useState('overview');

  const currentCountry = gulfCountries.find(c => c.country === selectedCountry);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/academy" className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Academy
            </Link>
            <h1 className="text-5xl font-bold mb-6">
              Prometric Exam Preparation
            </h1>
            <p className="text-xl mb-8 text-green-100">
              Expert preparation for Gulf countries medical licensing exams through Prometric testing centers. 
              Master DHA, HAAD, MOH, SCFHS, QCHP, OMSB, and NHRA examinations with our comprehensive program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply/dataflow">
                <button className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Start Your Application
                </button>
              </Link>
              <Link href="/academy/exam-booking">
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Book Your Exam
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">96%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Tax-Free</div>
              <div className="text-gray-600">Income in Gulf</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3-6</div>
              <div className="text-gray-600">Months Process</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">150</div>
              <div className="text-gray-600">MCQ Questions</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'countries', label: 'Countries & Exams' },
                { id: 'preparation', label: 'Preparation Process' },
                { id: 'subjects', label: 'Exam Subjects' },
                { id: 'pricing', label: 'Pricing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">About Prometric Medical Licensing</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Prometric exams are mandatory computer-based assessments for healthcare professionals seeking 
                    to practice in Gulf Cooperation Council (GCC) countries. These exams evaluate clinical knowledge 
                    and competency to ensure safe patient care standards.
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Why Choose Gulf Countries?</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span>Tax-free income with attractive salary packages</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span>Modern healthcare facilities and technology</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span>Cultural proximity for Middle Eastern professionals</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span>Fast processing times (3-6 months)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'countries' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Gulf Countries Licensing Authorities</h2>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  {gulfCountries.map((country) => (
                    <button
                      key={country.country}
                      onClick={() => setSelectedCountry(country.country)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCountry === country.country
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
                      }`}
                    >
                      {country.country}
                    </button>
                  ))}
                </div>

                {currentCountry && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentCountry.country} Licensing Authorities</h3>
                    <div className="grid gap-6">
                      {currentCountry.authorities.map((authority, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-2">{authority.name}</h4>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {authority.city}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">{authority.examFee}</div>
                              <div className="text-sm text-gray-500">Exam Fee</div>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center bg-gray-50 rounded-lg p-3">
                              <div className="font-semibold text-gray-900">{authority.duration}</div>
                              <div className="text-sm text-gray-600">Duration</div>
                            </div>
                            <div className="text-center bg-gray-50 rounded-lg p-3">
                              <div className="font-semibold text-gray-900">{authority.questions}</div>
                              <div className="text-sm text-gray-600">Format</div>
                            </div>
                            <div className="text-center bg-gray-50 rounded-lg p-3">
                              <div className="font-semibold text-gray-900">{authority.passingScore}</div>
                              <div className="text-sm text-gray-600">Pass Score</div>
                            </div>
                            <div className="text-center bg-gray-50 rounded-lg p-3">
                              <div className="font-semibold text-gray-900">{authority.retakes}</div>
                              <div className="text-sm text-gray-600">Retakes</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'preparation' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Preparation Process</h2>
                
                <div className="space-y-8">
                  {preparationPhases.map((phase, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start mb-4">
                        <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold">{phase.phase}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {phase.duration}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Important Notes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">DataFlow PSV is mandatory for all Gulf country applications</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">Some authorities require eligibility number before exam booking</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">Exam attempts are limited - thorough preparation is essential</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'subjects' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Exam Subject Areas</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Prometric exams cover comprehensive medical knowledge across multiple specialties. 
                  Study subjects are tailored to your professional field and target country requirements.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {examSubjects.map((subject, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{subject.category}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {subject.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="bg-gray-50 rounded-lg p-3 text-center">
                            <span className="text-sm text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Study Strategy</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span>Focus on clinical applications rather than theoretical concepts</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span>Practice with MCQ format extensively using subject-wise questions</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span>Review latest clinical guidelines and treatment protocols</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span>Take timed mock exams to improve speed and accuracy</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'pricing' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Prometric Exam Costs & Our Services</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Official Exam Costs</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>DHA/DOH/MOH UAE</span>
                        <span className="font-semibold">$300</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SCFHS Saudi Arabia</span>
                        <span className="font-semibold">$400</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>QCHP Qatar</span>
                        <span className="font-semibold">$350</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>OMSB Oman</span>
                        <span className="font-semibold">$350</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>NHRA Bahrain</span>
                        <span className="font-semibold">$300</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>DataFlow PSV</span>
                        <span className="font-semibold">$200-$400</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center font-bold">
                        <span>Typical Total</span>
                        <span className="text-lg">$500-$800</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">eLab Complete Package</h3>
                    <div className="text-4xl font-bold mb-2">$1,799</div>
                    <div className="text-green-100 mb-6">All-inclusive Gulf licensing</div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">DataFlow PSV complete assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Document authentication support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Regulatory body application filing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Comprehensive MCQ question bank</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Expert tutoring and guidance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Exam booking assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Retake support if needed</span>
                      </li>
                    </ul>

                    <Link href="/apply/dataflow">
                      <button className="w-full bg-white text-green-600 hover:bg-green-50 font-bold py-3 rounded-lg transition-colors">
                        Get Started Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Success Stories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Healthcare professionals who succeeded with our Prometric preparation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Ahmed Al-Rashid',
                profession: 'General Practitioner',
                exam: 'DHA Dubai',
                score: 'Passed with 75%',
                comment: 'eLab\'s comprehensive preparation helped me pass DHA on my first attempt. Now practicing in Dubai Healthcare City.'
              },
              {
                name: 'Nurse Fatima Hassan',
                profession: 'Registered Nurse',
                exam: 'SCFHS Saudi',
                score: 'Passed with 68%',
                comment: 'The MCQ practice questions were exactly like the real exam. Excellent preparation materials and support.'
              },
              {
                name: 'Dr. Sarah Ahmed',
                profession: 'Cardiologist',
                exam: 'MOH UAE',
                score: 'Passed with 72%',
                comment: 'Professional guidance throughout the DataFlow and MOH process. Highly recommend eLab Solutions.'
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <div className="text-sm text-gray-600">{story.profession}</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-green-800">{story.exam} - {story.score}</div>
                </div>
                <p className="text-gray-700 italic">"{story.comment}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Gulf Career?</h2>
          <p className="text-xl mb-8 text-green-100">
            Begin your Prometric exam preparation with our comprehensive program and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply/dataflow">
              <button className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-full transition-colors">
                Apply Now - $1,799
              </button>
            </Link>
            <Link href="/academy/exam-booking">
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-full transition-colors">
                Book Your Exam
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}