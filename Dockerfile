# Amvera / local: build Astro static site, serve with Apache + PHP (lead API)
# Stage 1 — frontend build
FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Canonical site URL for sitemap / absolute links (override in Amvera build args if needed)
ARG SITE_URL=https://example.com
ENV SITE_URL=${SITE_URL}

RUN npm run build

# Stage 2 — Apache + PHP
FROM php:8.3-apache-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    libcurl4-openssl-dev \
    libonig-dev \
  && docker-php-ext-install -j"$(nproc)" curl mbstring \
  && a2enmod rewrite headers \
  && rm -rf /var/lib/apt/lists/*

# Document root = Astro dist + /api
COPY --from=build /app/dist/ /var/www/html/
COPY api/ /var/www/html/api/
COPY docker/apache-amvera.conf /etc/apache2/sites-available/000-default.conf
COPY docker/generate-config.php /usr/local/bin/generate-config.php
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh \
  && chown -R www-data:www-data /var/www/html \
  && mkdir -p /data/logs \
  && chown -R www-data:www-data /data

ENV PERSISTENCE_DIR=/data
ENV LEAD_LOG_FILE=/data/logs/leads.log

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
