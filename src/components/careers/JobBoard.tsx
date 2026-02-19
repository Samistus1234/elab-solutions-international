'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Clock,
  ChevronRight,
  Heart,
  Sparkles,
  SlidersHorizontal,
  MapPin,
} from 'lucide-react'

const jobListings = [
  {
    id: 1,
    title: 'Senior Registered Nurse — ICU',
    company: 'Dubai Medical Center',
    companyAbbr: 'DMC',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    type: 'Full-time',
    experience: '5+ yrs',
    salary: '$80K – $95K',
    posted: '2d ago',
    featured: true,
    aiMatch: 94,
    description:
      'Leading hospital in Dubai seeks experienced ICU nurse with DHA license or eligibility. Housing allowance, annual flights, and exceptional benefits included.',
    tags: ['BSN Required', 'ICU Experience', 'BLS/ACLS Certified'],
    specialty: 'Nursing',
  },
  {
    id: 2,
    title: 'Clinical Laboratory Scientist',
    company: 'King Faisal Specialist Hospital',
    companyAbbr: 'KFS',
    location: 'Riyadh, Saudi Arabia',
    flag: '🇸🇦',
    type: 'Full-time',
    experience: '3+ yrs',
    salary: '$70K – $85K',
    posted: '3d ago',
    featured: true,
    aiMatch: 88,
    description:
      'Join our world-class laboratory team. SCFHS license support provided. Work alongside leading researchers in a state-of-the-art facility.',
    tags: ['BSc Lab Science', 'ASCP Preferred', 'Molecular Diagnostics'],
    specialty: 'Laboratory',
  },
  {
    id: 3,
    title: 'Oncology Pharmacist',
    company: 'Hamad Medical Corporation',
    companyAbbr: 'HMC',
    location: 'Doha, Qatar',
    flag: '🇶🇦',
    type: 'Full-time',
    experience: '4+ yrs',
    salary: '$75K – $90K',
    posted: '5d ago',
    featured: false,
    aiMatch: 79,
    description:
      'Oncology pharmacist needed for leading cancer centre. QCHP registration required. Tax-free salary with excellent perks and career development.',
    tags: ['PharmD', 'Oncology Experience', 'QCHP Registration'],
    specialty: 'Pharmacy',
  },
  {
    id: 4,
    title: 'Radiologic Technologist',
    company: 'Cleveland Clinic Abu Dhabi',
    companyAbbr: 'CCA',
    location: 'Abu Dhabi, UAE',
    flag: '🇦🇪',
    type: 'Full-time',
    experience: '2+ yrs',
    salary: '$60K – $75K',
    posted: '1w ago',
    featured: false,
    aiMatch: 72,
    description:
      'Join our radiology department at a world-ranked institution. HAAD license or eligibility required. MRI/CT experience preferred.',
    tags: ['ARRT Certified', 'MRI/CT Experience', 'HAAD Eligible'],
    specialty: 'Radiology',
  },
  {
    id: 5,
    title: 'NICU Specialist Nurse',
    company: 'Mediclinic Middle East',
    companyAbbr: 'MME',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    type: 'Full-time',
    experience: '3+ yrs',
    salary: '$70K – $85K',
    posted: '1w ago',
    featured: true,
    aiMatch: 91,
    description:
      'Specialized NICU nurse for level III nursery. NRP certification required. Excellent benefits package with family accommodation.',
    tags: ['NICU Experience', 'NRP Certified', 'DHA Eligible'],
    specialty: 'Nursing',
  },
]

const FILTER_OPTIONS: Record<string, string[]> = {
  Specialty: ['All', 'Nursing', 'Laboratory', 'Pharmacy', 'Radiology', 'Allied Health'],
  Location: ['All', 'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  Experience: ['All', 'Entry Level', '1–3 years', '3–5 years', '5+ years'],
  Type: ['All', 'Full-time', 'Part-time', 'Contract', 'Locum'],
}

export function JobBoard() {
  const [filters, setFilters] = useState<Record<string, string>>({
    Specialty: 'All',
    Location: 'All',
    Experience: 'All',
    Type: 'All',
  })
  const [saved, setSaved] = useState<number[]>([])
  const [aiRanked, setAiRanked] = useState(false)

  const displayJobs = aiRanked
    ? [...jobListings].sort((a, b) => b.aiMatch - a.aiMatch)
    : jobListings

  const toggleSave = (id: number) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  return (
    <section id="job-board" className="py-20 bg-[#050e1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-teal-400 text-xs font-mono uppercase tracking-[0.2em] mb-2">
              Smart Job Board
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Latest Opportunities
            </h2>
            <p className="text-slate-500 text-sm mt-1.5">
              {displayJobs.length} verified positions available
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setAiRanked(!aiRanked)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
              aiRanked
                ? 'bg-teal-500/20 border-teal-500/40 text-teal-300 shadow-lg shadow-teal-500/10'
                : 'bg-white/4 border-white/10 text-slate-400 hover:border-teal-500/30 hover:text-teal-400'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            AI Ranked
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Filter sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-7">
                <SlidersHorizontal className="h-4 w-4 text-teal-400" />
                <span className="text-white font-bold text-sm">Filter Jobs</span>
              </div>

              {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
                <div key={key} className="mb-6 last:mb-0">
                  <label className="block text-xs text-slate-500 uppercase tracking-[0.15em] font-medium mb-2.5">
                    {key}
                  </label>
                  <div className="space-y-1">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFilters({ ...filters, [key]: opt })}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                          filters[key] === opt
                            ? 'bg-teal-500/15 text-teal-300 border border-teal-500/25'
                            : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setFilters({ Specialty: 'All', Location: 'All', Experience: 'All', Type: 'All' })
                }
                className="w-full text-slate-600 hover:text-teal-400 text-xs mt-4 transition-colors font-medium"
              >
                Reset all filters
              </button>
            </div>
          </div>

          {/* Job list */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="popLayout">
              {displayJobs.map((job, i) => (
                <motion.article
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer group ${
                    job.featured
                      ? 'bg-white/4 border-teal-500/25 hover:border-teal-500/45 hover:bg-white/6'
                      : 'bg-white/3 border-white/7 hover:border-white/14 hover:bg-white/5'
                  }`}
                >
                  {/* Featured badge */}
                  {job.featured && (
                    <div className="absolute top-0 left-6 -translate-y-1/2">
                      <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-md shadow-teal-500/20">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Top row */}
                  <div className="flex items-start gap-4">
                    {/* Company avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700/80 to-slate-800 border border-white/8 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-300 text-xs font-black tracking-wider">
                        {job.companyAbbr}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {job.title}
                        </h3>
                        {aiRanked && (
                          <span className="flex items-center gap-1 bg-teal-500/12 border border-teal-500/20 text-teal-400 text-xs px-2.5 py-0.5 rounded-full">
                            <Sparkles className="h-3 w-3" />
                            {job.aiMatch}% match
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.flag} {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {job.posted}
                        </span>
                      </div>
                    </div>

                    {/* Save button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(job.id)
                      }}
                      className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                        saved.includes(job.id)
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                          : 'bg-white/5 text-slate-600 hover:text-slate-400 border border-white/8'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${saved.includes(job.id) ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mt-4 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white/4 border border-white/8 text-slate-400 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-sm flex-wrap">
                      <span className="text-slate-500 bg-white/4 border border-white/7 px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className="text-slate-500 bg-white/4 border border-white/7 px-3 py-1 rounded-full">
                        {job.experience}
                      </span>
                      <span className="text-emerald-400 font-bold">{job.salary}</span>
                    </div>
                    <Link
                      href={`/careers/${job.id}`}
                      className="flex items-center gap-1 text-teal-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
                    >
                      View role <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {/* Load more */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="border border-teal-500/25 text-teal-400 px-10 py-4 rounded-xl font-bold hover:bg-teal-500/8 hover:border-teal-500/40 transition-all duration-200"
              >
                Load More Opportunities
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
