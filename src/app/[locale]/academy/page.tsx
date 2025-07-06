import { Metadata } from 'next'
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
      <CourseOfferings />
      <AITutorSection />
      <StudyResources />
      <SuccessStories />
      <PricingPlans />
      <CTASection />
    </>
  )
}