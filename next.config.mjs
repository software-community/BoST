/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['utfs.io',"example.com","images.unsplash.com"],
    },
    // basePath: process.env.NODE_ENV == "production" ? "/bost" : "/"
  };
  
  export default nextConfig;
  