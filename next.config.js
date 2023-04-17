/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/s/:slug",
        destination: "/api/redirect/:slug",
        permanent: true,
      },
    ];
  },
  sentry: {
    hideSourceMaps: true,
  },
}

module.exports = withSentryConfig(nextConfig);
