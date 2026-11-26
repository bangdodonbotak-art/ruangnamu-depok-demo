import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence the multiple-lockfiles workspace warning: v1's lockfile lives
  // at the run root (reference only); this project is self-contained in v2/.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
