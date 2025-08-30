'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Calendar, Clock, MapPin, User, Mail, Phone, 
  Globe, CreditCard, CheckCircle, AlertCircle, Award,
  FileText, Upload, Shield, DollarSign
} from 'lucide-react';

const examOptions = {
  'dha-uae': { name: 'DHA Dubai', platform: 'Prometric', fee: 300, bookingFee: 75, country: 'UAE' },
  'doh-uae': { name: 'DOH/HAAD Abu Dhabi', platform: 'Prometric', fee: 300, bookingFee: 75, country: 'UAE' },
  'moh-uae': { name: 'MOH UAE Federal', platform: 'Prometric', fee: 300, bookingFee: 75, country: 'UAE' },
  'scfhs-saudi': { name: 'SCFHS Saudi', platform: 'Prometric', fee: 400, bookingFee: 85, country: 'Saudi Arabia' },
  'qchp-qatar': { name: 'QCHP Qatar', platform: 'Prometric', fee: 350, bookingFee: 80, country: 'Qatar' },
  'omsb-oman': { name: 'OMSB Oman', platform: 'Pearson VUE', fee: 350, bookingFee: 80, country: 'Oman' },
  'nhra-bahrain': { name: 'NHRA Bahrain', platform: 'Prometric', fee: 300, bookingFee: 75, country: 'Bahrain' },
  'nclex-rn': { name: 'NCLEX-RN', platform: 'Pearson VUE', fee: 200, bookingFee: 50, country: 'USA' },
  'nclex-pn': { name: 'NCLEX-PN', platform: 'Pearson VUE', fee: 200, bookingFee: 50, country: 'USA' },
  'nmc-cbt': { name: 'NMC CBT UK', platform: 'Pearson VUE', fee: 100, bookingFee: 60, country: 'UK' },
  'nmc-osce': { name: 'NMC OSCE UK', platform: 'NMC Centers', fee: 1200, bookingFee: 150, country: 'UK' }
};

const testingCenters = {
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'],
  'Qatar': ['Doha', 'Al Rayyan'],
  'Oman': ['Muscat', 'Salalah'],
  'Bahrain': ['Manama', 'Muharraq'],
  'USA': ['New York', 'Los Angeles', 'Chicago', 'Miami', 'International Centers'],
  'UK': ['London', 'Birmingham', 'Manchester', 'Leeds', 'International Centers']
};

export default function ExamBookingFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Exam Selection
    examType: '',
    preferredDate: '',
    alternativeDate: '',
    preferredLocation: '',
    alternativeLocation: '',
    urgentBooking: false,
    
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    
    // Professional Information
    profession: '',
    licenseNumber: '',
    experience: '',
    currentEmployer: '',
    
    // Previous Attempts
    previousAttempts: '',
    lastExamDate: '',
    
    // Documents
    hasValidPassport: false,
    hasEligibilityLetter: false,
    hasGoodStanding: false,
    hasExperienceCert: false,
    
    // Additional Services
    needStudyMaterials: false,
    needPreparationCourse: false,
    needConsultation: false,
    
    // Payment
    paymentMethod: '',
    agreeToTerms: false
  });

  const totalSteps = 5;
  const stepTitles = {
    1: 'Exam Selection',
    2: 'Personal Information', 
    3: 'Professional Details',
    4: 'Required Documents',
    5: 'Review & Payment'
  };

  const selectedExam = examOptions[formData.examType as keyof typeof examOptions];
  const totalCost = selectedExam ? selectedExam.fee + selectedExam.bookingFee : 0;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/academy/exam-booking" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exam Booking
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Professional Exam Booking</h1>
            <p className="text-gray-600">Secure your exam slot with guaranteed booking service</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < totalSteps && (
                    <div className={`h-1 w-12 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Step {currentStep}: {stepTitles[currentStep as keyof typeof stepTitles]}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            
            {/* Step 1: Exam Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Award className="h-4 w-4 inline mr-2" />
                    Select Your Examination *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(examOptions).map(([key, exam]) => (
                      <label
                        key={key}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.examType === key
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="examType"
                          value={key}
                          checked={formData.examType === key}
                          onChange={(e) => handleInputChange('examType', e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exam.name}</h3>
                            <p className="text-sm text-gray-600">{exam.platform} • {exam.country}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">${exam.fee + exam.bookingFee}</div>
                            <div className="text-xs text-gray-500">Total Cost</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedExam && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Selected Exam Details</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Exam Fee:</span>
                        <span className="ml-2 font-medium">${selectedExam.fee}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">Booking Service Fee:</span>
                        <span className="ml-2 font-medium">${selectedExam.bookingFee}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">Platform:</span>
                        <span className="ml-2 font-medium">{selectedExam.platform}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">Total Cost:</span>
                        <span className="ml-2 font-bold text-lg">${totalCost}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Preferred Exam Date *
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Date</label>
                    <input
                      type="date"
                      value={formData.alternativeDate}
                      onChange={(e) => handleInputChange('alternativeDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Preferred Test Location *
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select location</option>
                      {selectedExam && testingCenters[selectedExam.country as keyof typeof testingCenters]?.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Location</label>
                    <select
                      value={formData.alternativeLocation}
                      onChange={(e) => handleInputChange('alternativeLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select alternative</option>
                      {selectedExam && testingCenters[selectedExam.country as keyof typeof testingCenters]?.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="urgentBooking"
                    checked={formData.urgentBooking}
                    onChange={(e) => handleInputChange('urgentBooking', e.target.checked)}
                    className="h-4 w-4 text-blue-600 mr-3"
                  />
                  <label htmlFor="urgentBooking" className="text-sm text-gray-700">
                    Urgent booking required (within 7 days) - Additional $50 fee
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="h-4 w-4 inline mr-2" />
                      Nationality *
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select nationality</option>
                      <option value="indian">Indian</option>
                      <option value="filipino">Filipino</option>
                      <option value="bangladeshi">Bangladeshi</option>
                      <option value="pakistani">Pakistani</option>
                      <option value="sri-lankan">Sri Lankan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
                    <input
                      type="text"
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter passport number"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Professional Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Award className="h-4 w-4 inline mr-2" />
                      Profession *
                    </label>
                    <select
                      value={formData.profession}
                      onChange={(e) => handleInputChange('profession', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select profession</option>
                      <option value="registered-nurse">Registered Nurse (RN)</option>
                      <option value="practical-nurse">Licensed Practical Nurse (LPN)</option>
                      <option value="general-physician">General Physician</option>
                      <option value="specialist-doctor">Specialist Doctor</option>
                      <option value="dentist">Dentist</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="physiotherapist">Physiotherapist</option>
                      <option value="other">Other Healthcare Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current License Number</label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your license number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4 inline mr-2" />
                      Years of Experience *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select experience</option>
                      <option value="fresh">Fresh Graduate (0 years)</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Employer</label>
                    <input
                      type="text"
                      value={formData.currentEmployer}
                      onChange={(e) => handleInputChange('currentEmployer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hospital/Clinic name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Exam Attempts</label>
                    <select
                      value={formData.previousAttempts}
                      onChange={(e) => handleInputChange('previousAttempts', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select attempts</option>
                      <option value="0">First time taking this exam</option>
                      <option value="1">1 previous attempt</option>
                      <option value="2">2 previous attempts</option>
                      <option value="3+">3 or more attempts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Exam Date (if applicable)</label>
                    <input
                      type="date"
                      value={formData.lastExamDate}
                      onChange={(e) => handleInputChange('lastExamDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Required Documents */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Document Requirements</h3>
                      <p className="text-sm text-yellow-800">
                        Please confirm you have the following required documents ready for submission.
                        We will guide you through the upload process after payment confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.hasValidPassport}
                      onChange={(e) => handleInputChange('hasValidPassport', e.target.checked)}
                      className="h-4 w-4 text-blue-600 mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Valid Passport</div>
                      <div className="text-sm text-gray-600">Passport valid for at least 6 months</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.hasEligibilityLetter}
                      onChange={(e) => handleInputChange('hasEligibilityLetter', e.target.checked)}
                      className="h-4 w-4 text-blue-600 mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Eligibility Letter/Authorization</div>
                      <div className="text-sm text-gray-600">Official eligibility confirmation from licensing board</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.hasGoodStanding}
                      onChange={(e) => handleInputChange('hasGoodStanding', e.target.checked)}
                      className="h-4 w-4 text-blue-600 mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Good Standing Certificate</div>
                      <div className="text-sm text-gray-600">Certificate from current licensing authority</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.hasExperienceCert}
                      onChange={(e) => handleInputChange('hasExperienceCert', e.target.checked)}
                      className="h-4 w-4 text-blue-600 mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Experience Certificate</div>
                      <div className="text-sm text-gray-600">Proof of clinical/professional experience</div>
                    </div>
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Additional Services (Optional)</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.needStudyMaterials}
                        onChange={(e) => handleInputChange('needStudyMaterials', e.target.checked)}
                        className="h-4 w-4 text-blue-600 mr-3"
                      />
                      <span className="text-sm text-blue-800">Study materials and practice tests (+$99)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.needPreparationCourse}
                        onChange={(e) => handleInputChange('needPreparationCourse', e.target.checked)}
                        className="h-4 w-4 text-blue-600 mr-3"
                      />
                      <span className="text-sm text-blue-800">Exam preparation course (+$299)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.needConsultation}
                        onChange={(e) => handleInputChange('needConsultation', e.target.checked)}
                        className="h-4 w-4 text-blue-600 mr-3"
                      />
                      <span className="text-sm text-blue-800">Pre-exam consultation (+$149)</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Payment */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Exam:</span>
                      <span className="ml-2 font-medium">{selectedExam?.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Platform:</span>
                      <span className="ml-2 font-medium">{selectedExam?.platform}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Preferred Date:</span>
                      <span className="ml-2 font-medium">{formData.preferredDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 font-medium">{formData.preferredLocation}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Candidate:</span>
                      <span className="ml-2 font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Contact:</span>
                      <span className="ml-2 font-medium">{formData.email}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    <DollarSign className="h-5 w-5 inline mr-2" />
                    Cost Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Exam Fee ({selectedExam?.platform})</span>
                      <span className="font-medium">${selectedExam?.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">eLab Booking Service Fee</span>
                      <span className="font-medium">${selectedExam?.bookingFee}</span>
                    </div>
                    {formData.urgentBooking && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Urgent Booking Fee</span>
                        <span className="font-medium">$50</span>
                      </div>
                    )}
                    {formData.needStudyMaterials && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Study Materials</span>
                        <span className="font-medium">$99</span>
                      </div>
                    )}
                    {formData.needPreparationCourse && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Preparation Course</span>
                        <span className="font-medium">$299</span>
                      </div>
                    )}
                    {formData.needConsultation && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Pre-exam Consultation</span>
                        <span className="font-medium">$149</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span>${
                          totalCost + 
                          (formData.urgentBooking ? 50 : 0) +
                          (formData.needStudyMaterials ? 99 : 0) +
                          (formData.needPreparationCourse ? 299 : 0) +
                          (formData.needConsultation ? 149 : 0)
                        }</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Guarantee */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Our Guarantee</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• 100% booking success rate or full refund</li>
                        <li>• Exam slot confirmation within 24-48 hours</li>
                        <li>• Free rescheduling support if needed</li>
                        <li>• 24/7 customer support throughout the process</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-start">
                    <input 
                      type="checkbox" 
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="mt-1 mr-3" 
                    />
                    <div className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and 
                      <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>. 
                      I understand the exam booking process and fee structure.
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={currentStep === 1 && !formData.examType}
                  className={`px-8 py-2 rounded-lg font-medium transition-colors ${
                    (currentStep === 1 && !formData.examType)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  disabled={!formData.agreeToTerms}
                  className={`px-8 py-2 rounded-lg font-medium transition-colors ${
                    formData.agreeToTerms
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="h-4 w-4 inline mr-2" />
                  Submit & Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}