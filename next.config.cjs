/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules' *.googleapis.com *.gstatic.com *.clerk.accounts.dev *.clerk.com *.clerk.dev",
              "style-src 'self' 'unsafe-inline' *.googleapis.com",
              "img-src 'self' data: blob: *.unsplash.com *.cloudinary.com *.clerk.com *.clerk.dev *.clerk.accounts.dev *.googleusercontent.com *.gstatic.com *.google.com",
              "font-src 'self' data: *.googleapis.com *.gstatic.com *.fontawesome.com *.bootstrapcdn.com",
              "connect-src 'self' *.googleapis.com *.analytics.google.com *.clerk.accounts.dev *.clerk.com *.clerk.dev https://clerk-telemetry.com",
              "worker-src 'self' blob:",
              "frame-src 'self' *.youtube.com *.vimeo.com"
            ].join('; ')
          }
        ],
      },
    ];
  },
  
  // Experimental features
  experimental: {
    typedRoutes: false,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack configurations here
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. Only enable this in development.
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only enable this in development.
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  swcMinify: true,
  
  // Redirects and rewrites
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/api/health-check',
      },
    ];
  },
  
  env: {
    ...(module.exports.env || {}),
    _next_intl_trailing_slash: 'false',
  },
};

module.exports = nextConfig;
