'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Monitor, Smartphone, Tablet } from 'lucide-react'

const devices = [
  { id: 'desktop', name: 'Desktop', icon: Monitor },
  { id: 'tablet', name: 'Tablet', icon: Tablet },
  { id: 'mobile', name: 'Mobile', icon: Smartphone },
]

export function DashboardShowcase() {
  const [activeDevice, setActiveDevice] = useState('desktop')

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Experience the Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A beautifully designed interface that makes managing your credentialing 
            process intuitive and efficient
          </p>
          
          <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-12">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => setActiveDevice(device.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  activeDevice === device.id
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <device.icon className="h-5 w-5" />
                <span className="font-medium">{device.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          <div className={`relative ${
            activeDevice === 'desktop' ? 'aspect-[16/9]' : 
            activeDevice === 'tablet' ? 'max-w-2xl mx-auto aspect-[4/3]' : 
            'max-w-sm mx-auto aspect-[9/16]'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-800 p-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm">CentralOps Dashboard</span>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50">
                <div className="grid gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-900">Application Status</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        In Progress
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Document Verification</span>
                        <span className="text-green-600">✓ Complete</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">DataFlow Processing</span>
                        <span className="text-blue-600">→ In Progress</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Authority Review</span>
                        <span className="text-gray-400">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  {activeDevice === 'desktop' && (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-gray-600 text-sm mb-2">Total Applications</h4>
                          <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-gray-600 text-sm mb-2">Completed</h4>
                          <p className="text-2xl font-bold text-green-600">8</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-gray-600 text-sm mb-2">In Progress</h4>
                          <p className="text-2xl font-bold text-blue-600">4</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">DataFlow report generated</span>
                            <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Document uploaded</span>
                            <span className="text-xs text-gray-400 ml-auto">5 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
            <p className="text-gray-600">User Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">2.5x</div>
            <p className="text-gray-600">Faster Processing</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">Zero</div>
            <p className="text-gray-600">Data Breaches</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}