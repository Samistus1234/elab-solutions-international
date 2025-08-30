'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, MapPin, Briefcase, TrendingUp } from 'lucide-react';

interface SalaryData {
  [country: string]: {
    [specialty: string]: {
      min: number;
      max: number;
      currency: string;
      taxFree?: boolean;
      benefits?: string[];
    };
  };
}

const salaryData: SalaryData = {
  'USA': {
    'Registered Nurse': { min: 65000, max: 95000, currency: 'USD', benefits: ['Health Insurance', '401k', 'PTO'] },
    'ICU Nurse': { min: 75000, max: 110000, currency: 'USD', benefits: ['Health Insurance', '401k', 'Shift Differential'] },
    'Emergency Nurse': { min: 70000, max: 105000, currency: 'USD', benefits: ['Health Insurance', '401k', 'Trauma Bonus'] },
    'Physician': { min: 200000, max: 400000, currency: 'USD', benefits: ['Health Insurance', '401k', 'Malpractice Coverage'] },
    'Pharmacist': { min: 120000, max: 160000, currency: 'USD', benefits: ['Health Insurance', '401k', 'CE Allowance'] }
  },
  'UK': {
    'NHS Nurse': { min: 28000, max: 45000, currency: 'GBP', benefits: ['NHS Pension', 'Annual Leave', 'Study Leave'] },
    'ICU Nurse': { min: 32000, max: 55000, currency: 'GBP', benefits: ['NHS Pension', 'High Cost Area Supplement'] },
    'General Practitioner': { min: 65000, max: 120000, currency: 'GBP', benefits: ['NHS Pension', 'Study Budget'] },
    'Pharmacist': { min: 35000, max: 65000, currency: 'GBP', benefits: ['NHS Pension', 'Professional Development'] }
  },
  'Australia': {
    'Registered Nurse': { min: 65000, max: 85000, currency: 'AUD', benefits: ['Superannuation', 'Annual Leave', 'Sick Leave'] },
    'ICU Nurse': { min: 75000, max: 95000, currency: 'AUD', benefits: ['Superannuation', 'Shift Loadings'] },
    'Midwife': { min: 70000, max: 90000, currency: 'AUD', benefits: ['Superannuation', 'Professional Development'] },
    'Physician': { min: 150000, max: 300000, currency: 'AUD', benefits: ['Superannuation', 'CME Allowance'] }
  },
  'UAE': {
    'Registered Nurse': { min: 45000, max: 65000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'Transport', 'Annual Ticket'] },
    'ICU Nurse': { min: 55000, max: 75000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'Transport', 'Annual Ticket'] },
    'Emergency Physician': { min: 120000, max: 200000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'School Fees', 'Annual Ticket'] },
    'Pharmacist': { min: 60000, max: 80000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'Transport'] }
  },
  'Saudi Arabia': {
    'Registered Nurse': { min: 40000, max: 60000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'Transport', 'End of Service'] },
    'ICU Nurse': { min: 50000, max: 70000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'Transport', 'End of Service'] },
    'Physician': { min: 100000, max: 180000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'School Fees', 'End of Service'] },
    'Pharmacist': { min: 55000, max: 75000, currency: 'USD', taxFree: true, benefits: ['Housing Allowance', 'Transport'] }
  }
};

const experienceLevels = [
  { value: 'entry', label: '0-2 years', multiplier: 0.9 },
  { value: 'mid', label: '3-5 years', multiplier: 1.0 },
  { value: 'senior', label: '6-10 years', multiplier: 1.2 },
  { value: 'expert', label: '10+ years', multiplier: 1.4 }
];

export function SalaryCalculator() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [experience, setExperience] = useState('mid');
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (selectedCountry && selectedSpecialty) {
      setShowResults(true);
    }
  };

  const getSalaryRange = () => {
    if (!selectedCountry || !selectedSpecialty || !salaryData[selectedCountry]?.[selectedSpecialty]) {
      return null;
    }

    const data = salaryData[selectedCountry][selectedSpecialty];
    const expMultiplier = experienceLevels.find(level => level.value === experience)?.multiplier || 1;
    
    return {
      min: Math.round(data.min * expMultiplier),
      max: Math.round(data.max * expMultiplier),
      currency: data.currency,
      taxFree: data.taxFree,
      benefits: data.benefits || []
    };
  };

  const countries = Object.keys(salaryData);
  const specialties = selectedCountry ? Object.keys(salaryData[selectedCountry]) : [];
  const salaryRange = getSalaryRange();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Healthcare Salary Calculator</h3>
        <p className="text-gray-600">Get personalized salary estimates for your specialty and experience level</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 inline mr-2" />
            Select Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedSpecialty('');
              setShowResults(false);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a country...</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="h-4 w-4 inline mr-2" />
            Select Specialty
          </label>
          <select
            value={selectedSpecialty}
            onChange={(e) => {
              setSelectedSpecialty(e.target.value);
              setShowResults(false);
            }}
            disabled={!selectedCountry}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Choose a specialty...</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Experience Level
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {experienceLevels.map(level => (
              <button
                key={level.value}
                onClick={() => {
                  setExperience(level.value);
                  setShowResults(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  experience === level.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={handleCalculate}
          disabled={!selectedCountry || !selectedSpecialty}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Calculate My Salary Range
        </button>
      </div>

      {showResults && salaryRange && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="text-center mb-6">
            <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <h4 className="text-xl font-bold text-gray-800">Your Estimated Salary Range</h4>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {salaryRange.currency === 'USD' && '$'}
              {salaryRange.currency === 'GBP' && '£'}
              {salaryRange.currency === 'AUD' && 'AU$'}
              {salaryRange.min.toLocaleString()} - {salaryRange.max.toLocaleString()}
              {salaryRange.currency !== 'USD' && salaryRange.currency !== 'GBP' && salaryRange.currency !== 'AUD' && ` ${salaryRange.currency}`}
            </div>
            <p className="text-gray-600">
              Annual salary for {selectedSpecialty} in {selectedCountry}
            </p>
            {salaryRange.taxFree && (
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                🎉 Tax-Free Income!
              </div>
            )}
          </div>

          {salaryRange.benefits && salaryRange.benefits.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-3">Additional Benefits:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {salaryRange.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 mb-4">
              *Estimates based on market data. Actual salaries may vary based on qualifications, employer, and location.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Get Personalized Quote
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}