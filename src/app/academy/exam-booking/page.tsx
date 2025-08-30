'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar, Clock, MapPin, Users, CheckCircle, Star, 
  Globe, Shield, CreditCard, Phone, Mail, AlertCircle,
  Search, Filter, ArrowRight, Award, BookOpen, FileText
} from 'lucide-react';

// Exam categories and services based on research
const examCategories = {
  'gulf-licensing': {
    title: 'Gulf Countries Medical Licensing',
    description: 'Professional licensing exams for UAE, Saudi Arabia, Qatar, Oman, and Bahrain',
    exams: [
      {
        id: 'dha-uae',
        name: 'DHA (Dubai Health Authority)',
        country: 'UAE - Dubai',
        platform: 'Prometric',
        duration: '170 minutes',
        questions: '150 MCQs',
        fee: '$300',
        bookingFee: '$75',
        description: 'Medical licensing exam for Dubai healthcare professionals',
        eligibility: ['Medical degree', 'Good standing certificate', 'Experience certificate'],
        nextDates: ['2025-09-05', '2025-09-12', '2025-09-19', '2025-09-26'],
        locations: ['Dubai', 'Abu Dhabi', 'Sharjah', 'International Centers']
      },
      {
        id: 'doh-uae',
        name: 'DOH/HAAD (Department of Health)',
        country: 'UAE - Abu Dhabi',
        platform: 'Prometric',
        duration: '180 minutes',
        questions: '150 MCQs',
        fee: '$300',
        bookingFee: '$75',
        description: 'Medical licensing exam for Abu Dhabi healthcare professionals',
        eligibility: ['Medical degree', 'Good standing certificate', 'Experience certificate'],
        nextDates: ['2025-09-03', '2025-09-10', '2025-09-17', '2025-09-24'],
        locations: ['Abu Dhabi', 'Dubai', 'Al Ain', 'International Centers']
      },
      {
        id: 'scfhs-saudi',
        name: 'SCFHS (Saudi Commission for Health Specialties)',
        country: 'Saudi Arabia',
        platform: 'Prometric',
        duration: '180 minutes',
        questions: '100 MCQs',
        fee: '$400',
        bookingFee: '$85',
        description: 'Saudi medical classification and licensing exam',
        eligibility: ['Medical degree', 'Saudi medical license application', 'Good standing'],
        nextDates: ['2025-09-08', '2025-09-15', '2025-09-22', '2025-09-29'],
        locations: ['Riyadh', 'Jeddah', 'Dammam', 'International Centers']
      }
    ]
  },
  'us-licensing': {
    title: 'US Healthcare Licensing',
    description: 'NCLEX and other US healthcare professional licensing examinations',
    exams: [
      {
        id: 'nclex-rn',
        name: 'NCLEX-RN (Registered Nurse)',
        country: 'United States',
        platform: 'Pearson VUE',
        duration: 'Up to 5 hours',
        questions: '75-265 questions (adaptive)',
        fee: '$200',
        bookingFee: '$50',
        description: 'US registered nurse licensing examination',
        eligibility: ['Nursing degree', 'State board eligibility', 'English proficiency'],
        nextDates: ['2025-09-02', '2025-09-09', '2025-09-16', '2025-09-23'],
        locations: ['US Test Centers', 'International Centers']
      }
    ]
  },
  'uk-licensing': {
    title: 'UK Healthcare Licensing',
    description: 'NMC and other UK healthcare professional examinations',
    exams: [
      {
        id: 'nmc-cbt',
        name: 'NMC CBT (Computer Based Test)',
        country: 'United Kingdom',
        platform: 'Pearson VUE',
        duration: '150 minutes',
        questions: '120 MCQs',
        fee: '£83',
        bookingFee: '$60',
        description: 'UK nursing knowledge and competency test',
        eligibility: ['Nursing degree', 'NMC application', 'IELTS 7.0 overall'],
        nextDates: ['2025-09-05', '2025-09-12', '2025-09-19', '2025-09-26'],
        locations: ['UK Test Centers', 'International Centers']
      }
    ]
  }
};

const bookingServices = [
  {
    icon: Calendar,
    title: 'Exam Scheduling',
    description: 'We handle the entire booking process from account creation to securing your preferred exam date and location.'
  },
  {
    icon: Globe,
    title: 'International Centers',
    description: 'Access to testing centers worldwide including home country options for international candidates.'
  },
  {
    icon: Shield,
    title: 'Booking Guarantee',
    description: '100% booking success rate with money-back guarantee if we cannot secure your exam slot.'
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    description: 'Quick booking confirmation within 24-48 hours. Urgent booking available for emergency cases.'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 customer support from exam booking specialists familiar with all testing platforms.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple payment options including installment plans for expensive examinations.'
  }
];

const testimonials = [
  {
    name: 'Dr. Sarah Ahmed',
    exam: 'DHA Dubai',
    country: 'UAE',
    rating: 5,
    comment: 'eLab Solutions made my DHA exam booking seamless. Got my preferred date in Dubai within 2 days!'
  },
  {
    name: 'Nurse Maria Santos',
    exam: 'NCLEX-RN',
    country: 'Philippines',
    rating: 5,
    comment: 'Excellent service! They handled everything from Pearson VUE registration to ATT processing.'
  },
  {
    name: 'Dr. Ahmed Al-Rashid',
    exam: 'SCFHS Saudi',
    country: 'Saudi Arabia',
    rating: 5,
    comment: 'Professional and efficient. Secured my SCFHS exam slot in Riyadh exactly when I needed it.'
  }
];

export default function ExamBookingPage() {
  const [selectedCategory, setSelectedCategory] = useState('gulf-licensing');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = examCategories[selectedCategory as keyof typeof examCategories];
  
  const filteredExams = currentCategory.exams.filter(exam => 
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedExamDetails = currentCategory.exams.find(exam => exam.id === selectedExam);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Professional Exam Booking Services
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Secure your medical licensing exam slots with guaranteed booking through 
              Prometric, Pearson VUE, and official testing centers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/academy/exam-booking/book">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  Book Your Exam Now
                </button>
              </Link>
              <Link href="#services">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full transition-colors text-lg">
                  View All Services
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
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Exams Booked Monthly</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Booking Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Testing Centers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* Services Overview */}
        <section id="services" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Exam Booking Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle the entire exam booking process for major medical licensing examinations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {bookingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Exam Categories */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Examinations</h2>
            <p className="text-lg text-gray-600">Choose your examination category to view available booking options</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(examCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search exams by name or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Current Category Description */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory.title}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">{currentCategory.description}</p>
          </div>

          {/* Exam Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredExams.map((exam) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {exam.country}
                      </div>
                      <div className="flex items-center text-sm text-blue-600">
                        <Award className="h-4 w-4 mr-1" />
                        {exam.platform}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{exam.fee}</div>
                      <div className="text-sm text-gray-500">Exam Fee</div>
                      <div className="text-lg font-semibold text-green-600 mt-1">+{exam.bookingFee}</div>
                      <div className="text-xs text-gray-500">Our Service Fee</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{exam.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      {exam.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      {exam.questions}
                    </div>
                  </div>

                  {/* Next Available Dates */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Next Available Dates:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {exam.nextDates.slice(0, 4).map((date) => (
                        <div key={date} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center text-sm">
                          {new Date(date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Test Locations */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Test Locations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exam.locations.map((location, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedExam(exam.id === selectedExam ? null : exam.id)}
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      {selectedExam === exam.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <Link href="/academy/exam-booking/book">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Expandable Details */}
                {selectedExam === exam.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gray-200 p-6 bg-gray-50"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">Eligibility Requirements:</h4>
                    <ul className="space-y-2 mb-6">
                      {exam.eligibility.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-900 mb-2">Booking Process:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                        <li>Submit booking request with your details</li>
                        <li>We verify your eligibility and documents</li>
                        <li>Account creation on {exam.platform}</li>
                        <li>Exam slot reservation within 24-48 hours</li>
                        <li>Payment processing and confirmation</li>
                        <li>Admission ticket and instructions delivery</li>
                      </ol>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">What our clients say about our exam booking services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="text-sm text-gray-600">{testimonial.exam} • {testimonial.country}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Exam?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of healthcare professionals who trusted us with their exam booking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/academy/exam-booking/book">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors">
                Start Booking Process
              </button>
            </Link>
            <Link href="/consultation">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full transition-colors">
                Schedule Consultation
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Need Help With Exam Booking?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Mail className="h-8 w-8 mx-auto mb-3 text-blue-400" />
              <div className="font-semibold mb-1">Email Support</div>
              <div className="text-gray-300">exams@elabsolutions.com</div>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto mb-3 text-green-400" />
              <div className="font-semibold mb-1">24/7 Hotline</div>
              <div className="text-gray-300">+1 (555) 123-EXAM</div>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-3 text-purple-400" />
              <div className="font-semibold mb-1">WhatsApp Chat</div>
              <div className="text-gray-300">+1 (555) 123-4567</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}