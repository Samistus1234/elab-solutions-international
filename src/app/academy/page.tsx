import { Metadata } from 'next'
import Link from 'next/link'
import { AcademyHero } from '@/components/academy/AcademyHero'
import { CourseOfferings } from '@/components/academy/CourseOfferings'
import { AITutorSection } from '@/components/academy/AITutorSection'
import { StudyResources } from '@/components/academy/StudyResources'
import { SuccessStories } from '@/components/academy/SuccessStories'
import { PricingPlans } from '@/components/academy/PricingPlans'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'ELAB Academy - AI-Powered Healthcare Exam Preparation',
  description: 'Prepare for NCLEX, Prometric, and English proficiency exams with AI tutors, extensive question banks, and personalized study plans.',
}

export default function AcademyPage() {
  return (
    <>
      <AcademyHero />
      {/* Academy Services Navigation */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Academy Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From exam preparation to booking services, we provide everything you need for your healthcare career success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/academy/exam-journey-solutions" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Exam Preparation
                </h3>
                <p className="text-gray-600 mb-6">
                  AI-powered study plans, practice tests, and personalized learning for NCLEX, Prometric, and English proficiency exams.
                </p>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold inline-block group-hover:bg-blue-700 transition-colors">
                  Start Learning →
                </div>
              </div>
            </Link>

            <Link href="/academy/exam-booking" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 0h8m-8 0v9a2 2 0 002 2h4.586a1 1 0 00.707-.293l5.414-5.414A1 1 0 0021 14.586V7a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Exam Booking Services
                </h3>
                <p className="text-gray-600 mb-6">
                  Professional exam booking for Prometric, Pearson VUE, NCLEX, DHA, HAAD, MOH, SCFHS, and more. Guaranteed slots.
                </p>
                <div className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold inline-block group-hover:bg-green-700 transition-colors">
                  Book Your Exam →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <CourseOfferings />
      <AITutorSection />
      <StudyResources />
      <SuccessStories />
      <PricingPlans />
      <CTASection />
    </>
  )
}