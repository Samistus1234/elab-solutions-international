import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'eLab Solutions International - Healthcare Career Success',
  description: 'Your trusted partner for international healthcare career success. DataFlow verification, NCLEX preparation, global placement services.',
  keywords: 'healthcare licensing, NCLEX, DataFlow, nursing abroad, international nursing, healthcare jobs',
  authors: [{ name: 'eLab Solutions International' }],
  creator: 'eLab Solutions International',
  publisher: 'eLab Solutions International',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elabsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'eLab Solutions International - Healthcare Career Success',
    description: 'Your trusted partner for international healthcare career success.',
    url: 'https://elabsolutions.com',
    siteName: 'eLab Solutions International',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eLab Solutions International',
    description: 'Your trusted partner for international healthcare career success.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'eLab Solutions',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2563eb" />
          <meta name="msapplication-TileColor" content="#2563eb" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
        </head>
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
          <Footer />
          <PWAInstallPrompt />
          
          {/* Service Worker Registration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}