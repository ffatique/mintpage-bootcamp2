/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'gateway.ipfscdn.io',
      'ipfs.thirdwebcdn.com',
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'ipfs.thirdwebstorage.com/ipfs',
      'gateway.ipfscdn.io'
    ]
  },
  env: {
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
  },
}

module.exports = nextConfig
