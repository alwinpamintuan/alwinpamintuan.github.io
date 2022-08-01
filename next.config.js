/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loaders: "akamai",
    path: ""
  },
  basePath: "",
  assetPrefix: "",
}

module.exports = nextConfig
