'use client'

import { motion } from 'framer-motion'
import { Milestone, TrendingUp, Globe, Users } from 'lucide-react'

const milestones = [
  {
    year: '2015',
    title: 'Foundation',
    description: 'eLab Solutions founded in Lagos, Nigeria with a vision to connect African healthcare talent with global opportunities.',
    icon: Milestone,
  },
  {
    year: '2017',
    title: 'Regional Expansion',
    description: 'Opened offices in Dubai and Riyadh, establishing presence in the Gulf region.',
    icon: Globe,
  },
  {
    year: '2019',
    title: 'Technology Launch',
    description: 'Launched CentralOps platform, revolutionizing the credentialing process with digital innovation.',
    icon: TrendingUp,
  },
  {
    year: '2021',
    title: 'Academy Launch',
    description: 'Introduced ELAB Academy with AI-powered learning for healthcare professionals.',
    icon: Users,
  },
  {
    year: '2024',
    title: 'Global Leader',
    description: 'Recognized as the leading healthcare credentialing partner across 15+ countries.',
    icon: Globe,
  },
]

export function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Story: From Lagos to the World
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              Founded in Lagos, Nigeria, eLab Solutions International began with a simple yet 
              powerful mission: to bridge the gap between talented healthcare professionals in 
              emerging markets and opportunities in developed healthcare systems.
            </p>
            
            <p className="text-lg text-gray-600 mb-6">
              What started as a small team helping Nigerian nurses navigate the complex world of 
              international credentialing has grown into a global organization serving healthcare 
              professionals from across Africa, Asia, and beyond.
            </p>
            
            <p className="text-lg text-gray-600">
              Today, we're proud to maintain our Nigerian roots while operating as a truly 
              international company, with offices across the Gulf region and partnerships 
              worldwide. Our journey reflects the aspirations of the healthcare professionals 
              we serve - ambitious, dedicated, and globally minded.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="ELAB team collaboration"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-primary-600 text-white rounded-xl p-6 shadow-xl">
              <div className="text-3xl font-bold mb-2">9+</div>
              <p className="text-primary-100">Years of Excellence</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Journey Through the Years
          </h3>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden lg:block"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1" />
                
                <div className="relative z-10 bg-primary-600 text-white rounded-full p-4 shadow-lg">
                  <milestone.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1 px-8">
                  <div className={`bg-gray-50 rounded-xl p-6 ${
                    index % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'
                  }`}>
                    <div className="text-primary-600 font-bold text-xl mb-2">
                      {milestone.year}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}