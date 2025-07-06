import { Metadata } from 'next'
import { DataFlowHero } from '@/components/services/dataflow/DataFlowHero'
import { DataFlowProcess } from '@/components/services/dataflow/DataFlowProcess'
import { DataFlowRequirements } from '@/components/services/dataflow/DataFlowRequirements'
import { DataFlowPricing } from '@/components/services/dataflow/DataFlowPricing'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'DataFlow Verification Services | eLab Solutions',
  description: 'Expert DataFlow primary source verification services for healthcare professionals. Fast processing, 98% success rate, real-time tracking.',
}

export default function DataFlowPage() {
  return (
    <>
      <DataFlowHero />
      <DataFlowProcess />
      <DataFlowRequirements />
      <DataFlowPricing />
      <CTASection />
    </>
  )
}