'use client'

import { motion } from 'framer-motion'
import { Users, Globe, Award, Clock } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Healthcare Professionals Placed',
    description: 'Successfully placed in top institutions',
  },
  {
    icon: Globe,
    value: '15+',
    label: 'Countries Served',
    description: 'Global reach across continents',
  },
  {
    icon: Award,
    value: '98%',
    label: 'Success Rate',
    description: 'In credentialing and licensing',
  },
  {
    icon: Clock,
    value: '48hrs',
    label: 'Average Processing Time',
    description: 'Fast-track verification services',
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Healthcare Professionals Worldwide
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Our track record speaks for itself - delivering excellence in healthcare credentialing and placement services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-primary-800 mb-4">
                <stat.icon className="h-8 w-8 text-primary-200" />
              </div>
              
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p className="text-primary-200">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}