import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // frontend calls /api/...
        destination:
          "https://organic-umbrella-r76gvr9jvp5fqwx-4000.app.github.dev/api/:path*", // real API
      },
    ];
  },
};

export default nextConfig;
