/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` creates an `out/` folder that works on
  // Vercel, Netlify, GitHub Pages or any static host.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
