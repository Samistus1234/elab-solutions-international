'use client'

import { motion } from 'framer-motion'
import { MapPin, Star, ArrowRight } from 'lucide-react'

const employers = [
  {
    name: 'Cleveland Clinic Abu Dhabi',
    abbr: 'CC',
    location: 'Abu Dhabi, UAE',
    flag: '🇦🇪',
    openJobs: 45,
    rating: 4.8,
    specialties: ['Cardiology', 'Oncology', 'Neurology'],
  },
  {
    name: 'King Faisal Specialist Hospital',
    abbr: 'KF',
    location: 'Riyadh, Saudi Arabia',
    flag: '🇸🇦',
    openJobs: 62,
    rating: 4.7,
    specialties: ['Oncology', 'Transplant', 'Genetics'],
  },
  {
    name: 'Hamad Medical Corporation',
    abbr: 'HM',
    location: 'Doha, Qatar',
    flag: '🇶🇦',
    openJobs: 38,
    rating: 4.6,
    specialties: ['Emergency', 'Pediatrics', "Women's Health"],
  },
  {
    name: 'Dubai Health Authority',
    abbr: 'DH',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    openJobs: 55,
    rating: 4.7,
    specialties: ['Public Health', 'Primary Care', 'Specialized Care'],
  },
  {
    name: 'Mediclinic Middle East',
    abbr: 'MC',
    location: 'Multiple Locations',
    flag: '🌍',
    openJobs: 41,
    rating: 4.5,
    specialties: ['Multi-specialty', 'Emergency', 'Outpatient'],
  },
  {
    name: 'Saudi German Hospital Group',
    abbr: 'SG',
    location: 'MENA Region',
    flag: '🌍',
    openJobs: 33,
    rating: 4.6,
    specialties: ['General Surgery', 'Orthopedics', 'Maternity'],
  },
]

// Duplicate for seamless loop
const track = [...employers, ...employers]

export function FeaturedEmployers() {
  return (
    <section className="py-16 bg-[#050e1a] border-y border-white/5 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-teal-400 text-xs font-mono uppercase tracking-[0.2em] mb-2">
              Verified Partners
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Featured Healthcare Institutions
            </h2>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ x: 4 }}
            className="hidden md:flex items-center gap-1.5 text-teal-400 text-sm font-semibold"
          >
            Become a Partner <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#050e1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#050e1a] to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <motion.div
          className="flex gap-4 px-4 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {track.map((emp, i) => (
            <div
              key={`${emp.abbr}-${i}`}
              className="flex-shrink-0 w-72 bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-teal-500/30 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            >
              {/* Header row */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-300 text-xs font-black tracking-wider">{emp.abbr}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-sm leading-tight truncate">
                    {emp.name}
                  </h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{emp.flag} {emp.location}</span>
                  </p>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {emp.specialties.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-teal-500/10 border border-teal-500/15 text-teal-400 px-2 py-0.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
                  <span className="text-white text-sm font-semibold">{emp.rating}</span>
                </div>
                <span className="text-teal-400 text-xs font-medium bg-teal-500/10 border border-teal-500/15 px-3 py-1 rounded-full">
                  {emp.openJobs} open roles
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
