'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar, Clock, Users, Video, MapPin, 
  CheckCircle, ArrowLeft, Star, Globe, Award 
} from 'lucide-react';

export default function ConsultationPage() {
  const [selectedService, setSelectedService] = useState('general');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState('video');

  const consultationTypes = [
    {
      id: 'general',
      title: 'General Career Consultation',
      duration: '60 minutes',
      price: 149,
      description: 'Comprehensive career pathway discussion and personalized recommendations',
      popular: true
    },
    {
      id: 'dataflow',
      title: 'DataFlow PSV Consultation',
      duration: '45 minutes',
      price: 99,
      description: 'Specialized guidance for Gulf country licensing and PSV requirements'
    },
    {
      id: 'nclex',
      title: 'NCLEX Preparation Strategy',
      duration: '60 minutes',
      price: 129,
      description: 'Study plan development and NCLEX success strategies'
    },
    {
      id: 'uk-nmc',
      title: 'UK NMC Registration Guidance',
      duration: '45 minutes',
      price: 119,
      description: 'Complete NMC process walkthrough and timeline planning'
    }
  ];

  const timeSlots = [
    { day: 'Monday', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
    { day: 'Tuesday', slots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
    { day: 'Wednesday', slots: ['09:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'] },
    { day: 'Thursday', slots: ['10:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'] },
    { day: 'Friday', slots: ['09:00 AM', '01:00 PM', '02:00 PM', '04:00 PM'] }
  ];

  const consultants = [
    {
      name: 'Dr. Sarah Ahmed',
      title: 'Senior Healthcare Career Consultant',
      experience: '12+ years',
      specialties: ['Gulf Countries', 'DataFlow PSV', 'License Verification'],
      rating: 4.9,
      consultations: '500+'
    },
    {
      name: 'Maria Rodriguez',
      title: 'NCLEX Success Coach',
      experience: '8+ years',
      specialties: ['NCLEX Preparation', 'US Nursing', 'Study Strategies'],
      rating: 4.8,
      consultations: '350+'
    },
    {
      name: 'James Wilson',
      title: 'UK/EU Registration Specialist',
      experience: '10+ years',
      specialties: ['NMC Registration', 'IELTS/OET', 'UK Job Market'],
      rating: 4.9,
      consultations: '400+'
    }
  ];

  const selectedConsultation = consultationTypes.find(type => type.id === selectedService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Get Started
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Schedule Your Consultation</h1>
              <p className="text-gray-600">Get expert guidance tailored to your healthcare career goals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Your Consultation Type</h2>
              <div className="grid gap-4">
                {consultationTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedService(type.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedService === type.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{type.title}</h3>
                          {type.popular && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {type.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${type.price}</div>
                        <div className="text-sm text-gray-500">USD</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Consultation Method</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  onClick={() => setConsultationType('video')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    consultationType === 'video' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Video className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Video Call</h3>
                  <p className="text-sm text-gray-600">Face-to-face consultation via Zoom or Teams</p>
                </div>
                <div
                  onClick={() => setConsultationType('phone')}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    consultationType === 'phone' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Users className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Phone Call</h3>
                  <p className="text-sm text-gray-600">Voice consultation via phone or WhatsApp</p>
                </div>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Preferred Time</h2>
              <div className="space-y-4">
                {timeSlots.map((day) => (
                  <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{day.day}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {day.slots.map((slot) => (
                        <button
                          key={`${day.day}-${slot}`}
                          onClick={() => setSelectedTimeSlot(`${day.day} ${slot}`)}
                          className={`p-2 text-sm rounded-lg border transition-all ${
                            selectedTimeSlot === `${day.day} ${slot}`
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select your time zone</option>
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="CST">CST (Central Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="GMT">GMT (Greenwich Mean Time)</option>
                    <option value="CET">CET (Central European Time)</option>
                    <option value="GST">GST (Gulf Standard Time)</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your goals (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your current situation and what you hope to achieve..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>

            {/* Booking Summary */}
            {selectedConsultation && selectedTimeSlot && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{selectedConsultation.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{selectedConsultation.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-medium capitalize">{consultationType}</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${selectedConsultation.price} USD</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors mt-4">
                  Confirm & Pay Now
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Meet Our Consultants */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Meet Our Expert Consultants</h3>
              <div className="space-y-4">
                {consultants.map((consultant, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{consultant.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{consultant.title}</p>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          {consultant.rating} • {consultant.consultations} consultations
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {consultant.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What to Expect</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Personalized Assessment</h4>
                    <p className="text-sm text-gray-600">Detailed review of your background and goals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Custom Roadmap</h4>
                    <p className="text-sm text-gray-600">Step-by-step plan with timelines and costs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Resource Sharing</h4>
                    <p className="text-sm text-gray-600">Relevant documents and preparation materials</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Follow-up Support</h4>
                    <p className="text-sm text-gray-600">Email summary and next steps guidance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Have Questions?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Not sure which consultation type is right for you?
              </p>
              <div className="space-y-2 text-sm">
                <a href="mailto:consultations@elabsolutions.com" className="block hover:text-blue-200">
                  📧 consultations@elabsolutions.com
                </a>
                <a href="https://wa.me/1234567890" className="block hover:text-blue-200">
                  📱 WhatsApp: +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}