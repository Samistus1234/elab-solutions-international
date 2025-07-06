/**
 * Personal Information Step
 * 
 * Comprehensive personal information form with validation
 */

'use client';

import { useState } from 'react';
import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { type PersonalInfoErrors, type LanguageForm } from '@/types/form-wizard';
import { Plus, Trash2, User, Phone, Mail, MapPin, FileText, Globe } from 'lucide-react';
import { generateId } from '@/lib/utils/id-generator';

interface PersonalInfoStepProps {
  errors?: PersonalInfoErrors;
}

export function PersonalInfoStep({ errors }: PersonalInfoStepProps) {
  const { applicationData, updateApplicationData, clearErrors } = useFormWizardStore();
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);

  const personalInfo = applicationData.personalInfo;

  const updatePersonalInfo = (updates: any) => {
    updateApplicationData({
      personalInfo: {
        ...personalInfo,
        ...updates
      }
    });
    clearErrors();
  };

  const updateAddress = (updates: any) => {
    updatePersonalInfo({
      address: {
        ...personalInfo.address,
        ...updates
      }
    });
  };

  const updateEmergencyContact = (updates: any) => {
    updatePersonalInfo({
      emergencyContact: {
        ...personalInfo.emergencyContact,
        ...updates
      }
    });
  };

  const addLanguage = () => {
    const newLanguage: LanguageForm = {
      language: '',
      proficiency: 'basic',
      certified: false,
      certificateType: ''
    };
    
    updatePersonalInfo({
      languages: [...personalInfo.languages, newLanguage]
    });
  };

  const updateLanguage = (index: number, updates: Partial<LanguageForm>) => {
    const updatedLanguages = personalInfo.languages.map((lang, i) => 
      i === index ? { ...lang, ...updates } : lang
    );
    
    updatePersonalInfo({ languages: updatedLanguages });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = personalInfo.languages.filter((_, i) => i !== index);
    updatePersonalInfo({ languages: updatedLanguages });
  };

  const commonCountries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'India', 'Philippines', 'Nigeria', 'South Africa', 'Egypt',
    'Jordan', 'Lebanon', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'
  ];

  const languages = [
    'English', 'Arabic', 'French', 'Spanish', 'German', 'Mandarin', 
    'Hindi', 'Urdu', 'Bengali', 'Tagalog', 'Portuguese', 'Russian'
  ];

  return (
    <div className="space-y-8">
      {/* Step Description */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Personal Information
        </h3>
        <p className="text-gray-600">
          Provide your personal details as they appear on your official documents.
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <User className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="font-medium text-gray-900">Basic Information</h4>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your first name"
            />
            {errors?.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Middle Name
            </label>
            <input
              type="text"
              value={personalInfo.middleName || ''}
              onChange={(e) => updatePersonalInfo({ middleName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Middle name (if applicable)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your last name"
            />
            {errors?.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors?.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              value={personalInfo.gender}
              onChange={(e) => updatePersonalInfo({ gender: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
            {errors?.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status
            </label>
            <select
              value={personalInfo.maritalStatus}
              onChange={(e) => updatePersonalInfo({ maritalStatus: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality *
            </label>
            <select
              value={personalInfo.nationality}
              onChange={(e) => updatePersonalInfo({ nationality: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select nationality</option>
              {commonCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors?.nationality && (
              <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country of Birth *
            </label>
            <select
              value={personalInfo.countryOfBirth}
              onChange={(e) => updatePersonalInfo({ countryOfBirth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select country of birth</option>
              {commonCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Phone className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="font-medium text-gray-900">Contact Information</h4>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="your.email@example.com"
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="+1 (555) 123-4567"
            />
            {errors?.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={personalInfo.whatsapp || ''}
              onChange={(e) => updatePersonalInfo({ whatsapp: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="WhatsApp number (if different)"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="font-medium text-gray-900">Address</h4>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={personalInfo.address.street}
              onChange={(e) => updateAddress({ street: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Street address"
            />
            {errors?.address?.street && (
              <p className="mt-1 text-sm text-red-600">{errors.address.street}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={personalInfo.address.city}
                onChange={(e) => updateAddress({ city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="City"
              />
              {errors?.address?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.address.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                value={personalInfo.address.state || ''}
                onChange={(e) => updateAddress({ state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="State/Province"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code *
              </label>
              <input
                type="text"
                value={personalInfo.address.postalCode}
                onChange={(e) => updateAddress({ postalCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Postal code"
              />
              {errors?.address?.postalCode && (
                <p className="mt-1 text-sm text-red-600">{errors.address.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={personalInfo.address.country}
                onChange={(e) => updateAddress({ country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select country</option>
                {commonCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors?.address?.country && (
                <p className="mt-1 text-sm text-red-600">{errors.address.country}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Passport Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="font-medium text-gray-900">Passport Information</h4>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passport Number *
            </label>
            <input
              type="text"
              value={personalInfo.passportNumber}
              onChange={(e) => updatePersonalInfo({ passportNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Passport number"
            />
            {errors?.passportNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.passportNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issuing Country *
            </label>
            <select
              value={personalInfo.passportCountry}
              onChange={(e) => updatePersonalInfo({ passportCountry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select country</option>
              {commonCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Date *
            </label>
            <input
              type="date"
              value={personalInfo.passportIssueDate}
              onChange={(e) => updatePersonalInfo({ passportIssueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <input
              type="date"
              value={personalInfo.passportExpiryDate}
              onChange={(e) => updatePersonalInfo({ passportExpiryDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors?.passportExpiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.passportExpiryDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-900">Languages</h4>
          </div>
          <button
            onClick={addLanguage}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Language
          </button>
        </div>

        {personalInfo.languages.length === 0 ? (
          <p className="text-gray-600 text-center py-4">
            No languages added yet. Click "Add Language" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {personalInfo.languages.map((lang, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-900">Language {index + 1}</span>
                  <button
                    onClick={() => removeLanguage(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={lang.language}
                      onChange={(e) => updateLanguage(index, { language: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select language</option>
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proficiency
                    </label>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(index, { proficiency: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="native">Native</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Type
                    </label>
                    <input
                      type="text"
                      value={lang.certificateType || ''}
                      onChange={(e) => updateLanguage(index, { certificateType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., IELTS, TOEFL, etc."
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lang.certified || false}
                      onChange={(e) => updateLanguage(index, { certified: e.target.checked })}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I have a language proficiency certificate
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Contact */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Emergency Contact</h4>
          <button
            onClick={() => setShowEmergencyContact(!showEmergencyContact)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            {showEmergencyContact ? 'Hide' : 'Add Emergency Contact'}
          </button>
        </div>

        {showEmergencyContact && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={personalInfo.emergencyContact?.name || ''}
                onChange={(e) => updateEmergencyContact({ name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <input
                type="text"
                value={personalInfo.emergencyContact?.relationship || ''}
                onChange={(e) => updateEmergencyContact({ relationship: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Spouse, Parent, Sibling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={personalInfo.emergencyContact?.phone || ''}
                onChange={(e) => updateEmergencyContact({ phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={personalInfo.emergencyContact?.email || ''}
                onChange={(e) => updateEmergencyContact({ email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Email address"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}