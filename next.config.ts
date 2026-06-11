import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images served locally from public/uploads/
  async redirects() {
    return [
      { source: "/what-we-offer", destination: "/", permanent: true },
      { source: "/product/:slug", destination: "/products/:slug", permanent: true },
      { source: "/product-category/:slug", destination: "/:slug", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
