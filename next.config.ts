import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/content/:name/logo.png",
        destination: "/content/logo/:name.png",
      },
      {
        source: "/content/:name/background.jpg",
        destination: "/content/background/:name.jpg",
      },
    ];
  },
};

export default nextConfig;
