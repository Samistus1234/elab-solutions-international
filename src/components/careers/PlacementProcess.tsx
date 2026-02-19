'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, FileSearch, Users, Plane, CheckCircle, LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  number: string
  title: string
  subtitle: string
  description: string
  gradientFrom: string
  gradientTo: string
  glowColor: string
}

const steps: Step[] = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Profile & Credentials',
    subtitle: 'Build your professional identity',
    description:
      'Resume optimisation, credential verification, skills assessment, and career goals mapping. Our experts craft a profile that opens the right doors.',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-cyan-500',
    glowColor: 'shadow-teal-500/20',
  },
  {
    icon: FileSearch,
    number: '02',
    title: 'AI-Powered Matching',
    subtitle: 'Intelligent opportunity discovery',
    description:
      'Our AI engine analyses thousands of verified roles and matches them to your profile, experience, and salary expectations. Personalised. Precise. Fast.',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-blue-500',
    glowColor: 'shadow-cyan-500/20',
  },
  {
    icon: Users,
    number: '03',
    title: 'Interview Mastery',
    subtitle: 'Prepare to impress',
    description:
      'Mock interviews, cultural orientation, technical preparation, and salary negotiation coaching. We ensure you walk into every interview with confidence.',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-500',
    glowColor: 'shadow-blue-500/20',
  },
  {
    icon: Plane,
    number: '04',
    title: 'Relocation & Visa',
    subtitle: 'We handle the paperwork',
    description:
      'End-to-end visa processing, housing assistance, family support, and cultural integration programmes. Your move to a new country, made seamless.',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-500',
    glowColor: 'shadow-violet-500/20',
  },
  {
    icon: CheckCircle,
    number: '05',
    title: 'Post-Placement Care',
    subtitle: 'A partnership that continues',
    description:
      '90-day follow-up, performance coaching, career development planning, and community building. We never disappear after you land the role.',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-500',
    glowColor: 'shadow-emerald-500/20',
  },
]

const stats = [
  { value: '95%', label: 'Placement Rate', sub: 'Within 60 days' },
  { value: '$15K+', label: 'Average Salary Raise', sub: 'vs. home country' },
  { value: '92%', label: 'Retention Rate', sub: 'After 2 years' },
]

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-6 md:gap-12 mb-10 last:mb-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
    >
      {/* Spacer (desktop only) */}
      <div className="hidden md:block flex-1" />

      {/* Icon node */}
      <div className="flex-shrink-0 flex flex-col items-center gap-0">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} flex items-center justify-center shadow-2xl ${step.glowColor}`}
        >
          <step.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
        </motion.div>
        {index < steps.length - 1 && (
          <div className="w-px h-10 bg-gradient-to-b from-white/15 to-transparent mt-3" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 bg-white/3 border border-white/8 rounded-2xl p-6 md:p-7 hover:bg-white/5 hover:border-white/12 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} bg-clip-text text-transparent leading-none opacity-25 select-none`}
          >
            {step.number}
          </span>
        </div>
        <h3 className="text-white text-lg md:text-xl font-black mb-1">{step.title}</h3>
        <p className="text-teal-400/80 text-sm font-medium mb-3">{step.subtitle}</p>
        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  )
}

export function PlacementProcess() {
  return (
    <section className="py-24 bg-[#060f1c] border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-teal-400 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            Our Process
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            From Profile
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
              to Placement
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            A concierge-level placement experience — we walk alongside you at every step of your
            international career journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-20">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#060f1c] px-8 py-10 text-center">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-2 leading-tight">
                {stat.value}
              </div>
              <div className="text-white font-bold mb-1">{stat.label}</div>
              <div className="text-slate-500 text-sm">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
