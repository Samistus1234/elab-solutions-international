import { Metadata } from 'next'
import { CentralOpsHero } from '@/components/centralops/CentralOpsHero'
import { PlatformFeatures } from '@/components/centralops/PlatformFeatures'
import { DashboardShowcase } from '@/components/centralops/DashboardShowcase'
import { IntegrationSection } from '@/components/centralops/IntegrationSection'
import { PlatformBenefits } from '@/components/centralops/PlatformBenefits'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'CentralOps Platform | eLab Solutions',
  description: 'Revolutionary platform for healthcare credentialing management. Real-time tracking, automated notifications, secure payments, and complete transparency.',
}

export default function CentralOpsPage() {
  return (
    <>
      <CentralOpsHero />
      <PlatformFeatures />
      <DashboardShowcase />
      <IntegrationSection />
      <PlatformBenefits />
      <CTASection />
    </>
  )
}