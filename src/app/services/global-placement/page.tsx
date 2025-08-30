'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Globe, Clock, Users, MapPin, Briefcase, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

const placementDestinations = [
  {
    country: 'United States',
    flag: '🇺🇸',
    opportunities: '15,000+ positions',
    averageSalary: '$75,000 - $95,000',
    specialties: ['ICU Nursing', 'Emergency Medicine', 'Pediatrics', 'Surgery'],
    requirements: ['NCLEX Pass', 'English Proficiency', 'Work Experience'],
    visaSupport: true,
    description: 'World-class healthcare system with excellent career growth opportunities'
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧', 
    opportunities: '8,500+ positions',
    averageSalary: '£28,000 - £45,000',
    specialties: ['NHS Nursing', 'General Practice', 'Mental Health', 'Community Care'],
    requirements: ['NMC Registration', 'IELTS 7.0', 'Clinical Experience'],
    visaSupport: true,
    description: 'Join the prestigious NHS with comprehensive benefits and training'
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    opportunities: '6,200+ positions', 
    averageSalary: 'AU$65,000 - $85,000',
    specialties: ['Aged Care', 'Emergency Nursing', 'Theatre Nursing', 'Midwifery'],
    requirements: ['AHPRA Registration', 'English Test', 'Skills Assessment'],
    visaSupport: true,
    description: 'High quality of life with excellent work-life balance'
  },
  {
    country: 'Middle East',
    flag: '🇦🇪',
    opportunities: '12,000+ positions',
    averageSalary: '$45,000 - $65,000 (Tax-free)',
    specialties: ['Critical Care', 'Surgery', 'Cardiology', 'Emergency Medicine'],
    requirements: ['DataFlow PSV', 'Professional License', 'Experience Certificate'],
    visaSupport: true,
    description: 'Tax-free income with modern facilities and multicultural environment'
  }
];

const placementServices = [
  {
    icon: MapPin,
    title: 'Job Matching',
    description: 'AI-powered matching system connects you with positions that fit your skills and preferences'
  },
  {
    icon: Users,
    title: 'Interview Coaching',
    description: 'Comprehensive interview preparation including mock interviews and feedback sessions'
  },
  {
    icon: Briefcase,
    title: 'CV Optimization',
    description: 'Professional CV writing and optimization for international healthcare standards'
  },
  {
    icon: Globe,
    title: 'Visa Assistance',
    description: 'Complete visa application support and documentation guidance'
  },
  {
    icon: TrendingUp,
    title: 'Salary Negotiation',
    description: 'Expert guidance on salary expectations and contract negotiation'
  },
  {
    icon: Star,
    title: 'Post-Placement Support',
    description: 'Ongoing support for the first 6 months including relocation assistance'
  }
];

const successStories = [
  {
    name: 'Sarah Al-Mahmoud',
    role: 'ICU Nurse',
    origin: 'Jordan',
    destination: 'Houston, Texas, USA',
    image: '👩‍⚕️',
    story: 'From Amman to Houston Methodist Hospital - achieved my American dream with eLab\'s support',
    salary: '$82,000',
    timeline: '8 months'
  },
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Emergency Physician', 
    origin: 'India',
    destination: 'London, UK',
    image: '👨‍⚕️',
    story: 'Joined NHS as an Emergency Medicine consultant through eLab\'s comprehensive placement program',
    salary: '£65,000',
    timeline: '12 months'
  },
  {
    name: 'Maria Santos',
    role: 'Midwife',
    origin: 'Philippines', 
    destination: 'Sydney, Australia',
    image: '👩‍⚕️',
    story: 'Living my dream in Australia with perfect work-life balance and career growth',
    salary: 'AU$78,000',
    timeline: '6 months'
  }
];

export default function GlobalPlacementPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Global Healthcare Placement Services
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Connect with top healthcare institutions worldwide. From job matching to visa support - we handle your entire international career journey.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">41,700+</div>
                <div className="text-sm">Available Positions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">2,800+</div>
                <div className="text-sm">Successful Placements</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Partner Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">96%</div>
                <div className="text-sm">Placement Success Rate</div>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-white text-purple-700 font-bold py-4 px-8 rounded-full hover:bg-purple-50 transition-colors text-lg"
            >
              Find Your Dream Job
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Placement Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Placement Destinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting healthcare opportunities across the world's leading healthcare systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {placementDestinations.map((destination, index) => (
              <motion.div
                key={destination.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-purple-600 text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{destination.flag}</div>
                    {destination.visaSupport && (
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        Visa Support
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{destination.country}</h3>
                  <p className="text-white/90">{destination.description}</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-600">Available Positions</div>
                      <div className="font-bold text-purple-600">{destination.opportunities}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Average Salary</div>
                      <div className="font-bold text-purple-600">{destination.averageSalary}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Top Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-1">
                      {destination.requirements.map((req) => (
                        <li key={req} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Explore Opportunities
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Placement Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end support from application to arrival - we're with you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placementServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real professionals, real success stories - see how we've helped transform healthcare careers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <div className="text-6xl mb-4">{story.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{story.name}</h3>
                <div className="text-purple-600 font-medium mb-2">{story.role}</div>
                <div className="text-sm text-gray-600 mb-4">
                  {story.origin} → {story.destination}
                </div>
                
                <p className="text-gray-600 italic mb-6">"{story.story}"</p>
                
                <div className="flex justify-between text-sm bg-gray-50 rounded-lg p-3">
                  <div>
                    <div className="text-gray-600">Salary</div>
                    <div className="font-bold text-purple-600">{story.salary}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Timeline</div>
                    <div className="font-bold text-purple-600">{story.timeline}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Global Healthcare Career?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who found their dream jobs worldwide through our expert placement services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full hover:bg-purple-50 transition-colors text-lg"
            >
              Apply for Placement
            </Link>
            <Link
              href="/careers"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-purple-600 transition-colors text-lg"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}