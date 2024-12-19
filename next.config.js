const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

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
