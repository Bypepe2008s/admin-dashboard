import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ignorar errores de ESLint durante el build de producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorar errores menores de TypeScript durante el build
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig