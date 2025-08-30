'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle, Clock, DollarSign, Star, 
  BookOpen, Users, Award, Target, AlertCircle, Download,
  Calendar, MapPin, TrendingUp, Shield, Globe
} from 'lucide-react';

const examFeatures = [
  {
    icon: Clock,
    title: 'Adaptive Testing',
    description: '75-145 questions in up to 6 hours based on your performance'
  },
  {
    icon: Target,
    title: 'Pass Standards',
    description: 'Computer-adaptive test determines competency for safe nursing practice'
  },
  {
    icon: Globe,
    title: 'National Recognition',
    description: 'Valid for RN licensure in all 50 states, DC, and US territories'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Available year-round at Pearson VUE testing centers worldwide'
  }
];

const preparationSteps = [
  {
    step: 1,
    title: 'Complete Nursing Education',
    description: 'Graduate from a state-approved nursing program (ADN or BSN)',
    timeline: 'Must be completed',
    required: true
  },
  {
    step: 2,
    title: 'Apply to State Board',
    description: 'Submit RN license application to your intended state of practice',
    timeline: '4-12 weeks processing',
    required: true
  },
  {
    step: 3,
    title: 'Register with Pearson VUE',
    description: 'Pay $200 exam fee and receive Authorization to Test (ATT)',
    timeline: '1-2 weeks after board approval',
    required: true
  },
  {
    step: 4,
    title: 'Schedule Your Exam',
    description: 'Book exam date within 90 days of ATT receipt',
    timeline: 'Within ATT validity',
    required: true
  },
  {
    step: 5,
    title: 'Complete Background Check',
    description: 'Criminal background verification (varies by state)',
    timeline: 'During application process',
    required: true
  }
];

const studyResources = [
  {
    type: 'Official Resources',
    items: [
      'NCLEX-RN Test Plan from NCSBN',
      'NCSBN Learning Extension',
      'Official Practice Questions',
      'NCLEX-RN Examination Candidate Bulletin'
    ]
  },
  {
    type: 'Study Materials',
    items: [
      'Comprehensive review books (Kaplan, Saunders, etc.)',
      'Online question banks (UWorld, Kaplan, ATI)',
      'Video lectures and tutorials',
      'Mobile apps for practice questions'
    ]
  },
  {
    type: 'Content Areas',
    items: [
      'Management of Care (17-23%)',
      'Safety and Infection Control (9-15%)',
      'Health Promotion and Maintenance (6-12%)',
      'Psychosocial Integrity (6-12%)',
      'Basic Care and Comfort (6-12%)',
      'Pharmacological Therapies (12-18%)',
      'Reduction of Risk Potential (9-15%)',
      'Physiological Adaptation (11-17%)'
    ]
  }
];

const stateRequirements = [
  {
    state: 'California',
    additionalReqs: ['CES evaluation for foreign graduates', 'Criminal background check', '$150 application fee'],
    processingTime: '8-12 weeks'
  },
  {
    state: 'New York',
    additionalReqs: ['CGFNS certification for foreign graduates', 'Fingerprinting', '$143 application fee'],
    processingTime: '6-10 weeks'
  },
  {
    state: 'Texas',
    additionalReqs: ['Jurisprudence exam', 'Background check', '$60 application fee'],
    processingTime: '4-8 weeks'
  },
  {
    state: 'Florida',
    additionalReqs: ['CGFNS evaluation', 'Background screening', '$75 application fee'],
    processingTime: '6-12 weeks'
  }
];

export default function NCLEXRNPreparationPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/academy" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Academy
            </Link>
            <h1 className="text-5xl font-bold mb-6">
              NCLEX-RN Preparation Program
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Comprehensive preparation for the National Council Licensure Examination for Registered Nurses. 
              Join thousands of international nurses who achieved their US RN license with our proven program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply/nclex">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Start Your Application
                </button>
              </Link>
              <Link href="/consultation">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Free Consultation
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
              <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">$65k-$95k</div>
              <div className="text-gray-600">Average RN Salary Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">6-12</div>
              <div className="text-gray-600">Months Timeline</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">75-145</div>
              <div className="text-gray-600">Exam Questions</div>
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
                { id: 'requirements', label: 'Requirements' },
                { id: 'preparation', label: 'Preparation' },
                { id: 'states', label: 'State Requirements' },
                { id: 'pricing', label: 'Pricing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">About NCLEX-RN</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    The NCLEX-RN (National Council Licensure Examination for Registered Nurses) is a standardized exam 
                    required for RN licensure in the United States. It's designed to test the knowledge, skills, and 
                    abilities essential for safe and effective nursing practice.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {examFeatures.map((feature, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'requirements' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Basic Eligibility</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Graduation from a state-approved nursing program (ADN or BSN)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Application for RN licensure to a State Board of Nursing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Clean criminal background check (requirements vary by state)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Payment of licensing and examination fees</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4">International Graduates</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <span>Credential evaluation through CGFNS or CES (varies by state)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <span>English proficiency test (IELTS, TOEFL, or OET)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <span>VisaScreen Certificate for most states</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <span>Apostilled or authenticated documents from home country</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'preparation' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Exam Preparation Guide</h2>
                
                <div className="grid md:grid-cols-5 gap-8">
                  {preparationSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold">{step.step}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="text-xs text-blue-600 font-medium">{step.timeline}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Study Resources</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {studyResources.map((resource, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">{resource.type}</h4>
                        <ul className="space-y-2">
                          {resource.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'states' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">State-Specific Requirements</h2>
                <p className="text-lg text-gray-700 mb-8">
                  While NCLEX-RN is nationally standardized, each state has additional licensing requirements. 
                  Here are requirements for popular states for international nurses:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {stateRequirements.map((state, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{state.state}</h3>
                      <div className="space-y-3 mb-4">
                        {state.additionalReqs.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-900">Processing Time:</div>
                        <div className="text-sm text-gray-600">{state.processingTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'pricing' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NCLEX-RN Costs & Our Services</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Official Exam Costs</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>NCLEX-RN Exam Fee</span>
                        <span className="font-semibold">$200</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>State Board Application</span>
                        <span className="font-semibold">$60-$200</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>CGFNS Evaluation (International)</span>
                        <span className="font-semibold">$365</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>VisaScreen Certificate</span>
                        <span className="font-semibold">$565</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center font-bold">
                        <span>Typical Total</span>
                        <span className="text-lg">$1,190-$1,330</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">eLab Complete Package</h3>
                    <div className="text-4xl font-bold mb-2">$2,499</div>
                    <div className="text-blue-100 mb-6">Everything included</div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Complete application assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">CGFNS/CES evaluation support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">VisaScreen certificate assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Comprehensive NCLEX prep course</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Unlimited practice questions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Dedicated success coach</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Pass guarantee (retake support)</span>
                      </li>
                    </ul>

                    <Link href="/apply/nclex">
                      <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition-colors">
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
            <p className="text-lg text-gray-600">Real nurses who achieved their US RN license with our program</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Rodriguez, RN',
                country: 'Philippines',
                state: 'California',
                score: 'Passed in 75 questions',
                comment: 'eLab Solutions guided me through every step. From CGFNS to NCLEX preparation, their support was invaluable.'
              },
              {
                name: 'Ahmed Hassan, RN',
                country: 'Egypt',
                state: 'Texas',
                score: 'Passed in 85 questions',
                comment: 'The comprehensive preparation program and practice questions were exactly what I needed to pass on my first attempt.'
              },
              {
                name: 'Priya Sharma, RN',
                country: 'India',
                state: 'New York',
                score: 'Passed in 95 questions',
                comment: 'Excellent support throughout the entire process. Now working at Mount Sinai Hospital in NYC!'
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
                    <div className="text-sm text-gray-600">{story.country} → {story.state}</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-green-800">{story.score}</div>
                </div>
                <p className="text-gray-700 italic">"{story.comment}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NCLEX-RN Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our proven program and take the first step toward your US nursing career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply/nclex">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors">
                Apply Now - $2,499
              </button>
            </Link>
            <Link href="/consultation">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full transition-colors">
                Free Consultation
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}