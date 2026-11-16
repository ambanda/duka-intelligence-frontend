/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: { DUKA_RELEASE_SHA: process.env.COMMIT_REF || process.env.DUKA_RELEASE_SHA || "development" },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
