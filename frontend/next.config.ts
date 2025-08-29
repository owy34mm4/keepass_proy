import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds:true
  },
  //Evita que next inytente exportar paginas estaticas de error
  //output:"standalone"
  /* config options here */
};

export default nextConfig;
