import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "e-commerce-demo.s3.us-east-005.backblazeb2.com",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
