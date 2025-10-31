import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";

// Lê APP_ENV do sistema (default: "development")
const appEnv = process.env.APP_ENV || "";

// Mapeia para o arquivo .env correto
const envFileMap: Record<string, string> = {
  development: ".env.staging",
  production: ".env.production",
};

const envFile = envFileMap[appEnv] || "";

// Carrega o .env correto
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`Loaded environment: ${appEnv} (${envFile})`);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //  basePath:'/ecommerce-ui',
  //   images: {
  // //   // Configurações específicas para imagens
  //   domains: ['flexybot.com.br'], // se usar imagens externas
  //     //path: '/ecommerce-ui/_next/image', // importante com basePath
  // //   // unoptimized: true, // Mantenha false para otimização
  // //   // Configurações específicas para PNG
  // //   formats: ['image/webp', 'image/avif'],
  //  },
  // assetPrefix: '/ecommerce-ui/' 
  // // Importante para produção
  // trailingSlash: false, // ou true, mas seja consistente
  // assetPrefix:'/ecommerce-ui',
  //  assetPrefix: '/ecommerce-ui/' // 👈 adiciona prefixo para assets
  // env: {
  //   NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
   //},
};

export default nextConfig;
