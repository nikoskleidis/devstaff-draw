/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false
  },
  compiler: {
    // see https://nextjs.org/docs/advanced-features/compiler#styled-components for more info.
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        port: '',
        pathname: '/**/**'
      }
    ]
  }
};

module.exports = nextConfig;
