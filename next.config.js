const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  darkMode: "class",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "bilog-hb.s3.us-east-1.amazonaws.com",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bilog-hb.s3.us-east-1.amazonaws.com",
        pathname: "/upload/**",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
