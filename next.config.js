/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@prisma/client': '@prisma/client',
      });
    }
    return config;
  },
  turbopack: {},
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dvduwjfazvtchdozzfvo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/layanan/cetak-packaging-skincare',
        destination: '/id/layanan/cetak-packaging-skincare',
        permanent: true,
      },
      {
        source: '/karir',
        destination: '/id/karir',
        permanent: true,
      },
      {
        source: '/id/produk',
        destination: '/id/products',
        permanent: true,
      },
      {
        source: '/en/produk',
        destination: '/en/products',
        permanent: true,
      },
      {
        source: '/zh/produk',
        destination: '/zh/products',
        permanent: true,
      },
      {
        source: '/produk',
        destination: '/id/products',
        permanent: true,
      },
      // Since /id/tools, /en/tools, /zh/tools exist now, but they were 404s before. We don't redirect them.
      // But we will catch the weird symbols that 404'd.
      {
        source: '/\\&',
        destination: '/',
        permanent: true,
      },
      {
        source: '/\\$',
        destination: '/',
        permanent: true,
      }
    ];
  },
  async headers() {
    return [
      // Security headers for all pages
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      // Static asset caching
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|webm|mp4|gif|ico|pdf|woff|woff2|glb|gltf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/models/:path*.glb',
        headers: [
          {
            key: 'Content-Type',
            value: 'model/gltf-binary',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = withNextIntl(nextConfig);