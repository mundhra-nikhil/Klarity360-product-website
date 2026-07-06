/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/klarity360-product-website",
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kanerika.com",
      },
    ],
  },
  allowedDevOrigins: ["10.0.3.167", "localhost:3000"],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/klarity360-product-website',
        basePath: false,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
