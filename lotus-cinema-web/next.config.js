/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**"
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/M/**"
      }
    ]
  }
}

module.exports = nextConfig
