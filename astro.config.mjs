// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Dev: forward lead POSTs to PHP :8080 (Telegram/email). No fake success.
 * @returns {import('vite').Plugin}
 */
function leadApiDevProxy() {
  return {
    name: 'lead-api-dev-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        if (url !== '/api/lead.php' || req.method !== 'POST') {
          next();
          return;
        }

        /** @type {Buffer[]} */
        const chunks = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', async () => {
          const body = Buffer.concat(chunks);
          try {
            const upstream = await fetch('http://127.0.0.1:8080/api/lead.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body,
            });
            const text = await upstream.text();
            res.statusCode = upstream.status;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(text);
          } catch {
            res.statusCode = 503;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(
              JSON.stringify({
                ok: false,
                error: 'Lead API offline. Run: npm run api',
              }),
            );
          }
        });
      });
    },
  };
}

// Static site for RF shared hosting (FTP + PHP api alongside dist)
// SITE_URL is used on Amvera/Docker builds (Dockerfile ARG / env).
const siteUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');

export default defineConfig({
  output: 'static',
  site: siteUrl,
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
    plugins: [tailwindcss(), leadApiDevProxy()],
    server: {
      // Phone preview via the temporary Cloudflare tunnel.
      allowedHosts: ['.trycloudflare.com'],
      // Other /api/* → PHP; lead.php is handled by leadApiDevProxy above
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
      },
    },
  },
});
