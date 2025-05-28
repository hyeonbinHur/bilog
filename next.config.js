const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  darkMode: "class",
  experimental: {
    optimizeCss: true,
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        ssh2: "commonjs ssh2",
      });
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
