'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'

const teamMembers = [
  {
    name: 'Dr. Adebayo Ogundimu',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Healthcare visionary with 20+ years experience in international healthcare staffing',
    linkedin: '#',
    email: 'ceo@elabsolutions.com',
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Operations expert specializing in Gulf region healthcare regulations',
    linkedin: '#',
    email: 'coo@elabsolutions.com',
  },
  {
    name: 'John Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'Tech innovator behind CentralOps platform and AI-powered solutions',
    linkedin: '#',
    email: 'cto@elabsolutions.com',
  },
  {
    name: 'Dr. Sarah Mensah',
    role: 'Head of Academy',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    bio: 'Education specialist with expertise in healthcare professional development',
    linkedin: '#',
    email: 'academy@elabsolutions.com',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Regional Director - Middle East',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    bio: 'Strategic leader with deep connections across Gulf healthcare institutions',
    linkedin: '#',
    email: 'me@elabsolutions.com',
  },
  {
    name: 'Grace Okafor',
    role: 'Head of Client Success',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Customer advocate ensuring exceptional experiences for all clients',
    linkedin: '#',
    email: 'success@elabsolutions.com',
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals dedicated to transforming healthcare careers and 
            improving global healthcare delivery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-4">
                  {member.bio}
                </p>
                
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Growing Team
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for 
            transforming healthcare careers. Explore opportunities to join our team.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            View Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  )
}