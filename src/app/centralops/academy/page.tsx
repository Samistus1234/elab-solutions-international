'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, Eye, Edit, Download, Upload, Users,
  BookOpen, GraduationCap, Trophy, Clock, Star, TrendingUp,
  Calendar, FileText, Video, Play, CheckCircle, AlertCircle,
  Target, Award, Brain, Zap, Settings, Bell, BarChart3
} from 'lucide-react';

// Academy service definitions
const academyServices = [
  {
    id: 'nclex-prep',
    name: 'NCLEX-RN Preparation Course',
    category: 'Nursing Exams',
    duration: '12 weeks',
    format: 'Online + Live Sessions',
    price: 599,
    students: 1247,
    completionRate: 89.4,
    passRate: 94.2,
    rating: 4.8,
    modules: 24,
    description: 'Comprehensive NCLEX-RN preparation with live tutoring and practice tests',
    features: ['Live Q&A Sessions', 'Practice Tests', 'Study Materials', 'Progress Tracking']
  },
  {
    id: 'ielts-prep',
    name: 'IELTS Academic Preparation',
    category: 'Language Proficiency',
    duration: '8 weeks',
    format: 'Online Self-Paced',
    price: 299,
    students: 2156,
    completionRate: 76.8,
    passRate: 87.5,
    rating: 4.6,
    modules: 16,
    description: 'Complete IELTS preparation covering all four skills',
    features: ['Speaking Practice', 'Writing Feedback', 'Mock Tests', 'Vocabulary Builder']
  },
  {
    id: 'oet-prep',
    name: 'OET Healthcare Preparation',
    category: 'Language Proficiency',
    duration: '6 weeks',
    format: 'Blended Learning',
    price: 399,
    students: 876,
    completionRate: 82.3,
    passRate: 91.8,
    rating: 4.7,
    modules: 12,
    description: 'Specialized OET preparation for healthcare professionals',
    features: ['Healthcare Scenarios', 'Role Play Practice', 'Medical Vocabulary', 'Case Studies']
  },
  {
    id: 'cbt-prep',
    name: 'Computer Based Test (CBT) Preparation',
    category: 'UK Registration',
    duration: '4 weeks',
    format: 'Online Interactive',
    price: 199,
    students: 1534,
    completionRate: 94.1,
    passRate: 96.7,
    rating: 4.9,
    modules: 8,
    description: 'UK NMC CBT exam preparation with simulated tests',
    features: ['Simulated CBT Environment', 'Timed Practice', 'Instant Feedback', 'Performance Analytics']
  },
  {
    id: 'continuous-education',
    name: 'Continuing Professional Development',
    category: 'Professional Development',
    duration: 'Ongoing',
    format: 'Modular Online',
    price: 49,
    students: 3421,
    completionRate: 68.9,
    passRate: 95.4,
    rating: 4.5,
    modules: 52,
    description: 'CPD courses for healthcare professionals across specialties',
    features: ['Industry Updates', 'Best Practices', 'Certification Credits', 'Expert Webinars']
  }
];

// Mock enrolled students data
const enrolledStudents = [
  {
    id: 'STU-001',
    name: 'Dr. Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    course: 'NCLEX-RN Preparation Course',
    enrollmentDate: '2024-07-15',
    progress: 78,
    currentModule: 'Pharmacology Review',
    completedModules: 18,
    totalModules: 24,
    averageScore: 87,
    timeSpent: '156 hours',
    lastActivity: '2024-08-30',
    status: 'active',
    priority: 'high'
  },
  {
    id: 'STU-002',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    course: 'IELTS Academic Preparation',
    enrollmentDate: '2024-08-01',
    progress: 45,
    currentModule: 'Writing Task 2',
    completedModules: 7,
    totalModules: 16,
    averageScore: 82,
    timeSpent: '89 hours',
    lastActivity: '2024-08-29',
    status: 'active',
    priority: 'medium'
  },
  {
    id: 'STU-003',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    course: 'OET Healthcare Preparation',
    enrollmentDate: '2024-08-10',
    progress: 92,
    currentModule: 'Final Assessment',
    completedModules: 11,
    totalModules: 12,
    averageScore: 94,
    timeSpent: '67 hours',
    lastActivity: '2024-08-30',
    status: 'nearly-complete',
    priority: 'high'
  },
  {
    id: 'STU-004',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@email.com',
    course: 'Computer Based Test (CBT) Preparation',
    enrollmentDate: '2024-08-20',
    progress: 25,
    currentModule: 'Fundamentals of Nursing',
    completedModules: 2,
    totalModules: 8,
    averageScore: 91,
    timeSpent: '23 hours',
    lastActivity: '2024-08-28',
    status: 'active',
    priority: 'medium'
  }
];

const academyMetrics = {
  totalStudents: 9234,
  activeStudents: 6847,
  completedCourses: 12456,
  averageCompletionRate: 84.2,
  averagePassRate: 92.8,
  monthlyRevenue: 156780,
  coursesOffered: 47,
  instructors: 23
};

export default function AcademyManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const filteredStudents = enrolledStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'nearly-complete': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">eLab Academy Management</h1>
            <p className="text-gray-600">Comprehensive management of all Academy operations and student progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Enroll Student
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'courses', name: 'Course Catalog', icon: BookOpen },
              { id: 'students', name: 'Student Management', icon: Users },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{academyMetrics.totalStudents.toLocaleString()}</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">{academyMetrics.activeStudents.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600" />
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
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{academyMetrics.averageCompletionRate}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${(academyMetrics.monthlyRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Plus className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-medium">Create New Course</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Bulk Enroll Students</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Download className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-purple-700 font-medium">Export Reports</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-700 font-medium">Schedule Webinar</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Academy Activities</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { action: 'Course Completion', student: 'Ahmed Hassan', course: 'OET Preparation', details: 'Achieved 94% final score', time: '2 hours ago', type: 'success' },
                  { action: 'New Enrollment', student: 'Dr. Lisa Wong', course: 'NCLEX-RN Prep', details: 'Started Week 1 modules', time: '4 hours ago', type: 'info' },
                  { action: 'Assessment Failed', student: 'Maria Santos', course: 'IELTS Prep', details: 'Requires additional practice', time: '6 hours ago', type: 'warning' },
                  { action: 'Course Updated', course: 'CBT Preparation', details: 'Added new practice scenarios', time: '1 day ago', type: 'update' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`rounded-full p-2 ${
                      activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-yellow-100' :
                      activity.type === 'update' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'success' && <Trophy className="h-4 w-4 text-green-600" />}
                      {activity.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                      {activity.type === 'update' && <BookOpen className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'info' && <Users className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{activity.action}</h4>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {activity.student && `${activity.student} • `}{activity.course}
                      </p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Course Catalog Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Academy Course Catalog</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Course
                </button>
              </div>

              <div className="grid gap-6">
                {academyServices.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{course.name}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {course.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Price</p>
                            <p className="text-lg font-bold text-green-600">${course.price}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Students</p>
                            <p className="text-sm text-gray-900">{course.students.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Duration</p>
                            <p className="text-sm text-gray-900">{course.duration}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Pass Rate</p>
                            <p className="text-sm text-gray-900">{course.passRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Rating</p>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-900 ml-1">{course.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500 mb-2">Features</p>
                          <div className="flex flex-wrap gap-2">
                            {course.features.map((feature, featureIndex) => (
                              <span key={featureIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col space-y-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          View Details
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                          Edit Course
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                          Enroll Students
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Students Management Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Courses</option>
                    {academyServices.map(course => (
                      <option key={course.id} value={course.name}>{course.name}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="nearly-complete">Nearly Complete</option>
                    <option value="completed">Completed</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid gap-6">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowStudentModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(student.priority)}`} title={`${student.priority} priority`} />
                      </div>
                      <p className="text-gray-600 mb-2">{student.email}</p>
                      <p className="text-gray-600 text-sm">{student.course}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Current Module: {student.currentModule}
                      </span>
                      <span className="text-sm text-gray-600">
                        {student.completedModules}/{student.totalModules} ({student.progress}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Enrolled</p>
                      <p className="font-medium">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average Score</p>
                      <p className="font-medium text-green-600">{student.averageScore}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time Spent</p>
                      <p className="font-medium">{student.timeSpent}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Activity</p>
                      <p className="font-medium">{new Date(student.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms or filters.' : 'Enroll students to get started.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Academy Performance Analytics</h3>
              <p className="text-gray-600">Comprehensive analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Student Progress Details</h3>
              <button 
                onClick={() => setShowStudentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">Student Information</h4>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedStudent.name}</p>
                  <p><strong>Email:</strong> {selectedStudent.email}</p>
                  <p><strong>Course:</strong> {selectedStudent.course}</p>
                  <p><strong>Enrollment Date:</strong> {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Progress Statistics</h4>
                <div className="space-y-2">
                  <p><strong>Overall Progress:</strong> {selectedStudent.progress}%</p>
                  <p><strong>Average Score:</strong> <span className="text-green-600">{selectedStudent.averageScore}%</span></p>
                  <p><strong>Time Spent:</strong> {selectedStudent.timeSpent}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Course Progress</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${selectedStudent.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {selectedStudent.completedModules} of {selectedStudent.totalModules} modules completed
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Current: {selectedStudent.currentModule}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Send Message
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Schedule Session
              </button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                Reset Progress
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                View Certificates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}