<?php
declare(strict_types=1);

/**
 * Review intake. POST JSON → validate → log (+ optional Telegram).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    $configPath = __DIR__ . '/config.example.php';
}

/** @var array<string,mixed> $config */
$config = require $configPath;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') {
    review_apply_cors($config);
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    review_apply_cors($config);
    review_json_error(405, 'Method not allowed');
}

review_apply_cors($config);

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    review_json_error(400, 'Empty body');
}

/** @var mixed $payload */
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    review_json_error(400, 'Invalid JSON');
}

$honeypot = trim((string) ($payload['company'] ?? ''));
if ($honeypot !== '') {
    review_json_ok(['accepted' => true, 'dry_run' => true]);
}

$ip = review_client_ip();
if (!review_rate_limit_allow($config, $ip)) {
    review_json_error(429, 'Too many requests');
}

$name = trim((string) ($payload['name'] ?? ''));
$city = trim((string) ($payload['city'] ?? ''));
$text = trim((string) ($payload['text'] ?? ''));
$consent = filter_var($payload['consent'] ?? false, FILTER_VALIDATE_BOOLEAN);
$locale = strtolower(trim((string) ($payload['locale'] ?? 'ru')));

$errors = [];
if ($name === '' || mb_strlen($name) > 80) {
    $errors[] = 'name';
}
if ($city === '' || mb_strlen($city) > 80) {
    $errors[] = 'city';
}
if ($text === '' || mb_strlen($text) > 800) {
    $errors[] = 'text';
}
if (!$consent) {
    $errors[] = 'consent';
}
if (!in_array($locale, ['ru', 'en'], true)) {
    $locale = 'ru';
}

if ($errors) {
    review_json_error(422, 'Validation failed', ['fields' => $errors]);
}

$review = [
    'id' => bin2hex(random_bytes(8)),
    'created_at' => gmdate('c'),
    'ip' => $ip,
    'locale' => $locale,
    'name' => $name,
    'city' => $city,
    'text' => $text,
    'consent' => true,
    'page' => trim((string) ($payload['page'] ?? '')),
    'user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
];

$log = review_append_log($config, $review);
$dryRun = !empty($config['dry_run']);

if ($dryRun) {
    review_json_ok([
        'accepted' => true,
        'dry_run' => true,
        'id' => $review['id'],
        'delivery' => ['log' => $log],
    ]);
}

$tg = review_send_telegram($config, $review);

review_json_ok([
    'accepted' => true,
    'dry_run' => false,
    'id' => $review['id'],
    'delivery' => [
        'log' => $log,
        'telegram' => ['ok' => ($tg['ok'] ?? false) === true],
    ],
]);

/**
 * @param array<string,mixed> $config
 */
function review_apply_cors(array $config): void
{
    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    $allowed = $config['allowed_origins'] ?? [];
    if (!is_array($allowed)) {
        $allowed = [];
    }
    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
    }
}

/**
 * @param array<string,mixed>|null $details
 */
function review_json_error(int $status, string $message, ?array $details = null): never
{
    http_response_code($status);
    $body = ['ok' => false, 'error' => $message];
    if ($details !== null) {
        $body['details'] = $details;
    }
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * @param array<string,mixed> $data
 */
function review_json_ok(array $data): never
{
    http_response_code(200);
    echo json_encode(['ok' => true] + $data, JSON_UNESCAPED_UNICODE);
    exit;
}

function review_client_ip(): string
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    return preg_match('/^[a-fA-F0-9:.]+$/', $ip) === 1 ? $ip : '0.0.0.0';
}

/**
 * @param array<string,mixed> $config
 */
function review_rate_limit_allow(array $config, string $ip): bool
{
    $max = (int) ($config['rate_limit']['max_requests'] ?? 8);
    $window = (int) ($config['rate_limit']['window_seconds'] ?? 600);
    if ($max <= 0 || $window <= 0) {
        return true;
    }

    $dir = __DIR__ . '/logs';
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        return true;
    }

    $file = $dir . '/rate_review_' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = is_string($raw) ? json_decode($raw, true) : null;
        if (is_array($decoded)) {
            foreach ($decoded as $ts) {
                if (is_int($ts) && $ts > $now - $window) {
                    $hits[] = $ts;
                }
            }
        }
    }

    if (count($hits) >= $max) {
        return false;
    }

    $hits[] = $now;
    file_put_contents($file, json_encode($hits), LOCK_EX);
    return true;
}

/**
 * @param array<string,mixed> $config
 * @param array<string,mixed> $review
 * @return array{ok:bool,path?:string,error?:string}
 */
function review_append_log(array $config, array $review): array
{
    $path = (string) ($config['review_log_file'] ?? (__DIR__ . '/logs/reviews.log'));
    $dir = dirname($path);
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        return ['ok' => false, 'error' => 'log_dir'];
    }

    $line = json_encode($review, JSON_UNESCAPED_UNICODE) . "\n";
    $written = file_put_contents($path, $line, FILE_APPEND | LOCK_EX);
    if ($written === false) {
        return ['ok' => false, 'error' => 'log_write'];
    }
    return ['ok' => true, 'path' => basename($path)];
}

/**
 * @param array<string,mixed> $config
 * @param array<string,mixed> $review
 * @return array{ok:bool,status?:int,error?:string}
 */
function review_send_telegram(array $config, array $review): array
{
    $token = trim((string) ($config['telegram']['bot_token'] ?? ''));
    $chatId = trim((string) ($config['telegram']['chat_id'] ?? ''));
    if ($token === '' || $chatId === '') {
        return ['ok' => false, 'error' => 'telegram_not_configured'];
    }

    $lines = [
        '⭐ Новый отзыв #' . $review['id'],
        'Имя: ' . $review['name'],
        'Город: ' . $review['city'],
        'Язык: ' . $review['locale'],
        'Отзыв: ' . $review['text'],
        'Страница: ' . (($review['page'] ?? '') !== '' ? $review['page'] : '—'),
        'Время (UTC): ' . $review['created_at'],
    ];
    $text = implode("\n", $lines);

    $url = 'https://api.telegram.org/bot' . rawurlencode($token) . '/sendMessage';
    $body = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'disable_web_page_preview' => !empty($config['telegram']['disable_web_page_preview']),
    ], JSON_UNESCAPED_UNICODE);

    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $body === false ? '{}' : $body,
            'timeout' => 8,
            'ignore_errors' => true,
        ],
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if ($raw === false) {
        return ['ok' => false, 'error' => 'telegram_http'];
    }
    $decoded = json_decode($raw, true);
    $ok = is_array($decoded) && !empty($decoded['ok']);
    return ['ok' => $ok];
}
