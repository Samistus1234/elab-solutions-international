import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { OfficeLocations } from '@/components/contact/OfficeLocations'
import { FAQSection } from '@/components/contact/FAQSection'

export const metadata: Metadata = {
  title: 'Contact Us | eLab Solutions International',
  description: 'Get in touch with eLab Solutions International. Contact our offices in Nigeria, UAE, and Saudi Arabia for healthcare credentialing and placement services.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      <OfficeLocations />
      <FAQSection />
    </>
  )
}