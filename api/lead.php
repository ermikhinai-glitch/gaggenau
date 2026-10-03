<?php
declare(strict_types=1);

/**
 * Lead intake for RF shared hosting.
 * POST JSON → validate → (optional) Telegram + email → log.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    // Fall back to example so dry-run works out of the box after copy.
    $configPath = __DIR__ . '/config.example.php';
}

/** @var array<string,mixed> $config */
$config = require $configPath;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') {
    apply_cors($config);
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    apply_cors($config);
    json_error(405, 'Method not allowed');
}

apply_cors($config);

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    json_error(400, 'Empty body');
}

/** @var mixed $payload */
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    json_error(400, 'Invalid JSON');
}

// Honeypot: bots fill hidden "company"
$honeypot = trim((string) ($payload['company'] ?? ''));
if ($honeypot !== '') {
    // Pretend success to avoid teaching bots.
    json_ok(['accepted' => true, 'dry_run' => true]);
}

$ip = client_ip();
if (!rate_limit_allow($config, $ip)) {
    json_error(429, 'Too many requests');
}

$name = trim((string) ($payload['name'] ?? ''));
$phone = trim((string) ($payload['phone'] ?? ''));
$consent = filter_var($payload['consent'] ?? false, FILTER_VALIDATE_BOOLEAN);
$locale = strtolower(trim((string) ($payload['locale'] ?? 'ru')));
$city = trim((string) ($payload['city'] ?? ''));
$time = trim((string) ($payload['time'] ?? ''));
$applianceSlug = trim((string) ($payload['applianceSlug'] ?? ''));
$applianceLabel = trim((string) ($payload['applianceLabel'] ?? ''));
$problem = trim((string) ($payload['problem'] ?? ''));
$channels = $payload['channels'] ?? [];
if (!is_array($channels)) {
    $channels = [];
}
$channels = array_values(array_intersect(
    array_map(static fn ($v) => strtolower(trim((string) $v)), $channels),
    ['whatsapp', 'telegram']
));

$errors = [];
if ($name === '' || mb_strlen($name) > 120) {
    $errors[] = 'name';
}
$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if (strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15) {
    $errors[] = 'phone';
}
if (!$consent) {
    $errors[] = 'consent';
}
if (!in_array($locale, ['ru', 'en'], true)) {
    $locale = 'ru';
}
if (mb_strlen($city) > 120) {
    $errors[] = 'city';
}
if (mb_strlen($time) > 120) {
    $errors[] = 'time';
}
if (mb_strlen($applianceSlug) > 64) {
    $errors[] = 'applianceSlug';
}
if (mb_strlen($applianceLabel) > 120) {
    $errors[] = 'applianceLabel';
}
if (mb_strlen($problem) > 2000) {
    $errors[] = 'problem';
}

if ($errors) {
    json_error(422, 'Validation failed', ['fields' => $errors]);
}

$lead = [
    'id' => bin2hex(random_bytes(8)),
    'created_at' => gmdate('c'),
    'ip' => $ip,
    'locale' => $locale,
    'name' => $name,
    'phone' => $phone,
    'phone_digits' => $phoneDigits,
    'city' => $city,
    'time' => $time,
    'applianceSlug' => $applianceSlug,
    'applianceLabel' => $applianceLabel,
    'problem' => $problem,
    'channels' => $channels,
    'consent' => true,
    'page' => trim((string) ($payload['page'] ?? '')),
    'user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
];

$dryRun = !empty($config['dry_run']);
$delivery = [
    'telegram' => null,
    'email' => null,
    'log' => null,
];

$delivery['log'] = append_lead_log($config, $lead);

if ($dryRun) {
    json_ok([
        'accepted' => true,
        'dry_run' => true,
        'id' => $lead['id'],
        'delivery' => $delivery,
    ]);
}

$tg = send_telegram($config, $lead);
$delivery['telegram'] = $tg;

$mail = send_email($config, $lead);
$delivery['email'] = $mail;

$tgOk = ($tg['ok'] ?? false) === true;
$mailEnabled = !empty($config['email']['enabled']);
$mailOk = !$mailEnabled || (($mail['ok'] ?? false) === true);

if (!$tgOk && !$mailOk) {
    // Lead is logged; surface failure so ops notice misconfig.
    json_error(502, 'Delivery failed', ['delivery' => redact_delivery($delivery)]);
}

json_ok([
    'accepted' => true,
    'dry_run' => false,
    'id' => $lead['id'],
    'delivery' => redact_delivery($delivery),
]);

/* ---------- helpers ---------- */

/**
 * @param array<string,mixed> $config
 */
function apply_cors(array $config): void
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
function json_error(int $status, string $message, ?array $details = null): never
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
function json_ok(array $data): never
{
    http_response_code(200);
    echo json_encode(['ok' => true] + $data, JSON_UNESCAPED_UNICODE);
    exit;
}

function client_ip(): string
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    return preg_match('/^[a-fA-F0-9:.]+$/', $ip) === 1 ? $ip : '0.0.0.0';
}

/**
 * @param array<string,mixed> $config
 */
function rate_limit_allow(array $config, string $ip): bool
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

    $file = $dir . '/rate_' . hash('sha256', $ip) . '.json';
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
 * @param array<string,mixed> $lead
 * @return array{ok:bool,path?:string,error?:string}
 */
function append_lead_log(array $config, array $lead): array
{
    $path = (string) ($config['log_file'] ?? (__DIR__ . '/logs/leads.log'));
    $dir = dirname($path);
    if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
        return ['ok' => false, 'error' => 'log_dir'];
    }

    $line = json_encode($lead, JSON_UNESCAPED_UNICODE) . "\n";
    $written = file_put_contents($path, $line, FILE_APPEND | LOCK_EX);
    if ($written === false) {
        return ['ok' => false, 'error' => 'log_write'];
    }
    return ['ok' => true, 'path' => basename($path)];
}

/**
 * @param array<string,mixed> $config
 * @param array<string,mixed> $lead
 * @return array{ok:bool,status?:int,error?:string}
 */
function send_telegram(array $config, array $lead): array
{
    $token = trim((string) ($config['telegram']['bot_token'] ?? ''));
    $chatId = trim((string) ($config['telegram']['chat_id'] ?? ''));
    if ($token === '' || $chatId === '') {
        return ['ok' => false, 'error' => 'telegram_not_configured'];
    }

    $channels = $lead['channels'] ?? [];
    $channelsText = is_array($channels) && $channels
        ? implode(', ', $channels)
        : '—';

    $lines = [
        '🛠 Новая заявка #' . $lead['id'],
        'Имя: ' . $lead['name'],
        'Телефон: ' . $lead['phone'],
        'Язык: ' . $lead['locale'],
        'Город: ' . ($lead['city'] !== '' ? $lead['city'] : '—'),
        'Время звонка: ' . ($lead['time'] !== '' ? $lead['time'] : '—'),
        'Техника: ' . ($lead['applianceLabel'] !== '' ? $lead['applianceLabel'] : ($lead['applianceSlug'] !== '' ? $lead['applianceSlug'] : '—')),
        'Каналы: ' . $channelsText,
        'Проблема: ' . ($lead['problem'] !== '' ? $lead['problem'] : '—'),
        'Страница: ' . (($lead['page'] ?? '') !== '' ? $lead['page'] : '—'),
        'Время (UTC): ' . $lead['created_at'],
    ];
    $text = implode("\n", $lines);

    $url = 'https://api.telegram.org/bot' . rawurlencode($token) . '/sendMessage';
    $body = [
        'chat_id' => $chatId,
        'text' => $text,
        'disable_web_page_preview' => !empty($config['telegram']['disable_web_page_preview']),
    ];

    return http_post_json($url, $body);
}

/**
 * @param array<string,mixed> $config
 * @param array<string,mixed> $lead
 * @return array{ok:bool,error?:string,transport?:string}
 */
function send_email(array $config, array $lead): array
{
    if (empty($config['email']['enabled'])) {
        return ['ok' => true, 'transport' => 'disabled'];
    }

    $to = trim((string) ($config['email']['to'] ?? ''));
    $from = trim((string) ($config['email']['from'] ?? ''));
    $fromName = trim((string) ($config['email']['from_name'] ?? 'Site'));
    $prefix = trim((string) ($config['email']['subject_prefix'] ?? '[Lead]'));
    if ($to === '' || $from === '') {
        return ['ok' => false, 'error' => 'email_not_configured'];
    }

    $subject = $prefix . ' ' . $lead['name'] . ' · ' . $lead['phone'];
    $channels = is_array($lead['channels'] ?? null) ? implode(', ', $lead['channels']) : '';
    $body = implode("\n", [
        'ID: ' . $lead['id'],
        'Name: ' . $lead['name'],
        'Phone: ' . $lead['phone'],
        'Locale: ' . $lead['locale'],
        'City: ' . $lead['city'],
        'Preferred time: ' . $lead['time'],
        'Appliance: ' . $lead['applianceLabel'] . ' (' . $lead['applianceSlug'] . ')',
        'Channels: ' . $channels,
        'Problem: ' . $lead['problem'],
        'Page: ' . ($lead['page'] ?? ''),
        'Created (UTC): ' . $lead['created_at'],
        'IP: ' . $lead['ip'],
    ]);

    $transport = (string) ($config['email']['transport'] ?? 'mail');
    if ($transport === 'smtp') {
        return smtp_send($config, $to, $from, $fromName, $subject, $body);
    }

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . encode_mailbox($fromName, $from),
        'Reply-To: ' . $from,
    ];
    $ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
    return $ok
        ? ['ok' => true, 'transport' => 'mail']
        : ['ok' => false, 'error' => 'mail_failed', 'transport' => 'mail'];
}

/**
 * Minimal SMTP client (AUTH LOGIN) for shared hosting.
 *
 * @param array<string,mixed> $config
 * @return array{ok:bool,error?:string,transport?:string}
 */
function smtp_send(
    array $config,
    string $to,
    string $from,
    string $fromName,
    string $subject,
    string $body
): array {
    $smtp = $config['email']['smtp'] ?? [];
    if (!is_array($smtp)) {
        return ['ok' => false, 'error' => 'smtp_config', 'transport' => 'smtp'];
    }

    $host = (string) ($smtp['host'] ?? '');
    $port = (int) ($smtp['port'] ?? 587);
    $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
    $user = (string) ($smtp['username'] ?? '');
    $pass = (string) ($smtp['password'] ?? '');

    if ($host === '') {
        return ['ok' => false, 'error' => 'smtp_host', 'transport' => 'smtp'];
    }

    $remote = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $fp = @stream_socket_client($remote, $errno, $errstr, 20);
    if (!$fp) {
        return ['ok' => false, 'error' => 'smtp_connect: ' . $errstr, 'transport' => 'smtp'];
    }
    stream_set_timeout($fp, 20);

    try {
        smtp_expect($fp, [220]);
        smtp_cmd($fp, 'EHLO localhost', [250]);
        if ($encryption === 'tls') {
            smtp_cmd($fp, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('smtp_tls');
            }
            smtp_cmd($fp, 'EHLO localhost', [250]);
        }
        if ($user !== '') {
            smtp_cmd($fp, 'AUTH LOGIN', [334]);
            smtp_cmd($fp, base64_encode($user), [334]);
            smtp_cmd($fp, base64_encode($pass), [235]);
        }
        smtp_cmd($fp, 'MAIL FROM:<' . $from . '>', [250]);
        smtp_cmd($fp, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtp_cmd($fp, 'DATA', [354]);

        $headers = [
            'From: ' . encode_mailbox($fromName, $from),
            'To: <' . $to . '>',
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        $data = implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $data = preg_replace('/^\./m', '..', $data) ?? $data;
        fwrite($fp, $data . "\r\n.\r\n");
        smtp_expect($fp, [250]);
        smtp_cmd($fp, 'QUIT', [221]);
    } catch (Throwable $e) {
        fclose($fp);
        return ['ok' => false, 'error' => $e->getMessage(), 'transport' => 'smtp'];
    }

    fclose($fp);
    return ['ok' => true, 'transport' => 'smtp'];
}

/**
 * @param resource $fp
 * @param list<int> $okCodes
 */
function smtp_cmd($fp, string $line, array $okCodes): void
{
    fwrite($fp, $line . "\r\n");
    smtp_expect($fp, $okCodes);
}

/**
 * @param resource $fp
 * @param list<int> $okCodes
 */
function smtp_expect($fp, array $okCodes): void
{
    $response = '';
    while (($line = fgets($fp, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $okCodes, true)) {
        throw new RuntimeException('smtp_' . $code);
    }
}

function encode_mailbox(string $name, string $email): string
{
    $safeName = '=?UTF-8?B?' . base64_encode($name) . '?=';
    return $safeName . ' <' . $email . '>';
}

/**
 * @param array<string,mixed> $body
 * @return array{ok:bool,status?:int,error?:string}
 */
function http_post_json(string $url, array $body): array
{
    $json = json_encode($body, JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return ['ok' => false, 'error' => 'json_encode'];
    }

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => $json,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 20,
        ]);
        $resp = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);
        if ($resp === false) {
            return ['ok' => false, 'error' => $err !== '' ? $err : 'curl', 'status' => $status];
        }
        $decoded = json_decode($resp, true);
        $ok = is_array($decoded) && !empty($decoded['ok']);
        return $ok
            ? ['ok' => true, 'status' => $status]
            : ['ok' => false, 'status' => $status, 'error' => 'telegram_api'];
    }

    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $json,
            'timeout' => 20,
            'ignore_errors' => true,
        ],
    ]);
    $resp = @file_get_contents($url, false, $ctx);
    if ($resp === false) {
        return ['ok' => false, 'error' => 'http'];
    }
    $decoded = json_decode($resp, true);
    return (is_array($decoded) && !empty($decoded['ok']))
        ? ['ok' => true]
        : ['ok' => false, 'error' => 'telegram_api'];
}

/**
 * @param array<string,mixed> $delivery
 * @return array<string,mixed>
 */
function redact_delivery(array $delivery): array
{
    // Never echo tokens/paths beyond basename already used.
    return $delivery;
}
