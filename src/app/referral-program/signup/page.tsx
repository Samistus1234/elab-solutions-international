'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle, ArrowLeft, Mail, User, Building, 
  Phone, MapPin, Award, Star, Shield, Globe,
  Users, DollarSign, Target, Zap
} from 'lucide-react';

const referralTiers = [
  {
    id: 'starter',
    name: 'Starter Referrer',
    description: 'Perfect for healthcare professionals starting their referral journey',
    color: 'green',
    benefits: [
      'Earn $25-$100 per successful referral',
      'Welcome bonus: $25 for first referral',
      'Monthly payment processing',
      'Email support',
      'Basic referral tracking'
    ]
  },
  {
    id: 'champion',
    name: 'Champion Referrer',
    description: 'Ideal for active referrers with growing networks',
    color: 'blue',
    popular: true,
    benefits: [
      'Earn $35-$150 per successful referral',
      'Quarterly bonus up to $200',
      'Bi-weekly payment processing',
      'Priority support',
      'Advanced analytics dashboard',
      'Marketing materials provided'
    ]
  },
  {
    id: 'ambassador',
    name: 'Elite Ambassador',
    description: 'For top performers with extensive professional networks',
    color: 'purple',
    benefits: [
      'Earn $50-$200 per successful referral',
      'Annual bonus up to $1,000',
      'Weekly payment processing',
      'Dedicated account manager',
      'Custom marketing materials',
      'VIP support and exclusive events',
      'White-label referral tools'
    ]
  }
];

const professionalRoles = [
  'Registered Nurse',
  'Licensed Practical Nurse',
  'Nurse Practitioner',
  'Physician',
  'Medical Doctor',
  'Pharmacist',
  'Physical Therapist',
  'Occupational Therapist',
  'Medical Technologist',
  'Radiologic Technologist',
  'Healthcare Administrator',
  'Healthcare Recruiter',
  'Other Healthcare Professional'
];

const countries = [
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'New Zealand',
  'Ireland',
  'Saudi Arabia',
  'UAE',
  'Qatar',
  'Kuwait',
  'Oman',
  'Bahrain',
  'Singapore',
  'Germany',
  'Netherlands',
  'Philippines',
  'India',
  'Pakistan',
  'Nigeria',
  'Other'
];

function SignupContent() {
  const searchParams = useSearchParams();
  const tierParam = searchParams?.get('tier');
  const [selectedTier, setSelectedTier] = useState(tierParam || 'champion');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    
    // Professional Information
    profession: '',
    yearsOfExperience: '',
    currentEmployer: '',
    professionalLicense: '',
    
    // Referral Information
    networkSize: '',
    referralExperience: '',
    socialMediaPresence: '',
    motivations: [] as string[],
    
    // Agreement
    agreedToTerms: false,
    agreedToMarketing: false
  });

  const selectedTierData = referralTiers.find(tier => tier.id === selectedTier) || referralTiers[1];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMotivationChange = (motivation: string) => {
    setFormData(prev => ({
      ...prev,
      motivations: prev.motivations.includes(motivation)
        ? prev.motivations.filter(m => m !== motivation)
        : [...prev.motivations, motivation]
    }));
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
    // Here you would submit to your API
    console.log('Referral program signup:', { ...formData, tier: selectedTier });
    
    // For demo purposes, redirect to dashboard
    window.location.href = '/referral-program/dashboard';
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
                    placeholder="Sarah"
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
                    placeholder="Johnson"
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
                    placeholder="sarah@example.com"
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

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Background</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Profession/Role</label>
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your profession</option>
                    {professionalRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <select
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional License Number (Optional)</label>
                    <input
                      type="text"
                      name="professionalLicense"
                      value={formData.professionalLicense}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="License number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Employer (Optional)</label>
                  <input
                    type="text"
                    name="currentEmployer"
                    value={formData.currentEmployer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hospital, clinic, or healthcare facility"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Referral Background</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Network Size</label>
                    <select
                      name="networkSize"
                      value={formData.networkSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select network size</option>
                      <option value="1-50">1-50 contacts</option>
                      <option value="51-100">51-100 contacts</option>
                      <option value="101-500">101-500 contacts</option>
                      <option value="500+">500+ contacts</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Referral Experience</label>
                    <select
                      name="referralExperience"
                      value={formData.referralExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="none">No prior experience</option>
                      <option value="beginner">Some experience (1-10 referrals)</option>
                      <option value="intermediate">Moderate experience (11-50 referrals)</option>
                      <option value="expert">Extensive experience (50+ referrals)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Presence</label>
                  <select
                    name="socialMediaPresence"
                    value={formData.socialMediaPresence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select social media activity</option>
                    <option value="none">No social media presence</option>
                    <option value="personal">Personal accounts only</option>
                    <option value="professional">Professional networks (LinkedIn, etc.)</option>
                    <option value="influencer">Healthcare influencer/content creator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">What motivates you to join our referral program? (Select all that apply)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Extra income',
                      'Help colleagues succeed',
                      'Build professional relationships',
                      'Support career development',
                      'Expand professional network',
                      'Share valuable resources'
                    ].map(motivation => (
                      <label key={motivation} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.motivations.includes(motivation)}
                          onChange={() => handleMotivationChange(motivation)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{motivation}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Terms & Agreement</h3>
              
              {/* Program Summary */}
              <div className={`${getTierColor(selectedTierData.color).bg} rounded-lg p-6 mb-6`}>
                <h4 className="font-semibold text-gray-900 mb-2">Your Selected Tier: {selectedTierData.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{selectedTierData.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Key Benefits:</h5>
                    <ul className="space-y-1">
                      {selectedTierData.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Your Details:</h5>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Profession:</strong> {formData.profession}</p>
                      <p><strong>Network:</strong> {formData.networkSize}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Terms & Privacy</h4>
                    <div className="text-sm text-gray-600 space-y-3">
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          name="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleInputChange}
                          className="mt-1 mr-3" 
                          required 
                        />
                        <span>I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Referral Program Terms & Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. I understand that rewards are paid only for successful referrals who complete service payments.</span>
                      </label>
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          name="agreedToMarketing"
                          checked={formData.agreedToMarketing}
                          onChange={handleInputChange}
                          className="mt-1 mr-3" 
                        />
                        <span>I would like to receive marketing communications, program updates, and educational resources about maximizing my referral success.</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-blue-600 mr-2" />
                  <p className="text-sm text-blue-800">
                    <strong>Welcome Bonus:</strong> Earn an extra $25 for your first successful referral within 30 days of joining!
                  </p>
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
    'Professional Background',
    'Referral Experience',
    'Terms & Agreement'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/referral-program" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Referral Program
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join eLab Referral Program
          </h1>
          <p className="text-xl text-gray-600">
            Start earning rewards by helping colleagues achieve their international healthcare dreams
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tier Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Tier</h3>
              
              <div className="space-y-3 mb-6">
                {referralTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedTier === tier.id 
                        ? `${getTierColor(tier.color).border} ${getTierColor(tier.color).bg}` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-gray-900">{tier.name}</div>
                      {tier.popular && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </button>
                ))}
              </div>

              {/* Selected Tier Benefits */}
              <div className={`${getTierColor(selectedTierData.color).bg} rounded-lg p-4`}>
                <h4 className="font-semibold text-gray-900 mb-3">{selectedTierData.name} Benefits</h4>
                <ul className="space-y-2">
                  {selectedTierData.benefits.slice(0, 4).map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
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
                      disabled={!formData.agreedToTerms}
                      className={`px-8 py-3 font-bold rounded-lg transition-colors ${
                        formData.agreedToTerms
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Join Referral Program
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
            Have questions about the referral program? Our support team is here to help.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>referrals@elabsolutions.com</span>
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

export default function ReferralSignupPage() {
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