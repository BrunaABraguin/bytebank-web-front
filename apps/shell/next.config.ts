import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: `${process.env.NEXT_PUBLIC_DASHBOARD_DOMAIN}`,
      },
      {
        source: "/dashboard/:path*",
        destination: `${process.env.NEXT_PUBLIC_DASHBOARD_DOMAIN}/dashboard/:path*`,
      },
      {
        source: "/dashboard-static/_next/:path+",
        destination: `${process.env.NEXT_PUBLIC_DASHBOARD_DOMAIN}/dashboard-static/_next/:path+`,
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
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
