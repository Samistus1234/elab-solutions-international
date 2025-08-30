'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, DollarSign, TrendingUp, Clock, Target, 
  Briefcase, MapPin, Award, CheckCircle, AlertCircle 
} from 'lucide-react';

interface ROIData {
  currentSalary: number;
  targetCountry: string;
  profession: string;
  experience: string;
  investmentAmount: number;
  timeToCompletion: number; // in months
}

interface ROIResult {
  newSalary: {
    min: number;
    max: number;
    currency: string;
    taxFree?: boolean;
  };
  salaryIncrease: {
    annual: number;
    monthly: number;
    percentage: number;
  };
  paybackPeriod: number; // months
  roi: {
    year1: number;
    year3: number;
    year5: number;
    lifetime: number;
  };
  additionalBenefits: string[];
  breakEvenPoint: number; // months
}

const countryData = {
  'United States': {
    multiplier: { min: 2.5, max: 4.0 },
    currency: 'USD',
    taxRate: 0.25,
    costOfLiving: 1.2,
    benefits: ['Health Insurance', '401k Matching', 'Green Card Pathway', 'Social Security']
  },
  'United Kingdom': {
    multiplier: { min: 1.8, max: 2.8 },
    currency: 'GBP',
    taxRate: 0.32,
    costOfLiving: 1.1,
    benefits: ['NHS Healthcare', 'Pension Scheme', 'Paid Leave', 'Work-Life Balance']
  },
  'Australia': {
    multiplier: { min: 2.0, max: 3.2 },
    currency: 'AUD', 
    taxRate: 0.28,
    costOfLiving: 1.15,
    benefits: ['Superannuation', 'Medicare', 'Annual Leave', 'Work Rights']
  },
  'United Arab Emirates': {
    multiplier: { min: 2.2, max: 3.5 },
    currency: 'USD',
    taxRate: 0.0,
    taxFree: true,
    costOfLiving: 0.9,
    benefits: ['Tax-Free Income', 'Housing Allowance', 'Annual Ticket', 'School Fees']
  },
  'Saudi Arabia': {
    multiplier: { min: 2.0, max: 3.2 },
    currency: 'USD',
    taxRate: 0.0,
    taxFree: true,
    costOfLiving: 0.8,
    benefits: ['Tax-Free Income', 'Housing Allowance', 'End of Service', 'Medical Coverage']
  },
  'Canada': {
    multiplier: { min: 2.2, max: 3.4 },
    currency: 'CAD',
    taxRate: 0.26,
    costOfLiving: 1.05,
    benefits: ['Universal Healthcare', 'CPP', 'Immigration Pathway', 'Quality of Life']
  }
};

const professionMultipliers = {
  'Registered Nurse': 1.0,
  'ICU Nurse': 1.3,
  'Emergency Nurse': 1.25,
  'Physician': 2.5,
  'Surgeon': 4.0,
  'Pharmacist': 1.4,
  'Physical Therapist': 1.2,
  'Medical Technologist': 0.9
};

const experienceMultipliers = {
  '0-2 years': 0.85,
  '3-5 years': 1.0,
  '6-10 years': 1.25,
  '10+ years': 1.5
};

export function ROICalculator() {
  const [formData, setFormData] = useState<ROIData>({
    currentSalary: 25000,
    targetCountry: 'United States',
    profession: 'Registered Nurse',
    experience: '3-5 years',
    investmentAmount: 3500,
    timeToCompletion: 12
  });
  
  const [showResults, setShowResults] = useState(false);
  const [roiResult, setROIResult] = useState<ROIResult | null>(null);

  const calculateROI = (): ROIResult => {
    const countryInfo = countryData[formData.targetCountry as keyof typeof countryData];
    const professionMult = professionMultipliers[formData.profession as keyof typeof professionMultipliers] || 1.0;
    const experienceMult = experienceMultipliers[formData.experience as keyof typeof experienceMultipliers] || 1.0;

    // Calculate new salary range
    const baseSalaryMin = formData.currentSalary * countryInfo.multiplier.min * professionMult * experienceMult;
    const baseSalaryMax = formData.currentSalary * countryInfo.multiplier.max * professionMult * experienceMult;

    const newSalary = {
      min: Math.round(baseSalaryMin),
      max: Math.round(baseSalaryMax),
      currency: countryInfo.currency,
      taxFree: (countryInfo as any).taxFree
    };

    // Calculate salary increase
    const avgNewSalary = (baseSalaryMin + baseSalaryMax) / 2;
    const annualIncrease = avgNewSalary - formData.currentSalary;
    const monthlyIncrease = annualIncrease / 12;
    const percentageIncrease = ((avgNewSalary - formData.currentSalary) / formData.currentSalary) * 100;

    // Calculate payback period
    const paybackPeriod = Math.ceil(formData.investmentAmount / monthlyIncrease);

    // Calculate ROI over different periods
    const calculatePeriodROI = (years: number) => {
      const totalGain = annualIncrease * years;
      const netGain = totalGain - formData.investmentAmount;
      return (netGain / formData.investmentAmount) * 100;
    };

    const roi = {
      year1: calculatePeriodROI(1),
      year3: calculatePeriodROI(3),
      year5: calculatePeriodROI(5),
      lifetime: calculatePeriodROI(25) // 25-year career
    };

    return {
      newSalary,
      salaryIncrease: {
        annual: Math.round(annualIncrease),
        monthly: Math.round(monthlyIncrease),
        percentage: Math.round(percentageIncrease)
      },
      paybackPeriod,
      roi,
      additionalBenefits: countryInfo.benefits,
      breakEvenPoint: Math.max(formData.timeToCompletion, paybackPeriod)
    };
  };

  const handleCalculate = () => {
    const result = calculateROI();
    setROIResult(result);
    setShowResults(true);
  };

  const formatCurrency = (amount: number, currency: string) => {
    const formatters = {
      USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
      AUD: new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }),
      CAD: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' })
    };
    
    return formatters[currency as keyof typeof formatters]?.format(amount) || `$${amount.toLocaleString()}`;
  };

  const getROIColor = (roi: number) => {
    if (roi > 500) return 'text-green-600';
    if (roi > 200) return 'text-blue-600';
    if (roi > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Career ROI Calculator</h3>
        <p className="text-gray-600">Calculate your return on investment for international healthcare career transition</p>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          {/* Current Situation */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Current Situation
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Annual Salary (USD)
                </label>
                <input
                  type="number"
                  value={formData.currentSalary}
                  onChange={(e) => setFormData({...formData, currentSalary: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({...formData, profession: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(professionMultipliers).map(prof => (
                    <option key={prof} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(experienceMultipliers).map(exp => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Country</label>
                <select
                  value={formData.targetCountry}
                  onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(countryData).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Investment Details
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Investment Amount (USD)
                </label>
                <input
                  type="number"
                  value={formData.investmentAmount}
                  onChange={(e) => setFormData({...formData, investmentAmount: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="3500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include all costs: services, exams, documents, travel
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time to Complete Process (months)
                </label>
                <select
                  value={formData.timeToCompletion}
                  onChange={(e) => setFormData({...formData, timeToCompletion: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={6}>6 months</option>
                  <option value={9}>9 months</option>
                  <option value={12}>12 months</option>
                  <option value={18}>18 months</option>
                  <option value={24}>24 months</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleCalculate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Calculate My ROI
            </button>
          </div>
        </div>
      ) : (
        roiResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header Results */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatCurrency(roiResult.newSalary.min, roiResult.newSalary.currency)} - 
                    {formatCurrency(roiResult.newSalary.max, roiResult.newSalary.currency)}
                  </div>
                  <div className="text-sm text-gray-600">New Salary Range</div>
                  {roiResult.newSalary.taxFree && (
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2">
                      Tax-Free Income!
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    +{roiResult.salaryIncrease.percentage}%
                  </div>
                  <div className="text-sm text-gray-600">Salary Increase</div>
                  <div className="text-xs text-gray-500 mt-1">
                    +${roiResult.salaryIncrease.monthly.toLocaleString()}/month
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {roiResult.paybackPeriod} months
                  </div>
                  <div className="text-sm text-gray-600">Payback Period</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Break-even point
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Over Time */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Return on Investment Over Time
              </h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 ${getROIColor(roiResult.roi.year1)}`}>
                    {roiResult.roi.year1.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Year 1 ROI</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 ${getROIColor(roiResult.roi.year3)}`}>
                    {roiResult.roi.year3.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">3-Year ROI</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 ${getROIColor(roiResult.roi.year5)}`}>
                    {roiResult.roi.year5.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">5-Year ROI</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className={`text-2xl font-bold mb-2 text-blue-600`}>
                    {roiResult.roi.lifetime.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Lifetime ROI</div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Additional Benefits in {formData.targetCountry}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {roiResult.additionalBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Projection */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                5-Year Financial Projection
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Investment:</span>
                  <span className="font-bold text-red-600">-${formData.investmentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Additional Income (5 years):</span>
                  <span className="font-bold text-green-600">+${(roiResult.salaryIncrease.annual * 5).toLocaleString()}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-800">Net Gain:</span>
                  <span className="font-bold text-green-600">
                    ${((roiResult.salaryIncrease.annual * 5) - formData.investmentAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-colors">
                Start My Application
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors">
                Download Full Report
              </button>
              <button 
                onClick={() => setShowResults(false)}
                className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-medium py-4 px-8 rounded-full transition-colors"
              >
                Recalculate
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-800">
                <strong>Disclaimer:</strong> These calculations are estimates based on market data and individual results may vary. 
                Actual salaries depend on qualifications, employer, location, and market conditions. 
                Please consult with our experts for personalized projections.
              </div>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}