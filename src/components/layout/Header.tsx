'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, ChevronDown, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const { isSignedIn } = useUser();
  
  // All next-intl code and comments removed. Navigation and text are static.
  const pathname = usePathname() || ''
  // Remove useAuthStore, user, isAuthenticated, logout, and related logic

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'DataFlow Verification', href: '/services/dataflow' },
        { name: 'NCLEX Preparation', href: '/services/nclex' },
        { name: 'UK NMC Registration', href: '/services/uk-nmc' },
        { name: 'Australia AHPRA', href: '/services/australia' },
        { name: 'Consultation Services', href: '/services/consultation' },
      ],
    },
    { name: 'CentralOps', href: '/centralops' },
    { 
      name: 'ELAB Academy', 
      href: '/academy',
      dropdown: [
        { name: 'Exam Preparation', href: '/academy/exam-journey-solutions' },
        { name: 'Exam Booking Services', href: '/academy/exam-booking' },
        { name: 'Study Resources', href: '/academy' },
      ],
    },
    {
      name: 'Referral Program',
      href: '/referral-program',
      dropdown: [
        { name: 'Program Overview', href: '/referral-program' },
        { name: 'Join Program', href: '/referral-program/signup' },
        { name: 'Referral Dashboard', href: '/referral-program/dashboard' },
      ],
    },
    { name: 'Consultation', href: '/consultation' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const changeLanguage = (newLocale: string) => {
    // Language switching disabled for now
    console.log('Language switching disabled')
  }

  // Remove handleLogout

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">eLab Solutions</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setShowDropdown(item.name)}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                
                {item.dropdown && showDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2"
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
            
            {isSignedIn && (
              <Link href="/dashboard/overview" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Dashboard
              </Link>
            )}

            {/* Authentication Section */}
            <div className="flex items-center space-x-4">
              {!isSignedIn && (
                <>
                  <SignInButton mode="modal">
                    <button className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Login</button>
                  </SignInButton>
                  <Link href="/get-started">
                    <button className="bg-primary-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">Get Started</button>
                  </Link>
                </>
              )}
              {isSignedIn && (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
            
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                onMouseEnter={() => setShowLangDropdown(true)}
                onMouseLeave={() => setShowLangDropdown(false)}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === 'en')?.flag}
                </span>
              </button>
              
              {showLangDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                  onMouseEnter={() => setShowLangDropdown(true)}
                  onMouseLeave={() => setShowLangDropdown(false)}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        'en' === lang.code
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="text-gray-600 hover:text-primary-600 block px-3 py-2 text-sm"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isSignedIn && (
                  <Link href="/dashboard/overview" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                )}
                {/* Mobile Authentication */}
                <div className="pt-4 border-t border-gray-200">
                  {/* Replace user dropdown with Clerk's UserButton */}
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}