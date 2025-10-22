import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // allow localhost
  },
  /* config options here */
};

export default nextConfig;
