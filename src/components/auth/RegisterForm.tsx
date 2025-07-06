/**
 * Registration Form Component for ELAB Solutions International
 * 
 * This component provides a comprehensive registration form with TypeScript validation,
 * healthcare profession selection, and compliance features.
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

import type { RegisterData } from '@/types/auth';
import type { HealthcareProfession } from '@/types/business';
import { useAuth, useAuthError, useAuthLoading } from '@/lib/auth/auth-store';

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s-()]+$/.test(val), 'Please enter a valid phone number'),
  country: z
    .string()
    .min(1, 'Country is required')
    .min(2, 'Please select a valid country'),
  profession: z
    .string()
    .min(1, 'Profession is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),
  subscribeToNewsletter: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

// ============================================================================
// CONSTANTS
// ============================================================================

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'QA', label: 'Qatar' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'OM', label: 'Oman' },
  { value: 'IN', label: 'India' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'NP', label: 'Nepal' },
  { value: 'EG', label: 'Egypt' },
  { value: 'JO', label: 'Jordan' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'SY', label: 'Syria' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'KE', label: 'Kenya' },
  { value: 'GH', label: 'Ghana' }
];

const PROFESSIONS = [
  { value: 'registered_nurse', label: 'Registered Nurse (RN)' },
  { value: 'licensed_practical_nurse', label: 'Licensed Practical Nurse (LPN)' },
  { value: 'medical_doctor', label: 'Medical Doctor (MD)' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'physiotherapist', label: 'Physiotherapist' },
  { value: 'medical_technologist', label: 'Medical Technologist' },
  { value: 'radiologic_technologist', label: 'Radiologic Technologist' },
  { value: 'respiratory_therapist', label: 'Respiratory Therapist' },
  { value: 'occupational_therapist', label: 'Occupational Therapist' },
  { value: 'speech_therapist', label: 'Speech Therapist' },
  { value: 'dentist', label: 'Dentist' },
  { value: 'dental_hygienist', label: 'Dental Hygienist' },
  { value: 'other', label: 'Other Healthcare Professional' }
];

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface RegisterFormProps {
  readonly onSuccess?: () => void;
  readonly onLogin?: () => void;
  readonly className?: string;
}

// ============================================================================
// REGISTER FORM COMPONENT
// ============================================================================

export function RegisterForm({
  onSuccess,
  onLogin,
  className = ''
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { register: registerUser } = useAuth();
  const { error, clearError } = useAuthError();
  const loading = useAuthLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      profession: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      subscribeToNewsletter: true
    }
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      
      const registerData: RegisterData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        country: data.country,
        profession: data.profession,
        password: data.password,
        confirmPassword: data.confirmPassword,
        agreeToTerms: data.agreeToTerms,
        subscribeToNewsletter: data.subscribeToNewsletter
      };

      await registerUser(registerData);
      
      // Reset form and show success message
      reset();
      setRegistrationSuccess(true);
      
      // Call success callback after a delay
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error) {
      // Error is handled by the auth store
      console.error('Registration error:', error);
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || ''
    };
  };

  const passwordStrength = getPasswordStrength(password);

  if (registrationSuccess) {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Please check your email to verify your account before signing in.
          </p>
          <button
            onClick={onLogin}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join ELAB Solutions to advance your healthcare career
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                {...register('firstName')}
                type="text"
                id="firstName"
                autoComplete="given-name"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${errors.firstName ? 'border-red-300' : 'border-gray-300'}
                `}
                placeholder="First name"
                disabled={loading || isSubmitting}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                {...register('lastName')}
                type="text"
                id="lastName"
                autoComplete="family-name"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${errors.lastName ? 'border-red-300' : 'border-gray-300'}
                `}
                placeholder="Last name"
                disabled={loading || isSubmitting}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              autoComplete="email"
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${errors.email ? 'border-red-300' : 'border-gray-300'}
              `}
              placeholder="Enter your email"
              disabled={loading || isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              autoComplete="tel"
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${errors.phone ? 'border-red-300' : 'border-gray-300'}
              `}
              placeholder="Enter your phone number"
              disabled={loading || isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Country and Profession */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                {...register('country')}
                id="country"
                autoComplete="country"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${errors.country ? 'border-red-300' : 'border-gray-300'}
                `}
                disabled={loading || isSubmitting}
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                Healthcare Profession *
              </label>
              <select
                {...register('profession')}
                id="profession"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${errors.profession ? 'border-red-300' : 'border-gray-300'}
                `}
                disabled={loading || isSubmitting}
              >
                <option value="">Select your profession</option>
                {PROFESSIONS.map((profession) => (
                  <option key={profession.value} value={profession.value}>
                    {profession.label}
                  </option>
                ))}
              </select>
              {errors.profession && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.profession.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                className={`
                  w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${errors.password ? 'border-red-300' : 'border-gray-300'}
                `}
                placeholder="Create a strong password"
                disabled={loading || isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading || isSubmitting}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{passwordStrength.label}</span>
                </div>
              </div>
            )}
            
            {errors.password && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                className={`
                  w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}
                `}
                placeholder="Confirm your password"
                disabled={loading || isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading || isSubmitting}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms and Newsletter */}
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                {...register('agreeToTerms')}
                id="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                disabled={loading || isSubmitting}
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-500 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-500 underline">
                  Privacy Policy
                </a>{' '}
                *
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600" role="alert">
                {errors.agreeToTerms.message}
              </p>
            )}

            <div className="flex items-start">
              <input
                {...register('subscribeToNewsletter')}
                id="subscribeToNewsletter"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                disabled={loading || isSubmitting}
              />
              <label htmlFor="subscribeToNewsletter" className="ml-2 block text-sm text-gray-700">
                Subscribe to our newsletter for updates on healthcare opportunities and exam preparation tips
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className={`
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md
              shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            `}
          >
            {loading || isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLogin}
              className="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
              disabled={loading || isSubmitting}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
