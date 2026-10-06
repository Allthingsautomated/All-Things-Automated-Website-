import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links from the previous version of the site working.
  async redirects() {
    return [
      { source: "/schedule", destination: "/book", permanent: true },
      { source: "/pricing", destination: "/services", permanent: true },
      { source: "/admin", destination: "/", permanent: false },
      { source: "/blog/5-things-to-know", destination: "/blog", permanent: true },
      { source: "/blog/ai-smart-home-2025", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
