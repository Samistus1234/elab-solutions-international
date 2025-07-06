import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be provided for all locales
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/contact': '/contact',
    
    // If locales use different paths, you can
    // specify each external path per locale
    '/academy': {
      en: '/academy',
      ar: '/الأكاديمية',
      fr: '/academie'
    },
    '/applications': {
      en: '/applications',
      ar: '/التطبيقات',
      fr: '/candidatures'
    },
    '/dashboard': {
      en: '/dashboard',
      ar: '/لوحة-التحكم',
      fr: '/tableau-de-bord'
    }
  },

  // Configure locale prefix behavior
  localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
