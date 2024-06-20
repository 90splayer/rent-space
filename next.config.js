/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    images: {
      domains: [
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com'
      ],
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