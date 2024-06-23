/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    }
  }
  
  module.exports = nextConfig