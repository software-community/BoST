/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io',"iitrpr.ac.in", 'i.imgur.com',"images.unsplash.com", "placeimg.com", "www.lorempixel.com", "images.pexels.com", "cdn.pixabay.com"],
  },
  // basePath: process.env.NODE_ENV == "production" ? "/bost" : "/",
  basePath: '/bost',
  trailingSlash: false,
};

export default nextConfig;
