import { defaultLocale, locales, type Locale } from '../config/site';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localizePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function switchLocalePath(currentPath: string, nextLocale: Locale): string {
  const segments = currentPath.split('/').filter(Boolean);
  if (segments.length === 0) {
    return localizePath(nextLocale);
  }
  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }
  return `/${segments.join('/')}/`.replace(/\/+/g, '/');
}

export function getLocaleFromParam(value: string | undefined): Locale {
  if (value && isLocale(value)) return value;
  return defaultLocale;
}
