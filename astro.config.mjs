// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static site for RF shared hosting (FTP + PHP api alongside dist)
export default defineConfig({
  output: 'static',
  site: 'https://example.com',
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
  },
});
