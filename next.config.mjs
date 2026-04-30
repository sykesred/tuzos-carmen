/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generates a self-contained server bundle — required for the Docker runner stage
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
