import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9mtqyz71neckwfbe.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
