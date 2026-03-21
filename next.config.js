/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['components'],
  },
}

module.exports = nextConfig
