'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { appliances, siteConfig, type Locale } from '@/config/site';
import { t } from '@/i18n/ui';
import { localizePath, switchLocalePath } from '@/i18n/utils';
import { useLead } from '@/components/LeadContext';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const { openLead } = useLead();
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface-glass backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          href={localizePath(locale)}
          className="min-w-0 shrink font-display text-[15px] font-semibold tracking-tight text-text-primary md:text-base"
        >
          <span className="block truncate">{siteConfig.workingTitle[locale]}</span>
          <span className="mt-0.5 block truncate text-[11px] font-normal text-text-tertiary">
            {siteConfig.geo[locale]}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          <div className="group relative">
            <button
              type="button"
              className="text-label-caps text-text-secondary transition hover:text-primary"
            >
              {t(locale, 'nav.services')}
            </button>
            <div className="invisible absolute left-0 top-full z-40 mt-2 min-w-[240px] rounded-md border border-hairline bg-surface-raised p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {appliances.map((item) => (
                <Link
                  key={item.slug}
                  href={localizePath(locale, item.path)}
                  className="block rounded px-3 py-2 text-sm text-text-secondary transition hover:bg-surface-container hover:text-text-primary"
                >
                  {item.label[locale]}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href={localizePath(locale, 'about')}
            className="text-label-caps text-text-secondary transition hover:text-primary"
          >
            {t(locale, 'nav.about')}
          </Link>
          <Link
            href={localizePath(locale, 'contacts')}
            className="text-label-caps text-text-secondary transition hover:text-primary"
          >
            {t(locale, 'nav.contacts')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href={switchLocalePath(pathname, otherLocale)}
            className="rounded border border-hairline px-2 py-1 font-tech text-[11px] font-semibold tracking-wider text-text-secondary transition hover:border-metallic hover:text-primary"
            hrefLang={otherLocale}
          >
            {t(locale, otherLocale === 'ru' ? 'lang.ru' : 'lang.en')}
          </Link>

          <a
            href={siteConfig.phoneHref}
            className="hidden text-tech-data text-text-primary transition hover:text-primary sm:inline"
          >
            {siteConfig.phoneDisplay}
          </a>

          <a
            href={siteConfig.phoneHref}
            className="hidden rounded border border-metallic px-3 py-2 text-label-caps text-accent-champagne-bright transition hover:bg-surface-container md:inline-flex"
          >
            {t(locale, 'cta.call')}
          </a>

          <button
            type="button"
            onClick={() => openLead()}
            className="btn-lead-glow inline-flex rounded bg-primary-container px-3 py-2 text-label-caps text-on-primary-container"
          >
            <span className="md:hidden">{t(locale, 'cta.requestShort')}</span>
            <span className="hidden md:inline">{t(locale, 'cta.request')}</span>
          </button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-hairline text-text-secondary lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="block space-y-1.5">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-hairline bg-surface-raised px-4 py-4 lg:hidden">
          <p className="mb-2 text-label-caps text-text-tertiary">
            {t(locale, 'nav.services')}
          </p>
          <div className="mb-4 grid gap-1">
            {appliances.map((item) => (
              <Link
                key={item.slug}
                href={localizePath(locale, item.path)}
                className="rounded px-2 py-2 text-sm text-text-secondary"
                onClick={() => setMenuOpen(false)}
              >
                {item.label[locale]}
              </Link>
            ))}
          </div>
          <div className="grid gap-1">
            <Link
              href={localizePath(locale, 'about')}
              className="rounded px-2 py-2 text-sm text-text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              {t(locale, 'nav.about')}
            </Link>
            <Link
              href={localizePath(locale, 'contacts')}
              className="rounded px-2 py-2 text-sm text-text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              {t(locale, 'nav.contacts')}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
