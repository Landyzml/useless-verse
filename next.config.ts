import type { NextConfig } from "next";
const config: NextConfig = {
  // Static Phase 1 works on Vercel and any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
