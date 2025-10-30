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
   basePath:'/ecommerce-ui',
   assetPrefix: '/ecommerce-ui/' // 👈 adiciona prefixo para assets
  // env: {
  //   NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // },
};

export default nextConfig;
