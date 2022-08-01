/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loaders: "akamai",
    path: ""
  }
}

module.exports = nextConfig
