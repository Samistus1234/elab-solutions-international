import { Metadata } from 'next'
import { CareersHero } from '@/components/careers/CareersHero'
import { JobBoard } from '@/components/careers/JobBoard'
import { FeaturedEmployers } from '@/components/careers/FeaturedEmployers'
import { CareerResources } from '@/components/careers/CareerResources'
import { PlacementProcess } from '@/components/careers/PlacementProcess'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Global Hire - Healthcare Career Opportunities | eLab Solutions',
  description: 'Find your dream healthcare job worldwide. Browse opportunities in the Gulf region and beyond with our comprehensive job placement services.',
}

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <JobBoard />
      <FeaturedEmployers />
      <PlacementProcess />
      <CareerResources />
      <CTASection />
    </>
  )
}