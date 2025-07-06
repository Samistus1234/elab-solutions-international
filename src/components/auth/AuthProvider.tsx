/**
 * Authentication Provider for ELAB Solutions International
 * 
 * This component provides authentication context and handles
 * session initialization, token refresh, and activity monitoring.
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { useAuthStore } from '@/lib/auth/auth-store';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface AuthProviderProps {
  readonly children: ReactNode;
}

// ============================================================================
// AUTHENTICATION PROVIDER COMPONENT
// ============================================================================

export function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const initialize = useAuthStore((state) => state.initialize);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const updateActivity = useAuthStore((state) => state.updateActivity);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);

  // Refs for timers
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Initialize authentication state on mount
    initialize();
  }, [initialize]);

  // ============================================================================
  // TOKEN REFRESH MANAGEMENT
  // ============================================================================

  useEffect(() => {
    if (!isAuthenticated || !session) {
      // Clear refresh timer if not authenticated
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      return;
    }

    // Set up automatic token refresh
    const setupTokenRefresh = () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }

      // Refresh token 5 minutes before expiration
      const refreshInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      refreshTimerRef.current = setInterval(async () => {
        try {
          await refreshToken();
        } catch (error) {
          console.error('Token refresh failed:', error);
          // If refresh fails, logout user
          await logout();
        }
      }, refreshInterval);
    };

    setupTokenRefresh();

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [isAuthenticated, session, refreshToken, logout]);

  // ============================================================================
  // ACTIVITY MONITORING
  // ============================================================================

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Update activity on route change
    updateActivity();

    // Set up activity monitoring
    const handleActivity = () => {
      updateActivity();
      
      // Reset session timeout
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }

      // Set session timeout (30 minutes of inactivity)
      const sessionTimeout = 30 * 60 * 1000; // 30 minutes
      sessionTimeoutRef.current = setTimeout(async () => {
        console.log('Session expired due to inactivity');
        await logout();
      }, sessionTimeout);
    };

    // Activity events to monitor
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Throttle activity updates to avoid excessive calls
    let activityTimeout: NodeJS.Timeout | null = null;
    const throttledHandleActivity = () => {
      if (activityTimeout) {
        return;
      }

      activityTimeout = setTimeout(() => {
        handleActivity();
        activityTimeout = null;
      }, 60000); // Update activity at most once per minute
    };

    // Add event listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, throttledHandleActivity, true);
    });

    // Initial activity setup
    handleActivity();

    return () => {
      // Remove event listeners
      activityEvents.forEach(event => {
        document.removeEventListener(event, throttledHandleActivity, true);
      });

      // Clear timeouts
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, [isAuthenticated, updateActivity, logout, pathname]);

  // ============================================================================
  // SESSION VALIDATION
  // ============================================================================

  useEffect(() => {
    if (!isAuthenticated || !session) {
      return;
    }

    // Validate session periodically
    const validateSession = async () => {
      try {
        // Check if session is still valid
        const sessionExpiry = new Date(session.expiresAt).getTime();
        const now = Date.now();

        if (now >= sessionExpiry) {
          console.log('Session expired');
          await logout();
          return;
        }

        // Check if user is still active (optional server-side validation)
        // This could include checking if the user account is still active,
        // permissions haven't changed, etc.
        
      } catch (error) {
        console.error('Session validation failed:', error);
        await logout();
      }
    };

    // Validate session every 5 minutes
    const validationInterval = 5 * 60 * 1000; // 5 minutes
    const validationTimer = setInterval(validateSession, validationInterval);

    return () => {
      clearInterval(validationTimer);
    };
  }, [isAuthenticated, session, logout]);

  // ============================================================================
  // SECURITY MONITORING
  // ============================================================================

  useEffect(() => {
    if (!isAuthenticated || !session) {
      return;
    }

    // Monitor for suspicious activity
    const monitorSecurity = () => {
      // Check for multiple tabs/windows
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Tab became hidden
          updateActivity();
        } else {
          // Tab became visible
          updateActivity();
          
          // Optionally refresh token when tab becomes active
          // to ensure we have a fresh token
          refreshToken().catch(console.error);
        }
      };

      // Check for storage changes (potential token theft)
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'elab_auth_session' || event.key === 'elab_refresh_token') {
          // Session storage was modified externally
          console.warn('Session storage modified externally');
          
          // Re-initialize to check if session is still valid
          initialize();
        }
      };

      // Add event listeners
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('storage', handleStorageChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('storage', handleStorageChange);
      };
    };

    const cleanup = monitorSecurity();

    return cleanup;
  }, [isAuthenticated, session, updateActivity, refreshToken, initialize]);

  // ============================================================================
  // ERROR BOUNDARY
  // ============================================================================

  useEffect(() => {
    // Global error handler for authentication errors
    const handleGlobalError = (event: ErrorEvent) => {
      const error = event.error;
      
      // Check if error is authentication-related
      if (
        error?.message?.includes('401') ||
        error?.message?.includes('Unauthorized') ||
        error?.message?.includes('Authentication')
      ) {
        console.error('Authentication error detected:', error);
        logout().catch(console.error);
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      
      if (
        reason?.status === 401 ||
        reason?.message?.includes('Unauthorized') ||
        reason?.message?.includes('Authentication')
      ) {
        console.error('Authentication rejection detected:', reason);
        logout().catch(console.error);
      }
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [logout]);

  // ============================================================================
  // CLEANUP ON UNMOUNT
  // ============================================================================

  useEffect(() => {
    return () => {
      // Clear all timers on unmount
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
      }
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}

// ============================================================================
// AUTHENTICATION GUARD COMPONENT
// ============================================================================

interface AuthGuardProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly requireAuth?: boolean;
  readonly requiredRole?: string;
  readonly requiredPermissions?: string[];
}

export function AuthGuard({
  children,
  fallback = null,
  requireAuth = true,
  requiredRole,
  requiredPermissions = []
}: AuthGuardProps) {
  const { isAuthenticated, user, checkPermission, hasRole } = useAuthStore();

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check role requirement
  if (requiredRole && user && !hasRole(requiredRole as any)) {
    return <>{fallback}</>;
  }

  // Check permission requirements
  if (requiredPermissions.length > 0 && user) {
    const hasAllPermissions = requiredPermissions.every(permission =>
      checkPermission(permission as any)
    );

    if (!hasAllPermissions) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// ============================================================================
// LOADING COMPONENT
// ============================================================================

export function AuthLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Initializing authentication...</p>
      </div>
    </div>
  );
}

export default AuthProvider;
