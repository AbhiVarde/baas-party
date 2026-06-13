import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "supabase.com" },
      { hostname: "appwrite.io" },
      { hostname: "www.convex.dev" },
    ],
  },
};

export default nextConfig;
