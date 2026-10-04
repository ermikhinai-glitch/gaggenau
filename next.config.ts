import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow Cloud Agent / Live desktop proxies to load /_next assets in dev
  allowedDevOrigins: ['127.0.0.1', 'localhost', '*.cursor.sh', '*.cursor.com'],
};

export default nextConfig;
