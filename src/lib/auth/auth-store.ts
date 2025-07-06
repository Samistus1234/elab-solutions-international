/**
 * Authentication Store for ELAB Solutions International
 * 
 * This module provides the global authentication state management using Zustand.
 * It integrates with the AuthClient and provides reactive state updates.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  AuthState,
  AuthActions,
  AuthStore,
  LoginCredentials,
  RegisterData,
  PasswordResetData,
  ChangePasswordData,
  EmailVerificationData,
  PhoneVerificationData,
  TwoFactorVerificationData,
  Permission
} from '@/types/auth';
import type { User, UserRole } from '@/types/business';
import { realAuthClient as authClient } from './auth-client-real';
import { isSuccess, isError } from '@/types/utils';

// ============================================================================
// AUTHENTICATION STORE IMPLEMENTATION
// ============================================================================

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // ============================================================================
        // STATE
        // ============================================================================
        isAuthenticated: false,
        user: null,
        session: null,
        loading: false,
        error: null,
        lastActivity: null,

        // ============================================================================
        // AUTHENTICATION ACTIONS
        // ============================================================================

        /**
         * Login user with credentials
         */
        login: async (credentials: LoginCredentials) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.login(credentials);

            if (isSuccess(result)) {
              // Set auth token cookie for middleware
              if (typeof window !== 'undefined' && result.data.accessToken) {
                document.cookie = `auth-token=${result.data.accessToken}; path=/; max-age=86400; samesite=lax`;
              }
              
              set({
                isAuthenticated: true,
                user: result.data.user,
                session: result.data,
                loading: false,
                error: null,
                lastActivity: new Date().toISOString()
              });
            } else {
              const errorMessage = result.success ? 'Login failed' : result.error.message;
              set({
                isAuthenticated: false,
                user: null,
                session: null,
                loading: false,
                error: errorMessage
              });
              throw new Error(errorMessage);
            }
          } catch (error) {
            set({
              isAuthenticated: false,
              user: null,
              session: null,
              loading: false,
              error: error instanceof Error ? error.message : 'Login failed'
            });
          }
        },

        /**
         * Register new user
         */
        register: async (data: RegisterData) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.register(data);

            if (isSuccess(result)) {
              set({
                loading: false,
                error: null
              });

              // If email verification is not required, automatically log in
              if (!result.data.requiresVerification) {
                await get().login({
                  email: data.email,
                  password: data.password
                });
              }
            } else {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Registration failed'
            });
          }
        },

        /**
         * Logout user
         */
        logout: async () => {
          set({ loading: true });

          try {
            await authClient.logout();
          } catch (error) {
            console.warn('Logout error:', error);
          } finally {
            // Clear auth token cookie
            if (typeof window !== 'undefined') {
              document.cookie = 'auth-token=; path=/; max-age=0; samesite=lax';
            }
            
            set({
              isAuthenticated: false,
              user: null,
              session: null,
              loading: false,
              error: null,
              lastActivity: null
            });
          }
        },

        /**
         * Refresh authentication token
         */
        refreshToken: async () => {
          try {
            const result = await authClient.refreshToken();

            if (isSuccess(result)) {
              const session = await authClient.getCurrentSession();
              if (session) {
                set({
                  session,
                  lastActivity: new Date().toISOString()
                });
              }
            } else {
              // Token refresh failed, logout user
              await get().logout();
            }
          } catch (error) {
            console.warn('Token refresh error:', error);
            await get().logout();
          }
        },

        /**
         * Request password reset
         */
        forgotPassword: async (email: string) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.forgotPassword({ email });

            if (isError(result)) {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            } else {
              set({
                loading: false,
                error: null
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Password reset request failed'
            });
          }
        },

        /**
         * Reset password with token
         */
        resetPassword: async (data: PasswordResetData) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.resetPassword(data);

            if (isError(result)) {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            } else {
              set({
                loading: false,
                error: null
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Password reset failed'
            });
          }
        },

        /**
         * Change user password
         */
        changePassword: async (data: ChangePasswordData) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.changePassword(data);

            if (isError(result)) {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            } else {
              set({
                loading: false,
                error: null
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Password change failed'
            });
          }
        },

        /**
         * Verify email address
         */
        verifyEmail: async (data: EmailVerificationData) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.verifyEmail(data);

            if (isError(result)) {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            } else {
              set({
                loading: false,
                error: null
              });

              // Update user's email verification status
              const { user } = get();
              if (user) {
                set({
                  user: {
                    ...user,
                    emailVerifiedAt: new Date().toISOString()
                  }
                });
              }
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Email verification failed'
            });
          }
        },

        /**
         * Verify phone number
         */
        verifyPhone: async (data: PhoneVerificationData) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.verifyPhone(data);

            if (isError(result)) {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            } else {
              set({
                loading: false,
                error: null
              });

              // Update user's phone verification status
              const { user } = get();
              if (user) {
                set({
                  user: {
                    ...user,
                    phoneVerifiedAt: new Date().toISOString()
                  }
                });
              }
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Phone verification failed'
            });
          }
        },

        /**
         * Enable two-factor authentication
         */
        enableTwoFactor: async () => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.enableTwoFactor();

            set({ loading: false });

            if (isError(result)) {
              set({ error: result.success ? null : result.error.message });
              throw result.error;
            }

            return result.success ? result.data : null;
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Two-factor setup failed'
            });
            throw error;
          }
        },

        /**
         * Verify two-factor authentication code
         */
        verifyTwoFactor: async (data: TwoFactorVerificationData) => {
          set({ loading: true, error: null });

          try {
            const result = await authClient.verifyTwoFactor(data);

            if (isError(result)) {
              set({
                loading: false,
                error: result.success ? null : result.error.message
              });
            } else {
              set({
                loading: false,
                error: null
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Two-factor verification failed'
            });
          }
        },

        /**
         * Disable two-factor authentication
         */
        disableTwoFactor: async (password: string) => {
          set({ loading: true, error: null });

          try {
            // Implementation would call authClient.disableTwoFactor(password)
            // For now, just simulate the call
            set({
              loading: false,
              error: null
            });
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Two-factor disable failed'
            });
          }
        },

        /**
         * Update user profile
         */
        updateProfile: async (data: Partial<User['profile']>) => {
          set({ loading: true, error: null });

          try {
            // Implementation would call userService.updateProfile(data)
            // For now, just update local state
            const { user } = get();
            if (user) {
              set({
                user: {
                  ...user,
                  profile: {
                    ...user.profile,
                    ...data
                  },
                  updatedAt: new Date().toISOString()
                },
                loading: false,
                error: null
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Profile update failed'
            });
          }
        },

        // ============================================================================
        // AUTHORIZATION HELPERS
        // ============================================================================

        /**
         * Check if user has specific permission
         */
        checkPermission: (permission: Permission, resourceId?: string) => {
          const { session } = get();
          
          if (!session) {
            return false;
          }

          // Decode JWT to get permissions
          try {
            const payload = JSON.parse(atob(session.accessToken.split('.')[1]));
            const permissions: Permission[] = payload.permissions || [];
            
            return permissions.includes(permission);
          } catch {
            return false;
          }
        },

        /**
         * Check if user has specific role
         */
        hasRole: (role: UserRole) => {
          const { user } = get();
          return user?.role === role;
        },

        /**
         * Clear authentication error
         */
        clearError: () => {
          set({ error: null });
        },

        // ============================================================================
        // SESSION MANAGEMENT
        // ============================================================================

        /**
         * Initialize authentication state from stored session
         */
        initialize: async () => {
          set({ loading: true });

          try {
            const isAuth = authClient.isAuthenticated();
            
            if (isAuth) {
              // For now, just set authenticated state
              set({
                isAuthenticated: true,
                loading: false,
                error: null,
                lastActivity: new Date().toISOString()
              });
              return;
            }

            // Not authenticated
            set({
              isAuthenticated: false,
              user: null,
              session: null,
              loading: false,
              error: null
            });

          } catch (error) {
            console.error('Auth initialization error:', error);
            set({
              isAuthenticated: false,
              user: null,
              session: null,
              loading: false,
              error: error instanceof Error ? error.message : 'Authentication initialization failed'
            });
          }
        },


        /**
         * Clear authentication error
         */
        clearError: () => {
          set({ error: null });
        },

        /**
         * Update last activity timestamp
         */
        updateActivity: () => {
          set({ lastActivity: new Date().toISOString() });
        },

        /**
         * Check if user has specific permission
         */
        checkPermission: (permission: Permission): boolean => {
          const { session } = get();
          
          if (!session) {
            return false;
          }

          // Decode JWT to get permissions
          try {
            const payload = JSON.parse(atob(session.accessToken.split('.')[1]));
            const permissions: Permission[] = payload.permissions || [];
            
            return permissions.includes(permission);
          } catch {
            return false;
          }
        },

        /**
         * Check if user has specific role
         */
        hasRole: (role: UserRole): boolean => {
          const { user } = get();
          return user?.role === role;
        },

        /**
         * Check if user has any of the specified roles
         */
        hasAnyRole: (roles: UserRole[]): boolean => {
          const { user } = get();
          return user ? roles.includes(user.role) : false;
        },
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          session: state.session,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'AuthStore',
    }
  )
);

// ============================================================================
// CONVENIENCE HOOKS
// ============================================================================

/**
 * Hook to get auth actions and state
 */
export const useAuth = () => {
  const store = useAuthStore();
  return store;
};

/**
 * Hook to get current user
 */
export const useUser = () => {
  return useAuthStore((state) => state.user);
};

/**
 * Hook to get authentication status
 */
export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated);
};

/**
 * Hook to get permission checker
 */
export const usePermissions = () => {
  const checkPermission = useAuthStore((state) => state.checkPermission);
  const hasRole = useAuthStore((state) => state.hasRole);
  const hasAnyRole = useAuthStore((state) => state.hasAnyRole);
  
  return { checkPermission, hasRole, hasAnyRole };
};

/**
 * Hook to get auth loading state
 */
export const useAuthLoading = () => {
  return useAuthStore((state) => state.loading);
};

/**
 * Hook to get auth error with clear function
 */
export const useAuthError = () => {
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  
  return { error, clearError };
};

export default useAuthStore;
export { useAuthStore };
