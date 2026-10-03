<?php
/**
 * Copy to config.php and fill in real values.
 * config.php is gitignored — never commit secrets.
 *
 * Local dry-run (no Telegram/SMTP): set dry_run => true
 * and leave tokens empty. Leads are appended to api/logs/leads.log
 */
declare(strict_types=1);

return [
    // When true: skip Telegram/email, only validate + write log.
    // Use for local php -S checks without credentials.
    'dry_run' => true,

    // Allowed Origin values for CORS (exact match).
    'allowed_origins' => [
        'http://127.0.0.1:4321',
        'http://localhost:4321',
        'https://example.com',
        'https://www.example.com',
    ],

    // Telegram Bot API (https://core.telegram.org/bots/api#sendmessage)
    'telegram' => [
        'bot_token' => '',
        'chat_id' => '',
        // Optional: disable link previews in operator chat
        'disable_web_page_preview' => true,
    ],

    // Email via SMTP (hosting credentials) or PHP mail() fallback
    'email' => [
        'enabled' => false,
        'to' => 'leads@example.com',
        'from' => 'noreply@example.com',
        'from_name' => 'Gaggenau Service Site',
        'subject_prefix' => '[Lead]',
        // smtp | mail
        'transport' => 'smtp',
        'smtp' => [
            'host' => 'smtp.example.com',
            'port' => 587,
            'encryption' => 'tls', // tls | ssl | none
            'username' => '',
            'password' => '',
        ],
    ],

    // Simple IP rate limit (file-based)
    'rate_limit' => [
        'max_requests' => 8,
        'window_seconds' => 600,
    ],

    // Append JSON lines here (directory must be writable)
    'log_file' => __DIR__ . '/logs/leads.log',
];
