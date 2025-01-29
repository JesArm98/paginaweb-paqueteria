/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**", // Permitir cualquier dominio
          },
        ],
      },
};

export default nextConfig;
