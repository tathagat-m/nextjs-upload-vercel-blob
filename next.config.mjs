/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kzbqru3awm7tzt3s.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
