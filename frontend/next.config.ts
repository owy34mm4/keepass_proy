import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return[
      {source:"/api/:path*",
        destination : "http://backend:5000/:path*"
    },
  ];
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  //Evita que next inytente exportar paginas estaticas de error
  //output:"standalone"
  /* config options here */
};

export default nextConfig;
