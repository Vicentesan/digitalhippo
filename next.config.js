/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digitalhippo-vicentesan.up.railway.app',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
        port: '3000',
      },
    ],
  },
}

module.exports = nextConfig
