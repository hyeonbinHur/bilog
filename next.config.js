/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bilog-hb.s3.us-east-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bilog-hb.s3.us-east-1.amazonaws.com",
        pathname: "/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
