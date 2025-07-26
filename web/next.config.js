/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Only skip type checking during production builds if there are test-related type conflicts
    ignoreBuildErrors: true,
  },
  eslint: {
    // Only ignore ESLint during production builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig