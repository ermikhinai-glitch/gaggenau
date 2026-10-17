#!/bin/sh
set -eu

DATA_DIR="${PERSISTENCE_DIR:-/data}"
LOG_DIR="${DATA_DIR}/logs"
WEB_ROOT="${WEB_ROOT:-/var/www/html}"
API_DIR="${WEB_ROOT}/api"

mkdir -p "${LOG_DIR}"
chmod 0750 "${LOG_DIR}" || true
# Amvera mounts /data at runtime — ensure PHP/Apache can write logs
chown -R www-data:www-data "${DATA_DIR}" 2>/dev/null || true

# Keep rate-limit + fallback logs on the persistent volume
if [ -d "${API_DIR}/logs" ] && [ ! -L "${API_DIR}/logs" ]; then
  rm -rf "${API_DIR}/logs"
fi
ln -sfn "${LOG_DIR}" "${API_DIR}/logs"

# Generate api/config.php from Amvera env / secrets when AMVERA=1 or forced
if [ "${AMVERA:-}" = "1" ] || [ "${LEAD_CONFIG_FROM_ENV:-}" = "1" ]; then
  php /usr/local/bin/generate-config.php "${API_DIR}/config.php"
elif [ ! -f "${API_DIR}/config.php" ]; then
  # Local docker run without secrets: dry-run example
  LEAD_DRY_RUN=true \
    php /usr/local/bin/generate-config.php "${API_DIR}/config.php"
fi

chown www-data:www-data "${API_DIR}/config.php" 2>/dev/null || true
chmod 0640 "${API_DIR}/config.php" 2>/dev/null || true

exec apache2-foreground
