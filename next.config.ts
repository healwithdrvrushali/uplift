import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/hls-proxy/:path*",
        destination: "http://media.drvrushali.com/:path*",
      },
    ];
  },
};

export default nextConfig;
