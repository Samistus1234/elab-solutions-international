'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Zap, FileText, GraduationCap, Users, BarChart3, Settings,
  ArrowRight, CheckCircle, Clock, TrendingUp, Target, Award
} from 'lucide-react';

const operationsModules = [
  {
    id: 'services',
    title: 'Service Management',
    description: 'Complete oversight of all eLab services and client journeys',
    icon: Zap,
    href: '/centralops/services',
    color: 'from-green-600 to-teal-600',
    metrics: {
      activeServices: 834,
      completedServices: 2891,
      successRate: '89.2%'
    },
    features: [
      'Service instance tracking',
      'Progress monitoring',
      'Client journey oversight',
      'Performance analytics'
    ]
  },
  {
    id: 'applications',
    title: 'Application Management',
    description: 'Complete pipeline management from lead to placement',
    icon: FileText,
    href: '/centralops/applications',
    color: 'from-red-600 to-pink-600',
    metrics: {
      totalApplications: 1247,
      activeApplications: 834,
      conversionRate: '36.5%'
    },
    features: [
      'Lead tracking & conversion',
      'Application pipeline',
      'Stage management',
      'Performance metrics'
    ]
  },
  {
    id: 'academy',
    title: 'Academy Management',
    description: 'Comprehensive management of all Academy operations and student progress',
    icon: GraduationCap,
    href: '/centralops/academy',
    color: 'from-indigo-600 to-blue-600',
    metrics: {
      totalStudents: 9234,
      activeStudents: 6847,
      completionRate: '84.2%'
    },
    features: [
      'Course catalog management',
      'Student progress tracking',
      'Performance analytics',
      'Certification management'
    ]
  }
];

const operationsMetrics = {
  totalClients: 15328,
  activeOperations: 4512,
  monthlyProcessed: 789,
  successRate: 87.6,
  averageCompletionTime: 73,
  totalRevenue: 3450000
};

const recentActivities = [
  {
    type: 'service',
    title: 'DataFlow PSV Completed',
    client: 'Dr. Sarah Ahmed',
    module: 'Service Management',
    time: '2 hours ago',
    status: 'success'
  },
  {
    type: 'application',
    title: 'New Application Submitted',
    client: 'Maria Santos',
    module: 'Application Management',
    time: '4 hours ago',
    status: 'info'
  },
  {
    type: 'academy',
    title: 'Course Completion',
    client: 'Ahmed Hassan',
    module: 'Academy Management',
    time: '6 hours ago',
    status: 'success'
  },
  {
    type: 'service',
    title: 'Stage Update Required',
    client: 'Dr. Priya Sharma',
    module: 'Service Management',
    time: '1 day ago',
    status: 'warning'
  }
];

export default function OperationsHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Operations Hub</h1>
              <p className="text-gray-600 mt-1">Centralized command center for all eLab operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Operations Report
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{operationsMetrics.totalClients.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Operations</p>
                <p className="text-2xl font-bold text-gray-900">{operationsMetrics.activeOperations.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{operationsMetrics.successRate}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Operations Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {operationsModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Module Header */}
              <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <module.icon className="h-8 w-8" />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Settings className="h-5 w-5 opacity-50" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-white/90 text-sm">{module.description}</p>
              </div>

              {/* Module Content */}
              <div className="p-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(module.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Link href={module.href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r ${module.color} text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-200`}
                  >
                    Access {module.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities Across All Operations */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Operations Activities</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Activities</button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`rounded-full p-2 ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' :
                  activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {activity.status === 'warning' && <Clock className="h-4 w-4 text-yellow-600" />}
                  {activity.status === 'info' && <FileText className="h-4 w-4 text-blue-600" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.client} • {activity.module}</p>
                </div>
                
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Operations Performance</h3>
            <p className="text-blue-100">Real-time overview of all operational metrics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{operationsMetrics.monthlyProcessed}</div>
              <div className="text-blue-100">Processed This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{operationsMetrics.averageCompletionTime} days</div>
              <div className="text-blue-100">Avg. Completion Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">${(operationsMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-blue-100">Total Operations Value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}