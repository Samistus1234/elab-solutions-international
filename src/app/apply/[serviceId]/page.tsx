'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, CheckCircle, Upload, Calendar, CreditCard,
  User, Mail, Phone, Globe, FileText, Briefcase,
  GraduationCap, Clock, DollarSign, AlertCircle, Save
} from 'lucide-react';

const servicesData = {
  dataflow: {
    id: 'dataflow',
    title: 'DataFlow Primary Source Verification',
    price: 1299,
    timeline: '25-30 days',
    requiredDocuments: [
      'Nursing degree certificate (original or certified copy)',
      'Official transcripts from nursing school',
      'Current nursing license from home country',
      'Good standing certificate from licensing board',
      'Experience certificates from all employers',
      'Passport copy (bio-data page)',
      'Recent passport-sized photographs'
    ]
  },
  nclex: {
    id: 'nclex',
    title: 'NCLEX-RN Preparation & Registration',
    price: 899,
    timeline: '3-6 months',
    requiredDocuments: [
      'Nursing degree certificate and transcripts',
      'CGFNS or credential evaluation report',
      'English proficiency test scores (IELTS/TOEFL)',
      'Passport copy',
      'State board application (we assist with this)',
      'Background check documentation'
    ]
  },
  'uk-nmc': {
    id: 'uk-nmc',
    title: 'UK NMC Registration Package',
    price: 1199,
    timeline: '6-12 months',
    requiredDocuments: [
      'Nursing qualification certificates',
      'Official transcripts and syllabi',
      'IELTS Academic 7.0 results (or equivalent)',
      'Evidence of nursing practice (experience letters)',
      'Good health and character references',
      'Passport copy',
      'Passport-sized photographs'
    ]
  },
  australia: {
    id: 'australia',
    title: 'Australia AHPRA Registration',
    price: 1099,
    timeline: '4-8 months',
    requiredDocuments: [
      'Nursing qualification certificates',
      'Official transcripts from educational institutions',
      'English language test results (IELTS/PTE/OET)',
      'Evidence of nursing practice',
      'Identity documents (passport copy)',
      'Police clearances from all countries lived in',
      'Health assessments'
    ]
  },
  consultation: {
    id: 'consultation',
    title: 'Professional Consultation Services',
    price: 149,
    timeline: 'Same day',
    requiredDocuments: [
      'Current CV/Resume',
      'Educational certificates (scanned copies)',
      'Current professional license (if applicable)',
      'List of target countries/goals',
      'Any previous applications or assessments'
    ]
  }
};

interface ApplicationPageProps {
  params: { serviceId: string };
}

export default function ApplicationPage({ params }: ApplicationPageProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationRef, setApplicationRef] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    dateOfBirth: '',
    
    // Professional Information
    nursingDegree: '',
    graduationYear: '',
    currentLicense: '',
    licenseNumber: '',
    yearsExperience: '',
    currentEmployer: '',
    specialization: '',
    
    // Target Information
    targetCountry: '',
    preferredTimeline: '',
    additionalServices: [],
    
    // Documents
    uploadedDocuments: [],
    
    // Payment
    paymentMethod: '',
    agreeToTerms: false
  });

  const service = servicesData[params.serviceId as keyof typeof servicesData];

  // Generate application reference number
  const generateApplicationRef = () => {
    const prefix = service.id.toUpperCase().substring(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(`application-${params.serviceId}`);
    const savedStep = localStorage.getItem(`application-step-${params.serviceId}`);
    const savedRef = localStorage.getItem(`application-ref-${params.serviceId}`);
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setLastSaved(new Date(localStorage.getItem(`application-saved-${params.serviceId}`) || Date.now()));
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
    
    if (savedRef) {
      setApplicationRef(savedRef);
    } else {
      const newRef = generateApplicationRef();
      setApplicationRef(newRef);
      localStorage.setItem(`application-ref-${params.serviceId}`, newRef);
    }
  }, [params.serviceId]);

  // Auto-save functionality
  const saveApplication = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem(`application-${params.serviceId}`, JSON.stringify(formData));
      localStorage.setItem(`application-step-${params.serviceId}`, currentStep.toString());
      localStorage.setItem(`application-saved-${params.serviceId}`, new Date().toISOString());
      setLastSaved(new Date());
      
      // Here you would also save to your backend/database
      // await saveToDatabase(applicationRef, formData);
      
    } catch (error) {
      console.error('Failed to save application:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save when form data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.firstName || formData.lastName || formData.email) {
        saveApplication();
      }
    }, 2000); // Save after 2 seconds of inactivity
    
    return () => clearTimeout(timer);
  }, [formData]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const totalSteps = 4;
  const stepTitles = {
    1: 'Personal Information',
    2: 'Professional Background',
    3: 'Document Upload',
    4: 'Review & Payment'
  };

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

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) return;
    
    setIsLoading(true);
    try {
      // Save final application data
      await saveApplication();
      
      // Here you would submit to your backend API
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, applicationRef, serviceId: params.serviceId })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to confirmation page
      router.push(`/application-submitted?ref=${applicationRef}&service=${params.serviceId}`);
      
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href={`/services/${service.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Service Details
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Apply for {service.title}</h1>
            <p className="text-gray-600">Complete your application to get started</p>
            {applicationRef && (
              <div className="mt-2">
                <span className="text-sm font-medium text-blue-600">Application Reference: {applicationRef}</span>
                {lastSaved && (
                  <span className="ml-4 text-xs text-gray-500">
                    {isSaving ? (
                      <span className="flex items-center">
                        <Save className="h-3 w-3 mr-1 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      `Last saved: ${lastSaved.toLocaleTimeString()}`
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={saveApplication}
            disabled={isSaving}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Save className="h-4 w-4 inline mr-2" />
            {isSaving ? 'Saving...' : 'Save Progress'}
          </button>
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
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Last Name *
                    </label>
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
                      Country of Residence *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your country</option>
                      <option value="india">India</option>
                      <option value="philippines">Philippines</option>
                      <option value="bangladesh">Bangladesh</option>
                      <option value="pakistan">Pakistan</option>
                      <option value="sri-lanka">Sri Lanka</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <GraduationCap className="h-4 w-4 inline mr-2" />
                      Nursing Degree *
                    </label>
                    <select
                      value={formData.nursingDegree}
                      onChange={(e) => handleInputChange('nursingDegree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your degree</option>
                      <option value="bsc-nursing">BSc Nursing</option>
                      <option value="diploma-nursing">Diploma in Nursing</option>
                      <option value="msn">Master of Science in Nursing (MSN)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                    <input
                      type="number"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2020"
                      min="1980"
                      max="2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="h-4 w-4 inline mr-2" />
                      Current License Status *
                    </label>
                    <select
                      value={formData.currentLicense}
                      onChange={(e) => handleInputChange('currentLicense', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select license status</option>
                      <option value="active">Active/Valid License</option>
                      <option value="expired">Expired License</option>
                      <option value="pending">Application Pending</option>
                      <option value="none">No License Yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Number (if applicable)</label>
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
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select experience</option>
                      <option value="fresh">Fresh Graduate (0 years)</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., ICU, OR, Emergency, etc."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Required Documents</h3>
                      <p className="text-sm text-blue-700 mb-2">
                        Please prepare the following documents. You can upload them now or email them to us later.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {service.requiredDocuments.map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                          <Upload className="h-4 w-4 inline mr-2" />
                          Upload
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Alternative Upload Methods</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Can't upload now? No problem! You can also email your documents to:
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-blue-600 font-medium">documents@elabsolutions.com</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Include your application reference number in the email subject
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Payment */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Application Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Application Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <span className="ml-2 font-medium">{service.title}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Timeline:</span>
                      <span className="ml-2 font-medium">{service.timeline}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Applicant:</span>
                      <span className="ml-2 font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{formData.email}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    <DollarSign className="h-5 w-5 inline mr-2" />
                    Payment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{service.title}</span>
                      <span className="font-semibold">${service.price}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount</span>
                        <span>${service.price} USD</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="payment" value="full" className="mr-3" />
                      <div>
                        <div className="font-medium">Pay Full Amount</div>
                        <div className="text-sm text-gray-600">${service.price} USD - Complete payment now</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="payment" value="partial" className="mr-3" />
                      <div>
                        <div className="font-medium">Split Payment (50/50)</div>
                        <div className="text-sm text-gray-600">${service.price / 2} now, ${service.price / 2} upon completion</div>
                      </div>
                    </label>
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
                      I understand that a 50% refund is available if the application cannot be completed successfully.
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms || isLoading}
                  className={`px-8 py-2 rounded-lg font-medium transition-colors ${
                    formData.agreeToTerms && !isLoading
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="h-4 w-4 inline mr-2" />
                  {isLoading ? 'Submitting...' : 'Submit & Pay'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}