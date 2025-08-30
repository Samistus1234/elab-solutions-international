'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle, Clock, DollarSign, Star, 
  BookOpen, Users, Award, Target, AlertCircle, Globe,
  Calendar, MapPin, TrendingUp, Shield, FileText, Search,
  Heart, Brain, Stethoscope, Activity, Zap
} from 'lucide-react';

const specialtyCategories = [
  {
    id: 'usmle',
    name: 'USMLE (US Medical Licensing)',
    description: 'United States Medical Licensing Examination for international medical graduates',
    steps: ['Step 1', 'Step 2 CK', 'Step 2 CS', 'Step 3'],
    timeline: '2-4 years',
    cost: '$3,000-$5,000',
    passRate: '85%',
    details: {
      overview: 'The USMLE is a three-step examination for medical licensure in the United States. It assesses a physician\'s ability to apply knowledge, concepts, and principles.',
      requirements: [
        'Medical degree from LCME or WHO-listed school',
        'ECFMG certification',
        'English proficiency (TOEFL/IELTS)',
        'Residency match for practice'
      ],
      examStructure: [
        'Step 1: Basic medical sciences (8 hours, 280 questions)',
        'Step 2 CK: Clinical knowledge (9 hours, 318 questions)', 
        'Step 2 CS: Clinical skills (suspended, may return)',
        'Step 3: Clinical practice (16 hours over 2 days)'
      ]
    }
  },
  {
    id: 'plab',
    name: 'PLAB (UK Medical Licensing)',
    description: 'Professional and Linguistic Assessments Board test for GMC registration',
    steps: ['PLAB 1', 'PLAB 2'],
    timeline: '1-2 years',
    cost: '$1,500-$2,500',
    passRate: '78%',
    details: {
      overview: 'PLAB is required for international medical graduates to practice in the UK. It tests medical knowledge and clinical skills relevant to UK practice.',
      requirements: [
        'Medical qualification acceptable to GMC',
        'IELTS 7.5 overall (7.0 all skills minimum)',
        'Primary medical qualification verification',
        'Good standing certificate'
      ],
      examStructure: [
        'PLAB 1: Multiple choice questions (3 hours, 180 questions)',
        'PLAB 2: Objective Structured Clinical Examination (16 stations, 8 minutes each)'
      ]
    }
  },
  {
    id: 'abms',
    name: 'ABMS Board Certification',
    description: 'American Board of Medical Specialties certification for specialists',
    steps: ['Residency', 'Board Exam', 'MOC'],
    timeline: '3-7 years post-residency',
    cost: '$2,000-$4,000',
    passRate: '90%',
    details: {
      overview: 'ABMS certification demonstrates expertise in medical specialties. Required for practice in most US hospitals and healthcare systems.',
      requirements: [
        'Completed ACGME-accredited residency',
        'Valid medical license',
        'Continuous medical education',
        'Professional standing verification'
      ],
      examStructure: [
        'ABIM Internal Medicine: Computer-based, 10 hours',
        'ABEM Emergency Medicine: Computer-based, 8 hours',
        'Subspecialty exams vary by field',
        'Maintenance of Certification (MOC) ongoing'
      ]
    }
  },
  {
    id: 'mrcgp',
    name: 'MRCGP (UK GP Certification)',
    description: 'Membership of Royal College of General Practitioners',
    steps: ['AKT', 'CSA', 'WPBA'],
    timeline: '3 years training',
    cost: '$2,000-$3,000',
    passRate: '82%',
    details: {
      overview: 'MRCGP is the professional qualification for UK General Practitioners, consisting of multiple assessment components during GP training.',
      requirements: [
        'Completed Foundation Programme',
        'Entry into GP training programme',
        'GMC registration with license to practice',
        'English language competency'
      ],
      examStructure: [
        'Applied Knowledge Test (AKT): 200 questions, 3 hours',
        'Clinical Skills Assessment (CSA): 13 cases, 4 hours',
        'Workplace Based Assessment (WPBA): Portfolio evidence'
      ]
    }
  },
  {
    id: 'specialist',
    name: 'International Specialty Exams',
    description: 'Various specialty certifications for international practice',
    steps: ['Varies by specialty'],
    timeline: '6 months - 2 years',
    cost: '$1,000-$3,000',
    passRate: '75-90%',
    details: {
      overview: 'Specialty examinations for various medical fields including cardiology, surgery, radiology, and other medical specialties.',
      requirements: [
        'Relevant medical degree and experience',
        'Specialty training completion',
        'Language proficiency certification',
        'Good standing from current practice'
      ],
      examStructure: [
        'Written examinations (multiple choice and essays)',
        'Practical assessments where applicable',
        'Oral examinations for some specialties',
        'Portfolio submissions for certain fields'
      ]
    }
  }
];

const preparationServices = [
  {
    icon: BookOpen,
    title: 'Comprehensive Study Materials',
    description: 'Updated question banks, textbooks, and digital resources for all specialty exams'
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'One-on-one guidance from board-certified specialists who passed these exams'
  },
  {
    icon: Target,
    title: 'Personalized Study Plans',
    description: 'Customized preparation timeline based on your background and target exam dates'
  },
  {
    icon: Shield,
    title: 'Pass Guarantee',
    description: 'Money-back guarantee with free retake preparation if you don\'t pass on first attempt'
  },
  {
    icon: Globe,
    title: 'International Support',
    description: '24/7 online support for students worldwide with flexible scheduling'
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'High pass rates across all specialty examinations with documented success stories'
  }
];

export default function SpecialtyExamsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('usmle');
  const [selectedTab, setSelectedTab] = useState('overview');

  const currentSpecialty = specialtyCategories.find(s => s.id === selectedSpecialty);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/academy" className="inline-flex items-center text-red-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Academy
            </Link>
            <h1 className="text-5xl font-bold mb-6">
              Medical Specialty Examinations
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Expert preparation for advanced medical licensing and specialty board certifications. 
              Master USMLE, PLAB, ABMS, MRCGP, and other professional medical examinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/consultation">
                <button className="bg-white text-red-600 hover:bg-red-50 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Expert Consultation
                </button>
              </Link>
              <Link href="#specialties">
                <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Explore Specialties
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
              <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-gray-600">Average Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Medical Specialties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-gray-600">ABMS Boards</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1:1</div>
              <div className="text-gray-600">Expert Mentorship</div>
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
                { id: 'specialties', label: 'Specialty Exams' },
                { id: 'preparation', label: 'Preparation Process' },
                { id: 'services', label: 'Our Services' },
                { id: 'pricing', label: 'Pricing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-red-500 text-red-600'
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Medical Specialty Examinations</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Specialty medical examinations represent the highest level of professional certification 
                    for physicians seeking to practice in their chosen field. These exams validate advanced 
                    knowledge, clinical skills, and competency in specialized medical practice.
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Why Pursue Specialty Certification?</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                        <span>Higher earning potential and career advancement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                        <span>Recognition as a medical expert in your field</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                        <span>Access to premium hospital positions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                        <span>International mobility and practice opportunities</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Heart,
                        title: 'Cardiology Boards',
                        description: 'ABIM Cardiovascular Disease certification and international equivalents'
                      },
                      {
                        icon: Brain,
                        title: 'Neurology & Psychiatry',
                        description: 'Specialized examinations for neurological and mental health practice'
                      },
                      {
                        icon: Activity,
                        title: 'Surgery Boards',
                        description: 'Surgical specialty certifications including general and subspecialty surgery'
                      }
                    ].map((specialty, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <specialty.icon className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{specialty.title}</h3>
                        <p className="text-sm text-gray-600">{specialty.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'specialties' && (
              <div className="space-y-8" id="specialties">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Specialty Examinations</h2>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  {specialtyCategories.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedSpecialty === specialty.id
                          ? 'bg-red-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300'
                      }`}
                    >
                      {specialty.name}
                    </button>
                  ))}
                </div>

                {currentSpecialty && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentSpecialty.name}</h3>
                      <p className="text-lg text-gray-700 mb-6">{currentSpecialty.description}</p>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <Calendar className="h-6 w-6 text-red-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentSpecialty.timeline}</div>
                          <div className="text-sm text-gray-600">Timeline</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentSpecialty.cost}</div>
                          <div className="text-sm text-gray-600">Total Cost</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentSpecialty.passRate}</div>
                          <div className="text-sm text-gray-600">Pass Rate</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentSpecialty.steps.length}</div>
                          <div className="text-sm text-gray-600">Exam Steps</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h4>
                          <ul className="space-y-2">
                            {currentSpecialty.details.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Exam Structure</h4>
                          <ul className="space-y-2">
                            {currentSpecialty.details.examStructure.map((structure, index) => (
                              <li key={index} className="flex items-start">
                                <Target className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{structure}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800">{currentSpecialty.details.overview}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'preparation' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Preparation Process</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      phase: 1,
                      title: 'Initial Assessment & Planning',
                      duration: '1-2 weeks',
                      tasks: [
                        'Comprehensive knowledge assessment',
                        'Goal setting and timeline planning',
                        'Study material selection',
                        'Mentor assignment'
                      ]
                    },
                    {
                      phase: 2,
                      title: 'Foundation Building',
                      duration: '4-8 weeks',
                      tasks: [
                        'Core concept review and strengthening',
                        'Specialty-specific knowledge building',
                        'Practice question baseline establishment',
                        'Study habit optimization'
                      ]
                    },
                    {
                      phase: 3,
                      title: 'Advanced Preparation',
                      duration: '8-12 weeks',
                      tasks: [
                        'Intensive practice with simulated exams',
                        'Weakness identification and targeted improvement',
                        'Clinical reasoning development',
                        'Time management mastery'
                      ]
                    },
                    {
                      phase: 4,
                      title: 'Final Preparation & Exam',
                      duration: '2-4 weeks',
                      tasks: [
                        'Final review and consolidation',
                        'Mock exam performance optimization',
                        'Exam registration and scheduling',
                        'Mental preparation and stress management'
                      ]
                    }
                  ].map((phase, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start mb-4">
                        <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold">{phase.phase}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
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
              </div>
            )}

            {selectedTab === 'services' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Specialty Exam Services</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {preparationServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="bg-red-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Specialty Areas We Cover</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      'Internal Medicine', 'Emergency Medicine', 'Family Medicine',
                      'Cardiology', 'Gastroenterology', 'Pulmonology',
                      'Endocrinology', 'Nephrology', 'Hematology',
                      'Infectious Diseases', 'Rheumatology', 'Dermatology',
                      'Psychiatry', 'Neurology', 'Radiology',
                      'Pathology', 'Anesthesiology', 'Surgery',
                      'Pediatrics', 'Obstetrics & Gynecology', 'Ophthalmology',
                      'Orthopedics', 'Urology', 'ENT'
                    ].map((specialty, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <span className="text-sm font-medium text-blue-800">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'pricing' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Specialty Exam Preparation Pricing</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Preparation</h3>
                    <div className="text-3xl font-bold text-red-600 mb-4">$1,499</div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Study materials and resources</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Practice question banks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Basic study plan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Email support</span>
                      </li>
                    </ul>
                    <button className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors">
                      Choose Basic
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-red-500 to-purple-500 text-white rounded-lg shadow-md p-6 transform scale-105">
                    <div className="text-center mb-4">
                      <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Premium Preparation</h3>
                    <div className="text-4xl font-bold mb-4">$2,999</div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span className="text-sm">Everything in Basic</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span className="text-sm">1:1 expert mentorship</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span className="text-sm">Personalized study plan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span className="text-sm">Weekly progress reviews</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span className="text-sm">Mock exams with feedback</span>
                      </li>
                    </ul>
                    <Link href="/consultation">
                      <button className="w-full bg-white text-red-600 hover:bg-red-50 font-bold py-3 rounded-lg transition-colors">
                        Get Started
                      </button>
                    </Link>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Elite Preparation</h3>
                    <div className="text-3xl font-bold text-red-600 mb-4">$4,999</div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Everything in Premium</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Board-certified mentors</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Pass guarantee</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Priority support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Career guidance</span>
                      </li>
                    </ul>
                    <button className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors">
                      Choose Elite
                    </button>
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
            <p className="text-lg text-gray-600">Specialists who achieved board certification with our guidance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Rajesh Kumar, MD',
                specialty: 'Cardiology',
                exam: 'ABIM Cardiovascular Disease',
                score: 'Passed on first attempt',
                position: 'Interventional Cardiologist, Mayo Clinic',
                comment: 'The personalized mentorship and comprehensive question bank were instrumental in my success.'
              },
              {
                name: 'Dr. Sarah Al-Ahmad, MD',
                specialty: 'Emergency Medicine',
                exam: 'ABEM Board Certification',
                score: 'Top 10% percentile',
                position: 'Emergency Physician, Johns Hopkins',
                comment: 'Outstanding preparation program with realistic mock exams that perfectly matched the actual test.'
              },
              {
                name: 'Dr. Michael Chen, MD',
                specialty: 'General Practice',
                exam: 'MRCGP (UK)',
                score: 'Passed all components',
                position: 'GP Partner, NHS England',
                comment: 'Excellent support throughout the MRCGP journey. The UK-specific preparation was invaluable.'
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
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Stethoscope className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <div className="text-sm text-gray-600">{story.specialty}</div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-red-800">{story.exam}</div>
                  <div className="text-sm text-red-600">{story.score}</div>
                  <div className="text-xs text-red-600 mt-1">{story.position}</div>
                </div>
                <p className="text-gray-700 italic">"{story.comment}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Medical Career?</h2>
          <p className="text-xl mb-8 text-red-100">
            Take the next step toward specialty certification with our expert-guided preparation programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <button className="bg-white text-red-600 hover:bg-red-50 font-bold py-4 px-8 rounded-full transition-colors">
                Schedule Expert Consultation
              </button>
            </Link>
            <Link href="/apply/specialty-exam">
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-full transition-colors">
                Start Preparation - $2,999
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}