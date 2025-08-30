'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileCheck, Award, GraduationCap, Users, Clock, 
  CheckCircle, DollarSign, Globe, ArrowRight, Star
} from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  description: string;
  icon: any;
  price: {
    amount: number;
    currency: string;
    unit: string;
  };
  timeline: string;
  includes: string[];
  additionalServices?: {
    name: string;
    price: number;
  }[];
  popular?: boolean;
  successRate: string;
  processingTime: string;
}

const services: ServicePackage[] = [
  {
    id: 'dataflow',
    title: 'DataFlow Primary Source Verification',
    description: 'Complete PSV package for Gulf country licensing (UAE, Saudi, Qatar, Bahrain, Oman)',
    icon: FileCheck,
    price: {
      amount: 1299,
      currency: 'USD',
      unit: 'per application'
    },
    timeline: '3-6 weeks',
    successRate: '98%',
    processingTime: 'Standard: 25-30 days, Rush: 15-20 days',
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
    ]
  },
  {
    id: 'nclex',
    title: 'NCLEX-RN Preparation & Registration',
    description: 'Complete NCLEX preparation with registration support for US nursing practice',
    icon: GraduationCap,
    price: {
      amount: 899,
      currency: 'USD',
      unit: 'complete package'
    },
    timeline: '3-6 months',
    successRate: '94%',
    processingTime: 'Self-paced with 6 months access',
    popular: true,
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
    ]
  },
  {
    id: 'uk-nmc',
    title: 'UK NMC Registration Package',
    description: 'Complete NMC registration process for UK nursing practice including CBT and OSCE preparation',
    icon: Award,
    price: {
      amount: 1199,
      currency: 'USD',
      unit: 'complete package'
    },
    timeline: '6-12 months',
    successRate: '91%',
    processingTime: 'Varies by NMC processing times',
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
    ]
  },
  {
    id: 'australia',
    title: 'Australia AHPRA Registration',
    description: 'Complete AHPRA registration process for Australian healthcare practice',
    icon: Globe,
    price: {
      amount: 1099,
      currency: 'USD',
      unit: 'complete package'
    },
    timeline: '4-8 months',
    successRate: '93%',
    processingTime: 'Varies by AHPRA processing times',
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
    ]
  },
  {
    id: 'consultation',
    title: 'Professional Consultation Services',
    description: 'Expert guidance and personalized consultation for your healthcare career journey',
    icon: Users,
    price: {
      amount: 149,
      currency: 'USD',
      unit: 'per hour'
    },
    timeline: 'Immediate',
    successRate: '100%',
    processingTime: 'Same day booking available',
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
    ]
  }
];

export function ServicePricing() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const formatPrice = (price: any) => {
    return `$${price.amount.toLocaleString()} ${price.unit}`;
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Healthcare Credentialing Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, competitive pricing for professional healthcare credentialing services. 
            Pay per application with no hidden fees or monthly subscriptions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                service.popular ? 'ring-4 ring-blue-500/20 scale-105' : ''
              }`}
            >
              {service.popular && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular Choice
                </div>
              )}

              <div className="p-8">
                {/* Service Header */}
                <div className="text-center mb-8">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(service.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Processing time: {service.processingTime}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {service.successRate}
                    </div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-blue-600 mb-1">
                      {service.timeline}
                    </div>
                    <div className="text-xs text-gray-600">Timeline</div>
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Package Includes:</h4>
                  <ul className="space-y-2">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Services */}
                {service.additionalServices && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Optional Add-ons:</h4>
                    <div className="space-y-2">
                      {service.additionalServices.map((addon, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{addon.name}</span>
                          <span className="font-semibold text-gray-900">+${addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="space-y-3">
                  <Link href={`/apply/${service.id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                      Start Application
                    </button>
                  </Link>
                  <Link href={`/services/${service.id}`}>
                    <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment & Guarantee Information</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Transparent Pricing</h4>
              <p className="text-sm text-gray-600">
                Pay per application only. No monthly fees, no hidden charges, no surprises.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Success Guarantee</h4>
              <p className="text-sm text-gray-600">
                If we can't complete your application successfully, you get a full refund.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Flexible Payments</h4>
              <p className="text-sm text-gray-600">
                Pay 50% upfront, 50% upon completion. Payment plans available for packages over $1000.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}