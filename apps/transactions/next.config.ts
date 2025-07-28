import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/transactions-static",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
