import { Metadata } from 'next'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { ProcessOverview } from '@/components/services/ProcessOverview'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Our Services | eLab Solutions International',
  description: 'Comprehensive healthcare credentialing, licensing, and placement services. DataFlow verification, regulatory licensing, exam preparation, and global placement.',
}

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServiceGrid />
      <ProcessOverview />
      <ServiceFAQ />
    </>
  )
}