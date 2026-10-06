import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const candidates = [
  process.env.PHP_BIN,
  join(process.env.LOCALAPPDATA || '', 'Programs', 'php', 'php.exe'),
  'C:\\php\\php.exe',
  'C:\\xampp\\php\\php.exe',
].filter(Boolean);

function phpOnPath() {
  const cmd = process.platform === 'win32' ? 'where' : 'which';
  const result = spawnSync(cmd, ['php'], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  const line = (result.stdout || '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .find(Boolean);
  return line && existsSync(line) ? line : null;
}

function resolvePhp() {
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return phpOnPath();
}

const php = resolvePhp();
if (!php) {
  console.error(
    'PHP not found. Install PHP 8.1+ or set PHP_BIN to php.exe, then retry: npm run api',
  );
  process.exit(1);
}

console.log(`Starting PHP API: ${php} -S 127.0.0.1:8080 -t ${root}`);

const child = spawn(php, ['-S', '127.0.0.1:8080', '-t', root], {
  cwd: root,
  stdio: 'inherit',
  shell: false,
});

child.on('error', (err) => {
  console.error(err.message);
  process.exit(1);
});

child.on('exit', (code) => process.exit(code ?? 1));
