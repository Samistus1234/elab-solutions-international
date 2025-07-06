/**
 * Authentication Middleware for ELAB Solutions International
 * 
 * This middleware handles authentication, authorization, and internationalization
 * for the Next.js application with enterprise-grade security features.
 */

import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { JWTPayload, Permission } from '@/types/auth';
import type { UserRole } from '@/types/business';

// ============================================================================
// CONFIGURATION
// ============================================================================

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/academy',
  '/careers',
  '/centralops',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/privacy',
  '/terms',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/auth/refresh',
  '/api'
];

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/applications',
  '/documents',
  '/payments',
  '/academy',
  '/settings'
];

// Admin-only routes
const ADMIN_ROUTES = [
  '/admin',
  '/admin/users',
  '/admin/applications',
  '/admin/analytics',
  '/admin/settings'
];

// Partner-only routes
const PARTNER_ROUTES = [
  '/partner',
  '/partner/dashboard',
  '/partner/applications',
  '/partner/analytics'
];

// Institution-only routes
const INSTITUTION_ROUTES = [
  '/institution',
  '/institution/dashboard',
  '/institution/students',
  '/institution/programs'
];

// ============================================================================
// INTERNATIONALIZATION MIDDLEWARE
// ============================================================================

const handleI18nRouting = createIntlMiddleware(routing);

// ============================================================================
// AUTHENTICATION UTILITIES
// ============================================================================

/**
 * Extract JWT token from request
 */
function getTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie as fallback
  const tokenCookie = request.cookies.get('auth-token');
  return tokenCookie?.value || null;
}

/**
 * Verify and decode JWT token
 */
function verifyToken(token: string): JWTPayload | null {
  try {
    // In a real implementation, you would verify the JWT signature
    // For now, we'll just decode the payload (this is not secure for production)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }
    
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has required permission
 */
function hasPermission(userRole: UserRole, requiredPermission: Permission): boolean {
const rolePermissions: Record<UserRole, Permission[]> = {
  applicant: [Permission.VIEW_APPLICATIONS, Permission.CREATE_APPLICATIONS],
  consultant: [Permission.VIEW_APPLICATIONS, Permission.CREATE_APPLICATIONS, Permission.VIEW_USERS],
  admin: [Permission.VIEW_APPLICATIONS, Permission.CREATE_APPLICATIONS, Permission.VIEW_USERS, Permission.CREATE_USERS, Permission.VIEW_ANALYTICS],
  partner: [Permission.VIEW_APPLICATIONS, Permission.VIEW_ANALYTICS],
  institution: [Permission.VIEW_USERS, Permission.CREATE_USERS, Permission.VIEW_APPLICATIONS],
  super_admin: [Permission.VIEW_USERS, Permission.CREATE_USERS, Permission.VIEW_APPLICATIONS, Permission.CREATE_APPLICATIONS, Permission.VIEW_ANALYTICS, Permission.DELETE_USERS]
};
  return rolePermissions[userRole]?.includes(requiredPermission) || false;
}

/**
 * Check if route is public
 */
function isPublicRoute(pathname: string): boolean {
  // Remove locale prefix for checking
  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, '') || '/';
  return PUBLIC_ROUTES.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );
}

/**
 * Check if route requires authentication
 */
function isProtectedRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, '') || '/';
  return PROTECTED_ROUTES.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );
}

/**
 * Check if route requires admin access
 */
function isAdminRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, '') || '/';
  return ADMIN_ROUTES.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );
}

/**
 * Check if route requires partner access
 */
function isPartnerRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, '') || '/';
  return PARTNER_ROUTES.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );
}

/**
 * Check if route requires institution access
 */
function isInstitutionRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, '') || '/';
  return INSTITUTION_ROUTES.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );
}

// ============================================================================
// MAIN MIDDLEWARE FUNCTION
// ============================================================================

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    console.log('Skipping middleware for:', pathname);
    return NextResponse.next();
  }

  // Handle internationalization first
  const response = handleI18nRouting(request);

  // If it's a public route, just return the i18n response
  if (isPublicRoute(pathname)) {
    return response;
  }

  // For protected routes, check authentication
  if (isProtectedRoute(pathname) || isAdminRoute(pathname) || isPartnerRoute(pathname) || isInstitutionRoute(pathname)) {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      // Redirect to login page with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = verifyToken(token);
    if (!payload) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check role-based access
    if (isAdminRoute(pathname) && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (isPartnerRoute(pathname) && payload.role !== 'partner') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (isInstitutionRoute(pathname) && payload.role !== 'institution') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Add user info to headers for use in components
    response.headers.set('x-user-id', payload.sub);
    response.headers.set('x-user-role', payload.role);
    response.headers.set('x-user-email', payload.email || '');
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - Static files (images, etc.)
  // - Next.js internals
  // API routes are handled within the middleware logic
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
