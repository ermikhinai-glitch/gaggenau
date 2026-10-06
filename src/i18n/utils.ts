import { defaultLocale, locales, type Locale } from '../config/site';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localizePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function stripLocaleFromPath(currentPath: string): string {
  const segments = currentPath.split('/').filter(Boolean);
  if (segments[0] === 'index.html') return '';
  if (segments.length && isLocale(segments[0])) {
    segments.shift();
  }
  if (segments[segments.length - 1] === 'index.html') {
    segments.pop();
  }
  return segments.join('/');
}

export function switchLocalePath(currentPath: string, nextLocale: Locale): string {
  return localizePath(nextLocale, stripLocaleFromPath(currentPath));
}

export function getLocaleFromParam(value: string | undefined): Locale {
  if (value && isLocale(value)) return value;
  return defaultLocale;
}
