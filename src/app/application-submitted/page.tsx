'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Calendar, Mail, Phone, Download, 
  ArrowRight, Clock, Users, FileText, CreditCard,
  Star, AlertCircle
} from 'lucide-react';

const servicesData = {
  dataflow: { title: 'DataFlow Primary Source Verification', timeline: '25-30 days' },
  nclex: { title: 'NCLEX-RN Preparation & Registration', timeline: '3-6 months' },
  'uk-nmc': { title: 'UK NMC Registration Package', timeline: '6-12 months' },
  australia: { title: 'Australia AHPRA Registration', timeline: '4-8 months' },
  consultation: { title: 'Professional Consultation Services', timeline: 'Same day' }
};

function ApplicationSubmittedContent() {
  const searchParams = useSearchParams();
  const applicationRef = searchParams?.get('ref');
  const serviceId = searchParams?.get('service');
  const [emailSent, setEmailSent] = useState(false);

  const service = serviceId ? servicesData[serviceId as keyof typeof servicesData] : null;

  useEffect(() => {
    // Simulate sending confirmation email
    const timer = setTimeout(() => {
      setEmailSent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Clean up saved application data from localStorage
  useEffect(() => {
    if (serviceId) {
      localStorage.removeItem(`application-${serviceId}`);
      localStorage.removeItem(`application-step-${serviceId}`);
      localStorage.removeItem(`application-saved-${serviceId}`);
    }
  }, [serviceId]);

  if (!applicationRef || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Application Reference</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const nextSteps = [
    {
      title: 'Confirmation Email',
      description: 'You will receive a detailed confirmation email within 5 minutes',
      icon: Mail,
      status: emailSent ? 'completed' : 'pending',
      timeframe: '5 minutes'
    },
    {
      title: 'Document Review',
      description: 'Our experts will review your application and uploaded documents',
      icon: FileText,
      status: 'pending',
      timeframe: '24-48 hours'
    },
    {
      title: 'Initial Consultation',
      description: 'Schedule your first consultation call with our specialists',
      icon: Users,
      status: 'pending',
      timeframe: '2-3 days'
    },
    {
      title: 'Process Initiation',
      description: 'We begin the official application process with relevant authorities',
      icon: ArrowRight,
      status: 'pending',
      timeframe: '1 week'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Application Successfully Submitted!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for choosing eLab Solutions International. Your journey to international healthcare success begins now.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
              <div className="text-sm text-gray-600 mb-2">Your Application Reference</div>
              <div className="text-2xl font-bold text-blue-600 font-mono">{applicationRef}</div>
              <div className="text-sm text-gray-500 mt-2">Save this reference number for future communication</div>
            </div>
          </motion.div>

          {/* Application Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Service Selected</h3>
                <p className="text-gray-700">{service.title}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Expected Timeline</h3>
                <p className="text-gray-700">{service.timeline}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Submission Date</h3>
                <p className="text-gray-700">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Submitted & Under Review
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
            <div className="space-y-6">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-4 ${
                    step.status === 'completed' 
                      ? 'bg-green-100' 
                      : step.status === 'pending' 
                        ? 'bg-blue-100' 
                        : 'bg-gray-100'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <step.icon className={`h-5 w-5 ${
                        step.status === 'pending' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-gray-500">{step.timeframe}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    {step.status === 'completed' && (
                      <div className="flex items-center mt-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <Link href="/dashboard/overview" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Access Dashboard</h3>
                <p className="text-sm text-gray-600 mb-4">Track your application progress and manage your account</p>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  View Dashboard
                </div>
              </div>
            </Link>

            <Link href="/consultation" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Schedule Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">Book your initial consultation call with our experts</p>
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Book Now
                </div>
              </div>
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Download Resources</h3>
                <p className="text-sm text-gray-600 mb-4">Get your welcome kit and helpful resources</p>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/downloads/eLab-Solutions-Welcome-Kit.txt';
                    link.download = 'eLab-Solutions-Welcome-Kit.txt';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Download Kit
                </button>
              </div>
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Important Information</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Check your email (including spam folder) for detailed confirmation</li>
                  <li>• Keep your application reference number safe for all communications</li>
                  <li>• You can track progress anytime through your dashboard</li>
                  <li>• Our team will contact you within 24-48 hours for next steps</li>
                  <li>• If you have questions, contact us at support@elabsolutions.com</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
            <p className="mb-6 text-blue-100">
              Our support team is available 24/7 to help with any questions about your application.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@elabsolutions.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="h-4 w-4 mr-2" />
                <span>24/7 WhatsApp Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationSubmittedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ApplicationSubmittedContent />
    </Suspense>
  );
}