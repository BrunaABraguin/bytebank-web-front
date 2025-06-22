import type { NextConfig } from "next";
const { WEB_URL } = process.env;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/web",
        destination: `${WEB_URL}`,
      },
      {
        source: "/web/:path*",
        destination: `${WEB_URL}/web/:path*`,
      },
      {
        source: "/web-static/_next/:path+",
        destination: `${WEB_URL}/web-static/_next/:path+`,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
