'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, MapPin, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'

const SPECIALTIES = [
  'Nursing',
  'Laboratory',
  'Pharmacy',
  'Radiology',
  'Allied Health',
  'Dentistry',
  'Physiotherapy',
]

const FLOATING_STATS = [
  { value: '5,200+', label: 'Active Roles', emoji: '💼', from: 'from-teal-500/20', to: 'to-cyan-500/20' },
  { value: '15', label: 'Countries', emoji: '🌍', from: 'from-blue-500/20', to: 'to-indigo-500/20' },
  { value: '95%', label: 'Placed in 60d', emoji: '⚡', from: 'from-emerald-500/20', to: 'to-teal-500/20' },
  { value: '$15K+', label: 'Avg Salary Raise', emoji: '📈', from: 'from-amber-500/20', to: 'to-orange-500/20' },
]

export function CareersHero() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null)
  const [aiMode, setAiMode] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050e1a]"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-teal-500/8 blur-[120px]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-cyan-500/6 blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-blue-600/4 blur-[160px]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,196,196,0.12) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          <div className="max-w-5xl mx-auto">

            {/* AI Mode pill */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onClick={() => setAiMode(!aiMode)}
              className={`inline-flex items-center gap-2.5 mb-10 px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                aiMode
                  ? 'border-teal-400/60 bg-teal-500/15 shadow-lg shadow-teal-500/10'
                  : 'border-white/10 bg-white/4 hover:border-teal-500/40'
              }`}
            >
              <Zap className={`h-4 w-4 ${aiMode ? 'text-teal-300' : 'text-teal-600'}`} />
              <span className={`text-sm font-semibold tracking-wide ${aiMode ? 'text-teal-300' : 'text-slate-500'}`}>
                {aiMode ? 'AI Matching Active' : 'Enable AI Match'}
              </span>
              {/* Toggle */}
              <span
                className={`relative inline-flex w-9 h-5 rounded-full transition-colors duration-300 ${
                  aiMode ? 'bg-teal-500' : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                    aiMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </span>
            </motion.button>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.88] text-white mb-7"
            >
              <span className="block">Your Career.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
                Global Stage.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
            >
              AI-matched healthcare roles across the Gulf &amp; beyond.
              Verified institutions. Expert placement. Your next chapter starts here.
            </motion.p>

            {/* Smart search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.6 }}
              className={`rounded-2xl p-2 mb-6 transition-all duration-300 ${
                aiMode
                  ? 'bg-teal-950/60 border border-teal-500/25 shadow-2xl shadow-teal-500/10 backdrop-blur-xl'
                  : 'bg-white/5 border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  {aiMode ? (
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400" />
                  ) : (
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  )}
                  <input
                    type="text"
                    placeholder={aiMode ? 'Describe your ideal role...' : 'Role, specialty, or keyword...'}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none text-base"
                  />
                </div>
                <div className="hidden md:block w-px bg-white/8" />
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Country or city..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none text-base"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white whitespace-nowrap transition-all duration-200 ${
                    aiMode
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/30'
                      : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-cyan-500'
                  }`}
                >
                  {aiMode ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      AI Search
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Find Jobs
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Specialty quick-select pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-16"
            >
              <span className="text-slate-600 text-sm pr-1">Quick:</span>
              {SPECIALTIES.map((s, i) => (
                <motion.button
                  key={s}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.62 + i * 0.045 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSpecialty(activeSpecialty === s ? null : s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    activeSpecialty === s
                      ? 'bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-500/20'
                      : 'border-white/10 text-slate-400 hover:border-teal-500/40 hover:text-teal-300 bg-white/2'
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>

            {/* Floating stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FLOATING_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.78 + i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br ${stat.from} ${stat.to} backdrop-blur-sm border border-white/8 rounded-2xl p-5 cursor-default`}
                >
                  <div className="text-2xl mb-2">{stat.emoji}</div>
                  <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-teal-400/40 to-transparent" />
        <span className="text-xs text-slate-700 tracking-[0.2em] uppercase font-medium">Scroll</span>
      </motion.div>
    </section>
  )
}
