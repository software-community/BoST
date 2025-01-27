/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io',"iitrpr.ac.in", 'i.imgur.com',"images.unsplash.com"],
  },
  // basePath: process.env.NODE_ENV == "production" ? "/bost" : "/",
  basePath: '/bost',
  trailingSlash: false,
};

export default nextConfig;
