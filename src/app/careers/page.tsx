import { Metadata } from 'next'
import { CareersHero } from '@/components/careers/CareersHero'
import { FeaturedEmployers } from '@/components/careers/FeaturedEmployers'
import { JobBoard } from '@/components/careers/JobBoard'
import { PlacementProcess } from '@/components/careers/PlacementProcess'
import { CareerResources } from '@/components/careers/CareerResources'

export const metadata: Metadata = {
  title: 'Global Hire — Healthcare Career Opportunities | eLab Solutions',
  description:
    'AI-matched healthcare roles across the Gulf & beyond. Verified institutions, expert placement — your next chapter starts here.',
}

export default function CareersPage() {
  return (
    <div className="bg-[#050e1a] min-h-screen">
      <CareersHero />
      <FeaturedEmployers />
      <JobBoard />
      <PlacementProcess />
      <CareerResources />
    </div>
  )
}
