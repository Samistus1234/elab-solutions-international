'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle, Clock, DollarSign, Star, 
  BookOpen, Users, Award, Target, AlertCircle, Globe,
  Calendar, MapPin, TrendingUp, Shield, FileText, Headphones,
  PenTool, Mic, Eye
} from 'lucide-react';

const englishTests = [
  {
    id: 'ielts',
    name: 'IELTS Academic',
    fullName: 'International English Language Testing System',
    duration: '2 hours 45 minutes',
    cost: '$215-$310',
    validity: '2 years',
    format: 'Computer-based or Paper-based',
    recognition: '12,000+ organizations globally',
    skills: [
      { name: 'Listening', duration: '30 minutes', questions: '40 questions' },
      { name: 'Reading', duration: '60 minutes', questions: '40 questions' },
      { name: 'Writing', duration: '60 minutes', questions: '2 tasks' },
      { name: 'Speaking', duration: '11-14 minutes', questions: '3 parts' }
    ],
    requirements: {
      'US Nursing': 'Overall 6.5, no band below 6.0',
      'UK Nursing (NMC)': 'Overall 7.0, no band below 7.0',
      'Canada Nursing': 'Overall 7.0, no band below 6.5',
      'Australia Nursing': 'Overall 7.0, no band below 7.0'
    }
  },
  {
    id: 'oet',
    name: 'OET',
    fullName: 'Occupational English Test',
    duration: '3 hours',
    cost: '$587',
    validity: '2 years',
    format: 'Computer-based',
    recognition: 'Healthcare-specific for 12 professions',
    skills: [
      { name: 'Listening', duration: '45 minutes', questions: '42 questions' },
      { name: 'Reading', duration: '60 minutes', questions: '42 questions' },
      { name: 'Writing', duration: '45 minutes', questions: '1 letter (350-450 words)' },
      { name: 'Speaking', duration: '20 minutes', questions: '2 role-plays' }
    ],
    requirements: {
      'US Medical (ECFMG)': 'Min 350 (Listening, Reading, Speaking), 300 (Writing)',
      'UK Nursing (NMC)': 'Grade B in all four sub-tests',
      'Australia Nursing': 'Grade B in all four sub-tests',
      'New Zealand': 'Grade B in all four sub-tests'
    }
  },
  {
    id: 'toefl',
    name: 'TOEFL iBT',
    fullName: 'Test of English as a Foreign Language',
    duration: '3 hours',
    cost: '$185-$300',
    validity: '2 years',
    format: 'Internet-based',
    recognition: '11,500+ universities and agencies',
    skills: [
      { name: 'Reading', duration: '54-72 minutes', questions: '30-40 questions' },
      { name: 'Listening', duration: '41-57 minutes', questions: '28-39 questions' },
      { name: 'Speaking', duration: '17 minutes', questions: '4 tasks' },
      { name: 'Writing', duration: '50 minutes', questions: '2 tasks' }
    ],
    requirements: {
      'US Nursing': 'Minimum 80-83 (varies by state)',
      'Canada Immigration': 'Minimum 94-101',
      'US Medical Schools': 'Minimum 100',
      'Graduate Programs': 'Minimum 80-100'
    }
  }
];

const preparationPrograms = [
  {
    test: 'IELTS Academic',
    duration: '8-12 weeks',
    features: [
      'Academic writing task mastery',
      'Band score improvement strategies',
      'Mock tests with detailed feedback',
      'Speaking practice with certified trainers'
    ],
    targetScore: '7.0+ overall',
    price: '$599'
  },
  {
    test: 'OET Healthcare',
    duration: '6-10 weeks',
    features: [
      'Healthcare-specific scenarios',
      'Medical terminology mastery',
      'Role-play practice sessions',
      'Healthcare writing skills development'
    ],
    targetScore: 'Grade B all skills',
    price: '$699'
  },
  {
    test: 'TOEFL iBT',
    duration: '8-12 weeks',
    features: [
      'Integrated skills practice',
      'Academic English development',
      'Computer-based test familiarity',
      'Note-taking strategies'
    ],
    targetScore: '90+ overall',
    price: '$549'
  }
];

const countryRequirements = [
  {
    country: 'United States',
    nursingReq: 'IELTS 6.5+ (CGFNS) or TOEFL 83+',
    medicalReq: 'OET Grade B+ (ECFMG pathway)',
    notes: 'Requirements vary by state board'
  },
  {
    country: 'United Kingdom',
    nursingReq: 'IELTS 7.0+ all bands or OET Grade B+',
    medicalReq: 'IELTS 7.5+ overall, 7.0+ all bands',
    notes: 'NMC accepts only IELTS Academic and OET'
  },
  {
    country: 'Canada',
    nursingReq: 'IELTS 7.0+ overall, 6.5+ all bands',
    medicalReq: 'IELTS 7.0+ all bands',
    notes: 'Requirements vary by province'
  },
  {
    country: 'Australia',
    nursingReq: 'IELTS 7.0+ or OET Grade B+ all skills',
    medicalReq: 'IELTS 7.0+ or OET Grade B+ all skills',
    notes: 'AHPRA registration requirements'
  }
];

export default function EnglishProficiencyPage() {
  const [selectedTest, setSelectedTest] = useState('ielts');
  const [selectedTab, setSelectedTab] = useState('overview');

  const currentTest = englishTests.find(test => test.id === selectedTest);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/academy" className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Academy
            </Link>
            <h1 className="text-5xl font-bold mb-6">
              English Proficiency Training
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Master IELTS, OET, and TOEFL with specialized programs for healthcare professionals. 
              Achieve the scores you need for international medical and nursing practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/consultation">
                <button className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Free Assessment
                </button>
              </Link>
              <Link href="#programs">
                <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  View Programs
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
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Score Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4 Skills</div>
              <div className="text-gray-600">Comprehensive Training</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">8-12</div>
              <div className="text-gray-600">Weeks Program</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Online Support</div>
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
                { id: 'tests', label: 'Test Comparison' },
                { id: 'programs', label: 'Preparation Programs' },
                { id: 'requirements', label: 'Country Requirements' },
                { id: 'pricing', label: 'Pricing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">English Proficiency for Healthcare Professionals</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    English proficiency is a critical requirement for healthcare professionals seeking to practice 
                    internationally. Our specialized programs prepare you for IELTS, OET, and TOEFL with healthcare-focused 
                    content and proven strategies.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      {
                        icon: Headphones,
                        title: 'Listening Skills',
                        description: 'Healthcare conversations, lectures, and patient interactions'
                      },
                      {
                        icon: Eye,
                        title: 'Reading Skills',
                        description: 'Medical texts, research papers, and clinical guidelines'
                      },
                      {
                        icon: PenTool,
                        title: 'Writing Skills',
                        description: 'Medical reports, referral letters, and academic essays'
                      },
                      {
                        icon: Mic,
                        title: 'Speaking Skills',
                        description: 'Patient communication and professional discussions'
                      }
                    ].map((skill, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <skill.icon className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{skill.title}</h3>
                        <p className="text-sm text-gray-600">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'tests' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">English Test Comparison</h2>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  {englishTests.map((test) => (
                    <button
                      key={test.id}
                      onClick={() => setSelectedTest(test.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTest === test.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-300'
                      }`}
                    >
                      {test.name}
                    </button>
                  ))}
                </div>

                {currentTest && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentTest.fullName}</h3>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentTest.duration}</div>
                          <div className="text-sm text-gray-600">Total Duration</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentTest.cost}</div>
                          <div className="text-sm text-gray-600">Test Fee</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentTest.validity}</div>
                          <div className="text-sm text-gray-600">Score Validity</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <Globe className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                          <div className="font-semibold text-gray-900">{currentTest.format}</div>
                          <div className="text-sm text-gray-600">Test Format</div>
                        </div>
                      </div>

                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Test Structure</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {currentTest.skills.map((skill, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-2">{skill.name}</h5>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Duration: {skill.duration}</div>
                              <div>Format: {skill.questions}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Score Requirements by Country/Purpose</h4>
                      <div className="grid gap-3">
                        {Object.entries(currentTest.requirements).map(([purpose, requirement]) => (
                          <div key={purpose} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="font-medium text-purple-900">{purpose}</span>
                            <span className="text-purple-700">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'programs' && (
              <div className="space-y-8" id="programs">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Specialized Preparation Programs</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {preparationPrograms.map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
                        <h3 className="text-xl font-bold mb-2">{program.test}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-100">{program.duration}</span>
                          <span className="text-2xl font-bold">{program.price}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="bg-purple-50 rounded-lg p-4 mb-6">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-purple-900">Target Score</div>
                            <div className="text-purple-700">{program.targetScore}</div>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-3">Program Features</h4>
                        <ul className="space-y-2 mb-6">
                          {program.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="space-y-3">
                          <Link href="/consultation">
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                              Free Assessment
                            </button>
                          </Link>
                          <Link href="/apply/english-training">
                            <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                              Enroll Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'requirements' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Country-Specific Requirements</h2>
                <p className="text-lg text-gray-700 mb-8">
                  English proficiency requirements vary by country and profession. Here are the minimum scores 
                  needed for healthcare practice in major destinations:
                </p>
                
                <div className="grid gap-6">
                  {countryRequirements.map((country, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{country.country}</h3>
                        <div className="text-right text-sm text-gray-600">{country.notes}</div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Nursing Requirements</h4>
                          <p className="text-blue-800">{country.nursingReq}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Medical Requirements</h4>
                          <p className="text-green-800">{country.medicalReq}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">Important Guidelines</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <span>Test scores are valid for 2 years from test date</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <span>You can combine scores from two tests of the same type (not different types)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <span>OET is healthcare-specific while IELTS/TOEFL are general academic</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <span>International scheduling may incur additional fees ($500+)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'pricing' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">English Training Costs & Programs</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Official Test Costs</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>IELTS Academic</span>
                        <span className="font-semibold">$215-$310</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>OET (All professions)</span>
                        <span className="font-semibold">$587</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>TOEFL iBT</span>
                        <span className="font-semibold">$185-$300</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>International Test Centers</span>
                        <span className="font-semibold">+$100-$200</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center font-bold">
                        <span>Test + Retake Budget</span>
                        <span className="text-lg">$400-$1,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">eLab English Excellence Package</h3>
                    <div className="text-4xl font-bold mb-2">$799</div>
                    <div className="text-purple-100 mb-6">Score guarantee included</div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Choose IELTS, OET, or TOEFL focus</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Healthcare-specific vocabulary training</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Unlimited practice tests and mock exams</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">One-on-one speaking practice sessions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Writing feedback and improvement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Test registration assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Score improvement guarantee</span>
                      </li>
                    </ul>

                    <Link href="/apply/english-training">
                      <button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 rounded-lg transition-colors">
                        Start Training Now
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Flexible Payment Options</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="font-semibold text-blue-900">Monthly Plan</div>
                      <div className="text-2xl font-bold text-blue-700">$199</div>
                      <div className="text-sm text-blue-600">4 months × $199</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-900">Full Payment</div>
                      <div className="text-2xl font-bold text-blue-700">$799</div>
                      <div className="text-sm text-blue-600">One-time payment</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-900">Assessment Only</div>
                      <div className="text-2xl font-bold text-blue-700">Free</div>
                      <div className="text-sm text-blue-600">No obligation</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Differences Comparison */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IELTS vs OET vs TOEFL</h2>
            <p className="text-lg text-gray-600">Choose the right test for your healthcare career goals</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Aspect</th>
                    <th className="px-6 py-4 text-center font-semibold text-blue-600">IELTS Academic</th>
                    <th className="px-6 py-4 text-center font-semibold text-green-600">OET</th>
                    <th className="px-6 py-4 text-center font-semibold text-purple-600">TOEFL iBT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Content Focus</td>
                    <td className="px-6 py-4 text-center text-blue-700">General Academic</td>
                    <td className="px-6 py-4 text-center text-green-700">Healthcare-Specific</td>
                    <td className="px-6 py-4 text-center text-purple-700">Academic English</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-center text-blue-700">Multiple purposes</td>
                    <td className="px-6 py-4 text-center text-green-700">Healthcare only</td>
                    <td className="px-6 py-4 text-center text-purple-700">US/Canada focus</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Recognition</td>
                    <td className="px-6 py-4 text-center text-blue-700">Worldwide</td>
                    <td className="px-6 py-4 text-center text-green-700">Healthcare boards</td>
                    <td className="px-6 py-4 text-center text-purple-700">North America</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Difficulty</td>
                    <td className="px-6 py-4 text-center text-blue-700">Moderate</td>
                    <td className="px-6 py-4 text-center text-green-700">Easier if medical background</td>
                    <td className="px-6 py-4 text-center text-purple-700">Moderate-High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Healthcare professionals who achieved their target scores</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Priya Sharma',
                profession: 'Internal Medicine',
                test: 'IELTS Academic',
                score: '7.5 overall (from 6.0)',
                destination: 'UK - GMC Registration',
                comment: 'The healthcare-focused vocabulary training made all the difference. Achieved my target score in 3 months!'
              },
              {
                name: 'Nurse Maria Santos',
                profession: 'Registered Nurse',
                test: 'OET',
                score: 'Grade A all skills',
                destination: 'Australia - AHPRA',
                comment: 'OET was perfect for my nursing background. The medical scenarios felt natural and relevant.'
              },
              {
                name: 'Dr. Ahmed Hassan',
                profession: 'Surgeon',
                test: 'TOEFL iBT',
                score: '95 (from 78)',
                destination: 'USA - ECFMG',
                comment: 'Excellent preparation for USMLE pathway. The academic writing skills improved significantly.'
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
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <div className="text-sm text-gray-600">{story.profession}</div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-purple-800">{story.test}: {story.score}</div>
                  <div className="text-xs text-purple-600">{story.destination}</div>
                </div>
                <p className="text-gray-700 italic">"{story.comment}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Achieve Your Target English Score</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join our specialized English training programs designed specifically for healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <button className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-8 rounded-full transition-colors">
                Free English Assessment
              </button>
            </Link>
            <Link href="/apply/english-training">
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-full transition-colors">
                Enroll Now - $799
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}