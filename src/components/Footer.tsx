import Link from 'next/link';
import { siteConfig, type Locale } from '@/config/site';
import { t } from '@/i18n/ui';
import { localizePath } from '@/i18n/utils';

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-surface-container-lowest">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-text-primary">
            {siteConfig.workingTitle[locale]}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
            {t(locale, 'footer.note')}
          </p>
          <p className="mt-4 text-tech-data text-accent-champagne-bright">
            {siteConfig.geo[locale]}
          </p>
        </div>

        <div>
          <p className="text-label-caps text-text-tertiary">
            {t(locale, 'nav.contacts')}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-primary">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.hours.label[locale]}</li>
            <li className="text-text-tertiary">
              {siteConfig.addressPlaceholder[locale]}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-label-caps text-text-tertiary">
            {locale === 'ru' ? 'Разделы' : 'Pages'}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            <li>
              <Link href={localizePath(locale, 'about')} className="hover:text-primary">
                {t(locale, 'nav.about')}
              </Link>
            </li>
            <li>
              <Link href={localizePath(locale, 'contacts')} className="hover:text-primary">
                {t(locale, 'nav.contacts')}
              </Link>
            </li>
            <li>
              <Link href={localizePath(locale, 'privacy')} className="hover:text-primary">
                {t(locale, 'nav.privacy')}
              </Link>
            </li>
            <li>
              <Link href={localizePath(locale, 'terms')} className="hover:text-primary">
                {t(locale, 'nav.terms')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline px-4 py-4 text-center text-xs text-text-tertiary md:px-8">
        © {year} {siteConfig.workingTitle[locale]}. {t(locale, 'footer.rights')}
      </div>
    </footer>
  );
}
