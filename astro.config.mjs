// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static site for RF shared hosting (FTP + PHP api alongside dist)
export default defineConfig({
  output: 'static',
  site: 'https://example.com',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          ru: 'ru-RU',
          en: 'en-US',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/': '/ru/',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Forward /api/* to local `php -S 127.0.0.1:8080 -t .` during npm run dev
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
      },
    },
  },
});
