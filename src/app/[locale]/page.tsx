import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsSection />
      <CTASection />
    </>
  )
}