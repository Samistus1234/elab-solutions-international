'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircle, ArrowLeft, Mail, Lock, User, Building, 
  Phone, MapPin, CreditCard, Shield, Star, Users
} from 'lucide-react';

const partnerTiers = {
  individual: {
    name: 'Individual Recruiter',
    price: 'Free',
    description: 'Perfect for individual recruiters managing their own client portfolio',
    color: 'green',
    features: [
      'Manage up to 50 clients',
      'Basic progress tracking',
      'Standard reporting',
      'Email support',
      'Mobile app access',
      '10% commission rate'
    ]
  },
  consultant: {
    name: 'Consultant Level',
    price: '$99/month',
    description: 'Ideal for consultants managing multiple recruiters and larger client bases',
    color: 'blue',
    popular: true,
    features: [
      'Manage unlimited clients',
      'Team management tools',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      '12% commission rate',
      'Bulk operations',
      'Advanced reporting'
    ]
  },
  specialist: {
    name: 'Specialist Partner',
    price: '$299/month',
    description: 'Enterprise solution for specialist partners with territory management',
    color: 'purple',
    features: [
      'Everything in Consultant',
      'Territory management',
      'Multi-region operations',
      'White-label solution',
      'API access',
      '15% commission rate',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced fraud protection'
    ]
  }
};

function SignupContent() {
  const searchParams = useSearchParams();
  const tierParam = searchParams?.get('tier');
  const [selectedTier, setSelectedTier] = useState(tierParam || 'consultant');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Company Information
    company: '',
    position: '',
    experience: '',
    
    // Business Information
    currentClients: '',
    targetRegion: '',
    specialization: '',
    
    // Account Security
    password: '',
    confirmPassword: ''
  });

  const selectedTierData = partnerTiers[selectedTier as keyof typeof partnerTiers];

  const getTierColor = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit to your API
    console.log('Form submitted:', { ...formData, tier: selectedTier });
    
    // For demo purposes, redirect to dashboard
    window.location.href = '/centralops/dashboard';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Healthcare Recruiters Inc."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Position</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="senior-recruiter">Senior Recruiter</option>
                      <option value="recruitment-manager">Recruitment Manager</option>
                      <option value="consultant">Consultant</option>
                      <option value="director">Director</option>
                      <option value="owner">Business Owner</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Client Base Size</label>
                    <select
                      name="currentClients"
                      value={formData.currentClients}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Range</option>
                      <option value="0-10">0-10 clients</option>
                      <option value="11-50">11-50 clients</option>
                      <option value="51-100">51-100 clients</option>
                      <option value="101-500">101-500 clients</option>
                      <option value="500+">500+ clients</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Region</label>
                    <select
                      name="targetRegion"
                      value={formData.targetRegion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="north-america">North America</option>
                      <option value="middle-east">Middle East</option>
                      <option value="europe">Europe</option>
                      <option value="asia-pacific">Asia Pacific</option>
                      <option value="africa">Africa</option>
                      <option value="global">Global</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Specialization</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Specialization</option>
                    <option value="nursing">Nursing</option>
                    <option value="physicians">Physicians</option>
                    <option value="allied-health">Allied Health</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="dentistry">Dentistry</option>
                    <option value="all-healthcare">All Healthcare Professions</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a strong password"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters with numbers and symbols</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Terms & Privacy</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <label className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" required />
                      <span>I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></span>
                    </label>
                    <label className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span>I would like to receive marketing communications and updates about new features</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal Info',
    'Company Details',
    'Business Info',
    'Account Setup'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/centralops" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CentralOps
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join CentralOps Partner Network
          </h1>
          <p className="text-xl text-gray-600">
            Start your journey as a healthcare recruitment partner
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Plan Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Plan</h3>
              
              {/* Tier Selection */}
              <div className="space-y-3 mb-6">
                {Object.entries(partnerTiers).map(([key, tier]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTier(key)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedTier === key 
                        ? `${getTierColor(tier.color).border} ${getTierColor(tier.color).bg}` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{tier.name}</div>
                        <div className="text-sm text-gray-500">{tier.price}</div>
                      </div>
                      {tier.popular && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Tier Details */}
              <div className={`${getTierColor(selectedTierData.color).bg} rounded-lg p-4`}>
                <h4 className="font-semibold text-gray-900 mb-2">{selectedTierData.name}</h4>
                <p className="text-2xl font-bold text-gray-900 mb-2">{selectedTierData.price}</p>
                <p className="text-sm text-gray-600 mb-4">{selectedTierData.description}</p>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">Key Features:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedTierData.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {stepTitles.map((title, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    
                    return (
                      <div key={title} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : isActive 
                              ? 'border-blue-500 text-blue-500 bg-blue-50' 
                              : 'border-gray-300 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <span className="font-semibold">{stepNumber}</span>
                          )}
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {title}
                        </span>
                        
                        {index < stepTitles.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-4 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentStep === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep === 4 ? (
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Create Account
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help with your application? Our support team is here to assist you.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>support@elabsolutions.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>24/7 Live Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CentralOpsSignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading signup form...</p>
        </div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}