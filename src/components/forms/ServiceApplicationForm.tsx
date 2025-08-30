'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  FileText, Upload, CheckCircle, ArrowRight, ArrowLeft,
  Globe, Calendar, Target
} from 'lucide-react';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  
  // Professional Information
  profession: string;
  specialty: string;
  experience: string;
  currentEmployer: string;
  
  // Service Information
  serviceType: string;
  targetCountry: string;
  timeline: string;
  
  // Additional Information
  hasPassport: boolean;
  englishTest: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  profession: '',
  specialty: '',
  experience: '',
  currentEmployer: '',
  serviceType: '',
  targetCountry: '',
  timeline: '',
  hasPassport: false,
  englishTest: '',
  additionalNotes: ''
};

const steps = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Basic personal details',
    icon: User
  },
  {
    id: 2,
    title: 'Professional Background',
    description: 'Your healthcare experience',
    icon: Briefcase
  },
  {
    id: 3,
    title: 'Service Requirements',
    description: 'What you need help with',
    icon: Target
  },
  {
    id: 4,
    title: 'Review & Submit',
    description: 'Confirm your information',
    icon: CheckCircle
  }
];

const professions = [
  'Registered Nurse', 'Licensed Practical Nurse', 'Physician', 'Surgeon', 
  'Pharmacist', 'Physical Therapist', 'Medical Technologist', 'Radiologic Technologist',
  'Respiratory Therapist', 'Occupational Therapist', 'Other'
];

const countries = [
  'United States', 'United Kingdom', 'Australia', 'Canada', 'New Zealand',
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Oman', 'Kuwait'
];

const serviceTypes = [
  'DataFlow Verification', 'NCLEX Preparation', 'NMC UK Registration', 
  'Middle East Licensing', 'Credential Evaluation', 'English Language Training',
  'Global Job Placement', 'Multiple Services'
];

interface ServiceApplicationFormProps {
  onSubmit?: (data: FormData) => void;
  defaultService?: string;
}

export function ServiceApplicationForm({ onSubmit, defaultService }: ServiceApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    serviceType: defaultService || ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.country;
      case 2:
        return formData.profession && formData.experience;
      case 3:
        return formData.serviceType && formData.targetCountry && formData.timeline;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-2xl mx-auto"
      >
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in our services. Our expert consultants will review your application and contact you within 24 hours.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>What's Next?</strong><br/>
            • You'll receive a confirmation email shortly<br/>
            • Our consultant will call you for a free assessment<br/>
            • We'll provide a personalized service plan<br/>
            • Begin your healthcare career journey!
          </p>
        </div>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setFormData(initialFormData);
          }}
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Submit Another Application
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3 hidden md:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-4 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your current country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Professional Background */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Background</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession *</label>
                  <select
                    value={formData.profession}
                    onChange={(e) => updateFormData('profession', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your profession</option>
                    {professions.map(profession => (
                      <option key={profession} value={profession}>{profession}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => updateFormData('specialty', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ICU, Emergency, Pediatrics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => updateFormData('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Employer</label>
                  <input
                    type="text"
                    value={formData.currentEmployer}
                    onChange={(e) => updateFormData('currentEmployer', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hospital/Clinic name"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Service Requirements */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Service Requirements</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => updateFormData('serviceType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select service type</option>
                    {serviceTypes.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Country *</label>
                    <select
                      value={formData.targetCountry}
                      onChange={(e) => updateFormData('targetCountry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select target country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => updateFormData('timeline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                      <option value="1year">Within 1 year</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasPassport}
                      onChange={(e) => updateFormData('hasPassport', e.target.checked)}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">I have a valid passport</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">English Language Test</label>
                  <select
                    value={formData.englishTest}
                    onChange={(e) => updateFormData('englishTest', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select if you have taken any English test</option>
                    <option value="IELTS">IELTS</option>
                    <option value="OET">OET</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="PTE">PTE</option>
                    <option value="None">None taken yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific questions or requirements you'd like to discuss..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Review Your Information</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Personal Information</h4>
                  <p className="text-sm text-gray-600">
                    {formData.firstName} {formData.lastName} • {formData.email} • {formData.phone} • {formData.country}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Professional Background</h4>
                  <p className="text-sm text-gray-600">
                    {formData.profession} {formData.specialty && `(${formData.specialty})`} • {formData.experience} years experience
                    {formData.currentEmployer && ` • Currently at ${formData.currentEmployer}`}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Service Requirements</h4>
                  <p className="text-sm text-gray-600">
                    {formData.serviceType} • Target: {formData.targetCountry} • Timeline: {formData.timeline}
                    {formData.englishTest && ` • English Test: ${formData.englishTest}`}
                  </p>
                </div>
                {formData.additionalNotes && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Additional Notes</h4>
                    <p className="text-sm text-gray-600">{formData.additionalNotes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}