<?php
/**
 * Write api/config.php from environment variables (Amvera secrets / env).
 * Invoked by docker/entrypoint.sh at container start.
 */
declare(strict_types=1);

$configPath = $argv[1] ?? '/var/www/html/api/config.php';

function env_string(string $key, string $default = ''): string
{
    $v = getenv($key);
    if ($v === false || $v === '') {
        return $default;
    }
    return $v;
}

function env_bool(string $key, bool $default): bool
{
    $v = getenv($key);
    if ($v === false || $v === '') {
        return $default;
    }
    $normalized = strtolower(trim($v));
    return in_array($normalized, ['1', 'true', 'yes', 'on'], true);
}

function env_int(string $key, int $default): int
{
    $v = getenv($key);
    if ($v === false || $v === '') {
        return $default;
    }
    return (int) $v;
}

$originsRaw = env_string('ALLOWED_ORIGINS', '');
$origins = array_values(array_filter(array_map(
    static fn (string $s): string => trim($s),
    $originsRaw === '' ? [] : explode(',', $originsRaw)
)));

$siteUrl = rtrim(env_string('SITE_URL', ''), '/');
if ($siteUrl !== '' && !in_array($siteUrl, $origins, true)) {
    $origins[] = $siteUrl;
}

// Always allow same-origin empty Origin / local probes via explicit list only.
if ($origins === []) {
    $origins = ['https://example.com'];
}

$config = [
    'dry_run' => env_bool('LEAD_DRY_RUN', true),
    'allowed_origins' => $origins,
    'telegram' => [
        'bot_token' => env_string('TELEGRAM_BOT_TOKEN'),
        'chat_id' => env_string('TELEGRAM_CHAT_ID'),
        'disable_web_page_preview' => true,
    ],
    'email' => [
        'enabled' => env_bool('EMAIL_ENABLED', false),
        'to' => env_string('EMAIL_TO', 'leads@example.com'),
        'from' => env_string('EMAIL_FROM', 'noreply@example.com'),
        'from_name' => env_string('EMAIL_FROM_NAME', 'Gaggenau Service Site'),
        'subject_prefix' => env_string('EMAIL_SUBJECT_PREFIX', '[Lead]'),
        'transport' => env_string('EMAIL_TRANSPORT', 'smtp'),
        'smtp' => [
            'host' => env_string('SMTP_HOST'),
            'port' => env_int('SMTP_PORT', 587),
            'encryption' => env_string('SMTP_ENCRYPTION', 'tls'),
            'username' => env_string('SMTP_USERNAME'),
            'password' => env_string('SMTP_PASSWORD'),
        ],
    ],
    'rate_limit' => [
        'max_requests' => env_int('RATE_LIMIT_MAX', 8),
        'window_seconds' => env_int('RATE_LIMIT_WINDOW', 600),
    ],
    'log_file' => env_string('LEAD_LOG_FILE', '/data/logs/leads.log'),
];

$export = var_export($config, true);
$php = <<<PHP
<?php
/**
 * Auto-generated at container start from environment variables.
 * Do not edit in the running container — change Amvera Variables/Secrets.
 */
declare(strict_types=1);

return {$export};

PHP;

$dir = dirname($configPath);
if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
    fwrite(STDERR, "Cannot create config dir: {$dir}\n");
    exit(1);
}

if (file_put_contents($configPath, $php) === false) {
    fwrite(STDERR, "Cannot write config: {$configPath}\n");
    exit(1);
}

chmod($configPath, 0640);
echo "Wrote {$configPath}\n";
