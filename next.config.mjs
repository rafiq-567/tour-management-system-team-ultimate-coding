/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assesets",
        pathname: "/account123/**",
     
      },
    ],
  },
};

export default nextConfig;
