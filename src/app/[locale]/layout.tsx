import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/components/auth/AuthProvider'

export const metadata: Metadata = {
  title: 'eLab Solutions International - Healthcare Credentialing & Placement',
  description: 'Leading provider of healthcare credentialing, regulatory licensing, and global placement services. Specializing in DataFlow verification, exam preparation, and connecting healthcare professionals with opportunities worldwide.',
  keywords: 'healthcare credentialing, DataFlow verification, NCLEX preparation, Prometric exam, healthcare placement, Gulf region healthcare, medical licensing',
  openGraph: {
    title: 'eLab Solutions International',
    description: 'Your trusted partner for healthcare credentialing and global placement',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_AE', 'fr_FR'],
  },
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`@/locales/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </AuthProvider>
    </NextIntlClientProvider>
  )
}