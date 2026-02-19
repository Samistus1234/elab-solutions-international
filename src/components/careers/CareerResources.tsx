'use client'

import { motion } from 'framer-motion'
import { FileText, Video, Download, BookOpen, Users, TrendingUp, ArrowRight, Upload } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface Resource {
  icon: LucideIcon
  title: string
  description: string
  type: string
  action: string
  accentFrom: string
  accentTo: string
  textAccent: string
  bgAccent: string
}

const resources: Resource[] = [
  {
    icon: FileText,
    title: 'CV Writing Guide',
    description:
      'Craft a standout CV tailored for Gulf healthcare positions. Templates, tips, and expert feedback included.',
    type: 'PDF Guide',
    action: 'Download Free',
    accentFrom: 'from-teal-500/15',
    accentTo: 'to-cyan-500/15',
    textAccent: 'text-teal-400',
    bgAccent: 'bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: Video,
    title: 'Interview Masterclass',
    description:
      'Video series on acing healthcare interviews in international settings. Real questions, real answers.',
    type: 'Video Course',
    action: 'Watch Now',
    accentFrom: 'from-blue-500/15',
    accentTo: 'to-indigo-500/15',
    textAccent: 'text-blue-400',
    bgAccent: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: BookOpen,
    title: 'Country Guides',
    description:
      'Living and working guides for every Gulf country — culture, licensing requirements, and daily life.',
    type: 'E-Books',
    action: 'Read More',
    accentFrom: 'from-violet-500/15',
    accentTo: 'to-purple-500/15',
    textAccent: 'text-violet-400',
    bgAccent: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: TrendingUp,
    title: '2025 Salary Report',
    description:
      'Healthcare salary trends by specialty, seniority, and country. Data updated quarterly.',
    type: 'Report',
    action: 'View Report',
    accentFrom: 'from-amber-500/15',
    accentTo: 'to-orange-500/15',
    textAccent: 'text-amber-400',
    bgAccent: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Users,
    title: 'Success Stories',
    description:
      'Professionals who made the move. Real journeys, real outcomes, real insights from the field.',
    type: 'Case Studies',
    action: 'Read Stories',
    accentFrom: 'from-emerald-500/15',
    accentTo: 'to-teal-500/15',
    textAccent: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Download,
    title: 'Application Pack',
    description:
      'Cover letters, templates, and application checklists built specifically for each Gulf country.',
    type: 'Templates',
    action: 'Get Pack',
    accentFrom: 'from-rose-500/15',
    accentTo: 'to-pink-500/15',
    textAccent: 'text-rose-400',
    bgAccent: 'bg-rose-500/10 border-rose-500/20',
  },
]

export function CareerResources() {
  return (
    <section className="py-24 bg-[#050e1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className="text-teal-400 text-xs font-mono uppercase tracking-[0.2em] mb-3">
              Resources
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Everything You Need
              <br />
              <span className="text-slate-600">to Get There</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-xs leading-relaxed text-sm md:text-base">
            Free tools, guides, and templates to give your international career search a real
            head-start.
          </p>
        </motion.div>

        {/* Resource grid — magazine layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {resources.map((res, i) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${res.accentFrom} ${res.accentTo} border border-white/8 rounded-2xl p-6 group cursor-pointer hover:border-white/14 transition-all duration-300`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl border ${res.bgAccent}`}>
                  <res.icon className={`h-5 w-5 ${res.textAccent}`} />
                </div>
                <span className="text-xs text-slate-500 bg-black/20 border border-white/5 px-2.5 py-1 rounded-full">
                  {res.type}
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-2 leading-tight">{res.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{res.description}</p>

              <motion.button
                whileHover={{ x: 4 }}
                className={`flex items-center gap-2 text-sm font-semibold ${res.textAccent} transition-all duration-200`}
              >
                {res.action}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Upload CTA — full-width bold strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden border border-teal-500/18"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/70 via-[#071a2a]/80 to-blue-950/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/6 to-cyan-500/4" />
          <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-cyan-500/6 rounded-full blur-2xl pointer-events-none" />

          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(0,196,196,0.2) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-14 py-12 md:py-14">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                Ready to Begin?
              </h3>
              <p className="text-slate-400 max-w-md leading-relaxed text-sm md:text-base">
                Upload your CV and let our placement experts match you with the right opportunity.
                Free, confidential — response within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 36px rgba(20,184,166,0.28)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-teal-500/20 transition-all duration-200"
              >
                <Upload className="h-5 w-5" />
                Upload Your CV
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 text-teal-400 font-semibold px-4 py-4 text-sm transition-all duration-200"
              >
                Talk to an Expert <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
