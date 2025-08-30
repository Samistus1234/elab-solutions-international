import { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { OurStory } from '@/components/about/OurStory'
import { OurValues } from '@/components/about/OurValues'
import { TeamSection } from '@/components/about/TeamSection'
import { PartnersSection } from '@/components/about/PartnersSection'
import { AwardsSection } from '@/components/about/AwardsSection'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About Us | eLab Solutions International',
  description: 'Learn about eLab Solutions International - Leading healthcare credentialing and placement services provider with Nigerian roots and global reach.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurValues />
      <TeamSection />
      <PartnersSection />
      <AwardsSection />
      <CTASection />
    </>
  )
}