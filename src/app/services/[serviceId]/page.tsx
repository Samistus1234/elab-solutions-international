'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileCheck, Award, GraduationCap, Users, Clock, 
  CheckCircle, ArrowLeft, Star, Globe, DollarSign,
  Calendar, Phone, Mail, Download, Play, BookOpen
} from 'lucide-react';

const servicesData = {
  dataflow: {
    id: 'dataflow',
    title: 'DataFlow Primary Source Verification',
    shortDescription: 'Complete PSV package for Gulf country licensing',
    fullDescription: 'Our DataFlow Primary Source Verification service is specifically designed for healthcare professionals seeking to obtain licenses in Gulf countries (UAE, Saudi Arabia, Qatar, Bahrain, and Oman). We handle the entire PSV process from start to finish, ensuring all your credentials are properly verified and submitted to the relevant authorities.',
    icon: FileCheck,
    price: { amount: 1299, currency: 'USD', unit: 'per application' },
    timeline: '3-6 weeks',
    successRate: '98%',
    processingTime: 'Standard: 25-30 days, Rush: 15-20 days',
    targetCountries: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Oman'],
    eligibility: [
      'Nursing degree from recognized institution',
      'Valid nursing license from home country',
      'Minimum 2 years clinical experience',
      'English language proficiency'
    ],
    processSteps: [
      'Initial consultation and document assessment',
      'Document collection and preparation',
      'Educational credential verification',
      'Professional license verification',
      'Experience certificate verification',
      'Good standing certificate verification',
      'Document authentication and submission',
      'Application tracking and follow-up',
      'Final certification and delivery'
    ],
    includes: [
      'Educational credential verification',
      'Professional license verification', 
      'Experience certificate verification',
      'Good standing certificate verification',
      'Document authentication',
      'Submission to regulatory bodies',
      'Application tracking through CentralOps',
      'Email and WhatsApp support'
    ],
    additionalServices: [
      { name: 'Rush Processing (15-20 days)', price: 300 },
      { name: 'Document Translation (per document)', price: 50 },
      { name: 'Document Attestation (per document)', price: 75 },
      { name: 'Additional Country Application', price: 400 }
    ],
    faqs: [
      {
        question: 'What documents do I need for DataFlow PSV?',
        answer: 'You\'ll need your nursing degree certificate, official transcripts, nursing license, experience certificates, good standing certificate, and passport copy. All documents must be original or certified copies.'
      },
      {
        question: 'How long does the DataFlow process take?',
        answer: 'Standard processing takes 25-30 days from the time we receive all your documents. Rush processing (15-20 days) is available for an additional fee.'
      },
      {
        question: 'Which Gulf countries accept DataFlow PSV?',
        answer: 'DataFlow PSV is accepted by UAE (DHA/MOH), Saudi Arabia (SCH), Qatar (QCHP), Bahrain (NHRA), and Oman (OMC) for nursing license applications.'
      }
    ]
  },
  nclex: {
    id: 'nclex',
    title: 'NCLEX-RN Preparation & Registration',
    shortDescription: 'Complete NCLEX preparation with registration support',
    fullDescription: 'Our comprehensive NCLEX-RN preparation program combines cutting-edge technology with expert instruction to ensure your success on the NCLEX exam. We provide everything you need from study materials to registration support, helping you achieve your goal of becoming a registered nurse in the United States.',
    icon: GraduationCap,
    price: { amount: 899, currency: 'USD', unit: 'complete package' },
    timeline: '3-6 months',
    successRate: '94%',
    processingTime: 'Self-paced with 6 months access',
    targetCountries: ['United States'],
    eligibility: [
      'Nursing degree equivalent to US BSN',
      'CGFNS or other credential evaluation (we can assist)',
      'English proficiency (IELTS/TOEFL/Duolingo)',
      'State board approval for NCLEX eligibility'
    ],
    processSteps: [
      'Credential evaluation and eligibility assessment',
      'Study plan development based on your background',
      'Comprehensive content review and practice',
      'Adaptive testing and progress tracking',
      'NCLEX registration assistance',
      'Authorization to Test (ATT) support',
      'State board application guidance',
      'Pre-exam final preparation',
      'Post-exam license application support'
    ],
    includes: [
      'Comprehensive NCLEX-RN question bank (3,500+ questions)',
      'Adaptive practice tests',
      'Video lectures and tutorials',
      'Study plan and progress tracking',
      'NCLEX registration assistance',
      'Authorization to Test (ATT) support',
      'State board application guidance',
      'Live tutoring sessions (4 sessions)',
      '6 months platform access'
    ],
    additionalServices: [
      { name: 'Extended Access (additional 3 months)', price: 199 },
      { name: 'One-on-One Tutoring (per hour)', price: 75 },
      { name: 'Mock Exam Package (5 tests)', price: 149 },
      { name: 'CGFNS Evaluation Service', price: 350 }
    ],
    faqs: [
      {
        question: 'What is the NCLEX-RN pass rate with your program?',
        answer: 'Our students achieve a 94% first-time pass rate, significantly higher than the national average of 87%. Our adaptive learning system and comprehensive content review ensure thorough preparation.'
      },
      {
        question: 'How long should I study for the NCLEX?',
        answer: 'Most students need 3-6 months of dedicated preparation. Our platform provides a personalized study plan based on your background and learning pace.'
      },
      {
        question: 'Do you help with state board applications?',
        answer: 'Yes, we provide guidance on state board applications, help you understand specific state requirements, and assist with the Authorization to Test (ATT) process.'
      }
    ]
  },
  'uk-nmc': {
    id: 'uk-nmc',
    title: 'UK NMC Registration Package',
    shortDescription: 'Complete NMC registration process for UK nursing practice',
    fullDescription: 'Navigate the complex UK NMC registration process with confidence. Our comprehensive package covers everything from initial application to final registration, including CBT and OSCE preparation. We guide you through each step to ensure successful registration with the Nursing and Midwifery Council.',
    icon: Award,
    price: { amount: 1199, currency: 'USD', unit: 'complete package' },
    timeline: '6-12 months',
    successRate: '91%',
    processingTime: 'Varies by NMC processing times',
    targetCountries: ['United Kingdom'],
    eligibility: [
      'Nursing qualification equivalent to UK standards',
      'IELTS 7.0 overall (6.5 in each component) or OET Grade B',
      'Recent nursing practice experience',
      'Good health and character requirements'
    ],
    processSteps: [
      'Initial eligibility assessment and consultation',
      'Application preparation and document review',
      'NMC online application submission',
      'CBT (Computer Based Test) preparation and booking',
      'OSCE (Objective Structured Clinical Examination) preparation',
      'Skills assessment and practice sessions',
      'Test support and guidance',
      'Registration completion and PIN issuance',
      'Job search and placement support'
    ],
    includes: [
      'NMC application preparation',
      'CBT (Computer Based Test) preparation',
      'OSCE preparation materials',
      'IELTS preparation support',
      'Document verification and submission',
      'Application tracking and updates',
      'Interview preparation (if required)',
      'Post-registration job search support'
    ],
    additionalServices: [
      { name: 'IELTS Preparation Course', price: 299 },
      { name: 'OSCE Practice Sessions', price: 199 },
      { name: 'UK Job Placement Assistance', price: 499 },
      { name: 'Visa Application Support', price: 350 }
    ],
    faqs: [
      {
        question: 'What is the difference between CBT and OSCE?',
        answer: 'CBT is a computer-based knowledge test covering nursing theory and practice. OSCE is a practical skills assessment where you demonstrate clinical competencies in simulated scenarios.'
      },
      {
        question: 'How long does NMC registration take?',
        answer: 'The complete process typically takes 6-12 months, depending on NMC processing times, your preparation speed, and test availability. We help expedite wherever possible.'
      },
      {
        question: 'What English language requirements do I need?',
        answer: 'You need IELTS 7.0 overall with 6.5 in each component, or OET Grade B in all four skills. We provide preparation support for both tests.'
      }
    ]
  },
  australia: {
    id: 'australia',
    title: 'Australia AHPRA Registration',
    shortDescription: 'Complete AHPRA registration process for Australian healthcare practice',
    fullDescription: 'Achieve your dream of working as a healthcare professional in Australia through our comprehensive AHPRA registration service. We navigate the complex Australian healthcare system requirements and guide you through every step of the registration process with the Australian Health Practitioner Regulation Agency.',
    icon: Globe,
    price: { amount: 1099, currency: 'USD', unit: 'complete package' },
    timeline: '4-8 months',
    successRate: '93%',
    processingTime: 'Varies by AHPRA processing times',
    targetCountries: ['Australia'],
    eligibility: [
      'Nursing qualification recognized by AHPRA',
      'English proficiency (IELTS/PTE/OET)',
      'Recent nursing practice experience',
      'Good health and character requirements'
    ],
    processSteps: [
      'Initial assessment and eligibility review',
      'Skills assessment application preparation',
      'Document verification and submission',
      'English language test support',
      'AHPRA application submission',
      'Bridging program enrollment (if required)',
      'Registration processing and follow-up',
      'Final registration and conditions review',
      'Job search and settlement support'
    ],
    includes: [
      'AHPRA application preparation',
      'Skill assessment support',
      'English language test guidance',
      'Document verification and submission',
      'Application tracking and updates',
      'Bridging program guidance (if required)',
      'Job search support',
      'Settlement assistance information'
    ],
    additionalServices: [
      { name: 'PTE/IELTS/OET Preparation', price: 299 },
      { name: 'Bridging Program Enrollment', price: 399 },
      { name: 'Job Placement Assistance', price: 599 },
      { name: 'Visa Application Support', price: 450 }
    ],
    faqs: [
      {
        question: 'What is a bridging program and do I need it?',
        answer: 'A bridging program helps international nurses meet Australian standards. AHPRA may require it based on your qualifications. We assess your eligibility and guide you through the process if needed.'
      },
      {
        question: 'Which English test is best for AHPRA?',
        answer: 'IELTS, PTE, and OET are all accepted. OET is healthcare-specific and may be easier for nurses. We help you choose the best option based on your strengths.'
      },
      {
        question: 'How long does AHPRA registration take?',
        answer: 'Processing times vary from 4-8 months depending on your qualifications, English test results, and whether additional requirements like bridging programs are needed.'
      }
    ]
  },
  consultation: {
    id: 'consultation',
    title: 'Professional Consultation Services',
    shortDescription: 'Expert guidance and personalized consultation for your healthcare career journey',
    fullDescription: 'Get personalized, expert guidance for your international healthcare career journey. Our experienced consultants provide one-on-one support to help you navigate complex requirements, make informed decisions, and create a strategic plan for your success.',
    icon: Users,
    price: { amount: 149, currency: 'USD', unit: 'per hour' },
    timeline: 'Immediate',
    successRate: '100%',
    processingTime: 'Same day booking available',
    targetCountries: ['All supported countries'],
    eligibility: [
      'Healthcare professionals seeking international opportunities',
      'Nursing graduates planning career moves',
      'Licensed professionals considering multiple countries',
      'Anyone needing expert guidance and strategic planning'
    ],
    processSteps: [
      'Consultation booking and scheduling',
      'Pre-consultation questionnaire completion',
      'Comprehensive background and goal assessment',
      'Personalized pathway recommendations',
      'Timeline and cost planning discussion',
      'Resource and strategy recommendations',
      'Follow-up email summary and action plan',
      'Ongoing support availability'
    ],
    includes: [
      'One-on-one career consultation',
      'Pathway assessment and recommendations',
      'Document review and guidance',
      'Timeline and cost planning',
      'Country-specific requirements briefing',
      'Application strategy development',
      'Follow-up email summary',
      'Resource recommendations'
    ],
    additionalServices: [
      { name: '3-Session Package', price: 399 },
      { name: '6-Month Support Package', price: 699 },
      { name: 'Emergency Consultation (24h)', price: 249 },
      { name: 'Group Consultation (per person)', price: 99 }
    ],
    faqs: [
      {
        question: 'What should I prepare for my consultation?',
        answer: 'Bring your educational certificates, current license, CV, and any questions about specific countries or pathways. We\'ll provide a pre-consultation questionnaire to maximize our time together.'
      },
      {
        question: 'Can you help me choose between different countries?',
        answer: 'Absolutely! We provide comparative analysis of different pathways, considering factors like processing time, costs, job market, visa requirements, and your personal preferences.'
      },
      {
        question: 'Do you offer follow-up support after consultation?',
        answer: 'Yes, you receive a detailed email summary with action steps, and you can book additional sessions at any time. We also offer package deals for ongoing support.'
      }
    ]
  }
};

interface ServiceDetailPageProps {
  params: { serviceId: string };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const service = servicesData[params.serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-blue-600 hover:text-blue-800">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: any) => {
    return `$${price.amount.toLocaleString()} ${price.unit}`;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'process', name: 'Process', icon: CheckCircle },
    { id: 'faqs', name: 'FAQs', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mr-6">
                <service.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <p className="text-gray-600 text-lg">{service.shortDescription}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{formatPrice(service.price)}</div>
              <div className="text-sm text-gray-500">Timeline: {service.timeline}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Service Description</h3>
                      <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
                    </div>

                    {/* Target Countries */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Target Countries</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.targetCountries.map((country) => (
                          <span key={country} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Eligibility Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Requirements</h3>
                      <ul className="space-y-2">
                        {service.eligibility.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.includes.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Services */}
                    {service.additionalServices && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Optional Add-ons</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="space-y-3">
                            {service.additionalServices.map((addon, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-gray-700">{addon.name}</span>
                                <span className="font-semibold text-gray-900">+${addon.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'process' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step Process</h3>
                    <div className="space-y-4">
                      {service.processSteps.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                      {service.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Service Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-green-600">{service.successRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline</span>
                  <span className="font-medium text-gray-900">{service.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing</span>
                  <span className="font-medium text-gray-900 text-sm">{service.processingTime}</span>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <div className="space-y-3">
                <Link href={`/apply/${service.id}`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Start Application
                  </button>
                </Link>
                <Link href="/consultation">
                  <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
                    Book Consultation
                  </button>
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Have questions? Our experts are here to help.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@elabsolutions.com</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>24/7 WhatsApp Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}