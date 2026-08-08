/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@duka/api-client", "@duka/auth", "@duka/ui"],
};

module.exports = nextConfig;
