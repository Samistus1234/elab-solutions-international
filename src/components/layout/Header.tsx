'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, ChevronDown, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useAuthStore } from '@/lib/auth/auth-store'

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
  
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    {
      name: t('services'),
      href: `/${locale}/services`,
      dropdown: [
        { name: 'DataFlow Verification', href: `/${locale}/services/dataflow` },
        { name: 'Regulatory Licensing', href: `/${locale}/services/licensing` },
        { name: 'Credential Evaluation', href: `/${locale}/services/credentials` },
      ],
    },
    { name: t('centralOps'), href: `/${locale}/centralops` },
    { name: t('academy'), href: `/${locale}/academy` },
    { name: t('careers'), href: `/${locale}/careers` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ]

  const changeLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    window.location.href = newPathname
  }

  const handleLogout = () => {
    logout()
    window.location.href = `/${locale}`
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center">
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
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                    onMouseEnter={() => setShowUserDropdown(true)}
                    onMouseLeave={() => setShowUserDropdown(false)}
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {user?.profile?.firstName || user?.email}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showUserDropdown && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                      onMouseEnter={() => setShowUserDropdown(true)}
                      onMouseLeave={() => setShowUserDropdown(false)}
                    >
                      <Link
                        href={`/${locale}/dashboard`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-2">📊</span>
                        {t('dashboard')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2 inline" />
                        {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/${locale}/login`}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="bg-primary-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
                >
                  {t('getStarted')}
                </Link>
              </div>
            )}
            
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                onMouseEnter={() => setShowLangDropdown(true)}
                onMouseLeave={() => setShowLangDropdown(false)}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === locale)?.flag}
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
                        locale === lang.code
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
                
                {/* Mobile Authentication */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Link
                        href={`/${locale}/dashboard`}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                        onClick={() => setIsOpen(false)}
                      >
                        📊 {t('dashboard')}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                      >
                        <LogOut className="h-4 w-4 mr-2 inline" />
                        {t('logout')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href={`/${locale}/login`}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('login')}
                      </Link>
                      <Link
                        href={`/${locale}/register`}
                        className="block bg-primary-600 text-white px-3 py-2 text-base font-medium rounded-md hover:bg-primary-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('getStarted')}
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Mobile Language Selection */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code)
                          setIsOpen(false)
                        }}
                        className={`px-3 py-2 text-sm rounded ${
                          locale === lang.code
                            ? 'bg-primary-100 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}