/** @type {import('next').NextConfig} */
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
  }
}

module.exports = nextConfig
