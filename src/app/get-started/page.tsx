'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ServiceRecommendationQuiz } from '@/components/quiz/ServiceRecommendationQuiz';
import { ServicePricing } from '@/components/pricing/ServicePricing';
import { Lightbulb, CreditCard, ArrowRight, Users, CheckCircle } from 'lucide-react';

type Step = 'quiz' | 'plans' | 'summary';

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState<Step>('quiz');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const steps = [
    { id: 'quiz', title: 'Discover Your Path', icon: Lightbulb, description: 'Take our smart quiz to get personalized recommendations' },
    { id: 'plans', title: 'Choose Your Service', icon: CreditCard, description: 'Select the service package that fits your needs' },
    { id: 'summary', title: 'Start Your Journey', icon: CheckCircle, description: 'Complete your registration and begin' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Start Your International Healthcare Career
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Let us guide you through the perfect pathway to achieve your global healthcare career goals. 
              Our AI-powered recommendations and expert support ensure your success.
            </p>

            {/* Step Progress */}
            <div className="flex items-center justify-center space-x-8 mb-12">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    currentStep === step.id ? 'bg-blue-600 text-white' :
                    (currentStep === 'plans' && step.id === 'quiz') || (currentStep === 'summary' && step.id !== 'summary') ? 'bg-green-100 text-green-600' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {(currentStep === 'plans' && step.id === 'quiz') || (currentStep === 'summary' && step.id !== 'summary') ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <h3 className={`font-semibold ${
                      currentStep === step.id ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-gray-400 ml-6 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Based on Current Step */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentStep === 'quiz' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Get Personalized Recommendations
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Answer a few questions about your background and goals, and we'll recommend 
                    the perfect services and timeline for your success.
                  </p>
                </div>
                <ServiceRecommendationQuiz />
                <div className="text-center mt-8">
                  <button
                    onClick={() => setCurrentStep('plans')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg"
                  >
                    Continue to Plans
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'plans' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Choose Your Service Package
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Select the professional service that matches your career goals and requirements.
                  </p>
                </div>
                <ServicePricing />
                <div className="text-center mt-8">
                  <button
                    onClick={() => setCurrentStep('summary')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg mr-4"
                  >
                    Complete Registration
                  </button>
                  <button
                    onClick={() => setCurrentStep('quiz')}
                    className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-medium py-4 px-8 rounded-full transition-colors text-lg"
                  >
                    Back to Quiz
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'summary' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Welcome to eLab Solutions!
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Congratulations on taking the first step toward your international healthcare career. 
                    Your personalized journey begins now.
                  </p>

                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Expert Consultation</h3>
                      <p className="text-sm text-gray-600">Schedule your first consultation with our experts within 24 hours</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Personalized Plan</h3>
                      <p className="text-sm text-gray-600">Receive your customized roadmap and timeline</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Begin Process</h3>
                      <p className="text-sm text-gray-600">Start your document collection and application process</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link href="/dashboard/overview">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg w-full md:w-auto">
                        Access Your Dashboard
                      </button>
                    </Link>
                    <div>
                      <Link href="/consultation">
                        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors mr-4">
                          Schedule Consultation
                        </button>
                      </Link>
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '/downloads/eLab-Solutions-Welcome-Kit.txt';
                          link.download = 'eLab-Solutions-Welcome-Kit.txt';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-medium py-3 px-6 rounded-lg transition-colors"
                      >
                        Download Welcome Kit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">Professionals Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">96%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Countries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">8+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}