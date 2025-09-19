'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Edit, MessageSquare, Phone, Mail, MapPin, Calendar, FileText,
  CheckCircle, Clock, AlertCircle, Star, TrendingUp, DollarSign, Download,
  User, Building, Globe, Award, Activity, Target, Eye, Send
} from 'lucide-react';

// Enhanced client data with detailed information
const getClientById = (id: string) => {
  const clientsData = {
    'CLT-001': {
      id: 'CLT-001',
      name: 'Dr. Sarah Ahmed',
      profession: 'General Practitioner',
      email: 'sarah.ahmed@email.com',
      phone: '+971-50-123-4567',
      country: 'UAE',
      targetCountry: 'USA',
      service: 'NCLEX-RN',
      status: 'Placement Complete',
      stage: 'Job Matching',
      progress: 100,
      earnings: 2850,
      commission: 712.50,
      joinedDate: '2024-03-15',
      lastActivity: '2024-08-25',
      priority: 'high',
      notes: 'Excellent candidate, placed in Massachusetts General Hospital',
      personalInfo: {
        dateOfBirth: '1985-06-12',
        nationality: 'Egyptian',
        languages: ['Arabic', 'English', 'French'],
        maritalStatus: 'Married',
        emergencyContact: {
          name: 'Ahmed Ahmed',
          relationship: 'Spouse',
          phone: '+971-50-123-4568'
        }
      },
      education: [
        {
          degree: 'Doctor of Medicine',
          institution: 'Cairo University',
          graduationYear: '2008',
          country: 'Egypt',
          gpa: '3.8'
        }
      ],
      experience: [
        {
          position: 'General Practitioner',
          employer: 'Al Zahra Hospital Dubai',
          startDate: '2019-01-01',
          endDate: '2024-03-01',
          country: 'UAE',
          responsibilities: ['Primary care', 'Emergency medicine', 'Patient consultations']
        },
        {
          position: 'Resident Doctor',
          employer: 'Cairo General Hospital',
          startDate: '2009-07-01',
          endDate: '2018-12-31',
          country: 'Egypt',
          responsibilities: ['Internal medicine', 'Surgery rotation', 'ICU care']
        }
      ],
      documents: [
        { name: 'Medical Degree Certificate', status: 'verified', uploadedDate: '2024-03-16' },
        { name: 'Medical License', status: 'verified', uploadedDate: '2024-03-16' },
        { name: 'IELTS Certificate', status: 'verified', uploadedDate: '2024-03-17' },
        { name: 'Work Experience Letters', status: 'verified', uploadedDate: '2024-03-18' },
        { name: 'NCLEX Authorization', status: 'verified', uploadedDate: '2024-04-01' }
      ],
      timeline: [
        { date: '2024-08-25', event: 'Job offer accepted - Massachusetts General Hospital', type: 'success' },
        { date: '2024-08-20', event: 'Interview completed successfully', type: 'success' },
        { date: '2024-08-15', event: 'Job interview scheduled', type: 'info' },
        { date: '2024-07-30', event: 'NCLEX-RN exam passed - Score: 85%', type: 'success' },
        { date: '2024-06-15', event: 'Exam scheduled for July 30th', type: 'info' },
        { date: '2024-05-01', event: 'All documents verified', type: 'success' },
        { date: '2024-03-20', event: 'Documents submitted for review', type: 'info' },
        { date: '2024-03-15', event: 'Application started', type: 'info' }
      ],
      payments: [
        { date: '2024-03-15', description: 'NCLEX Registration Fee', amount: 350, type: 'service' },
        { date: '2024-04-01', description: 'Document Verification', amount: 500, type: 'service' },
        { date: '2024-06-15', description: 'Exam Preparation Materials', amount: 200, type: 'service' },
        { date: '2024-08-25', description: 'Job Placement Success Fee', amount: 1800, type: 'success' }
      ]
    },
    'CLT-002': {
      id: 'CLT-002',
      name: 'Nurse Maria Santos',
      profession: 'Registered Nurse',
      email: 'maria.santos@email.com',
      phone: '+63-917-234-5678',
      country: 'Philippines',
      targetCountry: 'UAE',
      service: 'DHA Dubai',
      status: 'License Approved',
      stage: 'Exam Complete',
      progress: 95,
      earnings: 2400,
      commission: 600,
      joinedDate: '2024-04-20',
      lastActivity: '2024-08-28',
      priority: 'high',
      notes: 'DHA license approved, finalizing job offer with Emirates Hospital',
      personalInfo: {
        dateOfBirth: '1990-03-20',
        nationality: 'Filipino',
        languages: ['Filipino', 'English'],
        maritalStatus: 'Single',
        emergencyContact: {
          name: 'Rosa Santos',
          relationship: 'Mother',
          phone: '+63-917-234-5679'
        }
      },
      education: [
        {
          degree: 'Bachelor of Science in Nursing',
          institution: 'University of Santo Tomas',
          graduationYear: '2012',
          country: 'Philippines',
          gpa: '3.9'
        }
      ],
      experience: [
        {
          position: 'Senior Staff Nurse',
          employer: 'Philippine General Hospital',
          startDate: '2015-01-01',
          endDate: '2024-04-01',
          country: 'Philippines',
          responsibilities: ['ICU nursing', 'Patient care', 'Staff supervision']
        }
      ],
      documents: [
        { name: 'Nursing Degree Certificate', status: 'verified', uploadedDate: '2024-04-21' },
        { name: 'Philippine Nursing License', status: 'verified', uploadedDate: '2024-04-21' },
        { name: 'IELTS Certificate', status: 'verified', uploadedDate: '2024-04-22' },
        { name: 'Work Experience Letters', status: 'verified', uploadedDate: '2024-04-23' },
        { name: 'DHA Eligibility Letter', status: 'verified', uploadedDate: '2024-07-01' }
      ],
      timeline: [
        { date: '2024-08-28', event: 'Job offer negotiation in progress', type: 'info' },
        { date: '2024-08-15', event: 'DHA license approved', type: 'success' },
        { date: '2024-07-30', event: 'DHA exam passed - Score: 82%', type: 'success' },
        { date: '2024-06-15', event: 'Exam scheduled', type: 'info' },
        { date: '2024-05-15', event: 'DataFlow verification completed', type: 'success' },
        { date: '2024-04-25', event: 'Documents submitted', type: 'info' },
        { date: '2024-04-20', event: 'Application initiated', type: 'info' }
      ],
      payments: [
        { date: '2024-04-20', description: 'DHA Registration', amount: 400, type: 'service' },
        { date: '2024-05-15', description: 'DataFlow Verification', amount: 600, type: 'service' },
        { date: '2024-06-15', description: 'Exam Fee', amount: 350, type: 'service' },
        { date: '2024-08-15', description: 'License Processing', amount: 1050, type: 'service' }
      ]
    }
  };
  
  return clientsData[id as keyof typeof clientsData] || null;
};

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactModal, setShowContactModal] = useState(false);

  const client = getClientById(params?.id as string);

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h2>
          <p className="text-gray-600 mb-6">The client you're looking for doesn't exist.</p>
          <Link href="/centralops/clients">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Back to Clients
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Placement Complete': return 'bg-green-100 text-green-800';
      case 'License Approved': return 'bg-blue-100 text-blue-800';
      case 'Exam Passed': return 'bg-purple-100 text-purple-800';
      case 'Exam Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'timeline', name: 'Timeline', icon: Activity },
    { id: 'payments', name: 'Payments', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                <p className="text-gray-600">{client.profession} • {client.service}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Contact</span>
              </button>
              <Link href={`/centralops/clients/${client.id}/edit`}>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Client Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
              <div className="space-y-4">
                <div className={`px-4 py-3 rounded-lg ${getStatusColor(client.status)}`}>
                  <p className="font-medium text-center">{client.status}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{client.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${client.progress}%` }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{client.country} → {client.targetCountry}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="font-medium text-gray-900">{new Date(client.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-bold text-xl text-green-600">${client.earnings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Commission</span>
                  <span className="font-bold text-lg text-blue-600">${client.commission}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Commission Rate</span>
                    <span>{((client.commission / client.earnings) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                          <p className="text-gray-900">{client.personalInfo?.dateOfBirth ? new Date(client.personalInfo.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Nationality</label>
                          <p className="text-gray-900">{client.personalInfo?.nationality || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Languages</label>
                          <p className="text-gray-900">{client.personalInfo?.languages?.join(', ') || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Marital Status</label>
                          <p className="text-gray-900">{client.personalInfo?.maritalStatus || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Education</h4>
                      {client.education?.map((edu, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                          <p className="text-gray-600">{edu.institution}, {edu.country}</p>
                          <p className="text-sm text-gray-500">Graduated: {edu.graduationYear} • GPA: {edu.gpa}</p>
                        </div>
                      ))}
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h4>
                      {client.experience?.map((exp, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-gray-900">{exp.position}</h5>
                          <p className="text-gray-600">{exp.employer}, {exp.country}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                          </p>
                          <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                            {exp.responsibilities.map((resp, idx) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Notes */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">{client.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-gray-900">Documents</h4>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        <span>Download All</span>
                      </button>
                    </div>
                    
                    {client.documents?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Timeline Tab */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Timeline</h4>
                    <div className="flow-root">
                      <ul className="-mb-8">
                        {client.timeline?.map((event, index) => (
                          <li key={index}>
                            <div className="relative pb-8">
                              {index !== client.timeline!.length - 1 && (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                              )}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center ring-8 ring-white">
                                    {getTimelineIcon(event.type)}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5">
                                  <div>
                                    <p className="text-sm text-gray-900">{event.event}</p>
                                    <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Payments Tab */}
                {activeTab === 'payments' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-gray-900">Payment History</h4>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Paid</p>
                        <p className="text-xl font-bold text-green-600">${client.earnings}</p>
                      </div>
                    </div>
                    
                    {client.payments?.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            payment.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            <DollarSign className={`h-4 w-4 ${
                              payment.type === 'success' ? 'text-green-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.description}</p>
                            <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${payment.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact {client.name}</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Phone className="h-5 w-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Call</p>
                  <p className="text-sm text-gray-500">{client.phone}</p>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Mail className="h-5 w-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Send Message</p>
                  <p className="text-sm text-gray-500">Internal messaging system</p>
                </div>
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}