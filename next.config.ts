import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "frontend-take-home.fetch.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
