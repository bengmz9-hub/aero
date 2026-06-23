import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  output: "export",
  // Si es Netlify se aloja en la raíz, si es GitHub Pages se aloja en /aero
  basePath: isNetlify ? "" : "/aero",
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
