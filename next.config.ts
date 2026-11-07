import type { NextConfig } from "next";
// Empty for root/custom-domain hosting; supplied by configure-pages for project Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
if (basePath && (!/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(basePath))) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or a slash-prefixed path without a trailing slash.");
}
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};
export default config;
