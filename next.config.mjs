/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      // Add custom turbo rules here
    },
  },
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'via.placeholder.com',
    ],
  },
};

export default nextConfig;
