import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages aloja el proyecto en el subdirectorio del repositorio
  basePath: "/aero",
  // Desactivar optimización de imágenes porque no hay servidor Node.js en GitHub Pages
  images: {
    unoptimized: true,
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
