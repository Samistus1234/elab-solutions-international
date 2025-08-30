import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Ensure dynamic color classes are preserved
    'bg-primary-600', 'bg-primary-700', 'bg-primary-100', 'text-primary-600', 'text-primary-100', 'border-primary-200',
    'bg-secondary-600', 'bg-secondary-700', 'bg-secondary-100', 'text-secondary-600', 'text-secondary-100', 'border-secondary-200',
    'bg-blue-600', 'bg-blue-700', 'bg-blue-100', 'text-blue-600', 'text-blue-100', 'border-blue-200',
    'bg-green-600', 'bg-green-700', 'bg-green-100', 'text-green-600', 'text-green-100', 'border-green-200',
    'bg-purple-600', 'bg-purple-700', 'bg-purple-100', 'text-purple-600', 'text-purple-100', 'border-purple-200',
    'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-100', 'text-indigo-600', 'text-indigo-100', 'border-indigo-200',
    'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-100', 'text-yellow-600', 'text-yellow-100', 'border-yellow-200',
    'bg-red-600', 'bg-red-700', 'bg-red-100', 'text-red-600', 'text-red-100', 'border-red-200',
    // Service grid classes
    'service-card-primary', 'service-card-secondary', 'service-card-blue', 'service-card-green', 'service-card-purple', 'service-card-indigo',
    'service-btn-primary', 'service-btn-secondary', 'service-btn-blue', 'service-btn-green', 'service-btn-purple', 'service-btn-indigo',
    'benefit-dot-primary', 'benefit-dot-secondary', 'benefit-dot-blue', 'benefit-dot-green', 'benefit-dot-purple', 'benefit-dot-indigo',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93BBFD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#059669',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config