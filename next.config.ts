import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  images: {
    domains: ["cdn.bloombeauty.uz"],
  },
};

export default nextConfig;
