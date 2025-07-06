'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Building, Clock, DollarSign, ChevronRight, Filter, Heart } from 'lucide-react'

const jobListings = [
  {
    id: 1,
    title: 'Senior Registered Nurse - ICU',
    company: 'Dubai Medical Center',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '5+ years',
    salary: '$80,000 - $95,000',
    posted: '2 days ago',
    featured: true,
    description: 'Leading hospital in Dubai seeks experienced ICU nurse with DHA license or eligibility.',
    requirements: ['BSN required', 'ICU experience', 'BLS/ACLS certified'],
  },
  {
    id: 2,
    title: 'Clinical Laboratory Scientist',
    company: 'King Faisal Specialist Hospital',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$70,000 - $85,000',
    posted: '3 days ago',
    featured: true,
    description: 'Join our world-class laboratory team. SCFHS license support provided.',
    requirements: ['Bachelor in Lab Science', 'ASCP certified preferred', 'Molecular diagnostics experience'],
  },
  {
    id: 3,
    title: 'Pharmacist - Oncology',
    company: 'Hamad Medical Corporation',
    location: 'Doha, Qatar',
    type: 'Full-time',
    experience: '4+ years',
    salary: '$75,000 - $90,000',
    posted: '5 days ago',
    featured: false,
    description: 'Oncology pharmacist needed for leading cancer center. QCHP registration required.',
    requirements: ['PharmD or equivalent', 'Oncology experience', 'Arabic language advantage'],
  },
  {
    id: 4,
    title: 'Radiologic Technologist',
    company: 'Cleveland Clinic Abu Dhabi',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    experience: '2+ years',
    salary: '$60,000 - $75,000',
    posted: '1 week ago',
    featured: false,
    description: 'Join our radiology department. HAAD license or eligibility required.',
    requirements: ['ARRT certified', 'MRI/CT experience', 'Patient care skills'],
  },
  {
    id: 5,
    title: 'NICU Nurse',
    company: 'Mediclinic Middle East',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$70,000 - $85,000',
    posted: '1 week ago',
    featured: true,
    description: 'Specialized NICU nurse for level III nursery. Excellent benefits package.',
    requirements: ['NICU experience mandatory', 'NRP certified', 'DHA license or eligible'],
  },
]

const filters = {
  specialties: ['Nursing', 'Laboratory', 'Pharmacy', 'Radiology', 'Allied Health'],
  locations: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  experience: ['Entry Level', '1-3 years', '3-5 years', '5+ years'],
  jobType: ['Full-time', 'Part-time', 'Contract', 'Locum'],
}

export function JobBoard() {
  const [selectedFilters, setSelectedFilters] = useState({
    specialty: '',
    location: '',
    experience: '',
    jobType: '',
  })
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Job Opportunities</h2>
          <p className="text-gray-600">Find your perfect match from our verified job listings</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 mr-2 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filter Jobs</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={selectedFilters.specialty}
                    onChange={(e) => setSelectedFilters({...selectedFilters, specialty: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Specialties</option>
                    {filters.specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {filters.locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={selectedFilters.experience}
                    onChange={(e) => setSelectedFilters({...selectedFilters, experience: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    {filters.experience.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={selectedFilters.jobType}
                    onChange={(e) => setSelectedFilters({...selectedFilters, jobType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {filters.jobType.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => setSelectedFilters({ specialty: '', location: '', experience: '', jobType: '' })}
                  className="w-full text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 space-y-6">
            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${
                  job.featured ? 'border-2 border-teal-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    {job.featured && (
                      <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        Featured
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.posted}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`ml-4 p-2 rounded-lg transition-colors ${
                      savedJobs.includes(job.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.map((req) => (
                    <span key={req} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {req}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">{job.type}</span>
                    <span className="text-gray-600">{job.experience}</span>
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                  
                  <Link
                    href={`/careers/${job.id}`}
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold"
                  >
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <button className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Load More Jobs
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}