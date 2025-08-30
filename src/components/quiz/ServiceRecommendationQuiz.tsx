'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, ArrowLeft, CheckCircle, Star, Clock, 
  DollarSign, TrendingUp, MapPin, Briefcase, GraduationCap,
  Globe, Award, Target, Users, Zap, AlertCircle
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'slider' | 'text';
  options?: string[];
  min?: number;
  max?: number;
  required: boolean;
  description?: string;
}

interface ServiceRecommendation {
  service: string;
  priority: 'high' | 'medium' | 'low';
  timeline: string;
  cost: number;
  successRate: number;
  description: string;
  benefits: string[];
  nextSteps: string[];
}

interface QuizResult {
  recommendations: ServiceRecommendation[];
  totalCost: number;
  totalTimeline: string;
  overallSuccessRate: number;
  userProfile: UserProfile;
}

interface UserProfile {
  profession: string;
  experience: number;
  currentCountry: string;
  targetCountries: string[];
  timeline: string;
  budget: number;
  englishLevel: string;
  hasPassport: boolean;
  priorities: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'profession',
    question: 'What is your healthcare profession?',
    type: 'single',
    options: [
      'Registered Nurse (RN)',
      'Licensed Practical Nurse (LPN)',
      'Physician/Doctor',
      'Surgeon',
      'Pharmacist',
      'Physical Therapist',
      'Medical Technologist',
      'Radiologic Technologist',
      'Other Healthcare Professional'
    ],
    required: true,
    description: 'This helps us recommend the most relevant licensing pathways'
  },
  {
    id: 'experience',
    question: 'How many years of professional experience do you have?',
    type: 'slider',
    min: 0,
    max: 20,
    required: true,
    description: 'Experience level affects eligibility and processing times'
  },
  {
    id: 'currentCountry',
    question: 'Which country are you currently practicing in?',
    type: 'single',
    options: [
      'India',
      'Philippines',
      'Pakistan',
      'Bangladesh',
      'Nigeria',
      'Kenya',
      'Egypt',
      'Jordan',
      'Lebanon',
      'Sri Lanka',
      'Nepal',
      'Other'
    ],
    required: true,
    description: 'Different countries have different recognition agreements'
  },
  {
    id: 'targetCountries',
    question: 'Which countries are you interested in working in?',
    type: 'multiple',
    options: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'United Arab Emirates',
      'Saudi Arabia',
      'Qatar',
      'Bahrain',
      'Oman',
      'Kuwait',
      'New Zealand',
      'Ireland'
    ],
    required: true,
    description: 'Select all countries you would consider'
  },
  {
    id: 'timeline',
    question: 'What is your preferred timeline?',
    type: 'single',
    options: [
      'As soon as possible (3-6 months)',
      'Within 1 year',
      'Within 2 years',
      'I have flexible timing (2+ years)',
      'Just exploring options'
    ],
    required: true,
    description: 'Urgent applications may require expedited services'
  },
  {
    id: 'budget',
    question: 'What is your total budget for the entire process?',
    type: 'single',
    options: [
      'Under $2,000',
      '$2,000 - $5,000',
      '$5,000 - $10,000',
      '$10,000 - $20,000',
      'Over $20,000',
      'Not sure yet'
    ],
    required: true,
    description: 'Includes all fees: licensing, exams, documentation, and our services'
  },
  {
    id: 'englishLevel',
    question: 'What is your English proficiency level?',
    type: 'single',
    options: [
      'Native/Fluent speaker',
      'Advanced (taken IELTS/TOEFL)',
      'Intermediate (comfortable with medical English)',
      'Basic (need significant improvement)',
      'Beginner (minimal English skills)'
    ],
    required: true,
    description: 'Most countries require English proficiency certification'
  },
  {
    id: 'hasPassport',
    question: 'Do you currently have a valid passport?',
    type: 'single',
    options: ['Yes, valid for 2+ years', 'Yes, expires within 2 years', 'No, need to get one'],
    required: true,
    description: 'Valid passport is required for most international applications'
  },
  {
    id: 'priorities',
    question: 'What are your top priorities?',
    type: 'multiple',
    options: [
      'Highest possible salary',
      'Fastest processing time',
      'Family immigration opportunities',
      'Low cost of living',
      'Career advancement opportunities',
      'Continuing education support',
      'Cultural familiarity',
      'Climate/lifestyle preferences'
    ],
    required: true,
    description: 'Select your top 3 priorities to get personalized recommendations'
  }
];

const serviceDatabase = {
  'NCLEX-USA': {
    id: 'nclex',
    cost: 899,
    timeline: '3-6 months',
    successRate: 94,
    requirements: ['BSN/ADN', 'English Test', 'Background Check'],
    targetProfessions: ['Registered Nurse (RN)']
  },
  'NMC-UK': {
    id: 'uk-nmc',
    cost: 1199,
    timeline: '6-12 months', 
    successRate: 91,
    requirements: ['Nursing Degree', 'IELTS 7.0', 'CBT & OSCE'],
    targetProfessions: ['Registered Nurse (RN)']
  },
  'DataFlow-Gulf': {
    id: 'dataflow',
    cost: 1299,
    timeline: '3-6 weeks',
    successRate: 98,
    requirements: ['Healthcare Degree', 'Experience Certificate', 'Good Standing'],
    targetProfessions: ['All Healthcare Professionals']
  },
  'AHPRA-Australia': {
    id: 'australia',
    cost: 1099,
    timeline: '4-8 months',
    successRate: 93,
    requirements: ['Nursing/Medical Degree', 'English Test', 'Police Check'],
    targetProfessions: ['Registered Nurse (RN)', 'Healthcare Professional']
  }
};

export function ServiceRecommendationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);

  const currentQ = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const canProceed = currentQ.required ? answers[currentQ.id] !== undefined : true;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateRecommendations = (): QuizResult => {
    const profession = answers.profession;
    const targetCountries = answers.targetCountries || [];
    const timeline = answers.timeline;
    const budget = answers.budget;
    const experience = answers.experience || 0;

    const recommendations: ServiceRecommendation[] = [];

    // Algorithm to match services based on answers
    if (targetCountries.includes('United States') && profession.includes('Nurse')) {
      recommendations.push({
        service: 'NCLEX-RN Preparation & Registration',
        priority: 'high',
        timeline: '6-12 months',
        cost: 2500,
        successRate: 94,
        description: 'Complete NCLEX preparation with registration assistance for US nursing practice',
        benefits: [
          'Access to highest nursing salaries globally ($65k-$95k)',
          'Green card pathway available',
          'Comprehensive exam preparation with 95% pass rate',
          'Authorization to Test (ATT) assistance'
        ],
        nextSteps: [
          'Credential evaluation and gap analysis',
          'English proficiency test if needed',
          'NCLEX registration with state board',
          'Intensive preparation program enrollment'
        ]
      });
    }

    if (targetCountries.some(country => ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Oman'].includes(country))) {
      recommendations.push({
        service: 'DataFlow PSV + Gulf Licensing',
        priority: 'high',
        timeline: '3-6 months',
        cost: 1800,
        successRate: 96,
        description: 'Primary Source Verification and regulatory licensing for Gulf countries',
        benefits: [
          'Tax-free income in most Gulf countries',
          'Fast processing with high success rate',
          'Multi-country coverage with single application',
          'Direct regulatory body submission'
        ],
        nextSteps: [
          'Document collection and authentication',
          'DataFlow PSV submission',
          'Regulatory body application',
          'Final license issuance'
        ]
      });
    }

    if (targetCountries.includes('United Kingdom') && profession.includes('Nurse')) {
      recommendations.push({
        service: 'NMC UK Registration',
        priority: 'medium',
        timeline: '8-14 months',
        cost: 3200,
        successRate: 91,
        description: 'Complete NMC registration process for UK nursing practice',
        benefits: [
          'NHS employment opportunities',
          'Strong pound sterling earnings',
          'EU work rights after registration',
          'Comprehensive healthcare coverage'
        ],
        nextSteps: [
          'IELTS Academic 7.0 achievement',
          'Computer Based Test (CBT) preparation',
          'OSCE practical exam training',
          'Final NMC registration'
        ]
      });
    }

    // Add English Language Support if needed
    if (answers.englishLevel && !answers.englishLevel.includes('Native') && !answers.englishLevel.includes('Advanced')) {
      recommendations.push({
        service: 'English Language Training Program',
        priority: 'high',
        timeline: '3-6 months',
        cost: 800,
        successRate: 98,
        description: 'Specialized English training for healthcare professionals',
        benefits: [
          'Healthcare-specific vocabulary and communication',
          'IELTS/OET/TOEFL preparation',
          'Score improvement guarantee',
          'Flexible online and offline classes'
        ],
        nextSteps: [
          'English proficiency assessment',
          'Customized study plan creation',
          'Regular practice sessions and mock tests',
          'Official exam registration and support'
        ]
      });
    }

    const totalCost = recommendations.reduce((sum, rec) => sum + rec.cost, 0);
    const avgSuccessRate = recommendations.reduce((sum, rec) => sum + rec.successRate, 0) / recommendations.length;

    return {
      recommendations: recommendations.slice(0, 3), // Top 3 recommendations
      totalCost,
      totalTimeline: timeline.includes('3-6') ? '6-12 months' : 
                     timeline.includes('1 year') ? '8-18 months' : '12-24 months',
      overallSuccessRate: Math.round(avgSuccessRate),
      userProfile: {
        profession: answers.profession,
        experience: answers.experience,
        currentCountry: answers.currentCountry,
        targetCountries: answers.targetCountries,
        timeline: answers.timeline,
        budget: answers.budget,
        englishLevel: answers.englishLevel,
        hasPassport: answers.hasPassport,
        priorities: answers.priorities
      }
    };
  };

  const completeQuiz = () => {
    const results = generateRecommendations();
    setQuizResults(results);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizResults(null);
  };

  if (showResults && quizResults) {
    // Add safety check for recommendations
    if (!quizResults.recommendations || quizResults.recommendations.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-4xl mx-auto">
          <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Recommendations Available
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't generate specific recommendations based on your answers. 
            Please try taking the quiz again or contact our consultants for personalized guidance.
          </p>
          <div className="space-y-4">
            <button
              onClick={restartQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Retake Quiz
            </button>
            <Link href="/consultation">
              <button className="ml-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-colors">
                Schedule Consultation
              </button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto"
      >
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Personalized Recommendations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your profile, here are the best pathways for your international healthcare career
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">${quizResults.totalCost.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Investment</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{quizResults.totalTimeline}</div>
            <div className="text-sm text-gray-600">Expected Timeline</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{quizResults.overallSuccessRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{quizResults.recommendations.length}</div>
            <div className="text-sm text-gray-600">Services Recommended</div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-8 mb-12">
          {quizResults.recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    recommendation.priority === 'high' ? 'bg-red-100' : 
                    recommendation.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <span className={`text-sm font-bold ${
                      recommendation.priority === 'high' ? 'text-red-600' : 
                      recommendation.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {recommendation.service}
                    </h3>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{recommendation.timeline}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                        <span>${recommendation.cost}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{recommendation.successRate}% success rate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  recommendation.priority === 'high' ? 'bg-red-100 text-red-700' : 
                  recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {recommendation.priority.toUpperCase()} PRIORITY
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {recommendation.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Next Steps
                  </h4>
                  <ol className="space-y-2">
                    {recommendation.nextSteps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommended Services */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Start Your Application</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizResults.recommendations.slice(0, 3).map((recommendation, index) => {
              // Add null checks for recommendation and service field
              if (!recommendation || !recommendation.service) return null;
              
              const service = Object.values(serviceDatabase).find(s => 
                recommendation.service.includes('NCLEX') ? s.id === 'nclex' :
                recommendation.service.includes('UK') || recommendation.service.includes('NMC') ? s.id === 'uk-nmc' :
                recommendation.service.includes('Australia') || recommendation.service.includes('AHPRA') ? s.id === 'australia' :
                recommendation.service.includes('DataFlow') || recommendation.service.includes('Gulf') ? s.id === 'dataflow' :
                null
              );
              
              if (!service) return null;
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                  <h4 className="font-bold text-gray-900 mb-2">{recommendation.service}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">${service.cost}</div>
                  <div className="text-sm text-gray-600 mb-4">{service.timeline}</div>
                  <div className="space-y-2">
                    <Link href={`/apply/${service.id}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Apply Now
                      </button>
                    </Link>
                    <Link href={`/services/${service.id}`}>
                      <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg">
                Schedule Free Consultation
              </button>
            </Link>
            <button 
              onClick={() => {
                const results = {
                  recommendations: quizResults.recommendations,
                  totalCost: quizResults.totalCost,
                  totalTimeline: quizResults.totalTimeline,
                  overallSuccessRate: quizResults.overallSuccessRate
                };
                localStorage.setItem('quiz-results', JSON.stringify(results));
                
                const element = document.createElement('a');
                const file = new Blob([`
eLAB SOLUTIONS QUIZ RESULTS
${new Date().toLocaleDateString()}

RECOMMENDATIONS:
${quizResults.recommendations.map((rec, i) => `
${i + 1}. ${rec.service}
   Cost: $${rec.cost}
   Timeline: ${rec.timeline}
   Success Rate: ${rec.successRate}%
   Priority: ${rec.priority}
   
   Description:
   ${rec.description}
   
   Benefits:
   ${rec.benefits.map((benefit, j) => `   • ${benefit}`).join('\n')}
   
   Next Steps:
   ${rec.nextSteps.map((step, j) => `   ${j + 1}. ${step}`).join('\n')}
`).join('\n')}

SUMMARY:
- Total Investment: $${quizResults.totalCost.toLocaleString()}
- Expected Timeline: ${quizResults.totalTimeline}  
- Overall Success Rate: ${quizResults.overallSuccessRate}%

Contact eLab Solutions:
Email: support@elabsolutions.com
Phone: +1 (555) 123-4567
Website: https://elabsolutions.com
                `], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = 'eLab-Quiz-Results.txt';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors text-lg"
            >
              Download Detailed Report
            </button>
          </div>
          <button 
            onClick={restartQuiz}
            className="text-gray-600 hover:text-gray-800 font-medium underline"
          >
            Take Quiz Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Service Recommendation Quiz
          </h2>
          <div className="text-white font-medium">
            {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQ.question}
            </h3>
            {currentQ.description && (
              <p className="text-gray-600 mb-8">{currentQ.description}</p>
            )}

            {/* Question Types */}
            {currentQ.type === 'single' && (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={option}
                      checked={answers[currentQ.id] === option}
                      onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'multiple' && (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={(answers[currentQ.id] || []).includes(option)}
                      onChange={(e) => {
                        const current = answers[currentQ.id] || [];
                        const updated = e.target.checked
                          ? [...current, option]
                          : current.filter((item: string) => item !== option);
                        handleAnswer(currentQ.id, updated);
                      }}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'slider' && (
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{currentQ.min} years</span>
                  <span>{currentQ.max}+ years</span>
                </div>
                <input
                  type="range"
                  min={currentQ.min}
                  max={currentQ.max}
                  value={answers[currentQ.id] || currentQ.min}
                  onChange={(e) => handleAnswer(currentQ.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {answers[currentQ.id] || currentQ.min} years
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={completeQuiz}
              disabled={!canProceed}
              className="flex items-center px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Get My Recommendations
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!canProceed}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}