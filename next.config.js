const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  darkMode: "class",
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "next-intl",
      "next-auth/react",
      "react-google-button",
      "react-github-login-button",
    ],
  },
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
  api: {
    bodyParser: {
      sizeLimit: "10mb", // 파일 크기 제한을 10MB로 설정
    },
  },
  images: {
    domains: [
      "bilog-s3.s3.ap-northeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bilog-s3.s3.ap-northeast-2.amazonaws.com",
        pathname: "/upload/**",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
