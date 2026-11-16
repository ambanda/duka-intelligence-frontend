/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: { DUKA_RELEASE_SHA: process.env.COMMIT_REF || process.env.DUKA_RELEASE_SHA || "development" },
  transpilePackages: ["@duka/api-client", "@duka/auth", "@duka/ui"],
};

module.exports = nextConfig;
